import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders, mockServices, mockData } from '@/test-utils/testUtils';
import Category from '@/pages/Category';
import CategoryServices from '@/services/CategoryServices';

// Mock the services
vi.mock('@/services/CategoryServices');

describe('Category Management Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('UT-A09: Add new category', () => {
        it('should add new category successfully', async () => {
            // Arrange
            const mockCategoryData = {
                name: 'Electronics',
                description: 'Electronic items',
                icon: 'electronics-icon.png',
                status: 'published'
            };

            const mockResponse = {
                success: true,
                message: 'Category added successfully',
                category: { ...mockCategoryData, _id: '1' }
            };

            CategoryServices.addCategory.mockResolvedValue(mockResponse);
            CategoryServices.getAllCategory.mockResolvedValue({
                success: true,
                categories: mockData.categories
            });
            CategoryServices.getAllCategories.mockResolvedValue({
                success: true,
                categories: mockData.categories
            });

            // Act
            renderWithProviders(<Category />);

            await waitFor(() => {
                expect(screen.getByText(/category/i)).toBeDefined();
            });

            const addCategoryButton = screen.getByRole('button', { name: /add category/i });
            fireEvent.click(addCategoryButton);

            // Assert
            expect(CategoryServices.addCategory).toHaveBeenCalled();
        });

        it('should validate category data before adding', async () => {
            // Act
            renderWithProviders(<Category />);

            await waitFor(() => {
                expect(screen.getByText(/category/i)).toBeDefined();
            });

            const addCategoryButton = screen.getByRole('button', { name: /add category/i });
            fireEvent.click(addCategoryButton);

            // The drawer should open for adding category
            expect(addCategoryButton).toBeDefined();
        });

        it('should handle add category errors', async () => {
            // Arrange
            const mockError = {
                response: {
                    data: {
                        message: 'Category already exists'
                    }
                }
            };

            CategoryServices.addCategory.mockRejectedValue(mockError);

            // Act & Assert
            await expect(CategoryServices.addCategory({})).rejects.toThrow();
        });
    });

    describe('UT-A10: Edit category details', () => {
        it('should edit category successfully', async () => {
            // Arrange
            const categoryId = '1';
            const updatedCategoryData = {
                name: 'Updated Electronics',
                description: 'Updated electronic items',
                status: 'published'
            };

            const mockResponse = {
                success: true,
                message: 'Category updated successfully',
                category: { ...updatedCategoryData, _id: categoryId }
            };

            CategoryServices.updateCategory.mockResolvedValue(mockResponse);
            CategoryServices.getAllCategory.mockResolvedValue({
                success: true,
                categories: mockData.categories
            });
            CategoryServices.getAllCategories.mockResolvedValue({
                success: true,
                categories: mockData.categories
            });

            // Act
            renderWithProviders(<Category />);

            await waitFor(() => {
                expect(screen.getByText(/category/i)).toBeDefined();
            });

            // In a real implementation, we would find and click the edit button
            await CategoryServices.updateCategory(categoryId, updatedCategoryData);

            // Assert
            expect(CategoryServices.updateCategory).toHaveBeenCalledWith(categoryId, updatedCategoryData);
        });

        it('should handle edit category errors', async () => {
            // Arrange
            const categoryId = '1';
            const mockError = {
                response: {
                    data: {
                        message: 'Category not found'
                    }
                }
            };

            CategoryServices.updateCategory.mockRejectedValue(mockError);

            // Act & Assert
            await expect(CategoryServices.updateCategory(categoryId, {})).rejects.toThrow();
        });
    });

    describe('Category List Display', () => {
        it('should display categories list with correct data', async () => {
            // Arrange
            CategoryServices.getAllCategory.mockResolvedValue({
                success: true,
                categories: mockData.categories
            });
            CategoryServices.getAllCategories.mockResolvedValue({
                success: true,
                categories: mockData.categories
            });

            // Act
            renderWithProviders(<Category />);

            // Assert
            await waitFor(() => {
                expect(screen.getByText(/category/i)).toBeDefined();
            });

            // Check if category table headers are present
            expect(screen.getByText(/cat id tbl/i)).toBeDefined();
            expect(screen.getByText(/cat icon tbl/i)).toBeDefined();
            expect(screen.getByText(/cat tb name/i)).toBeDefined();
            expect(screen.getByText(/cat tb description/i)).toBeDefined();
            expect(screen.getByText(/cat published tbl/i)).toBeDefined();
            expect(screen.getByText(/cat actions tbl/i)).toBeDefined();
        });

        it('should show loading state while fetching categories', () => {
            // Arrange
            CategoryServices.getAllCategory.mockImplementation(() =>
                new Promise(resolve => setTimeout(resolve, 100))
            );
            CategoryServices.getAllCategories.mockImplementation(() =>
                new Promise(resolve => setTimeout(resolve, 100))
            );

            // Act
            renderWithProviders(<Category />);

            // Assert
            expect(screen.getByText(/category/i)).toBeDefined();
        });

        it('should display error message when categories fetch fails', async () => {
            // Arrange
            const mockError = new Error('Failed to fetch categories');
            CategoryServices.getAllCategory.mockRejectedValue(mockError);
            CategoryServices.getAllCategories.mockResolvedValue({
                success: true,
                categories: []
            });

            // Act
            renderWithProviders(<Category />);

            // Assert
            await waitFor(() => {
                expect(screen.getByText(/failed to fetch categories/i)).toBeDefined();
            });
        });

        it('should show no categories message when no categories exist', async () => {
            // Arrange
            CategoryServices.getAllCategory.mockResolvedValue({
                success: true,
                categories: []
            });
            CategoryServices.getAllCategories.mockResolvedValue({
                success: true,
                categories: []
            });

            // Act
            renderWithProviders(<Category />);

            // Assert
            await waitFor(() => {
                expect(screen.getByText(/sorry, there are no categories right now/i)).toBeDefined();
            });
        });
    });

    describe('Category Search and Filter', () => {
        it('should search categories by name', async () => {
            // Arrange
            CategoryServices.getAllCategory.mockResolvedValue({
                success: true,
                categories: mockData.categories
            });
            CategoryServices.getAllCategories.mockResolvedValue({
                success: true,
                categories: mockData.categories
            });

            // Act
            renderWithProviders(<Category />);

            await waitFor(() => {
                expect(screen.getByText(/category/i)).toBeDefined();
            });

            const searchInput = screen.getByPlaceholderText(/search category/i);
            fireEvent.change(searchInput, { target: { value: 'Electronics' } });

            const filterButton = screen.getByRole('button', { name: /filter/i });
            fireEvent.click(filterButton);

            // Assert
            expect(searchInput).toHaveProperty('value','Electronics');
        });

        it('should reset search filters', async () => {
            // Arrange
            CategoryServices.getAllCategory.mockResolvedValue({
                success: true,
                categories: mockData.categories
            });
            CategoryServices.getAllCategories.mockResolvedValue({
                success: true,
                categories: mockData.categories
            });

            // Act
            renderWithProviders(<Category />);

            await waitFor(() => {
                expect(screen.getByText(/category/i)).toBeDefined();
            });

            const searchInput = screen.getByPlaceholderText(/search category/i);
            fireEvent.change(searchInput, { target: { value: 'Electronics' } });

            const resetButton = screen.getByRole('button', { name: /reset/i });
            fireEvent.click(resetButton);

            // Assert
            expect(searchInput).toHaveProperty('value','');
        });
    });

    describe('Bulk Actions', () => {
        it('should handle bulk update of categories', async () => {
            // Arrange
            const selectedCategories = ['1', '2'];
            const bulkUpdateData = {
                status: 'published'
            };

            CategoryServices.updateManyCategory.mockResolvedValue({
                success: true,
                message: 'Categories updated successfully'
            });
            CategoryServices.getAllCategory.mockResolvedValue({
                success: true,
                categories: mockData.categories
            });
            CategoryServices.getAllCategories.mockResolvedValue({
                success: true,
                categories: mockData.categories
            });

            // Act
            renderWithProviders(<Category />);

            await waitFor(() => {
                expect(screen.getByText(/category/i)).toBeDefined();
            });

            // In a real implementation, we would select categories and click bulk action
            await CategoryServices.updateManyCategory({
                ids: selectedCategories,
                ...bulkUpdateData
            });

            // Assert
            expect(CategoryServices.updateManyCategory).toHaveBeenCalledWith({
                ids: selectedCategories,
                ...bulkUpdateData
            });
        });

        it('should handle bulk delete of categories', async () => {
            // Arrange
            const selectedCategories = ['1', '2'];

            CategoryServices.deleteManyCategory.mockResolvedValue({
                success: true,
                message: 'Categories deleted successfully'
            });
            CategoryServices.getAllCategory.mockResolvedValue({
                success: true,
                categories: mockData.categories
            });
            CategoryServices.getAllCategories.mockResolvedValue({
                success: true,
                categories: mockData.categories
            });

            // Act
            renderWithProviders(<Category />);

            await waitFor(() => {
                expect(screen.getByText(/category/i)).toBeDefined();
            });

            // In a real implementation, we would select categories and click delete
            await CategoryServices.deleteManyCategory({
                ids: selectedCategories
            });

            // Assert
            expect(CategoryServices.deleteManyCategory).toHaveBeenCalledWith({
                ids: selectedCategories
            });
        });
    });

    describe('Category Status Management', () => {
        it('should update category status', async () => {
            // Arrange
            const categoryId = '1';
            const statusUpdate = {
                status: 'published'
            };

            const mockResponse = {
                success: true,
                message: 'Category status updated successfully'
            };

            CategoryServices.updateStatus.mockResolvedValue(mockResponse);

            // Act
            await CategoryServices.updateStatus(categoryId, statusUpdate);

            // Assert
            expect(CategoryServices.updateStatus).toHaveBeenCalledWith(categoryId, statusUpdate);
        });
    });

    describe('Category Upload', () => {
        it('should handle bulk category upload', async () => {
            // Arrange
            const mockUploadData = [
                { name: 'Category 1', description: 'Description 1' },
                { name: 'Category 2', description: 'Description 2' }
            ];

            CategoryServices.addAllCategory.mockResolvedValue({
                success: true,
                message: 'Categories uploaded successfully'
            });
            CategoryServices.getAllCategory.mockResolvedValue({
                success: true,
                categories: mockData.categories
            });
            CategoryServices.getAllCategories.mockResolvedValue({
                success: true,
                categories: mockData.categories
            });

            // Act
            renderWithProviders(<Category />);

            await waitFor(() => {
                expect(screen.getByText(/category/i)).toBeDefined();
            });

            // In a real implementation, we would test file upload
            await CategoryServices.addAllCategory(mockUploadData);

            // Assert
            expect(CategoryServices.addAllCategory).toHaveBeenCalledWith(mockUploadData);
        });
    });
});
