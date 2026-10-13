import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, Sparkles, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('khushboo@zewar.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setIsLoading(false);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.error || 'Invalid credentials');
      }
    }, 300);
  };

  const handleQuickLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('admin123');
    const res = login(demoEmail, 'admin123');
    if (res.success) {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col justify-center items-center p-4 selection:bg-champagne selection:text-espresso">
      {/* Container Card */}
      <div className="w-full max-w-[400px] bg-white border border-sand-border/80 rounded-[4px] shadow-hover p-8 relative">
        {/* Top Gold Bar */}
        <div className="h-1 bg-gradient-to-r from-champagne via-champagne-light to-champagne absolute top-0 left-0 right-0 rounded-t-[4px]" />

        {/* Brand Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 rounded-[2px] bg-espresso text-champagne flex items-center justify-center font-serif text-2xl font-bold mx-auto shadow-sm">
            Z
          </div>
          <h1 className="font-serif text-3xl font-medium text-espresso tracking-tight">
            Zewar Admin
          </h1>
          <p className="font-sans text-xs text-espresso/60 tracking-wider uppercase font-semibold">
            Boutique Back-of-House Portal
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-[2px] flex items-center gap-2">
            <span>⚠</span> {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-espresso/70 mb-1.5 font-sans">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-espresso/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@zewar.com"
                className="w-full pl-9 pr-3 py-2 text-xs bg-ivory/50 border border-sand-border rounded-[2px] text-espresso focus:outline-none focus:ring-2 focus:ring-champagne focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-espresso/70 mb-1.5 font-sans">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-espresso/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 py-2 text-xs bg-ivory/50 border border-sand-border rounded-[2px] text-espresso focus:outline-none focus:ring-2 focus:ring-champagne focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-espresso/40 hover:text-espresso"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-espresso/70">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded-[2px] text-champagne focus:ring-champagne border-sand-border"
              />
              <span className="text-[11px]">Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => alert('Password reset link sent to admin registered email.')}
              className="text-[11px] text-champagne-dark hover:text-espresso underline font-medium"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 mt-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-widest rounded-[2px] transition-all duration-200 shadow-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading ? 'Signing in...' : 'Sign In to Dashboard'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Testing Role Switchers */}
        <div className="mt-8 pt-6 border-t border-sand-border/70 text-center space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-espresso/40">
            Quick One-Click Demo Access
          </p>
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            <button
              type="button"
              onClick={() => handleQuickLogin('khushboo@zewar.com')}
              className="p-1.5 border border-sand-border hover:border-champagne hover:bg-sand/30 rounded-[2px] text-espresso font-medium transition-colors"
            >
              Super Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('arjun@zewar.com')}
              className="p-1.5 border border-sand-border hover:border-champagne hover:bg-sand/30 rounded-[2px] text-espresso font-medium transition-colors"
            >
              Store Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('staff@zewar.com')}
              className="p-1.5 border border-sand-border hover:border-champagne hover:bg-sand/30 rounded-[2px] text-espresso font-medium transition-colors"
            >
              Staff Member
            </button>
          </div>
        </div>

        {/* Storefront return link */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-[11px] text-espresso/50 hover:text-espresso transition-colors font-sans"
          >
            ← Return to public storefront
          </Link>
        </div>
      </div>
    </div>
  );
};
