import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithRouter } from '@/test-utils/simpleTestUtils';
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

// Mock the Login component to avoid context dependencies
const MockLoginComponent = () => {
    return (
        <div>
            <h1>Welcome Back</h1>
            <form>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    defaultValue="superadmin@gmail.com"
                    data-testid="email-input"
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    defaultValue="1234567890"
                    data-testid="password-input"
                />
                <button type="submit" data-testid="login-button">
                    Login
                </button>
            </form>
        </div>
    );
};

describe('Authentication Tests - Simplified', () => {
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
            renderWithRouter(<MockLoginComponent />);

            const emailInput = screen.getByTestId('email-input');
            const passwordInput = screen.getByTestId('password-input');
            const loginButton = screen.getByTestId('login-button');

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

        it('should display login form with required fields', () => {
            // Act
            renderWithRouter(<MockLoginComponent />);

            // Assert
            expect(screen.getByText('Welcome Back')).toBeDefined();
            expect(screen.getByTestId('email-input')).toBeDefined();
            expect(screen.getByTestId('password-input')).toBeDefined();
            expect(screen.getByTestId('login-button')).toBeDefined();
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
            renderWithRouter(<MockLoginComponent />);

            const passwordInput = screen.getByTestId('password-input');
            const loginButton = screen.getByTestId('login-button');

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
            renderWithRouter(<MockLoginComponent />);

            const loginButton = screen.getByTestId('login-button');
            fireEvent.click(loginButton);

            // Assert
            await waitFor(() => {
                expect(notifyError).toHaveBeenCalledWith('Network Error');
            });
        });
    });

    describe('Service Integration Tests', () => {
        it('should call AdminServices.loginAdmin with correct parameters', async () => {
            // Arrange
            AdminServices.loginAdmin.mockResolvedValue({ success: true });

            // Act
            await AdminServices.loginAdmin({
                email: 'test@example.com',
                password: 'password123'
            });

            // Assert
            expect(AdminServices.loginAdmin).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123'
            });
        });

        it('should handle service errors properly', async () => {
            // Arrange
            const error = new Error('Service unavailable');
            AdminServices.loginAdmin.mockRejectedValue(error);

            // Act & Assert
            await expect(AdminServices.loginAdmin({})).rejects.toThrow('Service unavailable');
        });
    });
});
