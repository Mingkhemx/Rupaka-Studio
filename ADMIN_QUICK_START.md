# Admin Dashboard - Quick Start Guide

## 🚀 Getting Started (30 seconds)

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Go to admin login:**
   ```
   http://localhost:3000/admin/login
   ```

3. **Login with demo credentials:**
   - Email: `admin@rupaka.com`
   - Password: `admin123`

4. **You're in!** Dashboard loads with sample data

---

## 📍 Admin Routes

| URL | Page | Features |
|-----|------|----------|
| `/admin/login` | Login | Demo credentials autofilled |
| `/admin` | Dashboard | Stats, recent orders, trends |
| `/admin/portfolio` | Portfolio | CRUD + filter + search + sort |
| `/admin/blog` | Blog | CRUD + filter + search |
| `/admin/testimonials` | Testimonials | CRUD + rating filter + search |
| `/admin/faq` | FAQ | CRUD + reorder + search |
| `/admin/orders` | Orders | CRUD + status filter + details modal |

---

## 💡 Common Tasks

### Add a Portfolio Item
1. Go to `/admin/portfolio`
2. Click "Add Portfolio"
3. Fill: Title, Category, Price, Description, Features
4. Upload image (optional)
5. Click "Save"

### Manage Blog Posts
1. Go to `/admin/blog`
2. Click "Add Blog"
3. Fill: Title, Author, Category, Content
4. Select status (Draft/Published)
5. Click "Save"

### Add Testimonial
1. Go to `/admin/testimonials`
2. Click "Add Testimonial"
3. Fill: Name, Role, Content, Rating (★★★★★)
4. Click "Save"

### Reorder FAQs
1. Go to `/admin/faq`
2. Click ↑/↓ buttons next to each FAQ
3. Changes save automatically

### Create Order
1. Go to `/admin/orders`
2. Click "Add Order"
3. Fill: Client name, email, project type, amount, status
4. Click "Save"

---

## 🎨 UI Features

### Search
Every page has a search box:
- Works instantly
- Searches across relevant fields
- Case-insensitive

### Filter
Most pages have category/status filters:
- Dropdown selector
- Resets to page 1
- Works with search

### Sort
Click table headers to sort:
- ▲ = Ascending
- ▼ = Descending
- Click again to toggle

### Pagination
Tables show 10 items per page:
- « » buttons: First/Last
- ◄ ► buttons: Previous/Next
- Page indicator: Shows current page

### Actions
Each row has action buttons:
- **Edit** (Blue) - Modify item
- **Delete** (Red) - Remove item
- **Custom** (Gray) - Extra actions

---

## 🔔 Notifications

### Toast Messages
- **Green**: Success (saved, updated, deleted)
- **Red**: Error (validation failed, operation failed)
- **Blue**: Info (confirmations, status updates)

Toast auto-closes after 3 seconds (click X to dismiss)

---

## 📊 Dashboard Stats

**Cards show:**
- Total Portfolio items
- Total Blog posts
- Total Testimonials
- Total Orders
- Pending Orders (with %)
- Completed Orders (with % success rate)

**Recent Orders Table:**
- Last 5 orders by date
- Shows: ID, Client, Status, Amount
- Color-coded status badges

---

## 🔐 Security

### Authentication
- Hardcoded demo credentials (for testing only)
- Token stored in localStorage
- Auto-logout after browser close
- Protected routes redirect to login

### Data
- Stored in browser localStorage
- NOT on server (demo only)
- Data persists during session
- Clear cache to reset

---

## 📱 Responsive

| Screen | Behavior |
|--------|----------|
| Desktop | Sidebar + full tables |
| Tablet | Collapsible sidebar |
| Mobile | Floating menu button + stacked layout |

---

## ⚡ Performance

- ✅ Fast page loads (no API calls)
- ✅ Smooth animations (motion library)
- ✅ Instant search/filter
- ✅ Pagination (efficient rendering)
- ✅ Works offline (localStorage)

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't login | Clear cache, verify credentials |
| Data not saving | Check localStorage in DevTools |
| Form won't submit | Verify required fields (marked with *) |
| Table not showing | Ensure you have items, check filters |
| Menu not opening | Try refreshing page |

---

## 📁 Where's My Data?

**In DevTools:**
1. Open DevTools (F12)
2. Go to "Application" tab
3. Click "Local Storage"
4. Select `http://localhost:3000`
5. Look for keys starting with `admin_`

**Stored keys:**
- `admin_auth` - Your login session
- `admin_portfolios` - Portfolio items
- `admin_blogs` - Blog posts
- `admin_testimonials` - Testimonials
- `admin_faqs` - FAQ items
- `admin_orders` - Orders

---

## 🎯 Key Differences from Main Site

| Area | Main Site | Admin |
|------|-----------|-------|
| Purpose | Client facing | Internal management |
| Access | Public | Protected (/admin/login) |
| Data | Displays data | Creates/edits data |
| Theme | Light/beige | Dark blue sidebar |
| Navigation | Navbar | Sidebar menu |

---

## 🚀 What You Can Do

✅ Add portfolio items
✅ Manage blog posts
✅ Add testimonials
✅ Organize FAQs
✅ Create orders
✅ Filter & search everything
✅ Sort columns
✅ Delete items (with confirmation)
✅ Toggle publish status
✅ View order details

❌ Not yet:
- Multi-user access
- Backend sync
- File uploads to cloud
- Advanced analytics
- Bulk operations

---

## 💾 Backup Your Data

To backup your data:

1. Open DevTools (F12)
2. Go to "Application" > "Local Storage"
3. For each `admin_*` key, right-click > "Copy value"
4. Paste in a text file for backup

Or use browser DevTools:
```javascript
// In console:
localStorage.getItem('admin_portfolios')
localStorage.getItem('admin_blogs')
// ... etc
```

---

## ⚙️ Reset Everything

**Clear all admin data:**
```javascript
// In browser console (F12):
localStorage.removeItem('admin_auth');
localStorage.removeItem('admin_portfolios');
localStorage.removeItem('admin_blogs');
localStorage.removeItem('admin_testimonials');
localStorage.removeItem('admin_faqs');
localStorage.removeItem('admin_orders');
```

Then refresh and login again - sample data reloads automatically!

---

## 📖 Full Documentation

See `src/admin/README.md` for:
- Component API
- Hook usage
- Service reference
- Styling guide
- Future roadmap

See `ADMIN_INTEGRATION_GUIDE.md` for:
- Architecture overview
- Technical details
- Integration steps
- Production tips

---

## ✨ Tips & Tricks

1. **Use Tab to navigate forms** - Faster than clicking
2. **Click column headers to sort** - Works on all tables
3. **Search while filtering** - Combines both (AND logic)
4. **Breadcrumb in sidebar** - Shows current page
5. **Logout button** - Top right corner
6. **Demo data auto-loads** - First login initializes samples
7. **Pagination resets** - When you apply new filters
8. **No auto-save** - Always click Save button
9. **Confirmation dialogs** - For destructive actions
10. **Toast notifications** - Check bottom right for feedback

---

## 🎓 Learning Path

1. **Login and explore** - Get familiar with interface
2. **Add a portfolio item** - Try creating
3. **Edit it** - Modify and save
4. **Delete something** - See confirmation dialog
5. **Try searching** - Filter by text
6. **Sort a column** - Click header
7. **Check pagination** - Go through pages
8. **View order details** - Click "Details" button
9. **Read notifications** - Notice toast messages
10. **Explore responsive** - Resize browser window

---

## 🎉 You're Ready!

Your admin dashboard is fully functional and ready to use. Start by exploring the dashboard, adding some test data, and getting familiar with the interface.

**Questions?** Check the comprehensive docs:
- `src/admin/README.md` - Full technical docs
- `ADMIN_INTEGRATION_GUIDE.md` - Integration guide

**Need help?** Look for:
- Comments in source code
- TypeScript type hints
- Form validation messages
- Toast notifications

**Happy managing!** 🚀
