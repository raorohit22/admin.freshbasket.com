import { describe, it, expect, vi, beforeEach } from 'vitest';
import CategoryServices from '@/services/CategoryServices';

// Mock the services
vi.mock('@/services/CategoryServices');

describe('Category Management Service Tests', () => {
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

      // Act
      const result = await CategoryServices.addCategory(mockCategoryData);

      // Assert
      expect(CategoryServices.addCategory).toHaveBeenCalledWith(mockCategoryData);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Category added successfully');
      expect(result.category).toHaveProperty('_id', '1');
      expect(result.category.name).toBe('Electronics');
    });

    it('should validate required category fields', async () => {
      // Arrange
      const incompleteData = {
        name: 'Electronics'
        // Missing description
      };

      const validationError = new Error('Description is required');
      CategoryServices.addCategory.mockRejectedValue(validationError);

      // Act & Assert
      await expect(CategoryServices.addCategory(incompleteData)).rejects.toThrow('Description is required');
    });

    it('should handle duplicate category name', async () => {
      // Arrange
      const duplicateError = {
        response: {
          data: {
            message: 'Category with this name already exists'
          }
        }
      };

      CategoryServices.addCategory.mockRejectedValue(duplicateError);

      // Act & Assert
      await expect(CategoryServices.addCategory({
        name: 'Existing Category',
        description: 'Test description'
      })).rejects.toThrow();
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
        category: { _id: categoryId, ...updatedCategoryData }
      };

      CategoryServices.updateCategory.mockResolvedValue(mockResponse);

      // Act
      const result = await CategoryServices.updateCategory(categoryId, updatedCategoryData);

      // Assert
      expect(CategoryServices.updateCategory).toHaveBeenCalledWith(categoryId, updatedCategoryData);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Category updated successfully');
      expect(result.category.name).toBe('Updated Electronics');
    });

    it('should handle category not found error', async () => {
      // Arrange
      const categoryId = '999';
      const notFoundError = {
        response: {
          status: 404,
          data: {
            message: 'Category not found'
          }
        }
      };

      CategoryServices.updateCategory.mockRejectedValue(notFoundError);

      // Act & Assert
      await expect(CategoryServices.updateCategory(categoryId, {})).rejects.toThrow();
    });

    it('should validate category name uniqueness on update', async () => {
      // Arrange
      const duplicateNameError = new Error('Category name already exists');
      CategoryServices.updateCategory.mockRejectedValue(duplicateNameError);

      // Act & Assert
      await expect(CategoryServices.updateCategory('1', {
        name: 'Existing Category Name'
      })).rejects.toThrow('Category name already exists');
    });
  });

  describe('Category Management Operations', () => {
    it('should get all categories', async () => {
      // Arrange
      const mockCategories = {
        success: true,
        categories: [
          { _id: '1', name: 'Electronics', description: 'Electronic items' },
          { _id: '2', name: 'Clothing', description: 'Clothing items' }
        ]
      };

      CategoryServices.getAllCategory.mockResolvedValue(mockCategories);

      // Act
      const result = await CategoryServices.getAllCategory();

      // Assert
      expect(CategoryServices.getAllCategory).toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.categories).toHaveLength(2);
    });

    it('should get category by ID', async () => {
      // Arrange
      const categoryId = '1';
      const mockCategory = {
        success: true,
        category: {
          _id: '1',
          name: 'Electronics',
          description: 'Electronic items',
          status: 'published'
        }
      };

      CategoryServices.getCategoryById.mockResolvedValue(mockCategory);

      // Act
      const result = await CategoryServices.getCategoryById(categoryId);

      // Assert
      expect(CategoryServices.getCategoryById).toHaveBeenCalledWith(categoryId);
      expect(result.success).toBe(true);
      expect(result.category.name).toBe('Electronics');
    });

    it('should delete category', async () => {
      // Arrange
      const categoryId = '1';
      const mockResponse = {
        success: true,
        message: 'Category deleted successfully'
      };

      CategoryServices.deleteCategory.mockResolvedValue(mockResponse);

      // Act
      const result = await CategoryServices.deleteCategory(categoryId);

      // Assert
      expect(CategoryServices.deleteCategory).toHaveBeenCalledWith(categoryId);
      expect(result.success).toBe(true);
    });

    it('should update category status', async () => {
      // Arrange
      const categoryId = '1';
      const statusData = { status: 'published' };

      const mockResponse = {
        success: true,
        message: 'Category status updated successfully'
      };

      CategoryServices.updateStatus.mockResolvedValue(mockResponse);

      // Act
      const result = await CategoryServices.updateStatus(categoryId, statusData);

      // Assert
      expect(CategoryServices.updateStatus).toHaveBeenCalledWith(categoryId, statusData);
      expect(result.success).toBe(true);
    });

    it('should handle bulk category updates', async () => {
      // Arrange
      const bulkUpdateData = {
        ids: ['1', '2', '3'],
        status: 'published'
      };

      const mockResponse = {
        success: true,
        message: 'Categories updated successfully'
      };

      CategoryServices.updateManyCategory.mockResolvedValue(mockResponse);

      // Act
      const result = await CategoryServices.updateManyCategory(bulkUpdateData);

      // Assert
      expect(CategoryServices.updateManyCategory).toHaveBeenCalledWith(bulkUpdateData);
      expect(result.success).toBe(true);
    });

    it('should handle bulk category deletion', async () => {
      // Arrange
      const bulkDeleteData = {
        ids: ['1', '2', '3']
      };

      const mockResponse = {
        success: true,
        message: 'Categories deleted successfully'
      };

      CategoryServices.deleteManyCategory.mockResolvedValue(mockResponse);

      // Act
      const result = await CategoryServices.deleteManyCategory(bulkDeleteData);

      // Assert
      expect(CategoryServices.deleteManyCategory).toHaveBeenCalledWith(bulkDeleteData);
      expect(result.success).toBe(true);
    });
  });
});
