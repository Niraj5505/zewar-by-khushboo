import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const ROUTE_LABELS = {
  admin: 'Admin',
  products: 'Products',
  new: 'Create Product',
  edit: 'Edit Product',
  categories: 'Categories',
  inventory: 'Inventory',
  orders: 'Orders',
  returns: 'Returns',
  customers: 'Customers',
  reviews: 'Reviews',
  coupons: 'Coupons',
  announcement: 'Announcement Bar',
  homepage: 'Homepage Sections',
  popups: 'Popups & Modals',
  newsletter: 'Newsletter Subscribers',
  pages: 'Content Pages',
  testimonials: 'Testimonials',
  instagram: 'Instagram Feed',
  shipping: 'Shipping',
  rules: 'Shipping Rules',
  pincodes: 'Pincode Serviceability',
  reports: 'Reports',
  sales: 'Sales Report',
  settings: 'Settings',
  store: 'Store Settings',
  payment: 'Payment Settings',
  email: 'Email Settings',
  seo: 'SEO Settings',
  users: 'Admin Users',
  audit: 'Audit Log',
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex items-center space-x-1.5 text-xs text-espresso/60 font-sans" aria-label="Breadcrumb">
      <Link
        to="/admin"
        className="inline-flex items-center gap-1 hover:text-espresso transition-colors text-espresso/70"
      >
        <Home className="w-3.5 h-3.5 text-champagne-dark" />
        <span className="hidden sm:inline">Admin</span>
      </Link>

      {pathnames.slice(1).map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 2).join('/')}`;
        const isLast = index === pathnames.slice(1).length - 1;
        const label = ROUTE_LABELS[name] || name;

        return (
          <React.Fragment key={routeTo}>
            <ChevronRight className="w-3 h-3 text-espresso/30 flex-shrink-0" />
            {isLast ? (
              <span className="font-semibold text-espresso capitalize truncate max-w-[150px] sm:max-w-none">
                {label}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-espresso transition-colors capitalize truncate max-w-[120px] sm:max-w-none"
              >
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
