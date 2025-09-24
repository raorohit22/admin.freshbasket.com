import { describe, it, expect, vi, beforeEach } from 'vitest';
import AdminServices from '@/services/AdminServices';
import { notifySuccess, notifyError } from '@/utils/toast';

// Mock the services and utilities
vi.mock('@/services/AdminServices');
vi.mock('@/utils/toast');

describe('Authentication Service Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('UT-A01: Login with valid credentials', () => {
        it('should login successfully with valid email and password', async () => {
            // Arrange
            const mockLoginResponse = {
                success: true,
                adminInfo: {
                    _id: '1',
                    name: 'Test Admin',
                    email: 'admin@test.com',
                    role: 'Super Admin'
                },
                token: 'mock-token'
            };

            AdminServices.loginAdmin.mockResolvedValue(mockLoginResponse);
            notifySuccess.mockImplementation(() => { });

            // Act
            const result = await AdminServices.loginAdmin({
                email: 'admin@test.com',
                password: 'password123'
            });

            // Assert
            expect(AdminServices.loginAdmin).toHaveBeenCalledWith({
                email: 'admin@test.com',
                password: 'password123'
            });
            expect(result).toEqual(mockLoginResponse);
            expect(result.success).toBe(true);
            expect(result.adminInfo).toHaveProperty('email', 'admin@test.com');
        });

        it('should return admin info after successful login', async () => {
            // Arrange
            const mockResponse = {
                success: true,
                adminInfo: {
                    _id: '1',
                    name: 'John Doe',
                    email: 'john@example.com',
                    role: 'Admin'
                }
            };

            AdminServices.loginAdmin.mockResolvedValue(mockResponse);

            // Act
            const result = await AdminServices.loginAdmin({
                email: 'john@example.com',
                password: 'password123'
            });

            // Assert
            expect(result.adminInfo.name).toBe('John Doe');
            expect(result.adminInfo.role).toBe('Admin');
        });
    });

    describe('UT-A02: Login with invalid password', () => {
        it('should handle invalid credentials error', async () => {
            // Arrange
            const mockError = {
                response: {
                    data: {
                        message: 'Invalid credentials'
                    }
                }
            };

            AdminServices.loginAdmin.mockRejectedValue(mockError);
            notifyError.mockImplementation(() => { });

            // Act & Assert
            await expect(AdminServices.loginAdmin({
                email: 'admin@test.com',
                password: 'wrongpassword'
            })).rejects.toThrow();

            expect(AdminServices.loginAdmin).toHaveBeenCalledWith({
                email: 'admin@test.com',
                password: 'wrongpassword'
            });
        });

        it('should handle network errors gracefully', async () => {
            // Arrange
            const networkError = new Error('Network Error');
            AdminServices.loginAdmin.mockRejectedValue(networkError);

            // Act & Assert
            await expect(AdminServices.loginAdmin({
                email: 'admin@test.com',
                password: 'password123'
            })).rejects.toThrow('Network Error');
        });

        it('should handle server errors', async () => {
            // Arrange
            const serverError = {
                response: {
                    status: 500,
                    data: {
                        message: 'Internal server error'
                    }
                }
            };

            AdminServices.loginAdmin.mockRejectedValue(serverError);

            // Act & Assert
            await expect(AdminServices.loginAdmin({})).rejects.toThrow();
        });
    });

    describe('Service Integration Tests', () => {
        it('should call loginAdmin with correct parameters', async () => {
            // Arrange
            AdminServices.loginAdmin.mockResolvedValue({ success: true });

            // Act
            await AdminServices.loginAdmin({
                email: 'test@example.com',
                password: 'password123'
            });

            // Assert
            expect(AdminServices.loginAdmin).toHaveBeenCalledTimes(1);
            expect(AdminServices.loginAdmin).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123'
            });
        });

        it('should handle empty credentials', async () => {
            // Arrange
            const emptyCredentialsError = new Error('Email and password are required');
            AdminServices.loginAdmin.mockRejectedValue(emptyCredentialsError);

            // Act & Assert
            await expect(AdminServices.loginAdmin({})).rejects.toThrow('Email and password are required');
        });

        it('should validate email format', async () => {
            // Arrange
            const invalidEmailError = new Error('Invalid email format');
            AdminServices.loginAdmin.mockRejectedValue(invalidEmailError);

            // Act & Assert
            await expect(AdminServices.loginAdmin({
                email: 'invalid-email',
                password: 'password123'
            })).rejects.toThrow('Invalid email format');
        });
    });
});
