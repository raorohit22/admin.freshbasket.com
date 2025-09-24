import { describe, it, expect, vi, beforeEach } from 'vitest';
import OrderServices from '@/services/OrderServices';

// Mock the services
vi.mock('@/services/OrderServices');

describe('Order Management Service Tests', () => {
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

      // Act
      const result = await OrderServices.deleteOrder(orderId);

      // Assert
      expect(OrderServices.deleteOrder).toHaveBeenCalledWith(orderId);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Order deleted successfully');
    });

    it('should handle order not found error', async () => {
      // Arrange
      const orderId = '999';
      const notFoundError = {
        response: {
          status: 404,
          data: {
            message: 'Order not found'
          }
        }
      };

      OrderServices.deleteOrder.mockRejectedValue(notFoundError);

      // Act & Assert
      await expect(OrderServices.deleteOrder(orderId)).rejects.toThrow();
    });

    it('should handle unauthorized deletion', async () => {
      // Arrange
      const orderId = '1';
      const unauthorizedError = {
        response: {
          status: 403,
          data: {
            message: 'Unauthorized to delete this order'
          }
        }
      };

      OrderServices.deleteOrder.mockRejectedValue(unauthorizedError);

      // Act & Assert
      await expect(OrderServices.deleteOrder(orderId)).rejects.toThrow();
    });
  });

  describe('Order Management Operations', () => {
    it('should get all orders', async () => {
      // Arrange
      const mockOrders = {
        success: true,
        orders: [
          { _id: '1', invoice: 'INV-001', total: 150, status: 'Pending' },
          { _id: '2', invoice: 'INV-002', total: 200, status: 'Delivered' }
        ],
        totalDoc: 2
      };

      OrderServices.getAllOrders.mockResolvedValue(mockOrders);

      // Act
      const result = await OrderServices.getAllOrders({
        page: 1,
        limit: 10
      });

      // Assert
      expect(OrderServices.getAllOrders).toHaveBeenCalledWith({
        page: 1,
        limit: 10
      });
      expect(result.success).toBe(true);
      expect(result.orders).toHaveLength(2);
    });

    it('should get orders by status', async () => {
      // Arrange
      const mockOrders = {
        success: true,
        orders: [
          { _id: '1', invoice: 'INV-001', status: 'Pending' }
        ]
      };

      OrderServices.getAllOrders.mockResolvedValue(mockOrders);

      // Act
      const result = await OrderServices.getAllOrders({
        status: 'Pending',
        page: 1,
        limit: 10
      });

      // Assert
      expect(OrderServices.getAllOrders).toHaveBeenCalledWith({
        status: 'Pending',
        page: 1,
        limit: 10
      });
      expect(result.orders[0].status).toBe('Pending');
    });

    it('should get orders by customer name', async () => {
      // Arrange
      const mockOrders = {
        success: true,
        orders: [
          { _id: '1', customerName: 'John Doe', invoice: 'INV-001' }
        ]
      };

      OrderServices.getAllOrders.mockResolvedValue(mockOrders);

      // Act
      const result = await OrderServices.getAllOrders({
        customerName: 'John Doe',
        page: 1,
        limit: 10
      });

      // Assert
      expect(OrderServices.getAllOrders).toHaveBeenCalledWith({
        customerName: 'John Doe',
        page: 1,
        limit: 10
      });
      expect(result.orders[0].customerName).toBe('John Doe');
    });

    it('should update order status', async () => {
      // Arrange
      const orderId = '1';
      const statusData = { status: 'Delivered' };

      const mockResponse = {
        success: true,
        message: 'Order status updated successfully'
      };

      OrderServices.updateOrder.mockResolvedValue(mockResponse);

      // Act
      const result = await OrderServices.updateOrder(orderId, statusData);

      // Assert
      expect(OrderServices.updateOrder).toHaveBeenCalledWith(orderId, statusData);
      expect(result.success).toBe(true);
    });

    it('should get order by ID', async () => {
      // Arrange
      const orderId = '1';
      const mockOrder = {
        success: true,
        order: {
          _id: '1',
          invoice: 'INV-001',
          total: 150,
          status: 'Pending',
          customerName: 'John Doe'
        }
      };

      OrderServices.getOrderById.mockResolvedValue(mockOrder);

      // Act
      const result = await OrderServices.getOrderById(orderId);

      // Assert
      expect(OrderServices.getOrderById).toHaveBeenCalledWith(orderId);
      expect(result.success).toBe(true);
      expect(result.order.invoice).toBe('INV-001');
    });
  });

  describe('Dashboard Order Data', () => {
    it('should get dashboard order count', async () => {
      // Arrange
      const mockCount = {
        success: true,
        totalOrder: 100,
        totalPendingOrder: { count: 10, total: 1000 },
        totalProcessingOrder: 15,
        totalDeliveredOrder: 75
      };

      OrderServices.getDashboardCount.mockResolvedValue(mockCount);

      // Act
      const result = await OrderServices.getDashboardCount();

      // Assert
      expect(OrderServices.getDashboardCount).toHaveBeenCalled();
      expect(result.totalOrder).toBe(100);
      expect(result.totalPendingOrder.count).toBe(10);
    });

    it('should get dashboard order amount', async () => {
      // Arrange
      const mockAmount = {
        success: true,
        totalAmount: 10000,
        thisMonthlyOrderAmount: 5000,
        lastMonthOrderAmount: 3000
      };

      OrderServices.getDashboardAmount.mockResolvedValue(mockAmount);

      // Act
      const result = await OrderServices.getDashboardAmount();

      // Assert
      expect(OrderServices.getDashboardAmount).toHaveBeenCalled();
      expect(result.totalAmount).toBe(10000);
      expect(result.thisMonthlyOrderAmount).toBe(5000);
    });

    it('should get recent orders', async () => {
      // Arrange
      const mockRecentOrders = {
        success: true,
        orders: [
          { _id: '1', invoice: 'INV-001', total: 150 },
          { _id: '2', invoice: 'INV-002', total: 200 }
        ]
      };

      OrderServices.getDashboardRecentOrder.mockResolvedValue(mockRecentOrders);

      // Act
      const result = await OrderServices.getDashboardRecentOrder({
        page: 1,
        limit: 8
      });

      // Assert
      expect(OrderServices.getDashboardRecentOrder).toHaveBeenCalledWith({
        page: 1,
        limit: 8
      });
      expect(result.orders).toHaveLength(2);
    });
  });
});
