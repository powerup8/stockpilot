# Changelog

All notable changes to this project are documented here.

## [1.0.0] - 2026-07-11

### Added
- User authentication (signup, login, protected routes) with hashed passwords
- Full CRUD for inventory products (create, edit, delete, list)
- Low-stock threshold flagging on the dashboard
- Search/filter by product name, SKU, or category
- Charcoal + electric blue design system across all pages
- Sidebar navigation layout
- Loading states on all form submissions
- Graceful handling of duplicate SKU errors

### Known limitations
- Password reset via email is not yet implemented
- Single-location inventory only (multi-warehouse support planned as a future iteration)