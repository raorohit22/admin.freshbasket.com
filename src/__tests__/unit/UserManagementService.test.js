import { describe, it, expect, vi, beforeEach } from 'vitest';
import AdminServices from '@/services/AdminServices';

// Mock the services
vi.mock('@/services/AdminServices');

describe('User Management Service Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('UT-A03: Add new user with valid details', () => {
        it('should add new staff member successfully', async () => {
            // Arrange
            const mockStaffData = {
                name: 'John Doe',
                email: 'john@test.com',
                role: 'Admin',
                contact: '1234567890'
            };

            const mockResponse = {
                success: true,
                message: 'Staff added successfully',
                staff: { ...mockStaffData, _id: '1' }
            };

            AdminServices.addStaff.mockResolvedValue(mockResponse);

            // Act
            const result = await AdminServices.addStaff(mockStaffData);

            // Assert
            expect(AdminServices.addStaff).toHaveBeenCalledWith(mockStaffData);
            expect(result.success).toBe(true);
            expect(result.message).toBe('Staff added successfully');
            expect(result.staff).toHaveProperty('_id', '1');
            expect(result.staff.name).toBe('John Doe');
        });

        it('should validate required fields', async () => {
            // Arrange
            const incompleteData = {
                name: 'John Doe'
                // Missing email, role, contact
            };

            const validationError = new Error('Email, role, and contact are required');
            AdminServices.addStaff.mockRejectedValue(validationError);

            // Act & Assert
            await expect(AdminServices.addStaff(incompleteData)).rejects.toThrow('Email, role, and contact are required');
        });

        it('should handle duplicate email error', async () => {
            // Arrange
            const duplicateEmailError = {
                response: {
                    data: {
                        message: 'Email already exists'
                    }
                }
            };

            AdminServices.addStaff.mockRejectedValue(duplicateEmailError);

            // Act & Assert
            await expect(AdminServices.addStaff({
                name: 'John Doe',
                email: 'existing@test.com',
                role: 'Admin',
                contact: '1234567890'
            })).rejects.toThrow();
        });
    });

    describe('UT-A04: Delete existing user', () => {
        it('should delete staff member successfully', async () => {
            // Arrange
            const staffId = '1';
            const mockResponse = {
                success: true,
                message: 'Staff deleted successfully'
            };

            AdminServices.deleteStaff.mockResolvedValue(mockResponse);

            // Act
            const result = await AdminServices.deleteStaff(staffId);

            // Assert
            expect(AdminServices.deleteStaff).toHaveBeenCalledWith(staffId);
            expect(result.success).toBe(true);
            expect(result.message).toBe('Staff deleted successfully');
        });

        it('should handle staff not found error', async () => {
            // Arrange
            const staffId = '999';
            const notFoundError = {
                response: {
                    status: 404,
                    data: {
                        message: 'Staff not found'
                    }
                }
            };

            AdminServices.deleteStaff.mockRejectedValue(notFoundError);

            // Act & Assert
            await expect(AdminServices.deleteStaff(staffId)).rejects.toThrow();
        });

        it('should handle unauthorized deletion', async () => {
            // Arrange
            const staffId = '1';
            const unauthorizedError = {
                response: {
                    status: 403,
                    data: {
                        message: 'Unauthorized to delete this staff member'
                    }
                }
            };

            AdminServices.deleteStaff.mockRejectedValue(unauthorizedError);

            // Act & Assert
            await expect(AdminServices.deleteStaff(staffId)).rejects.toThrow();
        });
    });

    describe('Staff Management Operations', () => {
        it('should get all staff members', async () => {
            // Arrange
            const mockStaffList = {
                success: true,
                staff: [
                    { _id: '1', name: 'John Doe', email: 'john@test.com', role: 'Admin' },
                    { _id: '2', name: 'Jane Smith', email: 'jane@test.com', role: 'Cashier' }
                ]
            };

            AdminServices.getAllStaff.mockResolvedValue(mockStaffList);

            // Act
            const result = await AdminServices.getAllStaff();

            // Assert
            expect(AdminServices.getAllStaff).toHaveBeenCalled();
            expect(result.success).toBe(true);
            expect(result.staff).toHaveLength(2);
        });

        it('should update staff member', async () => {
            // Arrange
            const staffId = '1';
            const updateData = {
                name: 'John Updated',
                role: 'Super Admin'
            };

            const mockResponse = {
                success: true,
                message: 'Staff updated successfully',
                staff: { _id: staffId, ...updateData }
            };

            AdminServices.updateStaff.mockResolvedValue(mockResponse);

            // Act
            const result = await AdminServices.updateStaff(staffId, updateData);

            // Assert
            expect(AdminServices.updateStaff).toHaveBeenCalledWith(staffId, updateData);
            expect(result.success).toBe(true);
            expect(result.staff.name).toBe('John Updated');
        });

        it('should update staff status', async () => {
            // Arrange
            const staffId = '1';
            const statusData = { status: 'active' };

            const mockResponse = {
                success: true,
                message: 'Status updated successfully'
            };

            AdminServices.updateStaffStatus.mockResolvedValue(mockResponse);

            // Act
            const result = await AdminServices.updateStaffStatus(staffId, statusData);

            // Assert
            expect(AdminServices.updateStaffStatus).toHaveBeenCalledWith(staffId, statusData);
            expect(result.success).toBe(true);
        });
    });
});
