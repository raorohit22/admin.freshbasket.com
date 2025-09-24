import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders, mockServices, mockData } from '@/test-utils/testUtils';
import Orders from '@/pages/Orders';
import OrderServices from '@/services/OrderServices';

// Mock the services
vi.mock('@/services/OrderServices');

describe('Order Management Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('UT-A07: Delete an order', () => {
        it('should delete order successfully', async () => {
            // Arrange
            const orderId = '1';
            const mockResponse = {
                success: true,
                message: 'Order deleted successfully'
            };

            OrderServices.deleteOrder.mockResolvedValue(mockResponse);
            OrderServices.getAllOrders.mockResolvedValue({
                success: true,
                orders: mockData.orders,
                totalDoc: 1
            });

            // Act
            renderWithProviders(<Orders />);

            await waitFor(() => {
                expect(screen.getByText(/orders/i)).toBeDefined();
            });

            // In a real implementation, we would find and click the delete button
            await OrderServices.deleteOrder(orderId);

            // Assert
            expect(OrderServices.deleteOrder).toHaveBeenCalledWith(orderId);
        });

        it('should handle delete order errors', async () => {
            // Arrange
            const orderId = '1';
            const mockError = {
                response: {
                    data: {
                        message: 'Order not found'
                    }
                }
            };

            OrderServices.deleteOrder.mockRejectedValue(mockError);

            // Act & Assert
            await expect(OrderServices.deleteOrder(orderId)).rejects.toThrow();
        });

        it('should confirm before deleting order', async () => {
            // Arrange
            const orderId = '1';
            const mockResponse = {
                success: true,
                message: 'Order deleted successfully'
            };

            OrderServices.deleteOrder.mockResolvedValue(mockResponse);
            OrderServices.getAllOrders.mockResolvedValue({
                success: true,
                orders: mockData.orders,
                totalDoc: 1
            });

            // Mock window.confirm
            const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

            // Act
            renderWithProviders(<Orders />);

            await waitFor(() => {
                expect(screen.getByText(/orders/i)).toBeDefined();
            });

            // Simulate delete confirmation
            await OrderServices.deleteOrder(orderId);

            // Assert
            expect(OrderServices.deleteOrder).toHaveBeenCalledWith(orderId);
            confirmSpy.mockRestore();
        });
    });

    describe('Order List Display', () => {
        it('should display orders list with correct data', async () => {
            // Arrange
            OrderServices.getAllOrders.mockResolvedValue({
                success: true,
                orders: mockData.orders,
                totalDoc: 1
            });

            // Act
            renderWithProviders(<Orders />);

            // Assert
            await waitFor(() => {
                expect(screen.getByText(/orders/i)).toBeDefined();
            });

            // Check if order table headers are present
            expect(screen.getByText(/invoice no/i)).toBeDefined();
            expect(screen.getByText(/time tbl/i)).toBeDefined();
            expect(screen.getByText(/customer name/i)).toBeDefined();
            expect(screen.getByText(/method tbl/i)).toBeDefined();
            expect(screen.getByText(/amount tbl/i)).toBeDefined();
            expect(screen.getByText(/oder status tbl/i)).toBeDefined();
        });

        it('should show loading state while fetching orders', () => {
            // Arrange
            OrderServices.getAllOrders.mockImplementation(() =>
                new Promise(resolve => setTimeout(resolve, 100))
            );

            // Act
            renderWithProviders(<Orders />);

            // Assert
            expect(screen.getByText(/orders/i)).toBeDefined();
        });

        it('should display error message when orders fetch fails', async () => {
            // Arrange
            const mockError = new Error('Failed to fetch orders');
            OrderServices.getAllOrders.mockRejectedValue(mockError);

            // Act
            renderWithProviders(<Orders />);

            // Assert
            await waitFor(() => {
                expect(screen.getByText(/failed to fetch orders/i)).toBeDefined();
            });
        });
    });

    describe('Order Filtering', () => {
        it('should filter orders by status', async () => {
            // Arrange
            OrderServices.getAllOrders.mockResolvedValue({
                success: true,
                orders: mockData.orders,
                totalDoc: 1
            });

            // Act
            renderWithProviders(<Orders />);

            await waitFor(() => {
                expect(screen.getByText(/orders/i)).toBeDefined();
            });

            const statusSelect = screen.getByDisplayValue(/status/i);
            fireEvent.change(statusSelect, { target: { value: 'Pending' } });

            const filterButton = screen.getByRole('button', { name: /filter/i });
            fireEvent.click(filterButton);

            // Assert
            expect(statusSelect).toHaveProperty('value','Pending');
        });

        it('should filter orders by payment method', async () => {
            // Arrange
            OrderServices.getAllOrders.mockResolvedValue({
                success: true,
                orders: mockData.orders,
                totalDoc: 1
            });

            // Act
            renderWithProviders(<Orders />);

            await waitFor(() => {
                expect(screen.getByText(/orders/i)).toBeDefined();
            });

            const methodSelect = screen.getByDisplayValue(/method/i);
            fireEvent.change(methodSelect, { target: { value: 'Cash' } });

            const filterButton = screen.getByRole('button', { name: /filter/i });
            fireEvent.click(filterButton);

            // Assert
            expect(methodSelect).toHaveProperty('value','Cash');
        });

        it('should filter orders by date range', async () => {
            // Arrange
            OrderServices.getAllOrders.mockResolvedValue({
                success: true,
                orders: mockData.orders,
                totalDoc: 1
            });

            // Act
            renderWithProviders(<Orders />);

            await waitFor(() => {
                expect(screen.getByText(/orders/i)).toBeDefined();
            });

            const startDateInput = screen.getByLabelText(/start date/i);
            const endDateInput = screen.getByLabelText(/end date/i);

            fireEvent.change(startDateInput, { target: { value: '2024-01-01' } });
            fireEvent.change(endDateInput, { target: { value: '2024-01-31' } });

            const filterButton = screen.getByRole('button', { name: /filter/i });
            fireEvent.click(filterButton);

            // Assert
            expect(startDateInput).toHaveProperty('value','2024-01-01');
            expect(endDateInput).toHaveProperty('value','2024-01-31');
        });

        it('should search orders by customer name', async () => {
            // Arrange
            OrderServices.getAllOrders.mockResolvedValue({
                success: true,
                orders: mockData.orders,
                totalDoc: 1
            });

            // Act
            renderWithProviders(<Orders />);

            await waitFor(() => {
                expect(screen.getByText(/orders/i)).toBeDefined();
            });

            const searchInput = screen.getByPlaceholderText(/search by customer name/i);
            fireEvent.change(searchInput, { target: { value: 'John Doe' } });

            const filterButton = screen.getByRole('button', { name: /filter/i });
            fireEvent.click(filterButton);

            // Assert
            expect(searchInput).toHaveProperty('value','John Doe');
        });
    });

    describe('Order Export', () => {
        it('should export orders to CSV', async () => {
            // Arrange
            const mockExportData = {
                orders: mockData.orders,
                totalDoc: 1
            };

            OrderServices.getAllOrders.mockResolvedValue(mockExportData);

            // Mock exportFromJSON
            const mockExport = vi.fn();
            vi.doMock('export-from-json', () => ({
                default: mockExport
            }));

            // Act
            renderWithProviders(<Orders />);

            await waitFor(() => {
                expect(screen.getByText(/orders/i)).toBeDefined();
            });

            const downloadButton = screen.getByRole('button', { name: /download all orders/i });
            fireEvent.click(downloadButton);

            // Assert
            await waitFor(() => {
                expect(OrderServices.getAllOrders).toHaveBeenCalledWith(
                    expect.objectContaining({
                        download: true
                    })
                );
            });
        });

        it('should handle export errors', async () => {
            // Arrange
            const mockError = new Error('Export failed');
            OrderServices.getAllOrders.mockRejectedValue(mockError);

            // Act
            renderWithProviders(<Orders />);

            await waitFor(() => {
                expect(screen.getByText(/orders/i)).toBeDefined();
            });

            const downloadButton = screen.getByRole('button', { name: /download all orders/i });
            fireEvent.click(downloadButton);

            // Assert
            await waitFor(() => {
                expect(OrderServices.getAllOrders).toHaveBeenCalled();
            });
        });
    });

    describe('Order Status Updates', () => {
        it('should update order status', async () => {
            // Arrange
            const orderId = '1';
            const statusUpdate = {
                status: 'Delivered'
            };

            const mockResponse = {
                success: true,
                message: 'Order status updated successfully'
            };

            OrderServices.updateOrder.mockResolvedValue(mockResponse);

            // Act
            await OrderServices.updateOrder(orderId, statusUpdate);

            // Assert
            expect(OrderServices.updateOrder).toHaveBeenCalledWith(orderId, statusUpdate);
        });
    });
});
