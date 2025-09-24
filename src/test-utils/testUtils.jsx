import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { AdminContext } from '@/context/AdminContext';
import { SidebarContext } from '@/context/SidebarContext';
import { NotificationContext, NotificationProvider } from '@/context/NotificationContext';

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

export const mockSidebarContext = {
    toggleDrawer: vi.fn(),
    lang: 'en',
    currentPage: 1,
    handleChangePage: vi.fn(),
    searchText: '',
    category: '',
    setCategory: vi.fn(),
    searchRef: { current: { value: '' } },
    handleSubmitForAll: vi.fn(),
    sortedField: '',
    setSortedField: vi.fn(),
    limitData: 10,
    time: '',
    setTime: vi.fn(),
    status: '',
    setStatus: vi.fn(),
    endDate: '',
    setEndDate: vi.fn(),
    startDate: '',
    setStartDate: vi.fn(),
    method: '',
    setMethod: vi.fn(),
    setSearchText: vi.fn(),
    resultsPerPage: 10,
    setIsUpdate: vi.fn()
};

export const mockNotificationContext = {
    notifications: []
};

// Custom render function that includes all necessary providers
export const renderWithProviders = (
    ui,
    {
        adminState = mockAdminState,
        sidebarContext = mockSidebarContext,
        notificationContext = mockNotificationContext,
        ...renderOptions
    } = {}
) => {
    const Wrapper = ({ children }) => (
        <BrowserRouter>
            <AdminContext.Provider value={{ state: adminState, dispatch: vi.fn() }}>
                <SidebarContext.Provider value={sidebarContext}>
                    <NotificationContext.Provider value={notificationContext}>
                        {children}
                    </NotificationContext.Provider>
                </SidebarContext.Provider>
            </AdminContext.Provider>
        </BrowserRouter>
    );

    return render(ui, { wrapper: Wrapper, ...renderOptions });
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
