import React, { useState } from 'react';
import { Bell, CheckCircle2, Send } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { toast } from '../../store/toastStore';

export const BackInStockModal = ({ isOpen, onClose, product }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSuccess(true);
    toast.success(`You will be notified when ${product?.name || 'this piece'} returns to stock.`);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="sm"
      title="Restock Alert"
      description="Be the first to know when this handcrafted design returns to our studio."
    >
      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {product && (
            <div className="flex items-center gap-3 p-3 bg-sand/30 border border-espresso/10 rounded-[2px]">
              {product.images?.[0] && (
                <img
                  src={product.images[0]}
                  alt=""
                  className="w-10 h-12 object-cover rounded-[2px]"
                />
              )}
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-semibold text-espresso/60 block">
                  Limited Artisan Edition
                </span>
                <p className="font-serif text-xs font-semibold text-espresso truncate">
                  {product.name}
                </p>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1 font-medium">
              Email Address *
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
              WhatsApp Alert (Optional)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full text-xs px-3.5 py-2.5 bg-brandWhite text-espresso border border-espresso/20 rounded-[2px] focus:outline-none focus:border-champagne"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light transition-colors flex items-center justify-center gap-2"
          >
            <Bell className="w-4 h-4 text-champagne" />
            <span>Notify Me When Available</span>
          </button>
        </form>
      ) : (
        <div className="py-6 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
          <h3 className="font-serif text-lg font-medium text-espresso">
            Notification Registered
          </h3>
          <p className="text-xs text-espresso/70 max-w-xs mx-auto">
            We will dispatch an instant alert to <strong>{email}</strong> the moment our karigars finish hand-setting the next batch.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 px-6 py-2 bg-champagne text-espresso text-xs font-bold uppercase rounded-[2px] hover:bg-champagne-hover"
          >
            Done
          </button>
        </div>
      )}
    </Modal>
  );
};
