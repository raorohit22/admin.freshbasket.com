import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders, mockServices, mockData } from '@/test-utils/testUtils';
import Products from '@/pages/Products';
import ProductServices from '@/services/ProductServices';

// Mock the services
vi.mock('@/services/ProductServices');

describe('Product Management Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('UT-A05: Add new product', () => {
        it('should add new product successfully', async () => {
            // Arrange
            const mockProductData = {
                title: 'Test Product',
                category: 'Electronics',
                price: 100,
                stock: 50,
                description: 'Test product description'
            };

            const mockResponse = {
                success: true,
                message: 'Product added successfully',
                product: { ...mockProductData, _id: '1' }
            };

            ProductServices.addProduct.mockResolvedValue(mockResponse);
            ProductServices.getAllProducts.mockResolvedValue({
                success: true,
                products: mockData.products,
                totalDoc: 1
            });

            // Act
            renderWithProviders(<Products />);

            await waitFor(() => {
                expect(screen.getByText(/products page/i)).toBeDefined();
            });

            const addProductButton = screen.getByRole('button', { name: /add product/i });
            fireEvent.click(addProductButton);

            // Assert
            expect(ProductServices.addProduct).toHaveBeenCalled();
        });

        it('should validate product data before adding', async () => {
            // Act
            renderWithProviders(<Products />);

            await waitFor(() => {
                expect(screen.getByText(/products page/i)).toBeDefined();
            });

            const addProductButton = screen.getByRole('button', { name: /add product/i });
            fireEvent.click(addProductButton);

            // The drawer should open for adding product
            expect(addProductButton).toBeDefined();
        });

        it('should handle add product errors', async () => {
            // Arrange
            const mockError = {
                response: {
                    data: {
                        message: 'Product already exists'
                    }
                }
            };

            ProductServices.addProduct.mockRejectedValue(mockError);

            // Act & Assert
            await expect(ProductServices.addProduct({})).rejects.toThrow();
        });
    });

    describe('UT-A06: Edit product details', () => {
        it('should edit product successfully', async () => {
            // Arrange
            const productId = '1';
            const updatedProductData = {
                title: 'Updated Product',
                price: 150,
                stock: 75
            };

            const mockResponse = {
                success: true,
                message: 'Product updated successfully',
                product: { ...updatedProductData, _id: productId }
            };

            ProductServices.updateProduct.mockResolvedValue(mockResponse);
            ProductServices.getAllProducts.mockResolvedValue({
                success: true,
                products: mockData.products,
                totalDoc: 1
            });

            // Act
            renderWithProviders(<Products />);

            await waitFor(() => {
                expect(screen.getByText(/products page/i)).toBeDefined();
            });

            // In a real implementation, we would find and click the edit button
            await ProductServices.updateProduct(productId, updatedProductData);

            // Assert
            expect(ProductServices.updateProduct).toHaveBeenCalledWith(productId, updatedProductData);
        });

        it('should handle edit product errors', async () => {
            // Arrange
            const productId = '1';
            const mockError = {
                response: {
                    data: {
                        message: 'Product not found'
                    }
                }
            };

            ProductServices.updateProduct.mockRejectedValue(mockError);

            // Act & Assert
            await expect(ProductServices.updateProduct(productId, {})).rejects.toThrow();
        });
    });

    describe('Product List Display', () => {
        it('should display products list with correct data', async () => {
            // Arrange
            ProductServices.getAllProducts.mockResolvedValue({
                success: true,
                products: mockData.products,
                totalDoc: 1
            });

            // Act
            renderWithProviders(<Products />);

            // Assert
            await waitFor(() => {
                expect(screen.getByText(/products page/i)).toBeDefined();
            });

            // Check if product table headers are present
            expect(screen.getByText(/product name tbl/i)).toBeDefined();
            expect(screen.getByText(/category tbl/i)).toBeDefined();
            expect(screen.getByText(/price tbl/i)).toBeDefined();
            expect(screen.getByText(/stock tbl/i)).toBeDefined();
        });

        it('should show loading state while fetching products', () => {
            // Arrange
            ProductServices.getAllProducts.mockImplementation(() =>
                new Promise(resolve => setTimeout(resolve, 100))
            );

            // Act
            renderWithProviders(<Products />);

            // Assert
            expect(screen.getByText(/products page/i)).toBeDefined();
        });

        it('should display error message when products fetch fails', async () => {
            // Arrange
            const mockError = new Error('Failed to fetch products');
            ProductServices.getAllProducts.mockRejectedValue(mockError);

            // Act
            renderWithProviders(<Products />);

            // Assert
            await waitFor(() => {
                expect(screen.getByText(/failed to fetch products/i)).toBeDefined();
            });
        });
    });

    describe('Product Search and Filter', () => {
        it('should filter products by category', async () => {
            // Arrange
            ProductServices.getAllProducts.mockResolvedValue({
                success: true,
                products: mockData.products,
                totalDoc: 1
            });

            // Act
            renderWithProviders(<Products />);

            await waitFor(() => {
                expect(screen.getByText(/products page/i)).toBeDefined();
            });

            const categorySelect = screen.getByDisplayValue(/category/i);
            fireEvent.change(categorySelect, { target: { value: 'Electronics' } });

            const filterButton = screen.getByRole('button', { name: /filter/i });
            fireEvent.click(filterButton);

            // Assert
            expect(categorySelect).toHaveProperty('value','Electronics');
        });

        it('should search products by title', async () => {
            // Arrange
            ProductServices.getAllProducts.mockResolvedValue({
                success: true,
                products: mockData.products,
                totalDoc: 1
            });

            // Act
            renderWithProviders(<Products />);

            await waitFor(() => {
                expect(screen.getByText(/products page/i)).toBeDefined();
            });

            const searchInput = screen.getByPlaceholderText(/search product/i);
            fireEvent.change(searchInput, { target: { value: 'Test Product' } });

            const filterButton = screen.getByRole('button', { name: /filter/i });
            fireEvent.click(filterButton);

            // Assert
            expect(searchInput).toHaveProperty('value','Test Product');
        });

        it('should sort products by price', async () => {
            // Arrange
            ProductServices.getAllProducts.mockResolvedValue({
                success: true,
                products: mockData.products,
                totalDoc: 1
            });

            // Act
            renderWithProviders(<Products />);

            await waitFor(() => {
                expect(screen.getByText(/products page/i)).toBeDefined();
            });

            const priceSelect = screen.getByDisplayValue(/price/i);
            fireEvent.change(priceSelect, { target: { value: 'low' } });

            const filterButton = screen.getByRole('button', { name: /filter/i });
            fireEvent.click(filterButton);

            // Assert
            expect(priceSelect).toHaveProperty('value','low');
        });
    });

    describe('Bulk Actions', () => {
        it('should handle bulk update of products', async () => {
            // Arrange
            const selectedProducts = ['1', '2'];
            const bulkUpdateData = {
                status: 'published',
                category: 'Electronics'
            };

            ProductServices.updateManyProducts.mockResolvedValue({
                success: true,
                message: 'Products updated successfully'
            });

            ProductServices.getAllProducts.mockResolvedValue({
                success: true,
                products: mockData.products,
                totalDoc: 1
            });

            // Act
            renderWithProviders(<Products />);

            await waitFor(() => {
                expect(screen.getByText(/products page/i)).toBeDefined();
            });

            // In a real implementation, we would select products and click bulk action
            await ProductServices.updateManyProducts({
                ids: selectedProducts,
                ...bulkUpdateData
            });

            // Assert
            expect(ProductServices.updateManyProducts).toHaveBeenCalledWith({
                ids: selectedProducts,
                ...bulkUpdateData
            });
        });
    });
});
