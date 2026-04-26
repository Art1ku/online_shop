# ForgeStore - Modern Ecommerce Admin & Storefront

A full-featured Single Page Application (SPA) built with React 19, Vite, and Tailwind CSS, integrated with the FakeStore API.

## 🚀 Live Demo
[Link to your deployment]

## 🛠 Features

### Core Functionality
- **Auth System**: Custom login/register logic with session persistence in LocalStorage.
- **Role-Based Access**: 
  - **Admin**: Access to Dashboard, User Management, and Full Product CRUD.
  - **User**: Access to Storefront, Cart, and Personal Profile.
- **Storefront**:
  - Live Search, Category Filtering, and Price/Rating Sorting.
  - Dynamic Pagination.
  - Detailed Product view with quantity controls.
- **Admin Dashboard**:
  - Analytical charts using Recharts (Revenue trends & Category breakdown).
  - KPI cards for Revenue, Orders, and User growth.
- **Cart System**: Full cart management with persistence and checkout simulation.

### Technical Highlights
- **React Router**: Protected routes, dynamic routing (`/:id`), and Main Layout pattern.
- **Context API**: Global state management for Auth, Theme, and Cart.
- **Custom Hooks**: `usePageTitle` for dynamic SEO/UX title management.
- **API Layer**: Centralized `services/api.ts` for clean CRUD interactions.
- **UI/UX**: 
  - Dark/Light mode toggle.
  - Responsive design (Mobile/Desktop).
  - Loading skeletons, Error boundaries, and Success toasts (Sonner).

## 📁 Project Structure
```text
src/
├── components/ # Reusable UI components
├── context/    # Global state (Auth, Theme, Cart)
├── hooks/      # Custom React hooks
├── layouts/    # Page wrappers (MainLayout)
├── pages/      # All 13 application pages
├── services/   # API logic (fetch wrappers)
├── types/      # TypeScript interfaces
└── utils/      # Helper functions (currency, text)
```

## 🏗 Setup Instructions
1. Clone the repository.
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## 👤 Credentials (Demo)
- **Admin**: `admin@forgestore.com` / `admin`
- **User**: Any email / password