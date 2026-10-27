import React from 'react';

export const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-6">
      <div className="border-b border-sand-border pb-4">
        <span className="eyebrow text-champagne-dark">Customer Service</span>
        <h1 className="font-serif text-3xl font-medium text-espresso mt-1">
          Shipping & Delivery Policy
        </h1>
      </div>

      <div className="bg-brandWhite border border-sand-border rounded-[3px] p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-espresso/80 leading-relaxed font-sans">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-medium text-espresso">1. Processing Time</h2>
          <p>
            All Zewar by Khushboo items are individually hand-inspected and carefully packaged in protective bubble wrap and signature velvet pouches. Orders are typically processed and handed over to courier partners within <strong>24 to 48 business hours</strong> of order placement.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-medium text-espresso">2. Delivery Timelines</h2>
          <p>
            We ship Pan-India via express logistics partners (BlueDart, Delhivery, DTDC). Standard transit takes <strong>4 to 6 business days</strong> depending on your location. Remote or North-East regions may require an extra 1-2 days.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-medium text-espresso">3. Shipping Charges</h2>
          <p>
            • Orders above <strong>₹999</strong>: Complimentary Free Shipping across India.<br />
            • Orders below <strong>₹999</strong>: Flat fee of ₹99 applied at checkout.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-medium text-espresso">4. Shipment Tracking</h2>
          <p>
            As soon as your package is dispatched, tracking details with an active AWB tracking link will be sent to your registered email address and mobile number.
          </p>
        </section>
      </div>
    </div>
  );
};
