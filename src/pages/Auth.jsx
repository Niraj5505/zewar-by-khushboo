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
  Check,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { toast } from '../store/toastStore';

export const Auth = ({ initialMode = 'login' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, register } = useAuthStore();

  const [mode, setMode] = useState(
    location.pathname === '/register' || initialMode === 'register' ? 'register' : 'login'
  );

  useEffect(() => {
    if (location.pathname === '/register') {
      setMode('register');
    } else if (location.pathname === '/login') {
      setMode('login');
    }
  }, [location.pathname]);

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
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);
  const [newsletterOptIn, setNewsletterOptIn] = useState(true);

  // Password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'bg-sand' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score: 1, label: 'Weak', color: 'bg-rose-400' };
    if (score <= 3) return { score: 2, label: 'Moderate', color: 'bg-amber-400' };
    return { score: 3, label: 'Strong', color: 'bg-emerald-500' };
  };

  const passwordStrength = getPasswordStrength(regPassword);

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
        toast.error('Unable to sign in. Please verify your credentials.');
      }
    }, 350);
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
      toast.error('Password must be at least 6 characters.');
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
        toast.success(`Welcome to Zewar, ${res.user.name}! Your account is ready.`);
        navigate('/account');
      } else {
        toast.error(res.message || 'Registration failed.');
      }
    }, 350);
  };

  const handleGoogleSocialLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login('khushboo.patron@gmail.com', 'GoogleAuth2026');
      setLoading(false);
      toast.success('Signed in seamlessly with Google.');
      navigate('/account');
    }, 450);
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
    <div className="min-h-[85vh] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-ivory flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 bg-brandWhite border border-sand-border shadow-2xl rounded-[6px] overflow-hidden">
        
        {/* Left Side: Luxury Brand Imagery & Benefits (5 cols) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-b from-[#2B1E19] via-[#35231C] to-[#1E1410] text-[#FAF7F0] p-9 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-champagne/15 border border-champagne/30 rounded-full text-champagne text-[10px] tracking-wider uppercase font-semibold">
              <Sparkles className="w-3 h-3" />
              <span>Privileged Patron Access</span>
            </div>
            <h2 className="font-serif text-3xl font-light tracking-wide text-ivory">
              Zewar by Khushboo
            </h2>
            <p className="text-xs text-ivory/70 leading-relaxed font-sans">
              Enter your private sanctuary of handcrafted heritage jewellery, private salon orders, and bespoke tracking.
            </p>
          </div>

          <div className="space-y-4 py-8 relative z-10 border-y border-white/10 my-6">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-champagne/15 flex items-center justify-center shrink-0">
                <Gift className="w-3.5 h-3.5 text-champagne" />
              </div>
              <div>
                <span className="text-xs font-semibold text-ivory block">Complimentary Velvet Unboxing</span>
                <span className="text-[11px] text-ivory/60 block">Every heirloom arrives encased in royal presentation chests.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-champagne/15 flex items-center justify-center shrink-0">
                <Heart className="w-3.5 h-3.5 text-champagne" />
              </div>
              <div>
                <span className="text-xs font-semibold text-ivory block">Synchronized Wishlist</span>
                <span className="text-[11px] text-ivory/60 block">Keep cherished necklaces, earrings, and rings on all devices.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-champagne/15 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-champagne" />
              </div>
              <div>
                <span className="text-xs font-semibold text-ivory block">Insured Doorstep Transit</span>
                <span className="text-[11px] text-ivory/60 block">Fully insured courier dispatch with live delivery tracking.</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-ivory/50 flex items-center justify-between relative z-10">
            <span>Authentic Hallmarked Craft</span>
            <span>•</span>
            <span>Mumbai Atelier</span>
          </div>
        </div>

        {/* Right Side: Form & Controls (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          
          {/* Tabs */}
          <div className="flex border-b border-sand-border mb-6">
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

          {/* Social Google Login Button */}
          {!showForgotPassword && (
            <div className="mb-5 space-y-3">
              <button
                type="button"
                onClick={handleGoogleSocialLogin}
                className="w-full py-2.5 px-4 bg-white border border-sand-border hover:border-champagne/80 hover:bg-sand/20 rounded-[3px] text-xs font-semibold text-espresso flex items-center justify-center gap-3 transition-all duration-200 shadow-sm cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-sand-border/80 w-full" />
                <span className="bg-brandWhite px-3 text-[10px] uppercase tracking-wider text-espresso/45 font-medium">
                  Or continue with email
                </span>
                <div className="border-t border-sand-border/80 w-full" />
              </div>
            </div>
          )}

          {/* 1. SIGN IN FORM */}
          {mode === 'login' && !showForgotPassword && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-espresso/70 mb-1.5 font-semibold">
                  Email Address or Mobile Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="name@example.com or +91..."
                    className="w-full text-xs pl-10 pr-3.5 py-3 bg-ivory/30 text-espresso border border-sand-border rounded-[3px] outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all font-sans"
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
                  <Lock className="w-4 h-4 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs pl-10 pr-10 py-3 bg-ivory/30 text-espresso border border-sand-border rounded-[3px] outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-espresso/40 hover:text-espresso p-0.5 cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-espresso/75 select-none">
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
                className="w-full py-3.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[3px] hover:bg-espresso-light transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-70 mt-2"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In to Account'}</span>
                {!loading && <ArrowRight className="w-3.5 h-3.5 text-champagne" />}
              </button>

              {/* Demo 1-Click Login */}
              <div className="pt-3 border-t border-sand-border/80">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full py-2.5 px-3 border border-champagne/40 bg-sand/20 hover:bg-sand/40 text-espresso text-[11px] font-semibold rounded-[3px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-champagne-dark" />
                  <span>⚡ Instant Demo Patron Sign In (Khushboo Shah)</span>
                </button>
              </div>

              <div className="text-center pt-2 text-xs text-espresso/70">
                <span>New patron to Zewar? </span>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-champagne-dark font-semibold hover:underline cursor-pointer"
                >
                  Create an account
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
                  <User className="w-4 h-4 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Khushboo Shah"
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 bg-ivory/30 text-espresso border border-sand-border rounded-[3px] outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-espresso/70 mb-1 font-semibold">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="client@zewar.com"
                      className="w-full text-xs pl-10 pr-3.5 py-2.5 bg-ivory/30 text-espresso border border-sand-border rounded-[3px] outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-espresso/70 mb-1 font-semibold">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full text-xs pl-10 pr-3.5 py-2.5 bg-ivory/30 text-espresso border border-sand-border rounded-[3px] outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-espresso/70 mb-1 font-semibold">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full text-xs pl-10 pr-9 py-2.5 bg-ivory/30 text-espresso border border-sand-border rounded-[3px] outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all font-sans"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-espresso/40 hover:text-espresso p-0.5 cursor-pointer"
                      aria-label="Toggle password visibility"
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
                    <Lock className="w-4 h-4 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showRegConfirmPassword ? 'text' : 'password'}
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full text-xs pl-10 pr-9 py-2.5 bg-ivory/30 text-espresso border border-sand-border rounded-[3px] outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20 transition-all font-sans"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-espresso/40 hover:text-espresso p-0.5 cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showRegConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Strength Indicator */}
              {regPassword && (
                <div className="space-y-1 pt-0.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-espresso/60">Password strength</span>
                    <span className="font-semibold text-espresso">{passwordStrength.label}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 h-1">
                    <div className={`h-full rounded-full transition-all ${passwordStrength.score >= 1 ? passwordStrength.color : 'bg-sand'}`} />
                    <div className={`h-full rounded-full transition-all ${passwordStrength.score >= 2 ? passwordStrength.color : 'bg-sand'}`} />
                    <div className={`h-full rounded-full transition-all ${passwordStrength.score >= 3 ? passwordStrength.color : 'bg-sand'}`} />
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-1 text-xs">
                <label className="flex items-start gap-2 cursor-pointer text-espresso/70 select-none">
                  <input
                    type="checkbox"
                    checked={newsletterOptIn}
                    onChange={(e) => setNewsletterOptIn(e.target.checked)}
                    className="w-3.5 h-3.5 accent-champagne rounded cursor-pointer mt-0.5"
                  />
                  <span className="text-[11px] leading-relaxed">
                    Receive invitations to private collection previews, seasonal gifting edits, and bespoke private sales.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[3px] hover:bg-espresso-light transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-70 mt-3"
              >
                <span>{loading ? 'Creating Account...' : 'Create Patron Account'}</span>
                {!loading && <ArrowRight className="w-3.5 h-3.5 text-champagne" />}
              </button>

              <div className="text-center pt-2 text-xs text-espresso/70">
                <span>Already have a patron account? </span>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-champagne-dark font-semibold hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </div>
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
                      <Mail className="w-4 h-4 text-espresso/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="client@zewar.com"
                        className="w-full text-xs pl-10 pr-3.5 py-3 bg-ivory/30 text-espresso border border-sand-border rounded-[3px] outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/20"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="px-5 py-3 border border-sand-border text-espresso text-xs font-semibold uppercase tracking-wider rounded-[3px] hover:bg-sand/30 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[3px] hover:bg-espresso-light cursor-pointer shadow-sm"
                    >
                      Send Reset Instructions
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-6 bg-sand/30 border border-sand-border rounded-[3px] text-center space-y-3">
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
                    className="text-xs text-champagne-dark font-semibold hover:underline cursor-pointer"
                  >
                    Return to Sign In
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Guest Browsing Link */}
          <div className="pt-5 mt-6 border-t border-sand-border/70 text-center text-xs text-espresso/60">
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
