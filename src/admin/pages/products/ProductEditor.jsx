import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  Save,
  ArrowLeft,
  Sparkles,
  Image as ImageIcon,
  DollarSign,
  Boxes,
  Truck,
  FileSpreadsheet,
  Globe,
  Plus,
  Trash2,
  CheckCircle,
} from 'lucide-react';
import { FormField } from '../../components/FormField';
import { ImageUploader } from '../../components/ImageUploader';
import { RichTextEditor } from '../../components/RichTextEditor';
import { useCmsStore } from '../../lib/cmsStore';

export const ProductEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id && id !== 'new');

  const products = useCmsStore((s) => s.products);
  const categories = useCmsStore((s) => s.categories);
  const addProduct = useCmsStore((s) => s.addProduct);
  const updateProduct = useCmsStore((s) => s.updateProduct);

  const existingProduct = isEditing ? products.find((p) => p.id === id) : null;

  const [activeTab, setActiveTab] = useState('basic');
  const [isSaved, setIsSaved] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    category: 'earrings',
    shortDescription: '',
    longDescription: '',
    tags: '',
    // Media
    images: [],
    // Pricing (stored as paise, edited in rupees)
    priceRupees: 1499,
    compareAtPriceRupees: 1999,
    costPriceRupees: 600,
    taxClass: 'GST_3_PERCENT',
    // Inventory
    trackInventory: true,
    stock: 10,
    lowStockThreshold: 5,
    allowBackorder: false,
    // Variants
    variants: [
      {
        id: 'var-1',
        name: '22k Gold Micron / Antique',
        sku: 'ZBK-VAR-GLD',
        priceRupees: 1499,
        stock: 10,
      },
    ],
    // Shipping
    weight: 0.15,
    length: 8,
    width: 6,
    height: 4,
    shippingClass: 'standard',
    // Specs (key-value pairs)
    specs: [
      { key: 'Materials', value: 'Brass base, 22k gold micron finish, cultured pearls' },
      { key: 'Dimensions', value: 'Length: 4.5 cm | Width: 2 cm' },
      { key: 'Package Contents', value: '1 Pair Earrings, Velvet Keepsake Box' },
      { key: 'Care Guide', value: 'Keep away from moisture and perfumes' },
    ],
    // SEO
    metaTitle: '',
    metaDescription: '',
    ogImage: '',
    // Visibility
    status: 'published',
    featuredOnHome: false,
    newArrival: false,
  });

  // Populate if editing
  useEffect(() => {
    if (existingProduct) {
      setFormData({
        name: existingProduct.name || '',
        slug: existingProduct.slug || '',
        sku: existingProduct.sku || '',
        category: existingProduct.category || 'earrings',
        shortDescription: existingProduct.shortDescription || '',
        longDescription: existingProduct.longDescription || '',
        tags: Array.isArray(existingProduct.tags)
          ? existingProduct.tags.join(', ')
          : existingProduct.tags || '',
        images: existingProduct.images || [],
        priceRupees: Math.round((existingProduct.pricePaise || 0) / 100),
        compareAtPriceRupees: Math.round((existingProduct.compareAtPricePaise || 0) / 100),
        costPriceRupees: Math.round((existingProduct.costPricePaise || 0) / 100),
        taxClass: existingProduct.taxClass || 'GST_3_PERCENT',
        trackInventory: existingProduct.trackInventory !== false,
        stock: existingProduct.stock || 0,
        lowStockThreshold: existingProduct.lowStockThreshold || 5,
        allowBackorder: Boolean(existingProduct.allowBackorder),
        variants:
          existingProduct.variants?.map((v) => ({
            ...v,
            priceRupees: Math.round((v.pricePaise || existingProduct.pricePaise || 0) / 100),
          })) || [],
        weight: existingProduct.weight || 0.15,
        length: existingProduct.dimensions?.length || 8,
        width: existingProduct.dimensions?.width || 6,
        height: existingProduct.dimensions?.height || 4,
        shippingClass: existingProduct.shippingClass || 'standard',
        specs: [
          { key: 'Materials', value: existingProduct.materials || '22k Gold Micron, Polki' },
          { key: 'Dimensions', value: existingProduct.dimensions || 'Standard' },
          { key: 'Package Contents', value: existingProduct.packageContents || '1 Velvet Box' },
          { key: 'Care Guide', value: 'Avoid perfumes and moisture' },
        ],
        metaTitle: existingProduct.metaTitle || '',
        metaDescription: existingProduct.metaDescription || '',
        ogImage: existingProduct.ogImage || '',
        status: existingProduct.status || 'published',
        featuredOnHome: Boolean(existingProduct.featuredOnHome || existingProduct.isBestSeller),
        newArrival: Boolean(existingProduct.newArrival || existingProduct.isNewArrival),
      });
    }
  }, [existingProduct]);

  // Auto-generate slug from name if not manually modified
  const handleNameChange = (newName) => {
    setFormData((prev) => ({
      ...prev,
      name: newName,
      slug: !isEditing ? newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : prev.slug,
      metaTitle: !isEditing ? `${newName} | Zewar by Khushboo` : prev.metaTitle,
    }));
  };

  const handleAddSpecRow = () => {
    setFormData((prev) => ({
      ...prev,
      specs: [...prev.specs, { key: '', value: '' }],
    }));
  };

  const handleRemoveSpecRow = (idx) => {
    setFormData((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== idx),
    }));
  };

  const handleSpecChange = (idx, field, val) => {
    setFormData((prev) => {
      const copy = [...prev.specs];
      copy[idx] = { ...copy[idx], [field]: val };
      return { ...prev, specs: copy };
    });
  };

  const handleAddVariant = () => {
    const newVar = {
      id: `var-${Date.now()}`,
      name: 'Custom Finish',
      sku: `${formData.sku}-VAR`,
      priceRupees: formData.priceRupees,
      stock: 5,
    };
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, newVar],
    }));
  };

  const handleVariantChange = (idx, field, val) => {
    setFormData((prev) => {
      const copy = [...prev.variants];
      copy[idx] = { ...copy[idx], [field]: val };
      return { ...prev, variants: copy };
    });
  };

  const handleRemoveVariant = (idx) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Product name is required');
      return;
    }

    const pricePaise = Math.round(Number(formData.priceRupees) * 100);
    const compareAtPricePaise = Math.round(Number(formData.compareAtPriceRupees) * 100);
    const costPricePaise = Math.round(Number(formData.costPriceRupees) * 100);

    const payload = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sku: formData.sku || `ZBK-PROD-${Date.now().toString().slice(-4)}`,
      category: formData.category,
      categoryName: categories.find((c) => c.id === formData.category)?.name || formData.category,
      shortDescription: formData.shortDescription,
      longDescription: formData.longDescription,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      images: formData.images.map((img) => (typeof img === 'string' ? img : img.url)),
      pricePaise,
      compareAtPricePaise,
      costPricePaise,
      taxClass: formData.taxClass,
      trackInventory: formData.trackInventory,
      stock: Number(formData.stock),
      lowStockThreshold: Number(formData.lowStockThreshold),
      allowBackorder: formData.allowBackorder,
      variants: formData.variants.map((v) => ({
        ...v,
        pricePaise: Math.round(Number(v.priceRupees) * 100),
      })),
      weight: Number(formData.weight),
      dimensions: {
        length: Number(formData.length),
        width: Number(formData.width),
        height: Number(formData.height),
      },
      shippingClass: formData.shippingClass,
      materials: formData.specs.find((s) => s.key.toLowerCase().includes('mat'))?.value || '',
      packageContents: formData.specs.find((s) => s.key.toLowerCase().includes('pack'))?.value || '',
      metaTitle: formData.metaTitle || `${formData.name} | Zewar by Khushboo`,
      metaDescription: formData.metaDescription || formData.shortDescription,
      ogImage: formData.images[0] ? (typeof formData.images[0] === 'string' ? formData.images[0] : formData.images[0].url) : '',
      status: formData.status,
      isBestSeller: formData.featuredOnHome,
      isNewArrival: formData.newArrival,
      featuredOnHome: formData.featuredOnHome,
      newArrival: formData.newArrival,
    };

    if (isEditing) {
      updateProduct(id, payload);
    } else {
      addProduct(payload);
    }

    setIsSaved(true);
    setTimeout(() => {
      navigate('/admin/products');
    }, 400);
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Sparkles },
    { id: 'media', label: 'Media & Gallery', icon: ImageIcon },
    { id: 'pricing', label: 'Pricing & Taxes', icon: DollarSign },
    { id: 'inventory', label: 'Inventory & Variants', icon: Boxes },
    { id: 'shipping', label: 'Shipping & Dimensions', icon: Truck },
    { id: 'specs', label: 'Attributes & Specs', icon: FileSpreadsheet },
    { id: 'seo', label: 'SEO & Visibility', icon: Globe },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-sand-border/80">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="p-2 border border-sand-border hover:bg-sand/30 rounded-[2px] text-espresso/70 hover:text-espresso transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="min-w-0">
            <h1 className="font-serif text-xl sm:text-2xl font-medium text-espresso truncate">
              {isEditing ? `Edit: ${formData.name || 'Product'}` : 'Create New Product'}
            </h1>
            <p className="font-sans text-xs text-espresso/60 truncate">
              Configure product details, photography, pricing in INR, and inventory rules.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="flex-1 sm:flex-none px-4 py-2 border border-sand-border hover:bg-sand/30 text-espresso text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors text-center"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
          >
            {isSaved ? <CheckCircle className="w-4 h-4 text-espresso" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? 'Saved!' : 'Save Product'}</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-sand-border overflow-x-auto scrollbar-none gap-2 bg-white px-2 py-1.5 rounded-[4px] shadow-xs flex-nowrap">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-[2px] text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                isActive
                  ? 'bg-espresso text-ivory font-semibold shadow-xs'
                  : 'text-espresso/70 hover:text-espresso hover:bg-sand/30'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <form onSubmit={handleSubmit} className="bg-white border border-sand-border/80 rounded-[4px] p-4 sm:p-6 shadow-subtle">
        {/* 1. BASIC INFO */}
        {activeTab === 'basic' && (
          <div className="space-y-6 max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Product Title" required helperText="The public title displayed on storefront and collections">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Meenakari Polki Choker"
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] focus:ring-2 focus:ring-champagne outline-none"
                />
              </FormField>

              <FormField label="URL Slug" required helperText="Auto-generated URL identifier">
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="meenakari-polki-choker"
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] font-mono focus:ring-2 focus:ring-champagne outline-none"
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="SKU Identifier" required helperText="Unique stock keeping unit code">
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="ZBK-NCK-001"
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] font-mono focus:ring-2 focus:ring-champagne outline-none"
                />
              </FormField>

              <FormField label="Category" required helperText="Primary collection category">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] focus:ring-2 focus:ring-champagne outline-none bg-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            <FormField label="Short Description" helperText="1-2 sentences shown on summary cards & quick-view">
              <textarea
                rows={2}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Handcrafted choker with regal emerald green meenakari..."
                className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] focus:ring-2 focus:ring-champagne outline-none leading-relaxed"
              />
            </FormField>

            <FormField label="Long Editorial Story & Details" helperText="Full story, craftsmanship, styling tips">
              <RichTextEditor
                value={formData.longDescription}
                onChange={(val) => setFormData({ ...formData, longDescription: val })}
              />
            </FormField>

            <FormField label="Tags / Keywords" helperText="Comma separated tags (e.g. polki, wedding, bestseller, choker)">
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="bridal, heirloom, polki, gold"
                className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] focus:ring-2 focus:ring-champagne outline-none"
              />
            </FormField>
          </div>
        )}

        {/* 2. MEDIA */}
        {activeTab === 'media' && (
          <div className="space-y-4 max-w-4xl">
            <h3 className="font-serif text-base font-medium text-espresso">
              Product Photography & Covers
            </h3>
            <p className="text-xs text-espresso/60 leading-relaxed">
              Upload multiple images. The first image serves as the primary catalogue cover. Reorder with left/right arrows, specify SEO alt text, or add via URL.
            </p>
            <ImageUploader
              images={formData.images}
              onChange={(newImages) => setFormData({ ...formData, images: newImages })}
            />
          </div>
        )}

        {/* 3. PRICING */}
        {activeTab === 'pricing' && (
          <div className="space-y-6 max-w-2xl">
            <h3 className="font-serif text-base font-medium text-espresso">
              Pricing Structure (INR)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Selling Price (₹)" required helperText="Customer checkout price">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-espresso/60 font-semibold text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={formData.priceRupees}
                    onChange={(e) => setFormData({ ...formData, priceRupees: Number(e.target.value) })}
                    className="w-full pl-8 pr-3 py-2 text-xs border border-sand-border rounded-[2px] font-semibold focus:ring-2 focus:ring-champagne outline-none"
                  />
                </div>
              </FormField>

              <FormField label="Compare-At Price (₹)" helperText="Original strike-through price">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-espresso/60 font-semibold text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={formData.compareAtPriceRupees}
                    onChange={(e) => setFormData({ ...formData, compareAtPriceRupees: Number(e.target.value) })}
                    className="w-full pl-8 pr-3 py-2 text-xs border border-sand-border rounded-[2px] focus:ring-2 focus:ring-champagne outline-none"
                  />
                </div>
              </FormField>

              <FormField label="Cost Price (Internal ₹)" helperText="Studio karigar base cost">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-espresso/60 font-semibold text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={formData.costPriceRupees}
                    onChange={(e) => setFormData({ ...formData, costPriceRupees: Number(e.target.value) })}
                    className="w-full pl-8 pr-3 py-2 text-xs border border-sand-border rounded-[2px] focus:ring-2 focus:ring-champagne outline-none"
                  />
                </div>
              </FormField>
            </div>

            <div className="p-4 bg-sand/30 border border-sand-border rounded-[2px] flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-espresso">Estimated Gross Margin</p>
                <p className="text-[11px] text-espresso/60">
                  Calculated from selling price minus internal cost
                </p>
              </div>
              <span className="font-serif text-lg font-bold text-emerald-800">
                {formData.priceRupees > 0
                  ? `${Math.round(((formData.priceRupees - formData.costPriceRupees) / formData.priceRupees) * 100)}%`
                  : '0%'}
              </span>
            </div>

            <FormField label="GST Tax Class" helperText="Standard jewellery tax classification in India">
              <select
                value={formData.taxClass}
                onChange={(e) => setFormData({ ...formData, taxClass: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] focus:ring-2 focus:ring-champagne outline-none bg-white"
              >
                <option value="GST_3_PERCENT">GST 3% (Standard Precious & Handcrafted Jewellery)</option>
                <option value="GST_5_PERCENT">GST 5%</option>
                <option value="GST_EXEMPT">Exempt / Zero Rated</option>
              </select>
            </FormField>
          </div>
        )}

        {/* 4. INVENTORY & VARIANTS */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between p-4 bg-ivory/60 border border-sand-border rounded-[2px]">
              <div>
                <p className="text-xs font-semibold text-espresso">Track Inventory</p>
                <p className="text-[11px] text-espresso/60">
                  Automatically decrement stock when orders are placed.
                </p>
              </div>
              <input
                type="checkbox"
                checked={formData.trackInventory}
                onChange={(e) => setFormData({ ...formData, trackInventory: e.target.checked })}
                className="w-4 h-4 text-champagne rounded focus:ring-champagne border-sand-border"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Current Available Stock" required helperText="Available units in workshop">
                <input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] font-semibold focus:ring-2 focus:ring-champagne outline-none"
                />
              </FormField>

              <FormField label="Low Stock Alert Threshold" helperText="Triggers warning when stock falls below">
                <input
                  type="number"
                  min="1"
                  value={formData.lowStockThreshold}
                  onChange={(e) => setFormData({ ...formData, lowStockThreshold: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] focus:ring-2 focus:ring-champagne outline-none"
                />
              </FormField>
            </div>

            {/* Variants table */}
            <div className="pt-4 border-t border-sand-border/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-medium text-espresso">
                    Product Variants
                  </h4>
                  <p className="text-[11px] text-espresso/60">
                    Different finishes, plating options (e.g. Antique Gold, Rose Gold, Silver), or sizes.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddVariant}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-sand-border hover:bg-sand/30 text-espresso text-xs font-semibold rounded-[2px] transition-colors"
                >
                  <Plus className="w-3 h-3 text-champagne-dark" />
                  <span>Add Variant</span>
                </button>
              </div>

              <div className="space-y-2">
                {formData.variants.map((v, idx) => (
                  <div
                    key={v.id || idx}
                    className="flex flex-col sm:grid sm:grid-cols-12 gap-2 p-3 bg-ivory/30 border border-sand-border rounded-[2px] text-xs"
                  >
                    <div className="sm:col-span-4">
                      <label className="text-[10px] text-espresso/50 font-semibold uppercase sm:hidden block mb-0.5">Name</label>
                      <input
                        type="text"
                        value={v.name}
                        onChange={(e) => handleVariantChange(idx, 'name', e.target.value)}
                        placeholder="Variant name"
                        className="w-full px-2.5 py-1.5 bg-white border border-sand-border rounded-[2px] text-xs outline-none"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="text-[10px] text-espresso/50 font-semibold uppercase sm:hidden block mb-0.5">SKU</label>
                      <input
                        type="text"
                        value={v.sku}
                        onChange={(e) => handleVariantChange(idx, 'sku', e.target.value)}
                        placeholder="Variant SKU"
                        className="w-full px-2.5 py-1.5 bg-white border border-sand-border rounded-[2px] text-xs font-mono outline-none"
                      />
                    </div>
                    <div className="flex gap-2 sm:contents">
                      <div className="flex-1 sm:col-span-2">
                        <label className="text-[10px] text-espresso/50 font-semibold uppercase sm:hidden block mb-0.5">Price (₹)</label>
                        <input
                          type="number"
                          value={v.priceRupees}
                          onChange={(e) => handleVariantChange(idx, 'priceRupees', Number(e.target.value))}
                          placeholder="₹ Price"
                          className="w-full px-2.5 py-1.5 bg-white border border-sand-border rounded-[2px] text-xs outline-none"
                        />
                      </div>
                      <div className="flex-1 sm:col-span-2">
                        <label className="text-[10px] text-espresso/50 font-semibold uppercase sm:hidden block mb-0.5">Stock</label>
                        <input
                          type="number"
                          value={v.stock}
                          onChange={(e) => handleVariantChange(idx, 'stock', Number(e.target.value))}
                          placeholder="Stock"
                          className="w-full px-2.5 py-1.5 bg-white border border-sand-border rounded-[2px] text-xs outline-none"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-1 flex items-center justify-end sm:justify-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveVariant(idx)}
                        className="p-1.5 hover:bg-rose-50 text-rose-600 rounded"
                        aria-label="Remove variant"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. SHIPPING */}
        {activeTab === 'shipping' && (
          <div className="space-y-6 max-w-2xl">
            <h3 className="font-serif text-base font-medium text-espresso">
              Parcel Packaging & Shipping Weight
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Gross Weight (in kg)" helperText="Includes jewellery item and velvet box">
                <input
                  type="number"
                  step="0.01"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] focus:ring-2 focus:ring-champagne outline-none"
                />
              </FormField>

              <FormField label="Shipping Class" helperText="Courier profile used for rate calculation">
                <select
                  value={formData.shippingClass}
                  onChange={(e) => setFormData({ ...formData, shippingClass: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] focus:ring-2 focus:ring-champagne outline-none bg-white"
                >
                  <option value="standard">Standard Pan-India (4-6 Days)</option>
                  <option value="express_air">Express BlueDart Air (24-48 Hours)</option>
                  <option value="heavy_fragile">Fragile Heirloom Casket</option>
                </select>
              </FormField>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <FormField label="Length (cm)">
                <input
                  type="number"
                  value={formData.length}
                  onChange={(e) => setFormData({ ...formData, length: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] focus:ring-2 focus:ring-champagne outline-none"
                />
              </FormField>
              <FormField label="Width (cm)">
                <input
                  type="number"
                  value={formData.width}
                  onChange={(e) => setFormData({ ...formData, width: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] focus:ring-2 focus:ring-champagne outline-none"
                />
              </FormField>
              <FormField label="Height (cm)">
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] focus:ring-2 focus:ring-champagne outline-none"
                />
              </FormField>
            </div>
          </div>
        )}

        {/* 6. SPECS */}
        {activeTab === 'specs' && (
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-base font-medium text-espresso">
                  Product Specifications & Care Attributes
                </h3>
                <p className="text-xs text-espresso/60">
                  Key-value pairs rendered in the PDP accordion tabs.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddSpecRow}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-sand-border hover:bg-sand/30 text-espresso text-xs font-semibold rounded-[2px] transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-champagne-dark" />
                <span>Add Row</span>
              </button>
            </div>

            <div className="space-y-2">
              {formData.specs.map((row, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 sm:p-0 bg-ivory/20 sm:bg-transparent rounded sm:rounded-none border sm:border-0 border-sand-border/60">
                  <input
                    type="text"
                    value={row.key}
                    onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                    placeholder="Attribute (e.g. Closure)"
                    className="w-full sm:w-1/3 px-3 py-1.5 text-xs border border-sand-border rounded-[2px] font-semibold text-espresso outline-none bg-white"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      value={row.value}
                      onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                      placeholder="Value (e.g. Post back with push lock)"
                      className="flex-1 px-3 py-1.5 text-xs border border-sand-border rounded-[2px] text-espresso outline-none bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecRow(idx)}
                      className="p-1.5 hover:bg-rose-50 text-rose-600 rounded transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. SEO & VISIBILITY */}
        {activeTab === 'seo' && (
          <div className="space-y-6 max-w-2xl">
            <h3 className="font-serif text-base font-medium text-espresso">
              Visibility & Search Engine Optimization
            </h3>

            {/* Visibility switches */}
            <div className="space-y-3 p-4 bg-ivory/50 border border-sand-border rounded-[2px]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-espresso">Publish Status</p>
                  <p className="text-[11px] text-espresso/60">
                    Published items appear on public storefront; drafts remain back-of-house only.
                  </p>
                </div>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="px-3 py-1 bg-white border border-sand-border rounded-[2px] text-xs font-semibold outline-none"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-sand-border/50">
                <div>
                  <p className="text-xs font-semibold text-espresso">Feature on Homepage</p>
                  <p className="text-[11px] text-espresso/60">Include in Bestsellers curated showcase.</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.featuredOnHome}
                  onChange={(e) => setFormData({ ...formData, featuredOnHome: e.target.checked })}
                  className="w-4 h-4 text-champagne rounded focus:ring-champagne border-sand-border"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-sand-border/50">
                <div>
                  <p className="text-xs font-semibold text-espresso">New Arrival Badge</p>
                  <p className="text-[11px] text-espresso/60">Displays golden &quot;New Arrival&quot; pill tag on cards.</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.newArrival}
                  onChange={(e) => setFormData({ ...formData, newArrival: e.target.checked })}
                  className="w-4 h-4 text-champagne rounded focus:ring-champagne border-sand-border"
                />
              </div>
            </div>

            <FormField label="Meta Title" helperText="Shown in Google search results and browser title tab">
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                placeholder="Product Title | Zewar by Khushboo"
                className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] focus:ring-2 focus:ring-champagne outline-none"
              />
            </FormField>

            <FormField label="Meta Description" helperText="Search engine result snippet (150-160 characters recommended)">
              <textarea
                rows={3}
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                placeholder="Exquisite polki and kundan handcrafted jewelry..."
                className="w-full px-3 py-2 text-xs border border-sand-border rounded-[2px] focus:ring-2 focus:ring-champagne outline-none leading-relaxed"
              />
            </FormField>
          </div>
        )}
      </form>
    </div>
  );
};
