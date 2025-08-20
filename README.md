# 🛍️ Freshbasket Admin Dashboard

**A comprehensive, modern e-commerce admin dashboard built with React.js, Tailwind CSS, and Vite**

## Live Demo

- [Admin Panel](https://admin-freshbasket.netlify.app/)
- [Frontend Store](https://freshbaskett.netlify.app/)


## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Technology Stack](#️-technology-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Configuration](#️-configuration)
- [📄 File Management](#-file-management)
- [🎯 Customization](#-customization)
- [📝 License](#-license)
- [👨‍💻 Authors](#-authors)
- [🙏 Acknowledgments](#-acknowledgments)

---

## 🎯 Overview

**Freshbasket Admin Dashboard** is a feature-rich, modern e-commerce administration panel designed to provide comprehensive management capabilities for online stores. Built with cutting-edge technologies, it offers an intuitive interface for managing products, orders, customers, and store operations.

### 🎯 **Project Goals**

- Provide a complete e-commerce management solution
- Offer intuitive and responsive user interface
- Support multi-language and multi-currency operations
- Ensure high performance and scalability
- Maintain security and data integrity

### 🎯 **Target Users**

- E-commerce store administrators
- Online business owners
- Store managers and staff
- Developers and system integrators

---

## ✨ Key Features

### 📊 **Dashboard & Analytics**

- **Real-time Analytics**: Live sales metrics, revenue tracking, and performance indicators
- **Interactive Charts**: Revenue charts, order trends, customer behavior visualization
- **Performance Metrics**:
  - Sales velocity and conversion rates
  - Customer acquisition costs
  - Inventory turnover rates
  - Profit margin analysis
- **Customizable Widgets**: Drag-and-drop dashboard customization
- **Export Capabilities**: PDF and Excel report generation

### 🛍️ **Catalog Management**

#### **Product Management**

- **Product CRUD Operations**: Complete product lifecycle management
- **Advanced Product Features**:
  - Multiple product images with Cloudinary integration
  - SKU and barcode generation/management
  - Inventory tracking with low stock alerts
  - Product combinations and variants
  - Rich text editor (Draft.js) for descriptions
  - SEO optimization fields
  - Product status management (active/inactive)
- **Bulk Operations**: Mass import/export, bulk status updates
- **Product Search & Filtering**: Advanced search with multiple criteria
- **Product Categories**: Hierarchical category management

#### **Category Management**

- **Hierarchical Structure**: Parent-child category relationships
- **Category Features**:
  - Category-specific attributes
  - Category image management
  - SEO-friendly URLs
  - Category status control
- **Category Analytics**: Performance tracking per category

#### **Attribute Management**

- **Custom Attributes**: Create product-specific attributes
- **Attribute Types**: Text, number, select, multi-select, boolean
- **Attribute Options**: Predefined values for select attributes
- **Child Attributes**: Nested attribute management
- **Attribute Groups**: Organize attributes into logical groups

#### **Coupon System**

- **Coupon Types**: Percentage, fixed amount, free shipping
- **Coupon Features**:
  - Usage limits and restrictions
  - Date range validation
  - Customer group targeting
  - Minimum order requirements
  - Coupon code generation
- **Coupon Analytics**: Usage tracking and performance metrics

### 👥 **Customer Management**

- **Customer Database**: Comprehensive customer information storage
- **Customer Features**:
  - Customer profiles with detailed information
  - Order history and tracking
  - Customer segmentation
  - Communication preferences
  - Customer notes and tags
- **Customer Analytics**:
  - Purchase patterns analysis
  - Customer lifetime value calculation
  - Customer retention metrics
  - Behavioral analytics

### 📦 **Order Management**

- **Order Processing**: Complete order lifecycle management
- **Order Features**:
  - Order status tracking (pending, processing, shipped, delivered)
  - Payment status management
  - Shipping information tracking
  - Order notes and comments
  - Order history and audit trail
- **Invoice Generation**:
  - PDF invoice creation
  - Customizable invoice templates
  - Print and email capabilities
- **Order Analytics**: Sales performance and order statistics

### 👨‍💼 **Staff Management**

- **User Management**: Admin and staff account creation
- **Role-based Access Control**:
  - Granular permission system
  - Role assignment and management
  - Access level control
  - Activity logging
- **Staff Features**:
  - Staff performance tracking
  - Activity monitoring
  - Password policies
  - Session management

### ⚙️ **Settings & Configuration**

#### **General Settings**

- Store information and contact details
- Business hours and policies
- Tax configuration
- Shipping settings

#### **Store Settings**

- E-commerce specific configurations
- Payment gateway settings
- Shipping method configuration
- Email template customization

#### **SEO Settings**

- Meta tag management
- Sitemap generation
- Robots.txt configuration
- Schema markup settings

#### **Admin Settings**

- System-level configurations
- Backup and restore options
- Log management
- Performance settings

### 🌐 **Internationalization**

- **Multi-language Support**: i18n integration with multiple languages
- **Supported Languages**:
  - English (en)
  - Bengali (bn)
  - German (de)
  - Hindi (hi)
- **Language Features**:
  - Dynamic language switching
  - RTL language support
  - Translation management
  - Localized content
- **Currency Management**: Multi-currency support for global stores
- **Translation Services**: Automated text translation capabilities

### 🏪 **Store Customization**

- **Store Frontend**: Live store preview and management
- **Homepage Customization**:
  - Landing page builder
  - Banner management
  - Featured products
  - Custom sections
- **Store Settings**: Theme and appearance configuration
- **Content Management**:
  - About us page
  - Contact information
  - FAQ management
  - Privacy policy and terms

### 🔔 **Notification System**

- **Real-time Notifications**: Live notification system
- **Notification Types**:
  - Order alerts
  - Inventory alerts
  - Customer notifications
  - System alerts
- **Notification Channels**: In-app, email, SMS (configurable)
- **Notification Preferences**: User-customizable notification settings

---

## 🏗️ Architecture

### **Frontend Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
├─────────────────────────────────────────────────────────────┤
│  Components │  Pages │  Layout │  UI Elements │  Charts    │
├─────────────────────────────────────────────────────────────┤
│                    State Management                         │
├─────────────────────────────────────────────────────────────┤
│  Redux Store │  React Context │  Local State │  Cache      │
├─────────────────────────────────────────────────────────────┤
│                    Service Layer                            │
├─────────────────────────────────────────────────────────────┤
│  API Services │  HTTP Client │  Authentication │  Utils    │
├─────────────────────────────────────────────────────────────┤
│                    External APIs                            │
├─────────────────────────────────────────────────────────────┤
│  Backend API │  Cloudinary │  Translation API │  Analytics │
└─────────────────────────────────────────────────────────────┘
```

### **Component Architecture**

- **Atomic Design**: Components organized by complexity
- **Container/Presentational Pattern**: Separation of logic and presentation
- **Custom Hooks**: Reusable business logic
- **Context API**: Global state management
- **Redux Toolkit**: Complex state management

---

## 🛠️ Technology Stack

### **Frontend Framework**

- **React 18.2.0**: Latest React with concurrent features
- **React Router 5.3.4**: Client-side routing
- **React Hooks**: Functional component state management

### **Build Tools & Development**

- **Vite 5.0.12**: Fast build tool and dev server
- **Rollup**: Module bundling
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing
- **ESLint**: Code linting and formatting

### **Styling & UI**

- **Tailwind CSS 3.4.3**: Utility-first CSS framework
- **Headless UI**: Accessible UI components
- **React Icons**: Comprehensive icon library
- **React Transition Group**: Smooth animations

### **State Management**

- **Redux Toolkit 1.9.7**: Modern Redux with RTK
- **React Redux 8.1.0**: React bindings for Redux
- **Redux Persist 6.0.0**: State persistence
- **Redux Thunk 2.4.2**: Async action handling

### **Data Fetching & Caching**

- **React Query 5.65.1**: Server state management
- **Axios 1.4.0**: HTTP client
- **Socket.io Client 4.7.2**: Real-time communication

### **Forms & Validation**

- **React Hook Form 7.44.3**: Form handling
- **Ajv 8.12.0**: JSON schema validation
- **React Tag Input**: Tag management

### **File Management**

- **Cloudinary**: Cloud image and video management
- **React Dropzone 14.2.3**: File upload
- **Browser Image Compression 2.0.2**: Image optimization
- **Pica 9.0.1**: High-quality image resizing

### **Data Visualization**

- **Chart.js 4.4.0**: Interactive charts
- **React Chart.js 2 5.2.0**: React wrapper

### **Document Generation**

- **React PDF Renderer 3.1.6**: PDF generation
- **React to Print 2.14.13**: Print functionality

### **Internationalization**

- **i18next 22.5.1**: Internationalization framework
- **React i18next 12.3.1**: React bindings
- **i18next Browser Language Detector 7.0.2**: Language detection

### **UI Components & Utilities**

- **React Responsive Modal 6.4.1**: Modal dialogs
- **React Toastify 9.1.3**: Toast notifications
- **React Tooltip 5.28.0**: Tooltips
- **React Loading Skeleton 3.3.1**: Loading states
- **React Spinners 0.13.8**: Loading spinners

### **Development & Testing**

- **Vitest**: Unit testing framework
- **jsdom**: DOM testing environment
- **Cross-env**: Cross-platform environment variables

---

## 📁 Project Structure

```
freshbasket-admin/
├── 📁 public/                    # Static assets
│   ├── favicon.ico              # Site favicon
│   ├── logo-*.png               # App logos
│   ├── icon-*.png               # PWA icons
│   ├── robots.txt               # SEO robots file
│   └── _redirects               # Netlify redirects
│
├── 📁 src/                      # Source code
│   ├── 📁 assets/               # Static assets
│   │   ├── 📁 css/              # Stylesheets
│   │   │   ├── custom.css       # Custom styles
│   │   │   └── tailwind.css     # Tailwind imports
│   │   ├── 📁 img/              # Images and icons
│   │   │   ├── 📁 cards/        # Card images
│   │   │   ├── 📁 icons/        # Icon assets
│   │   │   └── 📁 logo/         # Logo variations
│   │   └── 📁 theme/            # Theme configuration
│   │       └── myTheme.js       # Custom theme
│   │
│   ├── 📁 components/           # Reusable components
│   │   ├── 📁 attribute/        # Product attribute components
│   │   │   ├── AttributeList.jsx
│   │   │   ├── AttributeTable.jsx
│   │   │   └── AttributeOption.jsx
│   │   ├── 📁 category/         # Category management
│   │   │   ├── CategoryTable.jsx
│   │   │   └── ChildrenCategory.jsx
│   │   ├── 📁 chart/            # Data visualization
│   │   │   ├── ChartCard.jsx
│   │   │   ├── LineChart/
│   │   │   └── Pie/
│   │   ├── 📁 common/           # Common utilities
│   │   │   ├── AnimatedContent.jsx
│   │   │   ├── NotFoundPage.jsx
│   │   │   └── PageTitle.jsx
│   │   ├── 📁 coupon/           # Coupon management
│   │   ├── 📁 customer/         # Customer components
│   │   ├── 📁 dashboard/        # Dashboard widgets
│   │   ├── 📁 drawer/           # Side drawer components
│   │   ├── 📁 form/             # Form components
│   │   │   ├── 📁 button/       # Button components
│   │   │   ├── 📁 input/        # Input components
│   │   │   ├── 📁 label/        # Label components
│   │   │   ├── 📁 selectOption/ # Select components
│   │   │   └── 📁 switch/       # Switch components
│   │   ├── 📁 header/           # Header navigation
│   │   ├── 📁 image-uploader/   # Image upload
│   │   ├── 📁 invoice/          # Invoice generation
│   │   ├── 📁 language/         # Language components
│   │   ├── 📁 login/            # Authentication
│   │   ├── 📁 modal/            # Modal dialogs
│   │   ├── 📁 order/            # Order management
│   │   ├── 📁 preloader/        # Loading components
│   │   ├── 📁 product/          # Product components
│   │   ├── 📁 settings/         # Settings components
│   │   ├── 📁 sidebar/          # Sidebar navigation
│   │   ├── 📁 staff/            # Staff management
│   │   ├── 📁 store-home/       # Store customization
│   │   ├── 📁 table/            # Data tables
│   │   ├── 📁 theme/            # Theme components
│   │   ├── 📁 tooltip/          # Tooltip components
│   │   └── 📁 Typography/       # Typography components
│   │
│   ├── 📁 context/              # React contexts
│   │   ├── AdminContext.jsx     # Admin state context
│   │   ├── SidebarContext.jsx   # Sidebar state context
│   │   └── ThemeContext.js      # Theme context
│   │
│   ├── 📁 hooks/                # Custom React hooks
│   │   ├── useAsync.js          # Async operations
│   │   ├── useAttributeSubmit.js # Attribute form handling
│   │   ├── useBulkActionSubmit.js # Bulk operations
│   │   ├── useCategorySubmit.js # Category form handling
│   │   ├── useCouponSubmit.js   # Coupon form handling
│   │   ├── useCurrencySubmit.js # Currency form handling
│   │   ├── useCustomerSubmit.js # Customer form handling
│   │   ├── useDisableForDemo.js # Demo mode handling
│   │   ├── useError.js          # Error handling
│   │   ├── useFilter.js         # Data filtering
│   │   ├── useGetCData.js       # Data fetching
│   │   ├── useLanguageSubmit.js # Language form handling
│   │   ├── useLoginSubmit.js    # Login form handling
│   │   ├── useNotification.js   # Notification handling
│   │   ├── useProductFilter.js  # Product filtering
│   │   ├── useProductSubmit.js  # Product form handling
│   │   ├── useQuery.js          # Query handling
│   │   ├── useSettingSubmit.js  # Settings form handling
│   │   ├── useStaffSubmit.js    # Staff form handling
│   │   ├── useStoreHomeSubmit.js # Store home form handling
│   │   ├── useStoreSettingSubmit.js # Store settings
│   │   ├── useToggleDrawer.js   # Drawer toggle
│   │   ├── useTranslationValue.js # Translation handling
│   │   └── useUtilsFunction.js  # Utility functions
│   │
│   ├── 📁 layout/               # Layout components
│   │   ├── Layout.jsx           # Main layout wrapper
│   │   ├── Localization.jsx     # Localization wrapper
│   │   └── Main.jsx             # Main content area
│   │
│   ├── 📁 pages/                # Page components
│   │   ├── 404.jsx              # 404 error page
│   │   ├── Attributes.jsx       # Attributes management
│   │   ├── Category.jsx         # Category management
│   │   ├── ChildAttributes.jsx  # Child attributes
│   │   ├── ChildCategory.jsx    # Child categories
│   │   ├── ComingSoon.jsx       # Coming soon page
│   │   ├── Coupons.jsx          # Coupon management
│   │   ├── Currencies.jsx       # Currency management
│   │   ├── CustomerOrder.jsx    # Customer order details
│   │   ├── Customers.jsx        # Customer management
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   ├── EditProfile.jsx      # Profile editing
│   │   ├── ForgotPassword.jsx   # Password recovery
│   │   ├── Languages.jsx        # Language management
│   │   ├── Login.jsx            # Login page
│   │   ├── Notifications.jsx    # Notifications page
│   │   ├── OrderInvoice.jsx     # Order invoice
│   │   ├── Orders.jsx           # Order management
│   │   ├── ProductDetails.jsx   # Product details
│   │   ├── Products.jsx         # Product management
│   │   ├── ResetPassword.jsx    # Password reset
│   │   ├── Setting.jsx          # Settings page
│   │   ├── SignUp.jsx           # Registration page
│   │   ├── Staff.jsx            # Staff management
│   │   ├── StoreHome.jsx        # Store customization
│   │   └── StoreSetting.jsx     # Store settings
│   │
│   ├── 📁 reduxStore/           # Redux store configuration
│   │   ├── 📁 slice/            # Redux slices
│   │   │   ├── dynamicDataSlice.js # Dynamic data management
│   │   │   └── settingSlice.js  # Settings state
│   │   └── store.js             # Store configuration
│   │
│   ├── 📁 routes/               # Routing configuration
│   │   ├── index.js             # Route definitions
│   │   └── sidebar.js           # Sidebar navigation
│   │
│   ├── 📁 services/             # API services
│   │   ├── AdminServices.js     # Admin API calls
│   │   ├── AttributeServices.js # Attribute API calls
│   │   ├── CategoryServices.js  # Category API calls
│   │   ├── CouponServices.js    # Coupon API calls
│   │   ├── CurrencyServices.js  # Currency API calls
│   │   ├── CustomerServices.js  # Customer API calls
│   │   ├── httpService.js       # HTTP client configuration
│   │   ├── LanguageServices.js  # Language API calls
│   │   ├── NotificationServices.js # Notification API calls
│   │   ├── OrderServices.js     # Order API calls
│   │   ├── ProductServices.js   # Product API calls
│   │   ├── SettingServices.js   # Settings API calls
│   │   └── TextTranslateServices.js # Translation API calls
│   │
│   ├── 📁 utils/                # Utility functions
│   │   ├── categories.js        # Category utilities
│   │   ├── chartsData.js        # Chart data utilities
│   │   ├── coupons.js           # Coupon utilities
│   │   ├── currency.js          # Currency utilities
│   │   ├── customers.js         # Customer utilities
│   │   ├── orders.js            # Order utilities
│   │   ├── products.js          # Product utilities
│   │   ├── staff.js             # Staff utilities
│   │   ├── timezones.js         # Timezone utilities
│   │   ├── toast.js             # Toast notification utilities
│   │   └── 📁 translation/      # Translation files
│   │       ├── bn.json          # Bengali translations
│   │       ├── de.json          # German translations
│   │       ├── en.json          # English translations
│   │       └── hi.json          # Hindi translations
│   │
│   ├── App.jsx                  # Main application component
│   ├── i18n.js                  # Internationalization setup
│   └── main.jsx                 # Application entry point
│
├── 📄 .gitignore                # Git ignore rules
├── 📄 index.html                # HTML template
├── 📄 jsconfig.json             # JavaScript configuration
├── 📄 package.json              # Dependencies and scripts
├── 📄 package-lock.json         # Dependency lock file
├── 📄 postcss.config.js         # PostCSS configuration
├── 📄 README.md                 # Project documentation
├── 📄 rollup.config.js          # Rollup configuration
├── 📄 tailwind.config.cjs       # Tailwind CSS configuration
├── 📄 vercel.json               # Vercel deployment configuration
└── 📄 vite.config.js            # Vite configuration
```

---

## 🚀 Getting Started

### **Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (for version control)

### **System Requirements**

- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: Minimum 4GB, Recommended 8GB+
- **Storage**: At least 2GB free space
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### **Installation Steps**

#### **1. Clone the Repository**

```bash

# Navigate to the project directory
cd freshbasket-admin
```

#### **2. Install Dependencies**

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

#### **3. Environment Configuration**

Create a `.env` file in the root directory:

```bash
# Create environment file
touch .env
```

Add the following environment variables:

```env
# API Configuration
VITE_API_URL=http://localhost:8000/api
VITE_API_VERSION=v1

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
VITE_CLOUDINARY_API_KEY=your_cloudinary_api_key
VITE_CLOUDINARY_API_SECRET=your_cloudinary_secret

# Application Configuration
VITE_APP_NAME=Freshbasket Admin
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development

# Feature Flags
VITE_ENABLE_PWA=true
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true

# External Services
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
VITE_SENTRY_DSN=your_sentry_dsn
```

#### **4. Start Development Server**

```bash
# Start development server
npm run dev

# Or using yarn
yarn dev
```

The application will be available at `http://localhost:4100`

### **First Time Setup**

1. **Access the Application**: Open your browser and navigate to `http://localhost:4100`
2. **Create Admin Account**: Use the signup page to create your first admin account
3. **Configure Settings**: Navigate to Settings to configure your store
4. **Add Initial Data**: Start by adding categories, products, and other essential data

---

## ⚙️ Configuration

### **Environment Variables**

| Variable                     | Description           | Default                     | Required |
| ---------------------------- | --------------------- | --------------------------- | -------- |
| `VITE_API_URL`               | Backend API URL       | `http://localhost:8000/api` | Yes      |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | -                           | Yes      |
| `VITE_CLOUDINARY_API_KEY`    | Cloudinary API key    | -                           | Yes      |
| `VITE_APP_NAME`              | Application name      | `Freshbasket Admin`         | No       |
| `VITE_ENABLE_PWA`            | Enable PWA features   | `true`                      | No       |
| `VITE_ENABLE_ANALYTICS`      | Enable analytics      | `true`                      | No       |

### **Tailwind CSS Configuration**

The project uses a custom Tailwind configuration:

```javascript
// tailwind.config.cjs
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#eff6ff",
					500: "#3b82f6",
					600: "#2563eb",
					700: "#1d4ed8",
				},
			},
		},
	},
	plugins: [],
};
```

### **Vite Configuration**

```javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
			},
		}),
	],
	server: {
		port: 4100,
		host: true,
	},
	build: {
		outDir: "dist",
		sourcemap: true,
	},
});
```

---

## 📄 File Management

Freshbasket Admin Dashboard provides robust file and media management features to streamline your e-commerce operations:

- **Product Image Uploads**: Upload multiple images per product with drag-and-drop support and real-time previews.
- **Cloudinary Integration**: All images and media are stored and optimized via Cloudinary, ensuring fast delivery and automatic resizing.
- **Image Compression**: Client-side image compression and resizing using `browser-image-compression` and `pica` for optimal performance.
- **Document Generation**: Generate and download PDF invoices and reports using React PDF Renderer.
- **Export/Import**: Export data (products, orders, customers) to CSV, Excel, or JSON formats. Import product data in bulk for quick catalog setup.
- **File Organization**: All static assets are organized under `src/assets/` and `public/` for easy management and deployment.

---

## 🎯 Customization

Freshbasket Admin is designed to be highly customizable to fit your brand and business needs:

- **Theme Customization**: Easily switch between light and dark modes. Modify color schemes and branding via `src/assets/theme/myTheme.js`.
- **Layout Options**: Modular layout components allow you to rearrange dashboard sections, sidebar, and header.
- **Storefront Customization**: Use the Store Customization pages to update homepage banners, featured products, and content sections.
- **Localization**: Add or edit translations in `src/utils/translation/` to support new languages or update existing ones.
- **Settings Panel**: Configure store information, payment gateways, shipping methods, and more from the Settings section.
- **Component Reusability**: The codebase is structured for easy extension—add new components or pages as your business grows.

---

## 📝 License

This project is licensed under the **Regular License**.  
See the [LICENSE](LICENSE) file for more details.

---

## 👨‍💻 Authors

- **Rohit Yadav** – Project Lead & Main Developer  
  [GitHub](https://github.com)

Special thanks to all contributors and the open-source community for their support and inspiration.

---

## 🙏 Acknowledgments

- **React** and the React ecosystem for powering the frontend.
- **Tailwind CSS** for rapid and beautiful UI development.
- **Cloudinary** for robust media management.
- **Chart.js** and **React Chart.js 2** for data visualization.
- **i18next** for internationalization support.
- All open-source libraries and contributors that make this project possible.

---

If you have any questions, suggestions, or feedback, feel free to open an issue or contact the author.  
Thank you for using and supporting Freshbasket Admin Dashboard!

# admin.freshbasket.com
