# Rupaka Studio Admin Dashboard

Professional and modern admin CRUD dashboard for managing Rupaka Studio content.

## Features

### 🔐 Authentication
- Simple login with hardcoded credentials
  - **Email:** `admin@rupaka.com`
  - **Password:** `admin123`
- Token-based auth stored in localStorage
- Protected routes with automatic redirect

### 📊 Dashboard
- Real-time statistics (portfolios, blogs, testimonials, orders)
- Pending & completed orders tracking
- Recent orders table with status indicators
- Performance metrics and trends

### 🖼️ Portfolio Management
- Create, read, update, delete portfolio items
- Filter by category (poster, logo, website, custom)
- Toggle between published/draft status
- Search across title and description
- Sortable columns
- Pagination support
- Bulk operations ready

### 📝 Blog Management
- Full blog post CRUD operations
- Rich content support (markdown-compatible)
- Category filtering and search
- Author and read time tracking
- Publish/draft status control

### ⭐ Testimonials
- Add and manage customer testimonials
- 5-star rating system with visual feedback
- Filter by rating
- Search by name, role, or content
- Publish/draft control

### ❓ FAQ Management
- Create and manage FAQs
- Drag-drop order management (↑/↓ buttons)
- Search functionality
- Answer preview in table
- Persistent ordering

### 📦 Orders Management
- Complete order lifecycle management
- Status tracking (Pending, In Progress, Completed, Cancelled)
- Color-coded status badges
- Client details and project information
- Order details modal
- Comprehensive search and filtering

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router v7** - Navigation
- **motion** - Animations
- **lucide-react** - Icons
- **date-fns** - Date formatting
- **localStorage** - Data persistence

## Folder Structure

```
src/admin/
├── types.ts                          # TypeScript interfaces
├── services.ts                       # localStorage management
├── AdminApp.tsx                      # Main admin router
├── index.ts                          # Public exports
├── hooks/
│   ├── useAdmin.ts                   # Toast, pagination, search, sort
│   ├── useLocalStorage.ts            # localStorage hook
│   └── index.ts
├── components/
│   ├── AdminLayout.tsx               # Main layout wrapper
│   ├── AdminSidebar.tsx              # Navigation sidebar
│   ├── AdminHeader.tsx               # Top header bar
│   ├── AdminDashboard.tsx            # Dashboard stats
│   ├── DataTable.tsx                 # Reusable table component
│   ├── FormModal.tsx                 # Reusable form modal
│   ├── DeleteConfirmation.tsx        # Delete confirmation dialog
│   ├── Toast.tsx                     # Notifications
│   ├── EmptyState.tsx                # Empty state component
│   └── index.ts
├── pages/
│   ├── Login.tsx                     # Admin login page
│   ├── Dashboard.tsx                 # Dashboard page
│   ├── PortfolioAdmin.tsx            # Portfolio management
│   ├── BlogAdmin.tsx                 # Blog management
│   ├── TestimonialAdmin.tsx          # Testimonials management
│   ├── FAQAdmin.tsx                  # FAQ management
│   ├── OrdersAdmin.tsx               # Orders management
│   └── index.ts
└── README.md                         # This file
```

## Getting Started

### Access the Admin Panel

1. Navigate to `http://localhost:3000/admin/login`
2. Log in with demo credentials:
   - Email: `admin@rupaka.com`
   - Password: `admin123`
3. You'll be redirected to the dashboard

### Data Persistence

All data is stored in browser localStorage. The following keys are used:

- `admin_auth` - Authentication token
- `admin_portfolios` - Portfolio items
- `admin_blogs` - Blog posts
- `admin_testimonials` - Customer testimonials
- `admin_faqs` - FAQ items
- `admin_orders` - Customer orders

### Initial Data

On first login, the dashboard auto-populates with mock data from `src/data.ts`:
- 4 portfolio items
- 3 blog posts
- 3 testimonials
- 5 FAQs
- 3 sample orders

## Usage Guide

### Creating New Items

1. Navigate to the desired section (Portfolio, Blog, etc.)
2. Click "Add [Item Type]" button
3. Fill in required fields marked with *
4. Use appropriate field types:
   - **Text**: Single line input
   - **Textarea**: Multi-line text (blog content, FAQ answers)
   - **Select**: Dropdown options
   - **Rating**: 5-star selector
   - **File**: Image uploads
   - **Array**: Multiple items (portfolio features)

### Searching and Filtering

- Use the search box to filter by title, description, or content
- Apply category or status filters with dropdowns
- Results update in real-time
- Works alongside sorting

### Sorting

- Click column headers to sort (toggle asc/desc)
- Visual indicators show current sort state
- Supports multiple data types (text, numbers, dates)

### Pagination

- Tables show 10 items per page
- Use pagination controls at bottom
- Quick navigation to first/last page
- Page indicator shows current position

### Publishing/Status Control

- Toggle between Published/Draft states
- Color-coded badges show current status
- Changes save immediately to localStorage

## API & Services

### Authentication Service
```typescript
login(email, password)      // Returns { success, token?, error? }
logout()                     // Clears auth from localStorage
isAuthenticated()           // Checks if user is logged in
getAuthToken()              // Returns auth token object
```

### Portfolio Service
```typescript
getPortfolios()             // Get all portfolios
addPortfolio(item)          // Add new portfolio
updatePortfolio(id, data)   // Update portfolio
deletePortfolio(id)         // Delete portfolio
```

### Similar services for: Blogs, Testimonials, FAQs, Orders
```typescript
getBlogs() / addBlog() / updateBlog() / deleteBlog()
getTestimonials() / addTestimonial() / updateTestimonial() / deleteTestimonial()
getFaqs() / addFaq() / updateFaq() / deleteFaq()
getOrders() / addOrder() / updateOrder() / deleteOrder()
```

### Stats Service
```typescript
getStats()  // Returns AdminStats with all counters
```

## Hooks

### useToast
```typescript
const { toasts, showToast, removeToast } = useToast();
showToast('Message', 'success' | 'error' | 'info', duration);
```

### usePagination
```typescript
const pagination = usePagination(itemsPerPage);
// Properties: currentPage, itemsPerPage, totalItems, totalPages, startIndex, endIndex
// Methods: setTotalItems, goToPage, nextPage, prevPage, setItemsPerPage
```

### useSearch
```typescript
const { query, setQuery, results } = useSearch(items, ['field1', 'field2']);
```

### useSort
```typescript
const { sorted, sortKey, sortOrder, toggleSort } = useSort(items);
```

## Styling

The admin panel uses the existing Rupaka Studio color scheme:

- **Primary Dark**: `#2C3E52` (sidebar background)
- **Accent Orange**: `#FF4B2B` (buttons, highlights)
- **Soft Card**: `#F5F1ED` (backgrounds)
- **Text Dark**: `#1A1F2E` (primary text)
- **Muted Grey**: `#8B96A8` (secondary text)

All colors are defined in `tailwind.config.js` and can be customized there.

## Performance Considerations

- Pagination prevents rendering large lists at once
- Search/filter results computed efficiently
- Animations use `motion` library for smooth performance
- localStorage is used for instant data persistence
- No external API calls (all client-side)

## Future Enhancements

- [ ] Backend API integration
- [ ] User role-based access control
- [ ] Bulk operations (multi-select, batch delete)
- [ ] Advanced search filters
- [ ] Data export (CSV, JSON)
- [ ] Activity logging
- [ ] Image upload to cloud storage
- [ ] Backup/restore functionality
- [ ] Admin user management
- [ ] Analytics dashboard

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Requires JavaScript enabled

## License

©2025 Rupaka Studio. Licensed under Apache-2.0.
