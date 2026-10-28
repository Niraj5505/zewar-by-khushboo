import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Boxes,
  ShoppingBag,
  RotateCcw,
  Users,
  Star,
  Tag,
  Megaphone,
  Layout,
  Sparkles,
  Flame,
  Mail,
  FileText,
  MessageSquareQuote,
  Camera,
  Truck,
  MapPin,
  BarChart3,
  PieChart,
  LineChart,
  Store,
  CreditCard,
  Send,
  Globe,
  Shield,
  History,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
} from 'lucide-react';
import { useCmsStore } from '../lib/cmsStore';
import { useAuth } from '../hooks/useAuth';

export const NAV_SECTIONS = [
  {
    eyebrow: 'Overview',
    items: [
      { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    ],
  },
  {
    eyebrow: 'Catalog',
    items: [
      { name: 'Products', path: '/admin/products', icon: Package },
      { name: 'Categories', path: '/admin/categories', icon: Layers },
      { name: 'Inventory', path: '/admin/inventory', icon: Boxes },
    ],
  },
  {
    eyebrow: 'Sales',
    items: [
      { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
      { name: 'Returns', path: '/admin/returns', icon: RotateCcw },
    ],
  },
  {
    eyebrow: 'Customers',
    items: [
      { name: 'Customers', path: '/admin/customers', icon: Users },
      { name: 'Reviews', path: '/admin/reviews', icon: Star },
    ],
  },
  {
    eyebrow: 'Marketing',
    items: [
      { name: 'Festive Mode', path: '/admin/festive', icon: Flame },
      { name: 'Coupons', path: '/admin/coupons', icon: Tag },
      { name: 'Announcement', path: '/admin/announcement', icon: Megaphone },
      { name: 'Homepage', path: '/admin/homepage', icon: Layout },
      { name: 'Popups', path: '/admin/popups', icon: Sparkles },
      { name: 'Newsletter', path: '/admin/newsletter', icon: Mail },
    ],
  },
  {
    eyebrow: 'Content',
    items: [
      { name: 'Pages', path: '/admin/pages', icon: FileText },
      { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
      { name: 'Instagram', path: '/admin/instagram', icon: Camera },
    ],
  },
  {
    eyebrow: 'Shipping',
    items: [
      { name: 'Rules', path: '/admin/shipping/rules', icon: Truck },
      { name: 'Pin Codes', path: '/admin/shipping/pincodes', icon: MapPin },
    ],
  },
  {
    eyebrow: 'Reports',
    items: [
      { name: 'Sales', path: '/admin/reports/sales', icon: BarChart3 },
      { name: 'Products', path: '/admin/reports/products', icon: PieChart },
      { name: 'Customers', path: '/admin/reports/customers', icon: LineChart },
    ],
  },
  {
    eyebrow: 'Settings',
    items: [
      { name: 'Store', path: '/admin/settings/store', icon: Store },
      { name: 'Payment', path: '/admin/settings/payment', icon: CreditCard },
      { name: 'Email', path: '/admin/settings/email', icon: Send },
      { name: 'SEO', path: '/admin/settings/seo', icon: Globe },
      { name: 'Users', path: '/admin/settings/users', icon: Shield },
      { name: 'Audit', path: '/admin/settings/audit', icon: History },
    ],
  },
];

export const Sidebar = () => {
  const isCollapsed = useCmsStore((s) => s.isSidebarCollapsed);
  const toggleSidebar = useCmsStore((s) => s.toggleSidebar);
  const isMobileOpen = useCmsStore((s) => s.isMobileSidebarOpen);
  const closeMobile = useCmsStore((s) => s.closeMobileSidebar);
  const { user } = useAuth();

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-50 lg:z-40 bg-[#FAF7F0] border-r border-sand-border transition-all duration-300 flex flex-col select-none w-[280px] max-w-[85vw] lg:max-w-none ${
        isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
      } ${isCollapsed ? 'lg:w-[72px]' : 'lg:w-[260px]'}`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-sand-border/80 bg-white/70">
        <Link
          to="/admin"
          onClick={() => closeMobile()}
          className={`flex items-center gap-2 overflow-hidden transition-all ${
            isCollapsed ? 'lg:justify-center lg:w-full' : ''
          }`}
          title="Zewar Admin"
        >
          {isCollapsed ? (
            <div className="w-8 h-8 rounded-[2px] bg-espresso text-champagne flex items-center justify-center font-serif font-bold text-sm shadow-sm flex-shrink-0">
              Z
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <img
                src="/images/logo.png"
                alt="Zewar by Khushboo"
                className="h-8 w-auto object-contain mix-blend-multiply"
              />
              <span className="font-sans text-[9px] uppercase tracking-widest px-1.5 py-0.5 bg-champagne/20 text-espresso font-semibold rounded-[2px]">
                Admin
              </span>
            </div>
          )}
        </Link>

        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={closeMobile}
          className="lg:hidden p-1.5 text-espresso/60 hover:text-espresso hover:bg-sand/40 rounded transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5 text-espresso" />
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-5 scrollbar-thin">
        {NAV_SECTIONS.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <p
              className={`px-3 text-[10px] uppercase font-bold tracking-widest text-espresso/40 font-sans ${
                isCollapsed ? 'lg:hidden' : 'block'
              }`}
            >
              {section.eyebrow}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.exact}
                    onClick={() => closeMobile()}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 sm:py-2 rounded-[2px] text-xs font-medium transition-all ${
                        isActive
                          ? 'border-l-[3px] border-champagne bg-champagne/15 text-espresso font-semibold shadow-xs'
                          : 'border-l-[3px] border-transparent text-espresso/70 hover:text-espresso hover:bg-sand/40'
                      } ${isCollapsed ? 'lg:justify-center lg:px-0' : ''}`
                    }
                    title={isCollapsed ? item.name : undefined}
                  >
                    <Icon className="w-[18px] h-[18px] flex-shrink-0 text-espresso/70" />
                    <span className={`truncate font-sans ${isCollapsed ? 'lg:hidden' : 'inline'}`}>
                      {item.name}
                    </span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Collapse Toggle / Storefront Footer */}
      <div className="p-3 border-t border-sand-border/80 bg-white/70 flex items-center justify-between">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={`items-center gap-1.5 text-[11px] text-espresso/60 hover:text-espresso font-semibold tracking-wider uppercase transition-colors ${
            isCollapsed ? 'hidden lg:hidden' : 'flex'
          }`}
        >
          <ExternalLink className="w-3.5 h-3.5 text-champagne-dark" />
          <span>Storefront</span>
        </a>

        {/* Desktop Collapse Button */}
        <button
          type="button"
          onClick={toggleSidebar}
          className={`hidden lg:flex p-1.5 rounded-[2px] border border-sand-border hover:bg-sand/40 text-espresso/70 hover:text-espresso transition-colors ${
            isCollapsed ? 'mx-auto' : ''
          }`}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-champagne-dark" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-champagne-dark" />
          )}
        </button>
      </div>
    </aside>
  );
};
