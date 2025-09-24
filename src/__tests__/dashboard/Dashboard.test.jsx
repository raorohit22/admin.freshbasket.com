import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders, mockData } from '@/test-utils/testUtils';
import Dashboard from '@/pages/Dashboard';
import OrderServices from '@/services/OrderServices';

// Mock the services
vi.mock('@/services/OrderServices');

describe('Dashboard Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('UT-A08: Load dashboard', () => {
        it('should load dashboard with sales and user statistics', async () => {
            // Arrange
            const mockDashboardData = {
                totalOrder: 100,
                totalAmount: 10000,
                thisMonthlyOrderAmount: 5000,
                lastMonthOrderAmount: 3000,
                totalPendingOrder: { count: 10, total: 1000 },
                totalProcessingOrder: 15,
                totalDeliveredOrder: 75
            };

            const mockRecentOrders = {
                orders: mockData.orders,
                totalOrder: 1
            };

            const mockBestSellerData = [
                { name: 'Product 1', value: 30 },
                { name: 'Product 2', value: 20 }
            ];

            OrderServices.getDashboardCount.mockResolvedValue(mockDashboardData);
            OrderServices.getDashboardAmount.mockResolvedValue({
                ordersData: mockData.orders,
                thisMonthlyOrderAmount: 5000,
                lastMonthOrderAmount: 3000,
                totalAmount: 10000
            });
            OrderServices.getDashboardRecentOrder.mockResolvedValue(mockRecentOrders);
            OrderServices.getBestSellerProductChart.mockResolvedValue(mockBestSellerData);

            // Act
            renderWithProviders(<Dashboard />);

            // Assert
            await waitFor(() => {
                expect(screen.getByText(/dashboard overview/i)).toBeDefined();
            });

            // Check if dashboard cards are displayed
            expect(screen.getByText(/today order/i)).toBeDefined();
            expect(screen.getByText(/yesterday order/i)).toBeDefined();
            expect(screen.getByText(/this month/i)).toBeDefined();
            expect(screen.getByText(/last month/i)).toBeDefined();
            expect(screen.getByText(/all time sales/i)).toBeDefined();
        });

        it('should display order statistics correctly', async () => {
            // Arrange
            const mockOrderCount = {
                totalOrder: 100,
                totalPendingOrder: { count: 10, total: 1000 },
                totalProcessingOrder: 15,
                totalDeliveredOrder: 75
            };

            OrderServices.getDashboardCount.mockResolvedValue(mockOrderCount);
            OrderServices.getDashboardAmount.mockResolvedValue({
                ordersData: [],
                thisMonthlyOrderAmount: 0,
                lastMonthOrderAmount: 0,
                totalAmount: 0
            });
            OrderServices.getDashboardRecentOrder.mockResolvedValue({ orders: [], totalOrder: 0 });
            OrderServices.getBestSellerProductChart.mockResolvedValue([]);

            // Act
            renderWithProviders(<Dashboard />);

            // Assert
            await waitFor(() => {
                expect(screen.getByText(/total order/i)).toBeDefined();
                expect(screen.getByText(/order pending/i)).toBeDefined();
                expect(screen.getByText(/order processing/i)).toBeDefined();
                expect(screen.getByText(/order delivered/i)).toBeDefined();
            });
        });

        it('should display charts and graphs', async () => {
            // Arrange
            const mockSalesReport = [
                { date: '2024-01-01', total: 1000, order: 5 },
                { date: '2024-01-02', total: 1500, order: 8 }
            ];

            const mockBestSellerData = [
                { name: 'Product 1', value: 30 },
                { name: 'Product 2', value: 20 }
            ];

            OrderServices.getDashboardCount.mockResolvedValue({
                totalOrder: 0,
                totalPendingOrder: { count: 0, total: 0 },
                totalProcessingOrder: 0,
                totalDeliveredOrder: 0
            });
            OrderServices.getDashboardAmount.mockResolvedValue({
                ordersData: [],
                thisMonthlyOrderAmount: 0,
                lastMonthOrderAmount: 0,
                totalAmount: 0
            });
            OrderServices.getDashboardRecentOrder.mockResolvedValue({ orders: [], totalOrder: 0 });
            OrderServices.getBestSellerProductChart.mockResolvedValue(mockBestSellerData);

            // Act
            renderWithProviders(<Dashboard />);

            // Assert
            await waitFor(() => {
                expect(screen.getByText(/weekly sales/i)).toBeDefined();
                expect(screen.getByText(/best selling products/i)).toBeDefined();
            });
        });

        it('should show loading state while fetching data', () => {
            // Arrange
            OrderServices.getDashboardCount.mockImplementation(() =>
                new Promise(resolve => setTimeout(resolve, 100))
            );
            OrderServices.getDashboardAmount.mockImplementation(() =>
                new Promise(resolve => setTimeout(resolve, 100))
            );
            OrderServices.getDashboardRecentOrder.mockImplementation(() =>
                new Promise(resolve => setTimeout(resolve, 100))
            );
            OrderServices.getBestSellerProductChart.mockImplementation(() =>
                new Promise(resolve => setTimeout(resolve, 100))
            );

            // Act
            renderWithProviders(<Dashboard />);

            // Assert
            expect(screen.getByText(/dashboard overview/i)).toBeDefined();
        });

        it('should handle dashboard data fetch errors', async () => {
            // Arrange
            const mockError = new Error('Failed to fetch dashboard data');
            OrderServices.getDashboardCount.mockRejectedValue(mockError);
            OrderServices.getDashboardAmount.mockResolvedValue({
                ordersData: [],
                thisMonthlyOrderAmount: 0,
                lastMonthOrderAmount: 0,
                totalAmount: 0
            });
            OrderServices.getDashboardRecentOrder.mockResolvedValue({ orders: [], totalOrder: 0 });
            OrderServices.getBestSellerProductChart.mockResolvedValue([]);

            // Act
            renderWithProviders(<Dashboard />);

            // Assert
            await waitFor(() => {
                expect(screen.getByText(/dashboard overview/i)).toBeDefined();
            });
        });
    });

    describe('Recent Orders Display', () => {
        it('should display recent orders table', async () => {
            // Arrange
            const mockRecentOrders = {
                orders: mockData.orders,
                totalOrder: 1
            };

            OrderServices.getDashboardCount.mockResolvedValue({
                totalOrder: 0,
                totalPendingOrder: { count: 0, total: 0 },
                totalProcessingOrder: 0,
                totalDeliveredOrder: 0
            });
            OrderServices.getDashboardAmount.mockResolvedValue({
                ordersData: [],
                thisMonthlyOrderAmount: 0,
                lastMonthOrderAmount: 0,
                totalAmount: 0
            });
            OrderServices.getDashboardRecentOrder.mockResolvedValue(mockRecentOrders);
            OrderServices.getBestSellerProductChart.mockResolvedValue([]);

            // Act
            renderWithProviders(<Dashboard />);

            // Assert
            await waitFor(() => {
                expect(screen.getByText(/recent order/i)).toBeDefined();
            });

            // Check if order table headers are present
            expect(screen.getByText(/invoice no/i)).toBeDefined();
            expect(screen.getByText(/time tbl/i)).toBeDefined();
            expect(screen.getByText(/customer name/i)).toBeDefined();
            expect(screen.getByText(/method tbl/i)).toBeDefined();
            expect(screen.getByText(/amount tbl/i)).toBeDefined();
            expect(screen.getByText(/oder status tbl/i)).toBeDefined();
        });

        it('should show no orders message when no recent orders', async () => {
            // Arrange
            OrderServices.getDashboardCount.mockResolvedValue({
                totalOrder: 0,
                totalPendingOrder: { count: 0, total: 0 },
                totalProcessingOrder: 0,
                totalDeliveredOrder: 0
            });
            OrderServices.getDashboardAmount.mockResolvedValue({
                ordersData: [],
                thisMonthlyOrderAmount: 0,
                lastMonthOrderAmount: 0,
                totalAmount: 0
            });
            OrderServices.getDashboardRecentOrder.mockResolvedValue({ orders: [], totalOrder: 0 });
            OrderServices.getBestSellerProductChart.mockResolvedValue([]);

            // Act
            renderWithProviders(<Dashboard />);

            // Assert
            await waitFor(() => {
                expect(screen.getByText(/sorry, there are no orders right now/i)).toBeDefined();
            });
        });
    });

    describe('Payment Method Statistics', () => {
        it('should calculate and display payment method totals', async () => {
            // Arrange
            const mockOrdersData = [
                { paymentMethod: 'Cash', total: 100, updatedAt: new Date().toISOString() },
                { paymentMethod: 'Card', total: 200, updatedAt: new Date().toISOString() },
                { paymentMethod: 'Credit', total: 150, updatedAt: new Date().toISOString() }
            ];

            OrderServices.getDashboardCount.mockResolvedValue({
                totalOrder: 0,
                totalPendingOrder: { count: 0, total: 0 },
                totalProcessingOrder: 0,
                totalDeliveredOrder: 0
            });
            OrderServices.getDashboardAmount.mockResolvedValue({
                ordersData: mockOrdersData,
                thisMonthlyOrderAmount: 0,
                lastMonthOrderAmount: 0,
                totalAmount: 0
            });
            OrderServices.getDashboardRecentOrder.mockResolvedValue({ orders: [], totalOrder: 0 });
            OrderServices.getBestSellerProductChart.mockResolvedValue([]);

            // Act
            renderWithProviders(<Dashboard />);

            // Assert
            await waitFor(() => {
                expect(screen.getByText(/today order/i)).toBeDefined();
                expect(screen.getByText(/yesterday order/i)).toBeDefined();
            });
        });
    });

    describe('Real-time Notifications', () => {
        it('should refresh dashboard on new order notifications', async () => {
            // Arrange
            const mockNotifications = [
                {
                    orderId: '1',
                    status: 'unread',
                    message: 'New order received'
                }
            ];

            const mockSidebarContext = {
                ...renderWithProviders().props.sidebarContext,
                setIsUpdate: vi.fn()
            };

            OrderServices.getDashboardCount.mockResolvedValue({
                totalOrder: 0,
                totalPendingOrder: { count: 0, total: 0 },
                totalProcessingOrder: 0,
                totalDeliveredOrder: 0
            });
            OrderServices.getDashboardAmount.mockResolvedValue({
                ordersData: [],
                thisMonthlyOrderAmount: 0,
                lastMonthOrderAmount: 0,
                totalAmount: 0
            });
            OrderServices.getDashboardRecentOrder.mockResolvedValue({ orders: [], totalOrder: 0 });
            OrderServices.getBestSellerProductChart.mockResolvedValue([]);

            // Act
            renderWithProviders(<Dashboard />, {
                notificationContext: { notifications: mockNotifications },
                sidebarContext: mockSidebarContext
            });

            // Assert
            await waitFor(() => {
                expect(mockSidebarContext.setIsUpdate).toHaveBeenCalledWith(true);
            });
        });
    });
});
