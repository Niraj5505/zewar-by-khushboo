import React from 'react';
import { Accordion } from '../components/ui/Accordion';

export const FAQ = () => {
  const faqItems = [
    {
      title: "What materials are used in Zewar by Khushboo jewellery?",
      content: "All our pieces are handcrafted with a high-grade hypoallergenic brass core, plated with 22k micron gold, and set with hand-cut polki kundan crystals, faux emeralds/rubies, and natural cultured freshwater pearls."
    },
    {
      title: "How long does Pan-India delivery take?",
      content: "Orders are prepared and dispatched within 24 to 48 business hours from Mumbai. Standard express transit takes 4 to 6 business days via trusted couriers like BlueDart, Delhivery, and DTDC."
    },
    {
      title: "Is shipping free?",
      content: "Yes, we offer complimentary Pan-India shipping on all orders above ₹999. Orders below ₹999 carry a nominal flat shipping fee of ₹99."
    },
    {
      title: "How should I care for my handcrafted jewellery?",
      content: "Avoid direct contact with water, perfumes, lotions, and sanitizers. Store your jewellery individually in the velvet zip pouch provided with your order to avoid friction and tarnish."
    },
    {
      title: "What is your return & exchange policy?",
      content: "Because each piece is handmade in limited quantities, we accept size exchanges or replacement for defective/damaged items reported within 48 hours of delivery with unboxing video proof."
    },
    {
      title: "Do you offer Cash on Delivery (COD)?",
      content: "Yes! COD is available across most serviceable PIN codes in India. We also offer 100% secure online payments via UPI, Credit/Debit cards, and NetBanking through Razorpay."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="text-center space-y-2">
        <span className="eyebrow text-champagne-dark">Help Center</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-espresso">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-espresso/70">
          Everything you need to know about our products, ordering, care, and shipments.
        </p>
      </div>

      <div className="bg-brandWhite border border-sand-border rounded-[3px] p-6 sm:p-8">
        <Accordion items={faqItems} allowMultiple={true} />
      </div>
    </div>
  );
};
