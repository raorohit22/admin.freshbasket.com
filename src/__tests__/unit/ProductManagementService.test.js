import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductServices from '@/services/ProductServices';

// Mock the services
vi.mock('@/services/ProductServices');

describe('Product Management Service Tests', () => {
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

            // Act
            const result = await ProductServices.addProduct(mockProductData);

            // Assert
            expect(ProductServices.addProduct).toHaveBeenCalledWith(mockProductData);
            expect(result.success).toBe(true);
            expect(result.message).toBe('Product added successfully');
            expect(result.product).toHaveProperty('_id', '1');
            expect(result.product.title).toBe('Test Product');
        });

        it('should validate required product fields', async () => {
            // Arrange
            const incompleteData = {
                title: 'Test Product'
                // Missing category, price, stock
            };

            const validationError = new Error('Category, price, and stock are required');
            ProductServices.addProduct.mockRejectedValue(validationError);

            // Act & Assert
            await expect(ProductServices.addProduct(incompleteData)).rejects.toThrow('Category, price, and stock are required');
        });

        it('should handle duplicate product title', async () => {
            // Arrange
            const duplicateError = {
                response: {
                    data: {
                        message: 'Product with this title already exists'
                    }
                }
            };

            ProductServices.addProduct.mockRejectedValue(duplicateError);

            // Act & Assert
            await expect(ProductServices.addProduct({
                title: 'Existing Product',
                category: 'Electronics',
                price: 100,
                stock: 50
            })).rejects.toThrow();
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
                product: { _id: productId, ...updatedProductData }
            };

            ProductServices.updateProduct.mockResolvedValue(mockResponse);

            // Act
            const result = await ProductServices.updateProduct(productId, updatedProductData);

            // Assert
            expect(ProductServices.updateProduct).toHaveBeenCalledWith(productId, updatedProductData);
            expect(result.success).toBe(true);
            expect(result.message).toBe('Product updated successfully');
            expect(result.product.title).toBe('Updated Product');
        });

        it('should handle product not found error', async () => {
            // Arrange
            const productId = '999';
            const notFoundError = {
                response: {
                    status: 404,
                    data: {
                        message: 'Product not found'
                    }
                }
            };

            ProductServices.updateProduct.mockRejectedValue(notFoundError);

            // Act & Assert
            await expect(ProductServices.updateProduct(productId, {})).rejects.toThrow();
        });

        it('should validate price format', async () => {
            // Arrange
            const invalidPriceError = new Error('Price must be a positive number');
            ProductServices.updateProduct.mockRejectedValue(invalidPriceError);

            // Act & Assert
            await expect(ProductServices.updateProduct('1', {
                price: -100
            })).rejects.toThrow('Price must be a positive number');
        });
    });

    describe('Product Management Operations', () => {
        it('should get all products', async () => {
            // Arrange
            const mockProducts = {
                success: true,
                products: [
                    { _id: '1', title: 'Product 1', category: 'Electronics', price: 100 },
                    { _id: '2', title: 'Product 2', category: 'Clothing', price: 50 }
                ],
                totalDoc: 2
            };

            ProductServices.getAllProducts.mockResolvedValue(mockProducts);

            // Act
            const result = await ProductServices.getAllProducts({
                page: 1,
                limit: 10
            });

            // Assert
            expect(ProductServices.getAllProducts).toHaveBeenCalledWith({
                page: 1,
                limit: 10
            });
            expect(result.success).toBe(true);
            expect(result.products).toHaveLength(2);
        });

        it('should delete product', async () => {
            // Arrange
            const productId = '1';
            const mockResponse = {
                success: true,
                message: 'Product deleted successfully'
            };

            ProductServices.deleteProduct.mockResolvedValue(mockResponse);

            // Act
            const result = await ProductServices.deleteProduct(productId);

            // Assert
            expect(ProductServices.deleteProduct).toHaveBeenCalledWith(productId);
            expect(result.success).toBe(true);
        });

        it('should update product status', async () => {
            // Arrange
            const productId = '1';
            const statusData = { status: 'published' };

            const mockResponse = {
                success: true,
                message: 'Product status updated successfully'
            };

            ProductServices.updateStatus.mockResolvedValue(mockResponse);

            // Act
            const result = await ProductServices.updateStatus(productId, statusData);

            // Assert
            expect(ProductServices.updateStatus).toHaveBeenCalledWith(productId, statusData);
            expect(result.success).toBe(true);
        });

        it('should handle bulk product updates', async () => {
            // Arrange
            const bulkUpdateData = {
                ids: ['1', '2', '3'],
                status: 'published'
            };

            const mockResponse = {
                success: true,
                message: 'Products updated successfully'
            };

            ProductServices.updateManyProducts.mockResolvedValue(mockResponse);

            // Act
            const result = await ProductServices.updateManyProducts(bulkUpdateData);

            // Assert
            expect(ProductServices.updateManyProducts).toHaveBeenCalledWith(bulkUpdateData);
            expect(result.success).toBe(true);
        });
    });
});
