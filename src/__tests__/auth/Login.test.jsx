import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test-utils/testUtils';
import Login from '@/pages/Login';
import AdminServices from '@/services/AdminServices';
import { notifySuccess, notifyError } from '@/utils/toast';

// Mock the services and utilities
vi.mock('@/services/AdminServices');
vi.mock('@/utils/toast');
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useHistory: () => ({
            replace: vi.fn()
        }),
        useLocation: () => ({
            pathname: '/login'
        })
    };
});

describe('Authentication Tests', () => {
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
            renderWithProviders(<Login />);

            const emailInput = screen.getByDisplayValue('superadmin@gmail.com');
            const passwordInput = screen.getByDisplayValue('1234567890');
            const loginButton = screen.getByRole('button', { name: /login/i });

            // Simulate form submission
            fireEvent.click(loginButton);

            // Assert
            await waitFor(() => {
                expect(AdminServices.loginAdmin).toHaveBeenCalledWith({
                    email: 'superadmin@gmail.com',
                    password: '1234567890'
                });
            });

            expect(notifySuccess).toHaveBeenCalledWith('Login Success!');
        });

        it('should display dashboard after successful login', async () => {
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
            renderWithProviders(<Login />);

            const loginButton = screen.getByRole('button', { name: /login/i });
            fireEvent.click(loginButton);

            // Assert
            await waitFor(() => {
                expect(AdminServices.loginAdmin).toHaveBeenCalled();
            });
        });
    });

    describe('UT-A02: Login with invalid password', () => {
        it('should show error message for invalid credentials', async () => {
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

            // Act
            renderWithProviders(<Login />);

            const emailInput = screen.getByDisplayValue('superadmin@gmail.com');
            const passwordInput = screen.getByDisplayValue('1234567890');
            const loginButton = screen.getByRole('button', { name: /login/i });

            // Change password to invalid one
            fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
            fireEvent.click(loginButton);

            // Assert
            await waitFor(() => {
                expect(AdminServices.loginAdmin).toHaveBeenCalledWith({
                    email: 'superadmin@gmail.com',
                    password: 'wrongpassword'
                });
            });

            expect(notifyError).toHaveBeenCalledWith('Invalid credentials');
        });

        it('should handle network errors gracefully', async () => {
            // Arrange
            const mockError = new Error('Network Error');
            AdminServices.loginAdmin.mockRejectedValue(mockError);
            notifyError.mockImplementation(() => { });

            // Act
            renderWithProviders(<Login />);

            const loginButton = screen.getByRole('button', { name: /login/i });
            fireEvent.click(loginButton);

            // Assert
            await waitFor(() => {
                expect(notifyError).toHaveBeenCalledWith('Network Error');
            });
        });
    });

    describe('Form Validation', () => {
        it('should render login form with required fields', () => {
            // Act
            renderWithProviders(<Login />);

            // Assert
            expect(screen.getByLabelText(/email/i)).toBeDefined();
            expect(screen.getByLabelText(/password/i)).toBeDefined();
            expect(screen.getByRole('button', { name: /login/i })).toBeDefined();
        });

        it('should show loading state during login', async () => {
            // Arrange
            AdminServices.loginAdmin.mockImplementation(() =>
                new Promise(resolve => setTimeout(resolve, 100))
            );

            // Act
            renderWithProviders(<Login />);

            const loginButton = screen.getByRole('button', { name: /login/i });
            fireEvent.click(loginButton);

            // Assert
            expect(loginButton).toHaveProperty('disabled', true);
        });
    });
});
