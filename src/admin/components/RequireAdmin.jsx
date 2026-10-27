import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const RequireAdmin = ({ roles = [], children }) => {
  const { isAuthenticated, role, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (roles.length > 0 && !roles.includes(role)) {
    return (
      <div className="p-8 sm:p-12 max-w-xl mx-auto my-12 bg-white border border-sand-border rounded-[4px] shadow-subtle text-center">
        <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="font-serif text-2xl font-medium text-espresso mb-2">
          Access Restricted
        </h2>
        <p className="font-sans text-xs sm:text-sm text-espresso/70 leading-relaxed mb-6">
          Your current administrative role (<strong className="font-semibold text-espresso">{role}</strong>) does not have authorization to view or modify this section. Contact a Super Administrator to adjust your role permissions.
        </p>
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  return children;
};
