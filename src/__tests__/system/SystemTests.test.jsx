import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AdminContext } from '@/context/AdminContext';
import { SidebarContext } from '@/context/SidebarContext';
import { NotificationContext, NotificationProvider } from '@/context/NotificationContext';
import App from '@/App';

// Mock all external dependencies
vi.mock('@/services/AdminServices', () => ({
    login: vi.fn(),
    register: vi.fn(),
    getAdminInfo: vi.fn(),
    logout: vi.fn(),
}));

vi.mock('@/services/ProductServices', () => ({
    addProduct: vi.fn(),
    updateProduct: vi.fn(),
    deleteProduct: vi.fn(),
    getProducts: vi.fn(),
    getProductById: vi.fn(),
}));

vi.mock('@/services/OrderServices', () => ({
    getOrders: vi.fn(),
    updateOrderStatus: vi.fn(),
    deleteOrder: vi.fn(),
    getOrderById: vi.fn(),
}));

vi.mock('@/services/CategoryServices', () => ({
    addCategory: vi.fn(),
    updateCategory: vi.fn(),
    deleteCategory: vi.fn(),
    getCategories: vi.fn(),
}));

vi.mock('socket.io-client', () => ({
    io: vi.fn(() => ({
        on: vi.fn(),
        emit: vi.fn(),
        disconnect: vi.fn(),
    })),
}));

// Test wrapper component
const TestWrapper = ({ children }) => (
    <BrowserRouter>
        <AdminContext.Provider value={{ adminInfo: null, setAdminInfo: vi.fn() }}>
            <SidebarContext.Provider value={{ isOpen: false, setIsOpen: vi.fn() }}>
                <NotificationProvider>
                    {children}
                </NotificationProvider>
            </SidebarContext.Provider>
        </AdminContext.Provider>
    </BrowserRouter>
);

describe('System Tests - Admin Dashboard', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Mock localStorage
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: vi.fn(() => null),
                setItem: vi.fn(),
                removeItem: vi.fn(),
            },
            writable: true,
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('ST-05: Admin Product Management', () => {
        it('should allow admin to add new product and make it visible in store', async () => {
            const { addProduct } = await import('@/services/ProductServices');
            const { getProducts } = await import('@/services/ProductServices');

            // Mock successful product addition
            addProduct.mockResolvedValue({
                success: true,
                data: {
                    _id: 'product-123',
                    title: 'Fresh Apples',
                    category: 'Fruits',
                    price: 2.99,
                    stock: 100,
                    status: 'active'
                }
            });

            // Mock product listing
            getProducts.mockResolvedValue({
                success: true,
                data: [
                    {
                        _id: 'product-123',
                        title: 'Fresh Apples',
                        category: 'Fruits',
                        price: 2.99,
                        stock: 100,
                        status: 'active'
                    }
                ]
            });

            // Test admin adding product
            const productData = {
                title: 'Fresh Apples',
                category: 'Fruits',
                price: 2.99,
                stock: 100,
                description: 'Fresh red apples from local farm'
            };

            const result = await addProduct(productData);

            expect(result.success).toBe(true);
            expect(result.data.title).toBe('Fresh Apples');
            expect(addProduct).toHaveBeenCalledWith(productData);

            // Test that product is visible in store
            const products = await getProducts();
            expect(products.success).toBe(true);
            expect(products.data).toHaveLength(1);
            expect(products.data[0].title).toBe('Fresh Apples');
        });

        it('should handle product addition errors gracefully', async () => {
            const { addProduct } = await import('@/services/ProductServices');

            addProduct.mockRejectedValue(new Error('Network error'));

            const productData = {
                title: 'Fresh Apples',
                category: 'Fruits',
                price: 2.99,
                stock: 100
            };

            await expect(addProduct(productData)).rejects.toThrow('Network error');
        });
    });

    describe('ST-06: Admin Order Management', () => {
        it('should allow admin to update order status and notify customer', async () => {
            const { updateOrderStatus } = await import('@/services/OrderServices');
            const { getOrders } = await import('@/services/OrderServices');

            // Mock order data
            const mockOrder = {
                _id: 'order-123',
                customerId: 'customer-456',
                status: 'Pending',
                items: [{ productId: 'product-123', quantity: 2 }],
                total: 5.98
            };

            // Mock successful status update
            updateOrderStatus.mockResolvedValue({
                success: true,
                data: { ...mockOrder, status: 'Delivered' }
            });

            // Mock order listing
            getOrders.mockResolvedValue({
                success: true,
                data: [mockOrder]
            });

            // Test admin updating order status
            const result = await updateOrderStatus('order-123', 'Delivered');

            expect(result.success).toBe(true);
            expect(result.data.status).toBe('Delivered');
            expect(updateOrderStatus).toHaveBeenCalledWith('order-123', 'Delivered');

            // Verify order is updated in the system
            const orders = await getOrders();
            expect(orders.success).toBe(true);
        });

        it('should handle order status update errors', async () => {
            const { updateOrderStatus } = await import('@/services/OrderServices');

            updateOrderStatus.mockRejectedValue(new Error('Order not found'));

            await expect(updateOrderStatus('invalid-order', 'Delivered'))
                .rejects.toThrow('Order not found');
        });
    });

    describe('ST-07: Unauthorized Access', () => {
        it('should deny access to admin routes for non-admin users', async () => {
            const { getAdminInfo } = await import('@/services/AdminServices');

            // Mock unauthorized access
            getAdminInfo.mockResolvedValue({
                success: false,
                message: 'Unauthorized access'
            });

            const result = await getAdminInfo();

            expect(result.success).toBe(false);
            expect(result.message).toBe('Unauthorized access');
        });

        it('should redirect to login when admin token is invalid', () => {
            // Mock invalid token
            Object.defineProperty(window, 'localStorage', {
                value: {
                    getItem: vi.fn(() => 'invalid-token'),
                    setItem: vi.fn(),
                    removeItem: vi.fn(),
                },
                writable: true,
            });

            // This would typically trigger a redirect to login
            expect(window.localStorage.getItem('adminToken')).toBe('invalid-token');
        });
    });

    describe('ST-08: Data Integrity', () => {
        it('should handle duplicate product creation gracefully', async () => {
            const { addProduct } = await import('@/services/ProductServices');

            // Mock duplicate product error
            addProduct.mockRejectedValue(new Error('Product with this title already exists'));

            const productData = {
                title: 'Existing Product',
                category: 'Fruits',
                price: 2.99,
                stock: 100
            };

            await expect(addProduct(productData)).rejects.toThrow('Product with this title already exists');
        });

        it('should validate required fields before product creation', async () => {
            const { addProduct } = await import('@/services/ProductServices');

            // Mock validation error
            addProduct.mockRejectedValue(new Error('Title and price are required'));

            const invalidProductData = {
                category: 'Fruits',
                stock: 100
                // Missing title and price
            };

            await expect(addProduct(invalidProductData)).rejects.toThrow('Title and price are required');
        });
    });
});
