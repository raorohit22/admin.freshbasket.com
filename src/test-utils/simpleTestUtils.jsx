import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock data for testing
export const mockAdminInfo = {
    _id: '1',
    name: 'Test Admin',
    email: 'admin@test.com',
    role: 'Super Admin'
};

export const mockAdminState = {
    adminInfo: mockAdminInfo,
    isAdmin: true
};

// Simple render function without complex context providers
export const renderWithRouter = (ui, options = {}) => {
    const Wrapper = ({ children }) => (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    );

    return render(ui, { wrapper: Wrapper, ...options });
};

// Mock service functions
export const mockServices = {
    AdminServices: {
        loginAdmin: vi.fn(),
        registerAdmin: vi.fn(),
        addStaff: vi.fn(),
        getAllStaff: vi.fn(),
        updateStaff: vi.fn(),
        deleteStaff: vi.fn()
    },
    ProductServices: {
        getAllProducts: vi.fn(),
        addProduct: vi.fn(),
        updateProduct: vi.fn(),
        deleteProduct: vi.fn()
    },
    CategoryServices: {
        getAllCategory: vi.fn(),
        addCategory: vi.fn(),
        updateCategory: vi.fn(),
        deleteCategory: vi.fn()
    },
    OrderServices: {
        getAllOrders: vi.fn(),
        deleteOrder: vi.fn(),
        getDashboardCount: vi.fn(),
        getDashboardAmount: vi.fn(),
        getDashboardRecentOrder: vi.fn(),
        getBestSellerProductChart: vi.fn()
    }
};

// Mock data for different test scenarios
export const mockData = {
    products: [
        {
            _id: '1',
            title: 'Test Product',
            category: 'Electronics',
            price: 100,
            stock: 50,
            status: 'published'
        }
    ],
    categories: [
        {
            _id: '1',
            name: 'Electronics',
            description: 'Electronic items',
            status: 'published'
        }
    ],
    orders: [
        {
            _id: '1',
            invoice: 'INV-001',
            total: 150,
            status: 'Pending',
            customerName: 'John Doe'
        }
    ],
    staff: [
        {
            _id: '1',
            name: 'John Staff',
            email: 'staff@test.com',
            role: 'Admin',
            contact: '1234567890'
        }
    ],
    dashboardData: {
        totalOrder: 100,
        totalAmount: 10000,
        thisMonthlyOrderAmount: 5000,
        lastMonthOrderAmount: 3000
    }
};
