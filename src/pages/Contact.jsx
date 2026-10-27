import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle2 } from 'lucide-react';
import { InstagramIcon } from '../components/ui/Icons';
import { BRAND } from '../lib/brand';
import { useUIStore } from '../store/uiStore';

export const Contact = () => {
  const { showToast } = useUIStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderId: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in your name, email, and message', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been received! We will respond shortly.', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="eyebrow text-champagne-dark">We Would Love to Hear from You</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-espresso">
          Contact Us
        </h1>
        <p className="text-xs sm:text-sm text-espresso/70 leading-relaxed font-sans">
          Have an inquiry about an order, custom styling recommendations, or bridal jewelry requests? Our customer care team is here to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Contact Info Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="p-6 bg-brandWhite border border-sand-border rounded-[3px] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-sand/60 flex items-center justify-center text-champagne-dark">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-wider font-bold text-espresso">Email Us</h3>
                <a href={`mailto:${BRAND.contactEmail}`} className="text-xs text-champagne-dark hover:underline font-medium">
                  {BRAND.contactEmail}
                </a>
              </div>
            </div>
            <p className="text-xs text-espresso/60">
              We respond to all order and product inquiries within 24 business hours.
            </p>
          </div>

          <div className="p-6 bg-brandWhite border border-sand-border rounded-[3px] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-sand/60 flex items-center justify-center text-champagne-dark">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-wider font-bold text-espresso">WhatsApp Concierge</h3>
                <a
                  href={`https://wa.me/919876543210`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-champagne-dark hover:underline font-medium"
                >
                  {BRAND.whatsappNumber}
                </a>
              </div>
            </div>
            <p className="text-xs text-espresso/60">
              Available Monday – Saturday, 10:00 AM – 7:00 PM IST for quick assistance.
            </p>
          </div>

          <div className="p-6 bg-brandWhite border border-sand-border rounded-[3px] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-sand/60 flex items-center justify-center text-champagne-dark">
                <InstagramIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-wider font-bold text-espresso">Direct Message</h3>
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-champagne-dark hover:underline font-medium"
                >
                  {BRAND.instagramHandle}
                </a>
              </div>
            </div>
            <p className="text-xs text-espresso/60">
              Send us a direct message on Instagram for styling guidance and new arrival sneak-peeks.
            </p>
          </div>

        </div>

        {/* Form (7 cols) */}
        <div className="lg:col-span-7 bg-brandWhite border border-sand-border rounded-[3px] p-6 sm:p-8">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h2 className="font-serif text-2xl font-medium text-espresso">Message Sent Successfully</h2>
              <p className="text-xs text-espresso/70 max-w-sm mx-auto">
                Thank you for reaching out to Zewar by Khushboo. An artisan team member will contact you within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs uppercase tracking-wider font-semibold text-champagne-dark hover:underline pt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-serif text-xl font-medium text-espresso border-b border-sand-border pb-3">
                Send Us a Note
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Khushboo Sharma"
                    className="w-full text-xs px-3.5 py-2.5 bg-ivory border border-sand-border rounded-[2px] focus:outline-none focus:border-champagne"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="yourname@domain.com"
                    className="w-full text-xs px-3.5 py-2.5 bg-ivory border border-sand-border rounded-[2px] focus:outline-none focus:border-champagne"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1 font-medium">
                    Mobile Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs px-3.5 py-2.5 bg-ivory border border-sand-border rounded-[2px] focus:outline-none focus:border-champagne"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1 font-medium">
                    Order Reference (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.orderId}
                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                    placeholder="e.g. ZBK-102934"
                    className="w-full text-xs px-3.5 py-2.5 bg-ivory border border-sand-border rounded-[2px] focus:outline-none focus:border-champagne"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-espresso/70 mb-1 font-medium">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you are looking for, or share your order inquiry..."
                  className="w-full text-xs px-3.5 py-2.5 bg-ivory border border-sand-border rounded-[2px] focus:outline-none focus:border-champagne"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-champagne" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
