import React, { useState } from 'react';
import { Upload, X, Save, Trash2, Info, MoreVertical, ChevronDown, Plus, Tag } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function AddProduct({ onBack, onSave, editingProduct }) {
  const [images, setImages] = useState(editingProduct?.images || []);
  const [activeStep, setActiveStep] = useState(1);
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);
  const [availableCategories, setAvailableCategories] = useState(['Female Fashion', 'Male Fashion']);
  const [availableSizes, setAvailableSizes] = useState(['XL', 'L', 'M', 'S']);
  const [availableBrands, setAvailableBrands] = useState(['ZARA', 'Nike', 'Adidas']);
  const { currency } = useTheme();

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSizeName, setNewSizeName] = useState('');
  const [newBrandName, setNewBrandName] = useState('');

  const [formData, setFormData] = useState({
    id: editingProduct?.id || null,
    name: editingProduct?.name || '',
    description: editingProduct?.description || '',
    category: editingProduct?.category || '',
    sku: editingProduct?.sku || '',
    stock: editingProduct?.stock || '',
    status: editingProduct?.status || 'In Stock',
    salePriceRetail: editingProduct?.salePriceRetail || editingProduct?.price?.replace(/[₹$€£¥]/g, '') || '',
    salePriceWholesale: editingProduct?.salePriceWholesale || '',
    cost: editingProduct?.cost || '',
    discountPercent: editingProduct?.discountPercent || '',
    size: editingProduct?.size || 'L',
    brand: editingProduct?.brand || 'ZARA',
    color: editingProduct?.color || '#5b5fc7'
  });

  const handleImageUpload = (e, index) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const newImage = URL.createObjectURL(files[0]);

    setImages(prev => {
      const updated = [...prev];
      updated[index] = newImage;
      return updated;
    });
  };

  const removeImage = (index) => {
    setImages(prev => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim() && !availableCategories.includes(newCategoryName.trim())) {
      const name = newCategoryName.trim();
      setAvailableCategories(prev => [...prev, name]);
      setFormData(prev => ({ ...prev, category: name.toLowerCase() })); // Auto-select new category
      setNewCategoryName('');
    }
  };

  const removeCategory = (catToRemove) => {
    setAvailableCategories(prev => prev.filter(cat => cat !== catToRemove));
    if (formData.category === catToRemove.toLowerCase()) {
      setFormData({ ...formData, category: '' });
    }
  };

  const handleAddSize = () => {
    if (newSizeName.trim() && !availableSizes.includes(newSizeName.trim())) {
      setAvailableSizes(prev => [...prev, newSizeName.trim()]);
      setNewSizeName('');
    }
  };

  const removeSize = (sizeToRemove) => {
    setAvailableSizes(prev => prev.filter(s => s !== sizeToRemove));
    if (formData.size === sizeToRemove) {
      setFormData({ ...formData, size: '' });
    }
  };

  const handleAddBrand = () => {
    if (newBrandName.trim() && !availableBrands.includes(newBrandName.trim())) {
      setAvailableBrands(prev => [...prev, newBrandName.trim()]);
      setNewBrandName('');
    }
  };

  const removeBrand = (brandToRemove) => {
    setAvailableBrands(prev => prev.filter(b => b !== brandToRemove));
    if (formData.brand === brandToRemove) {
      setFormData({ ...formData, brand: '' });
    }
  };

  const handleSave = () => {
    if (!formData.name) {
      alert('Please fill in at least the product name.');
      return;
    }
    onSave({
      ...formData,
      price: formData.salePriceRetail ? `${currency}${formData.salePriceRetail}` : `${currency}0.00`,
      currency: currency,
      images: images.filter(img => img !== null),
      flag: '📦'
    });
  };

  const inputStyle = {
    backgroundColor: 'var(--bg-input)',
    borderColor: 'var(--border-color)',
    color: 'var(--text-primary)',
  };

  const StepCard = ({ number, title, active }) => (
    <div
      className={`flex-1 p-4 md:p-6 rounded-[20px] border-2 transition-all cursor-pointer ${active ? 'border-brand-blue bg-white dark:bg-zinc-800 shadow-lg shadow-brand-blue/5' : 'border-transparent '
        }`}
      onClick={() => setActiveStep(number)}
    >
      <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1 ${active ? 'text-brand-blue' : 'text-zinc-400'}`}>
        STEP- {number}
      </p>
      <h4 className={`text-xs md:text-sm font-black whitespace-nowrap overflow-hidden text-ellipsis ${active ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-400'}`}>
        {title}
      </h4>
    </div>
  );

  const CustomDropzone = ({ index, isLarge = false }) => (
    <div className={`relative group ${isLarge ? 'h-64 md:h-80 w-full mb-6' : 'aspect-square'}`}>
      <label className={`w-full h-full border-2 border-dashed rounded-[24px] flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${images[index] ? 'border-solid' : 'hover:bg-brand-blue/5'
        }`} style={{ borderColor: images[index] ? 'var(--border-color)' : 'var(--border-color)' }}>
        {images[index] ? (
          <img src={images[index]} alt="Product" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center text-center px-6">
            <div className={`rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center mb-4 ${isLarge ? 'w-16 h-16' : 'w-10 h-10'}`}>
              <Upload size={isLarge ? 32 : 20} className="text-zinc-400" />
            </div>
            {isLarge && (
              <p className="text-sm font-bold text-zinc-400 leading-relaxed max-w-[200px]">
                Perform a drag-and-drop action to upload the file here.
              </p>
            )}
          </div>
        )}
        <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, index)} accept="image/*" />
      </label>
      {images[index] && (
        <button
          onClick={() => removeImage(index)}
          className="absolute top-4 right-4 p-2 bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg"
        >
          <X size={14} strokeWidth={3} />
        </button>
      )}
    </div>
  );

  const renderStepContent = () => {
    if (activeStep === 1) return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="space-y-4">
          <label className="text-sm font-black mb-2" style={{ color: 'var(--text-primary)' }}>Product Name</label>
          <input type="text" placeholder="e.g. KNIT SWEATER WITH POCKETS" className="w-full px-6 py-4 rounded-xl border focus:outline-none focus:border-brand-blue transition-all font-bold text-sm" style={inputStyle} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Stock Quantity</label>
            <input
              type="number"
              placeholder="e.g. 150"
              className="w-full px-6 py-4 rounded-xl border focus:outline-none focus:border-brand-blue transition-all font-bold text-sm"
              style={inputStyle}
              value={formData.stock}
              onChange={(e) => {
                const stockVal = parseInt(e.target.value) || 0;
                let autoStatus = 'In Stock';
                if (stockVal === 0) autoStatus = 'Out of Stock';
                else if (stockVal <= 10) autoStatus = 'Low Stock';

                setFormData({
                  ...formData,
                  stock: stockVal,
                  status: autoStatus
                });
              }}
            />
          </div>
          <div className="space-y-4">
            <label className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Manual Status</label>
            <div className="relative">
              <select
                className="w-full px-6 py-4 rounded-xl border focus:outline-none focus:border-brand-blue transition-all appearance-none font-bold text-sm cursor-pointer"
                style={inputStyle}
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={18} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Product Category</label>
            <div className="relative">
              <select
                className="w-full px-6 py-4 rounded-xl border focus:outline-none focus:border-brand-blue transition-all appearance-none font-bold text-sm cursor-pointer"
                style={inputStyle}
                value={formData.category}
                onChange={(e) => {
                  if (e.target.value === 'ADD_NEW') {
                    setIsCategoryModalOpen(true);
                  } else {
                    setFormData({ ...formData, category: e.target.value });
                  }
                }}
              >
                <option value="">Select Category</option>
                {availableCategories.map((cat, i) => (
                  <option key={i} value={cat.toLowerCase()}>{cat}</option>
                ))}
                <option value="ADD_NEW" className="text-brand-blue font-black">+ Add New Category</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={18} />
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Product SKU</label>
            <input type="text" placeholder="e.g. BBS-SID-24" className="w-full px-6 py-4 rounded-xl border focus:outline-none focus:border-brand-blue transition-all font-bold text-sm" style={inputStyle} value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} />
          </div>
        </div>
        <div className="space-y-4">
          <label className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Description</label>
          <textarea rows="8" placeholder="Type your product description here..." className="w-full px-6 py-4 rounded-xl border focus:outline-none focus:border-brand-blue transition-all font-bold text-sm resize-none" style={inputStyle} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        </div>
      </div>
    );

    if (activeStep === 2) return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Size</label>
            <div className="relative">
              <select
                className="w-full px-6 py-4 rounded-xl border focus:outline-none focus:border-brand-blue transition-all  appearance-none font-bold text-sm cursor-pointer"
                style={inputStyle}
                value={formData.size}
                onChange={(e) => {
                  if (e.target.value === 'ADD_NEW') setIsSizeModalOpen(true);
                  else setFormData({ ...formData, size: e.target.value });
                }}
              >
                <option value="">Select Size</option>
                {availableSizes.map((s, i) => <option key={i} value={s}>{s}</option>)}
                <option value="ADD_NEW" className="text-brand-blue font-black">+ Add New Size</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={18} />
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Brands</label>
            <div className="relative">
              <select
                className="w-full px-6 py-4 rounded-xl border focus:outline-none focus:border-brand-blue transition-all  appearance-none font-bold text-sm cursor-pointer"
                style={inputStyle}
                value={formData.brand}
                onChange={(e) => {
                  if (e.target.value === 'ADD_NEW') setIsBrandModalOpen(true);
                  else setFormData({ ...formData, brand: e.target.value });
                }}
              >
                <option value="">Select Brand</option>
                {availableBrands.map((b, i) => <option key={i} value={b}>{b}</option>)}
                <option value="ADD_NEW" className="text-brand-blue font-black">+ Add New Brand</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={18} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Store</label>
            <div className="relative">
              <select className="w-full px-6 py-4 rounded-xl border focus:outline-none focus:border-brand-blue transition-all  appearance-none font-bold text-sm cursor-pointer" style={inputStyle}>
                <option>Enter store</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={18} />
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Color</label>
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Camel"
                  className="w-full px-6 py-4 rounded-xl border focus:outline-none focus:border-brand-blue transition-all  font-bold text-sm uppercase"
                  style={inputStyle}
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
                <Tag size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400" />
              </div>
              <div className="relative group">
                <input
                  type="color"
                  className="w-14 h-full rounded-xl border cursor-pointer p-1 "
                  style={inputStyle}
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    if (activeStep === 3) return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="space-y-4">
          <label className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Sale Price at Retail</label>
          <div className="flex border rounded-xl overflow-hidden focus-within:border-brand-blue transition-all" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card-inner)' }}>
            <div className="px-5 py-4 border-r bg-zinc-50 dark:bg-zinc-800/40 font-black text-zinc-400">
              {currency}
            </div>
            <input
              type="number"
              placeholder="220.41"
              className="flex-1 px-6 py-4 bg-transparent focus:outline-none font-bold text-sm"
              style={{ color: 'var(--text-primary)' }}
              value={formData.salePriceRetail}
              onChange={(e) => setFormData({ ...formData, salePriceRetail: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Sale Price at Wholesale</label>
          <div className="flex border rounded-xl overflow-hidden focus-within:border-brand-blue transition-all" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card-inner)' }}>
            <div className="px-5 py-4 border-r bg-zinc-50 dark:bg-zinc-800/40 font-black text-zinc-400">
              {currency}
            </div>
            <input
              type="number"
              placeholder="230.54"
              className="flex-1 px-6 py-4 bg-transparent focus:outline-none font-bold text-sm"
              style={{ color: 'var(--text-primary)' }}
              value={formData.salePriceWholesale}
              onChange={(e) => setFormData({ ...formData, salePriceWholesale: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Cost</label>
          <div className="flex border rounded-xl overflow-hidden focus-within:border-brand-blue transition-all" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card-inner)' }}>
            <div className="px-5 py-4 border-r bg-zinc-50 dark:bg-zinc-800/40 font-black text-zinc-400">
              {currency}
            </div>
            <input
              type="number"
              placeholder="210.99"
              className="flex-1 px-6 py-4 bg-transparent focus:outline-none font-bold text-sm"
              style={{ color: 'var(--text-primary)' }}
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Discount Price %</label>
          <input
            type="text"
            placeholder="Enter Discount price"
            className="w-full px-6 py-4 rounded-xl border focus:outline-none focus:border-brand-blue transition-all  font-bold text-sm"
            style={inputStyle}
            value={formData.discountPercent}
            onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in duration-500 pb-10 max-w-full overflow-hidden">
      {/* Category Management Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCategoryModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-[32px] border p-6 md:p-10 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]" style={inputStyle}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>Manage Categories</h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                <X size={20} className="text-zinc-400" />
              </button>
            </div>

            <div className="space-y-6 overflow-hidden flex flex-col">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Add New Category</label>
                <div className="flex gap-2">
                  <input
                    autoFocus
                    type="text"
                    placeholder="e.g. Kids Fashion"
                    className="flex-1 px-6 py-4 rounded-xl border focus:outline-none focus:border-brand-blue bg-zinc-50 dark:bg-zinc-800/40 font-bold text-sm"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                  />
                  <button
                    onClick={handleAddCategory}
                    className="p-4 bg-brand-blue text-white rounded-xl shadow-lg shadow-brand-blue/20 hover:scale-[1.05] transition-all"
                  >
                    <Plus size={20} strokeWidth={3} />
                  </button>
                </div>
              </div>

              <div className="space-y-3 flex-1 overflow-hidden flex flex-col">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Existing Categories</label>
                <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                  {availableCategories.map((cat, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-all group">
                      <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{cat}</span>
                      <button
                        onClick={() => removeCategory(cat)}
                        className="p-2 text-rose-500 opacity-0 group-hover:opacity-100 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  {availableCategories.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-sm text-zinc-400 font-medium italic">No categories added yet.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <button onClick={() => setIsCategoryModalOpen(false)} className="w-full px-6 py-4 bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white rounded-xl font-black text-sm shadow-xl hover:scale-[1.02] transition-all">Done</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Size Management Modal */}
      {isSizeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSizeModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-[32px] border p-6 md:p-10 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]" style={inputStyle}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>Manage Sizes</h3>
              <button onClick={() => setIsSizeModalOpen(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                <X size={20} className="text-zinc-400" />
              </button>
            </div>
            <div className="space-y-6 overflow-hidden flex flex-col">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Add New Size</label>
                <div className="flex gap-2">
                  <input autoFocus type="text" placeholder="e.g. XXL" className="flex-1 px-6 py-4 rounded-xl border focus:outline-none focus:border-brand-blue bg-zinc-50 dark:bg-zinc-800/40 font-bold text-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} value={newSizeName} onChange={(e) => setNewSizeName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddSize()} />
                  <button onClick={handleAddSize} className="p-4 bg-brand-blue text-white rounded-xl shadow-lg shadow-brand-blue/20 hover:scale-[1.05] transition-all"><Plus size={20} strokeWidth={3} /></button>
                </div>
              </div>
              <div className="space-y-3 flex-1 overflow-hidden flex flex-col">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Existing Sizes</label>
                <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                  {availableSizes.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-all group">
                      <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{s}</span>
                      <button onClick={() => removeSize(s)} className="p-2 text-rose-500 opacity-0 group-hover:opacity-100 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4"><button onClick={() => setIsSizeModalOpen(false)} className="w-full px-6 py-4 bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white rounded-xl font-black text-sm shadow-xl hover:scale-[1.02] transition-all">Done</button></div>
            </div>
          </div>
        </div>
      )}

      {/* Brand Management Modal */}
      {isBrandModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsBrandModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-[32px] border p-10 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]" style={inputStyle}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>Manage Brands</h3>
              <button onClick={() => setIsBrandModalOpen(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                <X size={20} className="text-zinc-400" />
              </button>
            </div>
            <div className="space-y-6 overflow-hidden flex flex-col">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Add New Brand</label>
                <div className="flex gap-2">
                  <input autoFocus type="text" placeholder="e.g. Puma" className="flex-1 px-6 py-4 rounded-xl border focus:outline-none focus:border-brand-blue bg-zinc-50 dark:bg-zinc-800/40 font-bold text-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} value={newBrandName} onChange={(e) => setNewBrandName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddBrand()} />
                  <button onClick={handleAddBrand} className="p-4 bg-brand-blue text-white rounded-xl shadow-lg shadow-brand-blue/20 hover:scale-[1.05] transition-all"><Plus size={20} strokeWidth={3} /></button>
                </div>
              </div>
              <div className="space-y-3 flex-1 overflow-hidden flex flex-col">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Existing Brands</label>
                <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                  {availableBrands.map((b, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-all group">
                      <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{b}</span>
                      <button onClick={() => removeBrand(b)} className="p-2 text-rose-500 opacity-0 group-hover:opacity-100 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4"><button onClick={() => setIsBrandModalOpen(false)} className="w-full px-6 py-4 bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white rounded-xl font-black text-sm shadow-xl hover:scale-[1.02] transition-all">Done</button></div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center px-2">
        <h2 className="text-xl md:text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>{editingProduct ? 'Edit Product' : 'Add Products'}</h2>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="px-6 py-2.5 rounded-xl border font-black text-sm hover:bg-zinc-100 transition-all" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}>Cancel</button>

          {/* Main Header Menu (Circled in Screenshot) */}
          <div className="relative">
            <button
              onClick={() => setIsHeaderMenuOpen(!isHeaderMenuOpen)}
              className="p-2.5 rounded-xl border hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors relative"
              style={{ color: 'var(--text-muted)', borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}
            >
              <MoreVertical size={20} />
            </button>

            {isHeaderMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsHeaderMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-left group">
                      <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                        <Info size={16} />
                      </div>
                      <span className="text-xs font-bold text-zinc-400">Help & Support</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Upload */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 md:p-10 rounded-[32px] border shadow-sm flex flex-col" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between mb-8 relative">
              <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>Upload Image</h3>
              <MoreVertical size={18} className="text-zinc-400" />
            </div>

            <CustomDropzone index={0} isLarge={true} />

            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <CustomDropzone key={i} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Steps Form */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex flex-wrap md:flex-nowrap gap-3 md:gap-4">
            <StepCard number={1} title="Product Description" active={activeStep === 1} />
            <StepCard number={2} title="General information" active={activeStep === 2} />
            <StepCard number={3} title="Price Information" active={activeStep === 3} />
          </div>

          <div className="p-6 md:p-10 rounded-[32px] border shadow-sm flex flex-col" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <div className="flex-1">
              {renderStepContent()}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 mt-10 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <div className="w-full sm:w-auto">{activeStep > 1 && <button onClick={() => setActiveStep(activeStep - 1)} className="w-full sm:w-auto px-8 py-3.5 rounded-xl border-2 border-brand-blue/20 text-brand-blue font-black text-sm hover:bg-brand-blue/5 transition-all">Previous</button>}</div>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button onClick={handleSave} className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-sm hover:opacity-80 transition-all btn-glow" style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>Save as Draft</button>
                <button onClick={() => activeStep < 3 ? setActiveStep(activeStep + 1) : handleSave()} className="w-full sm:w-auto px-10 py-4 bg-brand-blue text-white rounded-xl font-black text-sm shadow-xl shadow-brand-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all btn-glow">
                  {activeStep === 3 ? 'Publish Product' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
