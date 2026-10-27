import { PRODUCTS, CATEGORIES } from '../../data/products';
import { BRAND } from '../../lib/brand';

export const INITIAL_PRODUCTS = PRODUCTS.map((p, idx) => ({
  ...p,
  status: 'published',
  featuredOnHome: p.isBestSeller,
  newArrival: p.isNewArrival,
  trackInventory: true,
  lowStockThreshold: 5,
  costPricePaise: Math.round(p.pricePaise * 0.4),
  taxClass: 'GST_3_PERCENT',
  weight: 0.15,
  dimensions: { length: 8, width: 6, height: 4 },
  shippingClass: 'standard',
  metaTitle: `${p.name} | Zewar by Khushboo`,
  metaDescription: p.shortDescription,
  ogImage: p.images[0] || '',
  tags: [p.category, p.isBestSeller ? 'bestseller' : '', 'handcrafted'].filter(Boolean),
  updatedAt: new Date(Date.now() - idx * 86400000 * 2).toISOString(),
  variants: [
    {
      id: `${p.id}-var-gold`,
      name: '22k Gold Micron / Antique',
      sku: `${p.sku}-GLD`,
      pricePaise: p.pricePaise,
      stock: p.stock,
      image: p.images[0] || '',
    },
    {
      id: `${p.id}-var-rose`,
      name: 'Rose Gold Finish',
      sku: `${p.sku}-RSE`,
      pricePaise: p.pricePaise + 10000,
      stock: Math.max(2, Math.floor(p.stock / 2)),
      image: p.images[1] || p.images[0] || '',
    }
  ]
}));

export const INITIAL_CATEGORIES = CATEGORIES.map((c, idx) => ({
  ...c,
  sortOrder: idx + 1,
  parent: null,
  metaTitle: `${c.name} Collection | Zewar Handcrafted`,
  metaDescription: c.description,
}));

export const INITIAL_ORDERS = [
  {
    id: "ORD-9481",
    date: new Date(Date.now() - 3600000 * 2).toISOString(),
    customer: {
      id: "CUST-101",
      name: "Pooja Malhotra",
      email: "pooja.malhotra@gmail.com",
      phone: "+91 98201 44521"
    },
    shippingAddress: {
      name: "Pooja Malhotra",
      street: "Flat 702, Silver Arch Apartments, Altamount Road",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400026",
      phone: "+91 98201 44521"
    },
    billingAddress: {
      name: "Pooja Malhotra",
      street: "Flat 702, Silver Arch Apartments, Altamount Road",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400026",
      phone: "+91 98201 44521"
    },
    items: [
      {
        id: "prod-1",
        name: "Pearl Bloom Earrings",
        variant: "22k Gold Micron / Antique",
        sku: "ZBK-EAR-001-GLD",
        image: "/images/pearl-bloom-earrings.jpg",
        pricePaise: 149900,
        qty: 1,
        subtotalPaise: 149900,
      },
      {
        id: "prod-2",
        name: "Meena Charm Necklace",
        variant: "Emerald Green Meenakari",
        sku: "ZBK-NCK-002",
        image: "/images/meena-charm-necklace.jpg",
        pricePaise: 249900,
        qty: 1,
        subtotalPaise: 249900,
      }
    ],
    pricing: {
      subtotalPaise: 399800,
      discountPaise: 39980, // 10% coupon
      shippingPaise: 0,
      taxPaise: 11994,
      grandTotalPaise: 371814,
    },
    paymentStatus: "paid", // paid, pending, failed, refunded
    paymentMethod: "Razorpay (UPI / GPay)",
    transactionId: "pay_Rzp9481920X",
    fulfillmentStatus: "unfulfilled", // unfulfilled, processing, shipped, delivered, cancelled
    shipment: {
      courier: "BlueDart Express",
      trackingNumber: "BD994827110IN",
      trackingUrl: "https://www.bluedart.com/tracking",
      estimatedDelivery: "2026-10-17",
      status: "Manifested",
    },
    internalNotes: "Customer requested gift wrap with custom greeting card for Diwali.",
  },
  {
    id: "ORD-9480",
    date: new Date(Date.now() - 3600000 * 18).toISOString(),
    customer: {
      id: "CUST-102",
      name: "Ananya Iyer",
      email: "ananya.iyer@outlook.com",
      phone: "+91 97412 88390"
    },
    shippingAddress: {
      name: "Ananya Iyer",
      street: "Villa 14, Prestige Ozone, Whitefield",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560066",
      phone: "+91 97412 88390"
    },
    billingAddress: {
      name: "Ananya Iyer",
      street: "Villa 14, Prestige Ozone, Whitefield",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560066",
      phone: "+91 97412 88390"
    },
    items: [
      {
        id: "prod-3",
        name: "Floral Kundan Bracelet",
        variant: "Standard Free Size",
        sku: "ZBK-BRC-003",
        image: "/images/floral-kundan-bracelet.jpg",
        pricePaise: 189900,
        qty: 2,
        subtotalPaise: 379800,
      }
    ],
    pricing: {
      subtotalPaise: 379800,
      discountPaise: 0,
      shippingPaise: 0,
      taxPaise: 11394,
      grandTotalPaise: 391194,
    },
    paymentStatus: "paid",
    paymentMethod: "Razorpay (Credit Card)",
    transactionId: "pay_Rzp9480029Y",
    fulfillmentStatus: "shipped",
    shipment: {
      courier: "Delhivery Surface",
      trackingNumber: "DLV983210444IN",
      trackingUrl: "https://www.delhivery.com/track",
      estimatedDelivery: "2026-10-16",
      status: "In Transit",
    },
    internalNotes: "Dispatched from Mumbai studio warehouse.",
  },
  {
    id: "ORD-9479",
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    customer: {
      id: "CUST-103",
      name: "Divya Singhania",
      email: "divya.singhania@gmail.com",
      phone: "+91 98110 33201"
    },
    shippingAddress: {
      name: "Divya Singhania",
      street: "42, Vasant Vihar, Poorvi Marg",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110057",
      phone: "+91 98110 33201"
    },
    billingAddress: {
      name: "Divya Singhania",
      street: "42, Vasant Vihar, Poorvi Marg",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110057",
      phone: "+91 98110 33201"
    },
    items: [
      {
        id: "prod-4",
        name: "Ruby Eternal Ring",
        variant: "Size 14",
        sku: "ZBK-RNG-004",
        image: "/images/ruby-eternal-ring.jpg",
        pricePaise: 129900,
        qty: 1,
        subtotalPaise: 129900,
      }
    ],
    pricing: {
      subtotalPaise: 129900,
      discountPaise: 10000,
      shippingPaise: 0,
      taxPaise: 3597,
      grandTotalPaise: 123497,
    },
    paymentStatus: "paid",
    paymentMethod: "Razorpay (NetBanking HDFC)",
    transactionId: "pay_Rzp9479101Z",
    fulfillmentStatus: "delivered",
    shipment: {
      courier: "BlueDart Express",
      trackingNumber: "BD994801129IN",
      trackingUrl: "https://www.bluedart.com/tracking",
      estimatedDelivery: "2026-10-12",
      status: "Delivered",
    },
    internalNotes: "Delivered successfully.",
  },
  {
    id: "ORD-9478",
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    customer: {
      id: "CUST-104",
      name: "Meera Sen",
      email: "meera.sen@gmail.com",
      phone: "+91 98300 12894"
    },
    shippingAddress: {
      name: "Meera Sen",
      street: "Flat 3B, Ballygunge Circular Rd",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700019",
      phone: "+91 98300 12894"
    },
    billingAddress: {
      name: "Meera Sen",
      street: "Flat 3B, Ballygunge Circular Rd",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700019",
      phone: "+91 98300 12894"
    },
    items: [
      {
        id: "prod-5",
        name: "Classic Jhumka",
        variant: "Antique Gold",
        sku: "ZBK-EAR-005",
        image: "/images/classic-jhumka.jpg",
        pricePaise: 169900,
        qty: 1,
        subtotalPaise: 169900,
      }
    ],
    pricing: {
      subtotalPaise: 169900,
      discountPaise: 0,
      shippingPaise: 0,
      taxPaise: 5097,
      grandTotalPaise: 174997,
    },
    paymentStatus: "pending",
    paymentMethod: "Cash on Delivery (COD)",
    transactionId: "cod_pending",
    fulfillmentStatus: "processing",
    shipment: {
      courier: "Delhivery Surface",
      trackingNumber: "DLV983200118IN",
      trackingUrl: "https://www.delhivery.com/track",
      estimatedDelivery: "2026-10-17",
      status: "Manifest Created",
    },
    internalNotes: "Phone confirmation completed by staff.",
  }
];

export const INITIAL_RETURNS = [
  {
    id: "RET-101",
    orderId: "ORD-9470",
    customerName: "Rhea Chawla",
    customerEmail: "rhea.c@gmail.com",
    productName: "Ruby Eternal Ring (Size 14)",
    reason: "Size misfit - ring is slightly too loose for ring finger",
    photos: ["/images/ruby-eternal-ring.jpg"],
    requestedDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: "requested", // requested, approved, received, refunded, rejected
    amountPaise: 129900,
    adminNotes: "Customer sent photo verification. Awaiting return parcel arrival.",
  }
];

export const INITIAL_CUSTOMERS = [
  {
    id: "CUST-101",
    name: "Pooja Malhotra",
    email: "pooja.malhotra@gmail.com",
    phone: "+91 98201 44521",
    ordersCount: 3,
    totalSpentPaise: 1149400,
    joinedDate: "2026-03-14",
    lastOrderDate: new Date(Date.now() - 3600000 * 2).toISOString(),
    tags: ["VIP", "Repeat Buyer", "Wedding Shopper"],
    notes: "Appreciates premium velvet gift packaging and fast shipping.",
    addresses: [
      {
        id: "addr-p1",
        name: "Pooja Malhotra",
        street: "Flat 702, Silver Arch Apartments, Altamount Road",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400026",
        phone: "+91 98201 44521",
        isDefault: true,
      }
    ]
  },
  {
    id: "CUST-102",
    name: "Ananya Iyer",
    email: "ananya.iyer@outlook.com",
    phone: "+91 97412 88390",
    ordersCount: 2,
    totalSpentPaise: 649700,
    joinedDate: "2026-05-20",
    lastOrderDate: new Date(Date.now() - 3600000 * 18).toISOString(),
    tags: ["Jewellery Enthusiast"],
    notes: "Prefers emerald / meenakari jewelry.",
    addresses: []
  },
  {
    id: "CUST-103",
    name: "Divya Singhania",
    email: "divya.singhania@gmail.com",
    phone: "+91 98110 33201",
    ordersCount: 1,
    totalSpentPaise: 123497,
    joinedDate: "2026-08-01",
    lastOrderDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    tags: ["First-time Buyer"],
    notes: "",
    addresses: []
  }
];

export const INITIAL_REVIEWS = [
  {
    id: "REV-1",
    productId: "prod-1",
    productName: "Pearl Bloom Earrings",
    customerName: "Kavita Sharma",
    customerEmail: "kavita.s@example.com",
    rating: 5,
    title: "Mesmerising bridal earrings!",
    excerpt: "The quality of the polki and fresh water pearls took my breath away. Looked straight out of a royal heirloom collection for my sangeet night.",
    date: new Date(Date.now() - 86400000 * 4).toISOString(),
    status: "approved", // pending, approved, rejected
    reply: "Thank you so much Kavita ji! We are delighted to be a small part of your special memories.",
    verifiedPurchase: true,
  },
  {
    id: "REV-2",
    productId: "prod-2",
    productName: "Meena Charm Necklace",
    customerName: "Rohini Deshmukh",
    customerEmail: "rohini.d@example.com",
    rating: 5,
    title: "The green meenakari is flawless",
    excerpt: "The craftsmanship is top tier. Even better than the pictures online. Light weight around the neck too.",
    date: new Date(Date.now() - 86400000 * 1).toISOString(),
    status: "pending",
    reply: "",
    verifiedPurchase: true,
  },
  {
    id: "REV-3",
    productId: "prod-4",
    productName: "Ruby Eternal Ring",
    customerName: "Sneha Kapur",
    customerEmail: "sneha.k@example.com",
    rating: 4,
    title: "Beautiful polish",
    excerpt: "Gave 4 stars because delivery took 5 days instead of 3, but the ring itself is gorgeous.",
    date: new Date(Date.now() - 86400000 * 6).toISOString(),
    status: "approved",
    reply: "Thank you Sneha! We are working closely with BlueDart to expedite transit times.",
    verifiedPurchase: true,
  }
];

export const INITIAL_COUPONS = [
  {
    id: "CPN-1",
    code: "WELCOME10",
    type: "percent", // percent, fixed, free_shipping
    value: 10,
    minOrderPaise: 99900,
    usageLimit: 1000,
    usedCount: 247,
    firstOrderOnly: true,
    onePerCustomer: true,
    status: "active",
    expiryDate: "2027-12-31",
  },
  {
    id: "CPN-2",
    code: "FESTIVE500",
    type: "fixed",
    value: 50000, // ₹500 in paise
    minOrderPaise: 349900,
    usageLimit: 500,
    usedCount: 89,
    firstOrderOnly: false,
    onePerCustomer: true,
    status: "active",
    expiryDate: "2026-11-30",
  },
  {
    id: "CPN-3",
    code: "FREESHIP",
    type: "free_shipping",
    value: 0,
    minOrderPaise: 49900,
    usageLimit: 200,
    usedCount: 65,
    firstOrderOnly: false,
    onePerCustomer: false,
    status: "active",
    expiryDate: "2026-12-31",
  }
];

export const INITIAL_ANNOUNCEMENT = {
  message: "Free Shipping on orders above ₹999 | Handmade with Love ♡",
  link: "/shop",
  linkText: "Shop Collection",
  backgroundColor: "#FAF7F0",
  textColor: "#30251F",
  dismissible: true,
  active: true,
  startDate: "2026-01-01",
  endDate: "2027-12-31",
};

export const INITIAL_HOMEPAGE_SECTIONS = [
  {
    id: "sec-hero",
    type: "hero",
    title: "Hero Showcase",
    enabled: true,
    order: 1,
    headline: "Timeless Handcrafted Jewellery",
    subheadline: "Each piece tells a story — of tradition, artistry and you. Discover curated Kundan, pearl, and meenakari heirlooms made to be cherished.",
    ctaPrimaryText: "Shop Now",
    ctaPrimaryUrl: "/shop",
    ctaSecondaryText: "Explore Collections",
    ctaSecondaryUrl: "#collections",
    backgroundImage: "/images/hero-jewellery.jpg",
    alignment: "left",
  },
  {
    id: "sec-trust",
    type: "trust_bar",
    title: "4-Pillar Trust Bar",
    enabled: true,
    order: 2,
  },
  {
    id: "sec-bestsellers",
    type: "bestsellers",
    title: "Bestsellers Grid",
    enabled: true,
    order: 3,
    mode: "manual", // manual or auto
    productIds: ["prod-1", "prod-2", "prod-3", "prod-4"],
  },
  {
    id: "sec-story",
    type: "story",
    title: "Brand Story & Heritage",
    enabled: true,
    order: 4,
    headline: "More Than Just Jewellery, It's an Emotion",
    storyImage: "/images/brand-story.jpg",
  },
  {
    id: "sec-categories",
    type: "categories",
    title: "Featured Categories",
    enabled: true,
    order: 5,
  },
  {
    id: "sec-testimonials",
    type: "testimonials",
    title: "Patron Testimonials",
    enabled: true,
    order: 6,
  },
  {
    id: "sec-instagram",
    type: "instagram",
    title: "Instagram Feed",
    enabled: true,
    order: 7,
  },
  {
    id: "sec-newsletter",
    type: "newsletter",
    title: "Newsletter Signup",
    enabled: true,
    order: 8,
  }
];

export const INITIAL_POPUPS = [
  {
    id: "pop-welcome",
    name: "Welcome First Order Discount",
    type: "welcome",
    enabled: true,
    triggerType: "time_delay",
    delaySeconds: 5,
    headline: "Enjoy 10% Off Your First Heirloom",
    body: "Subscribe to receive private salon invitations, new collection drops, and an exclusive welcome coupon code.",
    ctaText: "Unlock 10% Off",
    ctaLink: "/shop",
    codeToReveal: "WELCOME10",
    frequency: "once_per_session",
    image: "/images/pearl-bloom-earrings.jpg",
    version: 1,
  },
  {
    id: "pop-exit",
    name: "Exit Intent Cart Reminder",
    type: "exit_intent",
    enabled: false,
    triggerType: "exit_intent",
    delaySeconds: 0,
    headline: "Wait! Don't leave your jewels behind",
    body: "Complete your order now to enjoy complimentary Pan-India courier packaging.",
    ctaText: "Return to Cart",
    ctaLink: "/cart",
    codeToReveal: "FREESHIP",
    frequency: "once_per_user",
    image: "/images/hero-jewellery.jpg",
    version: 1,
  }
];

export const INITIAL_NEWSLETTERS = [
  {
    id: "nl-1",
    email: "ritika.kapoor@gmail.com",
    source: "welcome_popup",
    subscribedDate: "2026-09-12",
    status: "subscribed",
  },
  {
    id: "nl-2",
    email: "priya.nair@icloud.com",
    source: "footer",
    subscribedDate: "2026-10-02",
    status: "subscribed",
  },
  {
    id: "nl-3",
    email: "tanya.bhatia@yahoo.co.in",
    source: "checkout",
    subscribedDate: "2026-10-11",
    status: "subscribed",
  }
];

export const INITIAL_PAGES = [
  {
    slug: "about",
    title: "Our Story & Artistry",
    content: `<h2>The Heart of Zewar by Khushboo</h2><p>Born from a deep reverence for ancestral Indian jewellery craftsmanship, Zewar by Khushboo brings timeless heirlooms to the contemporary woman. Every piece is handcrafted by generational master karigars in Jaipur and Mumbai using fine polki crystals, cultured freshwater pearls, and intricate meenakari enamelling.</p><p>We believe fine adornments should not merely reside inside bank lockers — they belong to your celebrations, family gatherings, and everyday elegance.</p>`,
    metaTitle: "Our Story | Zewar by Khushboo Handcrafted Jewellery",
    metaDescription: "Learn about Khushboo's journey and our generational artisan silversmiths and karigars.",
    published: true,
    updatedAt: "2026-09-20",
  },
  {
    slug: "faq",
    title: "Frequently Asked Questions",
    content: `<h2>Jewellery Care & Orders</h2><p><strong>1. How do I care for my handcrafted jewellery?</strong><br>Store your jewelry in the provided Zewar suede box. Avoid direct contact with perfumes, lotions, or water.</p><p><strong>2. How long does shipping take?</strong><br>We dispatch within 24-48 business hours. Delivery typically takes 4-6 business days across India.</p>`,
    metaTitle: "FAQs | Zewar by Khushboo",
    metaDescription: "Common questions regarding delivery, sizing, and care.",
    published: true,
    updatedAt: "2026-09-15",
  },
  {
    slug: "shipping",
    title: "Shipping & Delivery Policy",
    content: `<h2>Pan-India Shipping Policy</h2><p>We take supreme pride in the safe transit of your heirlooms. All orders are insured during courier transit.</p><ul><li>Free shipping across India on orders above ₹999.</li><li>Express BlueDart air dispatch for prepaid metro orders.</li><li>Discreet, tamper-proof velvet packaging.</li></ul>`,
    metaTitle: "Shipping Policy | Zewar by Khushboo",
    metaDescription: "Pan-India delivery timelines, courier partners and insurance policies.",
    published: true,
    updatedAt: "2026-08-30",
  },
  {
    slug: "returns",
    title: "Returns & Exchange Policy",
    content: `<h2>Hassle-Free 7-Day Exchange</h2><p>We stand completely behind the artistry of each piece. If you receive a damaged piece or incorrect size, contact us within 7 days of delivery for a seamless exchange or store credit.</p>`,
    metaTitle: "Returns & Exchanges | Zewar",
    metaDescription: "Our simple 7-day exchange process for handcrafted jewelry.",
    published: true,
    updatedAt: "2026-08-30",
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    id: "tst-1",
    customerName: "Dr. Radhika Varma",
    location: "New Delhi",
    rating: 5,
    text: "I wore the Meena Charm necklace for my sister's wedding and received non-stop compliments all evening. The weight is balanced so comfortably!",
    productLink: "/product/meena-charm-necklace",
    photo: "/images/meena-charm-necklace.jpg",
    featured: true,
    published: true,
    order: 1,
  },
  {
    id: "tst-2",
    customerName: "Simran Oberoi",
    location: "Chandigarh",
    rating: 5,
    text: "The pearl drops feel so genuine and heavy in hand. The packaging alone makes it feel like unboxing fine heirloom gold.",
    productLink: "/product/pearl-bloom-earrings",
    photo: "/images/pearl-bloom-earrings.jpg",
    featured: true,
    published: true,
    order: 2,
  },
  {
    id: "tst-3",
    customerName: "Ayesha Mukherjee",
    location: "Kolkata",
    rating: 5,
    text: "Fastest dispatch ever. Ordered on Tuesday and had it in hand by Friday noon in bespoke packaging.",
    productLink: "/product/floral-kundan-bracelet",
    photo: "/images/floral-kundan-bracelet.jpg",
    featured: true,
    published: true,
    order: 3,
  }
];

export const INITIAL_INSTAGRAM = [
  {
    id: "ig-1",
    imageUrl: "/images/hero-jewellery.jpg",
    caption: "Subtle royalty in every fold. Polki and emerald tones for modern festive styling. ✨ #ZewarByKhushboo",
    postUrl: "https://www.instagram.com/zewar_by_khushboo/",
    active: true,
    order: 1,
  },
  {
    id: "ig-2",
    imageUrl: "/images/classic-jhumka.jpg",
    caption: "The timeless charm of vintage jhumkas. Handcrafted in pure brass with 22k gold micron. 💛",
    postUrl: "https://www.instagram.com/zewar_by_khushboo/",
    active: true,
    order: 2,
  },
  {
    id: "ig-3",
    imageUrl: "/images/festive-chandbali.jpg",
    caption: "Chandbalis that capture the moon's serenity. Handset polki stones with genuine pearl drops.",
    postUrl: "https://www.instagram.com/zewar_by_khushboo/",
    active: true,
    order: 3,
  },
  {
    id: "ig-4",
    imageUrl: "/images/ruby-eternal-ring.jpg",
    caption: "Statement cocktail rings for your memorable evenings. #ArtisanJewellery #Zewar",
    postUrl: "https://www.instagram.com/zewar_by_khushboo/",
    active: true,
    order: 4,
  }
];

export const INITIAL_SHIPPING_RULES = [
  {
    id: "ship-1",
    name: "Free Shipping Above ₹999",
    condition: "order_total_min",
    conditionValue: 99900,
    action: "free",
    value: 0,
    active: true,
    priority: 1,
  },
  {
    id: "ship-2",
    name: "Standard Flat Rate",
    condition: "order_total_below",
    conditionValue: 99900,
    action: "flat_rate",
    value: 9900, // ₹99
    active: true,
    priority: 2,
  },
  {
    id: "ship-3",
    name: "Express Air Metro Guarantee",
    condition: "weight_below",
    conditionValue: 0.5,
    action: "flat_rate",
    value: 19900, // ₹199
    active: true,
    priority: 3,
  }
];

export const INITIAL_PINCODES = {
  mode: "all_india", // all_india, whitelist, blacklist
  serviceableList: ["400001", "400050", "110001", "560001", "600001", "700001", "500001"],
  blacklistedList: ["790001", "190001"],
  estimatedDays: {
    metro: "2-3 business days",
    nonMetro: "4-6 business days",
  }
};

export const INITIAL_STORE_SETTINGS = {
  brandName: BRAND.name,
  tagline: BRAND.tagline,
  subTagline: BRAND.subTagline,
  logoUrl: "",
  faviconUrl: "",
  contactEmail: BRAND.contactEmail,
  phone: BRAND.whatsappNumber,
  whatsapp: BRAND.whatsappNumber,
  address: "Zewar Studio, Suite 402, Royal Palms, Linking Road, Bandra West, Mumbai 400050, India",
  instagramUrl: BRAND.instagramUrl,
  facebookUrl: "https://facebook.com/zewarbykhushboo",
  pinterestUrl: "https://pinterest.com/zewarbykhushboo",
  currency: "INR",
  locale: "en-IN",
};

export const INITIAL_PAYMENT_SETTINGS = {
  razorpayKeyId: "rzp_live_K8912h8Jk209A",
  razorpayKeySecretMasked: "••••••••••••••••••••••••39A2",
  webhookSecretMasked: "••••••••••••••••w981",
  isTestMode: false,
  upiId: "zewarbykhushboo@hdfcbank",
  codEnabled: true,
  codMinOrderPaise: 50000,
  codMaxOrderPaise: 1000000,
};

export const INITIAL_EMAIL_SETTINGS = {
  provider: "Resend",
  apiKeyMasked: "re_••••••••••••••••94f2",
  fromName: "Zewar by Khushboo",
  fromEmail: "orders@zewarbykhushboo.com",
  replyTo: "care@zewarbykhushboo.com",
  orderConfirmationTemplate: "order_confirmation_v2",
  orderShippedTemplate: "order_shipped_v2",
  welcomeTemplate: "welcome_discount_v1",
};

export const INITIAL_SEO_SETTINGS = {
  defaultTitlePattern: "%s | Zewar by Khushboo — Luxury Handcrafted Jewellery",
  defaultDescription: "Discover exquisite Indian heirloom jewellery, polki chokers, freshwater pearl earrings, and regal meenakari crafted by master artisans.",
  defaultOgImage: "/images/hero-jewellery.jpg",
  googleAnalyticsId: "G-ZW482910X",
  metaPixelId: "109283749281726",
  robotsTxt: `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /checkout/\nSitemap: https://zewarbykhushboo.com/sitemap.xml`,
};

export const INITIAL_USERS = [
  {
    id: "usr-admin-1",
    name: "Khushboo Shah",
    email: "khushboo@zewar.com",
    role: "SUPER_ADMIN",
    status: "active",
    lastLogin: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "usr-admin-2",
    name: "Arjun Verma",
    email: "arjun@zewar.com",
    role: "ADMIN",
    status: "active",
    lastLogin: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "usr-admin-3",
    name: "Pooja Studio Staff",
    email: "staff@zewar.com",
    role: "STAFF",
    status: "active",
    lastLogin: new Date(Date.now() - 3600000 * 5).toISOString(),
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: "AUD-101",
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    userId: "usr-admin-1",
    userName: "Khushboo Shah",
    action: "UPDATE",
    entity: "PRODUCT",
    entityId: "prod-1",
    ip: "103.21.144.12",
    before: { pricePaise: 159900, stock: 12 },
    after: { pricePaise: 149900, stock: 14 },
  },
  {
    id: "AUD-102",
    timestamp: new Date(Date.now() - 3600000 * 19).toISOString(),
    userId: "usr-admin-2",
    userName: "Arjun Verma",
    action: "STATUS_CHANGE",
    entity: "ORDER",
    entityId: "ORD-9480",
    ip: "49.36.110.82",
    before: { fulfillmentStatus: "processing" },
    after: { fulfillmentStatus: "shipped", trackingNumber: "DLV983210444IN" },
  },
  {
    id: "AUD-103",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    userId: "usr-admin-1",
    userName: "Khushboo Shah",
    action: "APPROVE",
    entity: "REVIEW",
    entityId: "REV-1",
    ip: "103.21.144.12",
    before: { status: "pending" },
    after: { status: "approved" },
  }
];
