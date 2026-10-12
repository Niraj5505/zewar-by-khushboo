import React from 'react';

export const ReturnsPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-6">
      <div className="border-b border-sand-border pb-4">
        <span className="eyebrow text-champagne-dark">Customer Service</span>
        <h1 className="font-serif text-3xl font-medium text-espresso mt-1">
          Returns & Refund Policy
        </h1>
      </div>

      <div className="bg-brandWhite border border-sand-border rounded-[3px] p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-espresso/80 leading-relaxed font-sans">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-medium text-espresso">1. Handcrafted Nature of Products</h2>
          <p>
            Due to the delicate nature of handmade jewellery and hygiene standards, we do not accept returns for buyer's remorse or minor natural stone variances. Each piece is crafted by human hands, giving it unique charm.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-medium text-espresso">2. Damaged or Incorrect Items</h2>
          <p>
            In the rare event that an item arrives damaged in transit or defective, please contact our team within <strong>48 hours of delivery</strong> via WhatsApp or email with clear photos and an unboxing video. We will initiate a replacement or store credit promptly.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-medium text-espresso">3. Exchange Process</h2>
          <p>
            For ring size or bracelet adjustments, please contact care@zewarbykhushboo.com. The product must remain unused, unworn, and in its original signature Zewar box.
          </p>
        </section>
      </div>
    </div>
  );
};
