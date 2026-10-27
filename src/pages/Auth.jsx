import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Gift,
  Heart,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { toast } from '../store/toastStore';

export const Auth = ({ initialMode = 'login' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, register } = useAuthStore();

  // Mode: 'login' | 'register'
  const [mode, setMode] = useState(
    location.pathname === '/register' || initialMode === 'register' ? 'register' : 'login'
  );

  // Sync mode with route changes
  useEffect(() => {
    if (location.pathname === '/register') {
      setMode('register');
    } else if (location.pathname === '/login') {
      setMode('login');
    }
  }, [location.pathname]);

  // If already logged in, redirect to /account
  useEffect(() => {
    if (user?.isLoggedIn) {
      navigate('/account', { replace: true });
    }
  }, [user?.isLoggedIn, navigate]);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [newsletterOptIn, setNewsletterOptIn] = useState(true);

  // Forgot password dialog
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginIdentifier.trim() || !loginPassword) {
      toast.error('Please enter your email/phone and password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = login(loginIdentifier, loginPassword);
      setLoading(false);
      if (res.success) {
        toast.success(`Welcome back, ${res.user.name}!`);
        navigate('/account');
      } else {
        toast.error('Unable to sign in. Please check your credentials.');
      }
    }, 400);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (!regName.trim()) {
      toast.error('Please provide your full name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (regPassword.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = register({
        name: regName,
        email: regEmail,
        phone: regPhone || '+91 9876543210',
        password: regPassword,
      });
      setLoading(false);

      if (res.success) {
        toast.success(`Welcome to Zewar, ${res.user.name}! Your account has been created.`);
        navigate('/account');
      } else {
        toast.error(res.message || 'Registration failed.');
      }
    }, 400);
  };

  const handleDemoLogin = () => {
    login('khushboo@zewar.com', 'Password123');
    toast.success('Signed in as Patron Khushboo Shah (Demo)');
    navigate('/account');
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
    toast.info(`Password reset instructions sent to ${forgotEmail}`);
  };

  return (
    <div className="min-h-[80vh] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-ivory flex items-center justify-center">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 bg-brandWhite border border-sand-border shadow-xl rounded-[4px] overflow-hidden">
        
        {/* Left Side: Luxury Brand Imagery & Benefits (5 cols) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-b from-[#2B1E19] via-[#35231C] to-[#1E1410] text-[#FAF7F0] p-8 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <span className="eyebrow text-champagne">Privileged Patron Access</span>
            <h2 className="font-serif text-2xl font-light tracking-wide text-ivory">
              Zewar by Khushboo
            </h2>
            <p className="text-xs text-ivory/70 leading-relaxed font-sans">
              Enter your private sanctuary of handcrafted heritage jewellery, private salon consultations, and heirloom order tracking.
            </p>
          </div>

          <div className="space-y-4 py-8 relative z-10 border-y border-white/10 my-6">
            <div className="flex items-start gap-3">
              <Gift className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-ivory block">Complimentary Velvet Packaging</span>
                <span className="text-[11px] text-ivory/60 block">Every heirloom arrives encased in royal presentation chests.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Heart className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-ivory block">Multi-Device Wishlist</span>
                <span className="text-[11px] text-ivory/60 block">Save coveted earrings, chokers, and rings across your phone and tablet.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-ivory block">Real-Time Dispatch Tracking</span>
                <span className="text-[11px] text-ivory/60 block">Stay informed on insured doorstep delivery milestones.</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-ivory/50 flex items-center gap-1.5 relative z-10">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span>Artisanal Excellence • Insured Transit</span>
          </div>
        </div>

        {/* Right Side: Form & Controls (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          
          {/* Tabs */}
          <div className="flex border-b border-sand-border mb-8">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setShowForgotPassword(false);
              }}
              className={`pb-3 px-6 text-xs uppercase tracking-widest font-semibold transition-all relative cursor-pointer ${
                mode === 'login' && !showForgotPassword
                  ? 'text-espresso font-bold'
                  : 'text-espresso/45 hover:text-espresso'
              }`}
            >
              Sign In
              {mode === 'login' && !showForgotPassword && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-champagne-dark" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode('register');
                setShowForgotPassword(false);
              }}
              className={`pb-3 px-6 text-xs uppercase tracking-widest font-semibold transition-all relative cursor-pointer ${
                mode === 'register' && !showForgotPassword
                  ? 'text-espresso font-bold'
                  : 'text-espresso/45 hover:text-espresso'
              }`}
            >
              Create Account
              {mode === 'register' && !showForgotPassword && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-champagne-dark" />
              )}
            </button>
          </div>

          {/* 1. SIGN IN FORM */}
          {mode === 'login' && !showForgotPassword && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-espresso/70 mb-1.5 font-semibold">
                  Email Address or Mobile Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="name@example.com or +91..."
                    className="w-full text-xs pl-10 pr-3.5 py-3 bg-ivory/30 text-espresso border border-sand-border rounded-[2px] outline-none focus:border-champagne focus:ring-1 focus:ring-champagne transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-espresso/70 font-semibold">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-[11px] text-champagne-dark hover:text-espresso hover:underline font-semibold cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs pl-10 pr-10 py-3 bg-ivory/30 text-espresso border border-sand-border rounded-[2px] outline-none focus:border-champagne focus:ring-1 focus:ring-champagne transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-espresso/40 hover:text-espresso p-0.5"
                    aria-label="Toggle password visibility"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-espresso/75">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 accent-champagne rounded cursor-pointer"
                  />
                  <span>Remember my credentials</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-70 mt-2"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In to Account'}</span>
                {!loading && <ArrowRight className="w-3.5 h-3.5 text-champagne" />}
              </button>

              {/* Demo 1-Click Login for Fast Testing */}
              <div className="pt-4 border-t border-sand-border/80">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full py-2.5 px-3 border border-champagne/40 bg-sand/20 hover:bg-sand/40 text-espresso text-[11px] font-semibold rounded-[2px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-champagne-dark" />
                  <span>Instant Demo Sign In (Khushboo Shah)</span>
                </button>
              </div>
            </form>
          )}

          {/* 2. REGISTRATION FORM */}
          {mode === 'register' && !showForgotPassword && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 animate-fade-in">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-espresso/70 mb-1 font-semibold">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Khushboo Shah"
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 bg-ivory/30 text-espresso border border-sand-border rounded-[2px] outline-none focus:border-champagne focus:ring-1 focus:ring-champagne transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-espresso/70 mb-1 font-semibold">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="client@zewar.com"
                      className="w-full text-xs pl-10 pr-3.5 py-2.5 bg-ivory/30 text-espresso border border-sand-border rounded-[2px] outline-none focus:border-champagne focus:ring-1 focus:ring-champagne transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-espresso/70 mb-1 font-semibold">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full text-xs pl-10 pr-3.5 py-2.5 bg-ivory/30 text-espresso border border-sand-border rounded-[2px] outline-none focus:border-champagne focus:ring-1 focus:ring-champagne transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-espresso/70 mb-1 font-semibold">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full text-xs pl-10 pr-9 py-2.5 bg-ivory/30 text-espresso border border-sand-border rounded-[2px] outline-none focus:border-champagne focus:ring-1 focus:ring-champagne transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-espresso/40 hover:text-espresso p-0.5"
                    >
                      {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-espresso/70 mb-1 font-semibold">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      className="w-full text-xs pl-10 pr-3.5 py-2.5 bg-ivory/30 text-espresso border border-sand-border rounded-[2px] outline-none focus:border-champagne focus:ring-1 focus:ring-champagne transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-1 text-xs">
                <label className="flex items-start gap-2 cursor-pointer text-espresso/70">
                  <input
                    type="checkbox"
                    checked={newsletterOptIn}
                    onChange={(e) => setNewsletterOptIn(e.target.checked)}
                    className="w-3.5 h-3.5 accent-champagne rounded cursor-pointer mt-0.5"
                  />
                  <span className="text-[11px] leading-relaxed">
                    Receive exclusive invitations to private festive previews, bespoke auctions, and new arrivals.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-70 mt-3"
              >
                <span>{loading ? 'Registering Account...' : 'Create Account'}</span>
                {!loading && <ArrowRight className="w-3.5 h-3.5 text-champagne" />}
              </button>
            </form>
          )}

          {/* 3. FORGOT PASSWORD VIEW */}
          {showForgotPassword && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-serif text-lg text-espresso font-medium">Reset Your Password</h3>
              <p className="text-xs text-espresso/70 leading-relaxed">
                Provide your registered email address and we will dispatch a secure reset link directly to your inbox.
              </p>

              {!forgotSent ? (
                <form onSubmit={handleForgotSubmit} className="space-y-4 pt-1">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-espresso/70 mb-1 font-semibold">
                      Registered Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="client@zewar.com"
                        className="w-full text-xs pl-10 pr-3.5 py-3 bg-ivory/30 text-espresso border border-sand-border rounded-[2px] outline-none focus:border-champagne focus:ring-1 focus:ring-champagne"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="px-5 py-3 border border-sand-border text-espresso text-xs font-semibold uppercase tracking-wider rounded-[2px] hover:bg-sand/30"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light"
                    >
                      Send Reset Instructions
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-6 bg-sand/30 border border-sand-border rounded text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                  <p className="text-xs font-semibold text-espresso">Reset Link Dispatched</p>
                  <p className="text-xs text-espresso/70">
                    If an account is associated with {forgotEmail}, instructions have been dispatched.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotSent(false);
                    }}
                    className="text-xs text-champagne-dark font-semibold hover:underline"
                  >
                    Return to Sign In
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Guest Browsing Link */}
          <div className="pt-6 mt-6 border-t border-sand-border/70 text-center text-xs text-espresso/60">
            <span>Prefer to browse first? </span>
            <Link to="/shop" className="text-champagne-dark font-semibold hover:underline">
              Explore Collections
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
