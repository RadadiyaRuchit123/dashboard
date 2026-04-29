import React, { useState } from 'react';
import { Search, MoreVertical, Plus, List, Grid, Edit2, Trash2, Filter, ChevronDown, Download, Upload as UploadIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const categories = [
  { name: "Women's & Girls' Fashion", count: 4758 },
  { name: "Health & Beauty", count: 2413 },
  { name: "TV & Home Appliances", count: 765 },
  { name: "Electronic Accessories", count: 1748 },
  { name: "Watches, Bags, Jewellery", count: 547 },
  { name: "Home & Lifestyle", count: 1589 },
  { name: "Sports & Outdoors", count: 5750 },
];

const brands = [
  { name: "Puma", count: 4758 },
  { name: "Nike", count: 8413 },
  { name: "Adidas", count: 965 },
  { name: "Nova", count: 2748 },
  { name: "Intel", count: 2827 },
  { name: "Asus", count: 2589 },
  { name: "Apple", count: 750 },
];

export default function ProductList({ products, searchQuery, setSearchQuery, onAddProduct, onEdit, onDelete, onImport }) {
  const { currency } = useTheme();
  const [view, setView] = useState('list');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [activeHandle, setActiveHandle] = useState('min');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const fileInputRef = React.useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const products = parseCSV(text);
        if (products.length > 0) {
          onImport(products);
        } else {
          alert('No valid products found in CSV.');
        }
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (csvText) => {
    // 1. Detect Delimiter (Commonly , or ;)
    const firstLine = csvText.split('\n')[0];
    const delimiters = [',', ';', '\t'];
    let delimiter = ',';
    let maxCount = 0;
    delimiters.forEach(d => {
      const count = (firstLine.match(new RegExp(d, 'g')) || []).length;
      if (count > maxCount) {
        maxCount = count;
        delimiter = d;
      }
    });

    const rows = [];
    let currentRow = [];
    let currentField = '';
    let inQuotes = false;

    for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i];
      const nextChar = csvText[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          currentField += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delimiter && !inQuotes) {
        currentRow.push(currentField);
        currentField = '';
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (currentField || currentRow.length > 0) {
          currentRow.push(currentField);
          rows.push(currentRow);
          currentRow = [];
          currentField = '';
        }
        if (char === '\r' && nextChar === '\n') i++;
      } else {
        currentField += char;
      }
    }
    if (currentField || currentRow.length > 0) {
      currentRow.push(currentField);
      rows.push(currentRow);
    }

    if (rows.length < 2) return [];

    // Normalize headers: lowercase, remove spaces and underscores
    const headers = rows[0].map(h => h.trim().toLowerCase().replace(/[\s_]+/g, ''));
    console.log('Detected Headers:', headers);

    const result = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => {
        if (row[i] !== undefined) obj[h] = row[i].trim();
      });
      return obj;
    });

    console.log('Parsed Products:', result);
    return result;
  };

  const downloadTemplate = () => {
    const headers = ['name', 'price', 'status', 'category', 'sku', 'stock', 'brand', 'size', 'color', 'image'];
    const csvContent = headers.join(',') + '\n' +
      ['Sample Product,₹99.99,In Stock,Fashion,SKU001,50,Nike,XL,Blue,https://images.unsplash.com/photo-1542291026-7eec264c27ff'].join(',');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product_template.csv';
    a.click();
  };

  // Optimized: Memoize filtered products to prevent heavy calculation on every render
  const filteredProducts = React.useMemo(() => {
    return products.filter(p => {
      const name = p.name || '';
      const id = p.id || '';
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        id.toLowerCase().includes(searchQuery.toLowerCase());

      const priceStr = p.price?.toString().replace(currency, '').replace(',', '') || '0';
      const priceValue = parseFloat(priceStr) || 0;
      const matchesPrice = priceValue >= minPrice && priceValue <= maxPrice;

      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);

      return matchesSearch && matchesPrice && matchesCategory;
    });
  }, [products, searchQuery, minPrice, maxPrice, selectedCategories]);

  // Simplified Pagination: Only show 20 items first, then load more
  const [displayCount, setDisplayCount] = useState(20);
  const visibleProducts = filteredProducts.slice(0, displayCount);

  const Checkbox = ({ label, count, checked, onChange }) => (
    <label className="flex items-center justify-between group cursor-pointer py-1">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-5 h-5 rounded border-2 transition-all group-hover:border-brand-blue"
          style={{ borderColor: checked ? 'var(--color-brand-blue)' : 'var(--border-color)', backgroundColor: 'transparent' }}>
          <input
            type="checkbox"
            className="peer absolute opacity-0 w-full h-full cursor-pointer"
            checked={checked}
            onChange={onChange}
          />
          <div className={`w-2.5 h-2.5 bg-brand-blue rounded-sm transition-opacity ${checked ? 'opacity-100' : 'opacity-0'}`} />
        </div>
        <span className="text-sm font-semibold transition-colors group-hover:text-brand-blue" style={{ color: checked ? 'var(--color-brand-blue)' : 'var(--text-primary)' }}>{label}</span>
      </div>
      <span className="text-xs font-bold" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>{count.toLocaleString()}</span>
    </label>
  );

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in duration-500 max-w-full overflow-hidden">
      {/* Page Header */}
      <div className="flex justify-between items-center px-2">
        <h2 className="text-xl md:text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>List Product</h2>
        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv"
            className="hidden"
          />
          <button
            onClick={downloadTemplate}
            className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-xs hover:bg-zinc-50 dark:hover:bg-white dark:hover:text-black transition-all shadow-sm"
            style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}
            title="Download CSV Template"
          >
            <Download size={16} />
            <span className="hidden lg:inline">Template</span>
          </button>
          <button
            onClick={handleImportClick}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-xs hover:bg-zinc-50 dark:hover:bg-white dark:hover:text-black transition-all shadow-sm"
            style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}
          >
            <UploadIcon size={16} />
            <span>Import</span>
          </button>
          <button
            onClick={onAddProduct}
            className="flex items-center gap-2 bg-brand-blue text-white px-6 py-2.5 rounded-xl font-black text-sm shadow-xl shadow-brand-blue/30 hover:scale-[1.02] active:scale-[0.98] transition-all btn-glow"
          >
            <Plus size={18} strokeWidth={3} />
            <span className="hidden md:inline">Add Product</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left Column: Filters */}
        <div
          className="xl:col-span-1 p-8 rounded-[32px] border shadow-sm h-fit premium-card"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>Filters</h3>
          </div>

          {/* Category Filter */}
          <div className="space-y-6 mb-10">
            <h4 className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Category</h4>
            <div className="space-y-3">
              {categories.map((cat, i) => (
                <Checkbox
                  key={i}
                  label={cat.name}
                  count={cat.count}
                  checked={selectedCategories.includes(cat.name)}
                  onChange={() => {
                    setSelectedCategories(prev =>
                      prev.includes(cat.name)
                        ? prev.filter(c => c !== cat.name)
                        : [...prev, cat.name]
                    );
                  }}
                />
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="space-y-6 mb-10">
            <h4 className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Price</h4>
            <div className="px-1 py-2">
              <div className="relative h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full mb-8">
                {/* Visual Progress Bar */}
                <div
                  className="absolute h-full bg-brand-blue rounded-full transition-all"
                  style={{
                    left: `${(minPrice / 10000) * 100}%`,
                    right: `${100 - (maxPrice / 10000) * 100}%`
                  }}
                />

                {/* Min Range Input */}
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={minPrice}
                  onMouseDown={() => setActiveHandle('min')}
                  onTouchStart={() => setActiveHandle('min')}
                  onChange={(e) => setMinPrice(Math.min(parseInt(e.target.value), maxPrice - 100))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  style={{ zIndex: minPrice > 5000 ? 41 : 40 }}
                />
                {/* Max Range Input */}
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={maxPrice}
                  onMouseDown={() => setActiveHandle('max')}
                  onTouchStart={() => setActiveHandle('max')}
                  onChange={(e) => setMaxPrice(Math.max(parseInt(e.target.value), minPrice + 100))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  style={{ zIndex: minPrice > 5000 ? 40 : 41 }}
                />

                {/* Custom Handles (Visual Only) */}
                <div
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-brand-blue rounded-full shadow-lg pointer-events-none transition-all"
                  style={{ left: `${(minPrice / 10000) * 100}%`, zIndex: activeHandle === 'min' ? 41 : 31 }}
                />
                <div
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-brand-blue rounded-full shadow-lg pointer-events-none transition-all"
                  style={{ left: `${(maxPrice / 10000) * 100}%`, zIndex: activeHandle === 'max' ? 41 : 31 }}
                />
              </div>

              <div className="flex justify-between items-center gap-4">
                <div className="flex-1 border px-4 py-2 rounded-xl text-xs font-black text-center" style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                  {currency}{(minPrice / 1000).toFixed(0)}k
                </div>
                <div className="flex-1 border px-4 py-2 rounded-xl text-xs font-black text-center" style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                  {currency}{(maxPrice / 1000).toFixed(0)}k
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Table */}
        <div className="xl:col-span-3 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl border shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                <span className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>Total Products</span>
                <span className="text-sm font-black px-3 py-1 rounded-lg" style={{ backgroundColor: 'var(--bg-card-inner)', color: 'var(--text-primary)' }}>{filteredProducts.length}</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl border shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                <span className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>New Products</span>
                <span className="text-sm font-black px-3 py-1 rounded-lg" style={{ backgroundColor: 'var(--bg-card-inner)', color: 'var(--text-primary)' }}>25</span>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:auto">
              <div className="relative flex-1 md:w-72 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-brand-blue transition-colors" size={18} style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search your product"
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border text-sm font-bold focus:outline-none focus:border-brand-blue transition-all shadow-sm"
                  style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center p-1 rounded-2xl border shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded-xl transition-all ${view === 'list' ? 'bg-brand-blue text-white shadow-md' : 'text-zinc-500'}`}
                >
                  <List size={20} />
                </button>
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded-xl transition-all ${view === 'grid' ? 'bg-brand-blue text-white shadow-md' : 'text-zinc-500'}`}
                >
                  <Grid size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* View Container */}
          <div className="space-y-6">
            {view === 'list' ? (
              /* List View (Desktop Table + Mobile Cards) */
              <div className="rounded-[32px] border shadow-sm overflow-hidden premium-card" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                      <tr className="text-[11px] uppercase font-black tracking-widest border-b" style={{ backgroundColor: 'var(--bg-card-inner)', color: 'var(--text-primary)', opacity: 0.9, borderColor: 'var(--border-color)' }}>
                        <th className="px-8 py-5">Product ID ↑↓</th>
                        <th className="px-8 py-5">Product name ↑↓</th>
                        <th className="px-8 py-5">Size ↑↓</th>
                        <th className="px-8 py-5">Color ↑↓</th>
                        <th className="px-8 py-5">Price ↑↓</th>
                        <th className="px-8 py-5">Sold ↑↓</th>
                        <th className="px-8 py-5">Date ↑↓</th>
                        <th className="px-8 py-5">Status ↑↓</th>
                        <th className="px-8 py-5 text-right">Actions ↑↓</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
                      {visibleProducts.map((p, i) => (
                        <tr key={p.id || i} className="hover:bg-white transition-all duration-300 group border-b cursor-pointer" style={{ borderColor: 'var(--border-color)' }}>
                          <td className="px-8 py-5 text-xs font-bold transition-all group-hover:!text-black group-hover:!opacity-100" style={{ color: 'var(--text-primary)', opacity: 0.7 }}>{p.id}</td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner overflow-hidden border" style={{ backgroundColor: 'var(--bg-card-inner)', borderColor: 'var(--border-color)' }}>
                                {p.images && p.images.length > 0 ? (
                                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                                ) : (
                                  p.flag || '📦'
                                )}
                              </div>
                              <span className="text-xs font-black transition-all group-hover:!text-black" style={{ color: 'var(--text-primary)' }}>{p.name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-xs font-bold transition-all group-hover:!text-black group-hover:!opacity-100" style={{ color: 'var(--text-primary)', opacity: 0.8 }}>{p.size || '-'}</td>
                          <td className="px-8 py-5 text-xs font-bold transition-all group-hover:!text-black group-hover:!opacity-100" style={{ color: 'var(--text-primary)', opacity: 0.8 }}>
                            {p.color ? (
                              <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full border border-zinc-200" style={{ backgroundColor: p.color.includes('#') ? p.color : 'transparent' }}></span>
                                <span className="transition-all group-hover:!text-black">{p.color}</span>
                              </div>
                            ) : '-'}
                          </td>
                          <td className="px-8 py-5 text-xs font-black transition-all group-hover:!text-black" style={{ color: 'var(--text-primary)' }}>{currency}{p.price?.toString().replace(/[₹$]/g, '')}</td>
                          <td className="px-8 py-5 text-xs font-bold transition-all group-hover:!text-black group-hover:!opacity-100" style={{ color: 'var(--text-primary)', opacity: 0.8 }}>{p.sold}</td>
                          <td className="px-8 py-5 text-xs font-bold transition-all group-hover:!text-black group-hover:!opacity-100" style={{ color: 'var(--text-primary)', opacity: 0.7 }}>{p.date}</td>
                          <td className="px-8 py-5">
                            <span className={`text-[10px] font-black px-4 py-1.5 rounded-lg inline-block text-center min-w-[100px] border transition-all ${['active', 'in stock'].includes(p.status?.toLowerCase())
                              ? 'bg-[#238636]/10 text-[#3fb950] border-[#238636]/20'
                              : ['low stock', 'lowstock'].includes(p.status?.toLowerCase().replace(/\s/g, ''))
                                ? 'bg-[#9e6a03]/10 text-[#d29922] border-[#9e6a03]/20'
                                : 'bg-[#da3633]/10 text-[#f85149] border-[#da3633]/20'
                              }`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => onEdit(p)} className="p-2.5 rounded-xl border border-transparent hover:border-brand-blue/30 hover:bg-brand-blue/5 transition-all text-[#58a6ff] hover:text-brand-blue shadow-none"><Edit2 size={15} strokeWidth={3} /></button>
                              <button onClick={() => onDelete(p.id)} className="p-2.5 rounded-xl border border-transparent hover:border-rose-500/30 hover:bg-rose-500/5 transition-all text-[#f85149] hover:text-rose-500 shadow-none"><Trash2 size={15} strokeWidth={3} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards (Fallback for List View on small screens) */}
                <div className="md:hidden divide-y" style={{ borderColor: 'var(--border-color)' }}>
                  {visibleProducts.map((p, i) => (
                    <div key={p.id || i} className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-inner overflow-hidden border bg-zinc-50" style={{ borderColor: 'var(--border-color)' }}>
                            {p.images && p.images.length > 0 ? <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" /> : p.flag || '📦'}
                          </div>
                          <div>
                            <h4 className="text-sm font-black pr-8" style={{ color: 'var(--text-primary)' }}>{p.name}</h4>
                            <p className="text-[10px] font-bold opacity-50 uppercase tracking-wider">{p.id}</p>
                          </div>
                        </div>
                        <span className={`text-[9px] font-black px-3 py-1 rounded-lg border uppercase tracking-widest ${['active', 'in stock'].includes(p.status?.toLowerCase()) ? 'bg-[#238636]/10 text-[#3fb950] border-[#238636]/20' : ['low stock', 'lowstock'].includes(p.status?.toLowerCase().replace(/\s/g, '')) ? 'bg-[#9e6a03]/10 text-[#d29922] border-[#9e6a03]/20' : 'bg-[#da3633]/10 text-[#f85149] border-[#da3633]/20'}`}>{p.status}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 py-2">
                        <div><p className="text-[10px] font-black opacity-40 uppercase mb-1">Price</p><p className="text-sm font-black text-brand-blue">{currency}{p.price?.toString().replace(/[₹$]/g, '')}</p></div>
                        <div><p className="text-[10px] font-black opacity-40 uppercase mb-1">Sold</p><p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{p.sold} items</p></div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button onClick={() => onEdit(p)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-black text-xs transition-all hover:bg-zinc-50 hover:text-black" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}><Edit2 size={14} /> Edit</button>
                        <button onClick={() => onDelete(p.id)} className="w-12 flex items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Grid View (2 Columns) */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visibleProducts.map((p, i) => (
                  <div
                    key={p.id || i}
                    className="group rounded-[40px] p-6 border shadow-premium hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                  >
                    <div className="absolute top-6 right-6 z-10">
                      <span className={`text-[9px] font-black px-3 py-1.5 rounded-full border uppercase tracking-widest backdrop-blur-md ${['active', 'in stock'].includes(p.status?.toLowerCase()) ? 'bg-[#238636]/10 text-[#3fb950] border-[#238636]/20' : ['low stock', 'lowstock'].includes(p.status?.toLowerCase().replace(/\s/g, '')) ? 'bg-[#9e6a03]/10 text-[#d29922] border-[#9e6a03]/20' : 'bg-[#da3633]/10 text-[#f85149] border-[#da3633]/20'}`}>{p.status}</span>
                    </div>

                    <div className="flex gap-6 items-center">
                      <div className="w-32 h-32 rounded-[32px] overflow-hidden border-2 border-white dark:border-zinc-800 shadow-xl group-hover:scale-105 transition-transform duration-500 flex-shrink-0">
                        {p.images && p.images.length > 0 ? <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-3xl">{p.flag || '📦'}</div>}
                      </div>

                      <div className="flex-1 space-y-3 min-w-0">
                        <div>
                          <p className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.2em] mb-1">{p.id}</p>
                          <h4 className="text-base font-black truncate leading-tight" style={{ color: 'var(--text-primary)' }}>{p.name}</h4>
                        </div>

                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-black text-brand-blue">{currency}{p.price?.toString().replace(/[₹$]/g, '')}</span>
                          <span className="text-[10px] font-bold text-zinc-400">USD</span>
                        </div>

                        <div className="flex items-center gap-4 pt-1">
                          <div className="flex flex-col">
                            <span className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">Sold</span>
                            <span className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>{p.sold}</span>
                          </div>
                          <div className="w-px h-6 bg-zinc-100 dark:bg-zinc-800" />
                          <div className="flex flex-col">
                            <span className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">Category</span>
                            <span className="text-xs font-black truncate max-w-[80px]" style={{ color: 'var(--text-primary)' }}>{p.category || '-'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6 pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
                      <button onClick={() => onEdit(p)} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-transparent hover:border-brand-blue/30 text-xs font-black transition-all group/btn" style={{ color: 'var(--text-primary)' }}>
                        <Edit2 size={14} className="text-brand-blue group-hover/btn:scale-110 transition-transform" /> Edit Product
                      </button>
                      <button onClick={() => onDelete(p.id)} className="w-14 flex items-center justify-center py-3.5 rounded-2xl bg-rose-500/5 border border-transparent hover:border-rose-500/30 text-rose-500 transition-all group/trash">
                        <Trash2 size={16} className="group-hover/trash:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {displayCount < filteredProducts.length && (
              <div className="py-8 flex justify-center">
                <button
                  onClick={() => setDisplayCount(prev => prev + 20)}
                  className="px-10 py-4 rounded-2xl bg-brand-blue text-white font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-blue/30"
                >
                  Load More Products ({filteredProducts.length - displayCount} left)
                </button>
              </div>
            )}

            {/* Entry Summary */}
            <div className="flex justify-between items-center px-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Showing {Math.min(displayCount, filteredProducts.length)} of {filteredProducts.length} entries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
