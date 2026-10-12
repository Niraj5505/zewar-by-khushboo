import React, { useState } from 'react';
import { User, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useAuthStore } from '../../store/authStore';
import { toast } from '../../store/toastStore';

export const LoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const { login } = useAuthStore();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email, password);
    toast.success(`Welcome back, ${email.split('@')[0]}!`);
    onClose();
    onSuccess?.();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email, password);
    toast.success(`Account created successfully! Welcome to Zewar.`);
    onClose();
    onSuccess?.();
  };

  const handleForgot = (e) => {
    e.preventDefault();
    if (!email) return;
    setForgotSent(true);
    toast.info(`Password reset link dispatched to ${email}`);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="md"
      title="Patron Access"
      description="Access your saved heirlooms, expedited checkout, and private orders."
    >
      <div className="space-y-5 pt-2">
        {/* Tab selection */}
        <div className="flex border-b border-espresso/15">
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setForgotSent(false); }}
            className={`pb-2.5 px-4 text-xs uppercase tracking-wider font-semibold transition-all relative ${
              activeTab === 'login' ? 'text-espresso font-bold' : 'text-espresso/50 hover:text-espresso'
            }`}
          >
            Sign In
            {activeTab === 'login' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-champagne" />}
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('register'); setForgotSent(false); }}
            className={`pb-2.5 px-4 text-xs uppercase tracking-wider font-semibold transition-all relative ${
              activeTab === 'register' ? 'text-espresso font-bold' : 'text-espresso/50 hover:text-espresso'
            }`}
          >
            Register
            {activeTab === 'register' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-champagne" />}
          </button>
        </div>

        {/* LOGIN TAB */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1 font-medium">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="care@example.com"
                className="w-full text-xs px-3.5 py-2.5 bg-brandWhite text-espresso border border-espresso/20 rounded-[2px] focus:outline-none focus:border-champagne"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs uppercase tracking-wider text-espresso/70 font-medium">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setActiveTab('forgot')}
                  className="text-[11px] text-champagne-dark hover:underline font-semibold"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs px-3.5 py-2.5 bg-brandWhite text-espresso border border-espresso/20 rounded-[2px] focus:outline-none focus:border-champagne"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light transition-colors"
            >
              Sign In to Account
            </button>
          </form>
        )}

        {/* REGISTER TAB */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1 font-medium">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Khushboo Shah"
                className="w-full text-xs px-3.5 py-2.5 bg-brandWhite text-espresso border border-espresso/20 rounded-[2px] focus:outline-none focus:border-champagne"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1 font-medium">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="care@example.com"
                className="w-full text-xs px-3.5 py-2.5 bg-brandWhite text-espresso border border-espresso/20 rounded-[2px] focus:outline-none focus:border-champagne"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1 font-medium">
                Create Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full text-xs px-3.5 py-2.5 bg-brandWhite text-espresso border border-espresso/20 rounded-[2px] focus:outline-none focus:border-champagne"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light transition-colors"
            >
              Create Account
            </button>
          </form>
        )}

        {/* FORGOT PASSWORD TAB */}
        {activeTab === 'forgot' && (
          <div>
            {!forgotSent ? (
              <form onSubmit={handleForgot} className="space-y-4">
                <p className="text-xs text-espresso/70">
                  Enter your registered email address and we will dispatch a secure link to reset your credentials.
                </p>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1 font-medium">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="care@example.com"
                    className="w-full text-xs px-3.5 py-2.5 bg-brandWhite text-espresso border border-espresso/20 rounded-[2px] focus:outline-none focus:border-champagne"
                  />
                </div>
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="px-4 py-2.5 border border-espresso/20 text-xs font-semibold uppercase rounded-[2px]"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px]"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-4 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                <p className="text-xs font-semibold text-espresso">Email Dispatched</p>
                <p className="text-xs text-espresso/70">Please inspect your inbox for instructions.</p>
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="mt-2 text-xs text-champagne-dark underline font-semibold"
                >
                  Return to Sign In
                </button>
              </div>
            )}
          </div>
        )}

        {/* Guest continue link */}
        <div className="pt-2 text-center border-t border-espresso/10">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-espresso/60 hover:text-espresso underline font-medium"
          >
            Continue browsing as guest
          </button>
        </div>
      </div>
    </Modal>
  );
};
