import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
      <span className="eyebrow text-champagne-dark">Page Not Found</span>
      <h1 className="font-serif text-5xl font-medium text-espresso">404</h1>
      <p className="text-sm text-espresso/70 font-sans">
        The jewellery piece or page you are looking for has been relocated or is no longer available.
      </p>
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light transition-colors"
        >
          <span>Return to Home</span>
          <ArrowRight className="w-4 h-4 text-champagne" />
        </Link>
      </div>
    </div>
  );
};
