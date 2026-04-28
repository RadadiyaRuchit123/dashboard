import React, { useState, useMemo, useEffect } from 'react';
import {
  Mail, Phone, Calendar, Hash, Package, MapPin,
  ChevronDown, Edit2, Trash2, Printer, Store,
  MoreVertical, X, Check
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { useTheme } from '../context/ThemeContext';

// --- Print Component ---
const MasterPrintTemplate = ({ invoiceData, items, totals, formatDate }) => (
  <div id="master-print-invoice" className="hidden print:block p-10 bg-white text-black font-sans leading-tight">
    {/* Header Branding */}
    <div className="flex justify-between items-start border-b-2 border-zinc-100 pb-8 mb-8">
      <div>
        <h1 className="text-4xl font-black text-[#6169ff] mb-2">Ment X</h1>
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Official Billing Document</p>
      </div>
      <div className="text-right">
        <h2 className="text-xl font-black mb-1">INVOICE</h2>
        <p className="text-xs font-bold text-zinc-500">{invoiceData.invoiceNumber}</p>
        <p className="text-[10px] text-zinc-400 mt-1">Date: {new Date().toLocaleDateString()}</p>
      </div>
    </div>

    {/* Info Grid */}
    <div className="grid grid-cols-2 gap-12 mb-10">
      <div>
        <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Bill To:</h3>
        <p className="text-sm font-black mb-1">{invoiceData.customerName}</p>
        <p className="text-xs text-zinc-500 leading-relaxed mb-2">{invoiceData.address}</p>
        <div className="text-[10px] text-zinc-500 space-y-1">
          <p>Email: {invoiceData.email}</p>
          <p>Phone: {invoiceData.phone}</p>
        </div>
      </div>
      <div>
        <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Invoice Details:</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-zinc-500 font-bold">Issue Date:</span>
            <span className="font-black">{formatDate(invoiceData.issueDate)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-500 font-bold">Delivery Date:</span>
            <span className="font-black">{formatDate(invoiceData.deliveryDate)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-500 font-bold">Product ID:</span>
            <span className="font-black">{invoiceData.productId}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Product Table */}
    <table className="w-full mb-10 border-collapse">
      <thead>
        <tr className="bg-zinc-50 border-b border-zinc-200 text-[10px] uppercase font-black text-zinc-500">
          <th className="py-4 px-3 text-left">Product ID</th>
          <th className="py-4 px-3 text-left">Product Name</th>
          <th className="py-4 px-3 text-center">Qty</th>
          <th className="py-4 px-3 text-right">Price</th>
          <th className="py-4 px-3 text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="border-b border-zinc-100 text-xs font-bold">
            <td className="py-4 px-3 text-zinc-400">{item.id}</td>
            <td className="py-4 px-3">{item.name}</td>
            <td className="py-4 px-3 text-center">{item.qty}</td>
            <td className="py-4 px-3 text-right">${parseFloat(item.price).toFixed(2)}</td>
            <td className="py-4 px-3 text-right">${(parseFloat(item.qty) * parseFloat(item.price)).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Totals Section */}
    <div className="flex justify-end">
      <div className="w-64 space-y-3">
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500 font-bold">Subtotal:</span>
          <span className="font-black">${totals.subtotal}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500 font-bold">Tax (18%):</span>
          <span className="font-black">${totals.tax}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500 font-bold">Additional Charge:</span>
          <span className="font-black">${totals.additionalCharge}</span>
        </div>
        <div className="flex justify-between text-xs pb-3 border-b">
          <span className="text-zinc-500 font-bold">Discount:</span>
          <span className="font-black">-${totals.discount}</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-sm font-black">Total Amount:</span>
          <span className="text-xl font-black text-[#6169ff]">${totals.totalAmount}</span>
        </div>
      </div>
    </div>

    {/* Purchase Note */}
    {invoiceData.purchaseNote && (
      <div className="mt-16 pt-8 border-t border-zinc-100">
        <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Purchase Note:</h3>
        <p className="text-xs text-zinc-500 leading-relaxed italic">"{invoiceData.purchaseNote}"</p>
      </div>
    )}

    {/* Footer */}
    <div className="mt-auto pt-20 text-center">
      <p className="text-[10px] font-bold text-zinc-300 tracking-widest uppercase">Thank you for your business!</p>
    </div>
  </div>
);

// --- Style Helper ---
const PrintStyles = () => (
  <style>{`
    @media print {
      body * { visibility: hidden !important; }
      #master-print-invoice, #master-print-invoice * { visibility: visible !important; }
      #master-print-invoice {
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        width: 100% !important;
        display: block !important;
        z-index: 99999 !important;
      }
      @page { margin: 15mm; size: A4; }
    }
  `}</style>
);

// --- Form Components ---

const InvoiceField = ({ label, value, icon: Icon, type = "text", placeholder, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue/40 group-focus-within:text-brand-blue transition-all duration-300">
        {Icon && <Icon size={16} strokeWidth={2.5} />}
      </div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold outline-none border border-transparent focus:border-brand-blue/20 transition-all shadow-sm"
        style={{ backgroundColor: 'var(--bg-card-inner)', color: 'var(--text-primary)' }}
      />
    </div>
  </div>
);

const EditModal = ({ item, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...item });
  useEffect(() => { if (item && isOpen) setFormData({ ...item }); }, [item, isOpen]);
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md rounded-[32px] p-8 border shadow-2xl animate-in zoom-in-95 duration-200" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>Edit Product</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-400"><X size={20} /></button>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Product Name</label>
            <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-2xl p-4 text-xs font-bold outline-none border border-transparent focus:border-brand-blue/20 transition-all shadow-sm" style={{ backgroundColor: 'var(--bg-card-inner)', color: 'var(--text-primary)' }} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Quantity</label>
              <input type="number" value={formData.qty} onChange={(e) => setFormData({ ...formData, qty: e.target.value })} className="w-full rounded-2xl p-4 text-xs font-bold outline-none border border-transparent focus:border-brand-blue/20 transition-all shadow-sm" style={{ backgroundColor: 'var(--bg-card-inner)', color: 'var(--text-primary)' }} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Price ($)</label>
              <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full rounded-2xl p-4 text-xs font-bold outline-none border border-transparent focus:border-brand-blue/20 transition-all shadow-sm" style={{ backgroundColor: 'var(--bg-card-inner)', color: 'var(--text-primary)' }} />
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <button onClick={onClose} className="flex-1 py-4 rounded-2xl text-xs font-black border transition-all hover:bg-zinc-50 dark:hover:bg-white/5" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>Cancel</button>
            <button onClick={() => onSave(formData)} className="flex-1 py-4 rounded-2xl text-xs font-black bg-brand-blue text-white shadow-lg shadow-brand-blue/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"><Check size={16} /> Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderRow = ({ item, onUpdate, onDelete, onEditClick }) => {
  const total = (parseFloat(item.qty || 0) * parseFloat(item.price || 0)).toFixed(2);
  return (
    <tr className="group border-b last:border-0 hover:bg-zinc-50/50 dark:hover:bg-white/5 transition-colors" style={{ borderColor: 'var(--border-color)' }}>
      <td className="py-5 pl-4 text-[11px] font-bold text-zinc-400 dark:text-zinc-500">{item.id}</td>
      <td className="py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden border border-brand-blue/10" style={{ backgroundColor: 'var(--bg-card-inner)' }}>
            <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>{item.name}</span>
        </div>
      </td>
      <td className="py-5 text-center">
        <input
          type="number"
          value={item.qty}
          onChange={(e) => onUpdate(item.id, 'qty', e.target.value)}
          className="w-12 bg-transparent border-b border-transparent focus:border-brand-blue/30 text-xs font-black text-center outline-none transition-all"
          style={{ color: 'var(--text-primary)' }}
        />
      </td>
      <td className="py-5 text-center">
        <div className="flex items-center justify-center gap-1">
          <span className="text-brand-blue/50 text-[10px] font-black">$</span>
          <input
            type="number"
            value={item.price}
            onChange={(e) => onUpdate(item.id, 'price', e.target.value)}
            className="w-16 bg-transparent border-b border-transparent focus:border-brand-blue/30 text-xs font-black text-center outline-none transition-all"
            style={{ color: 'var(--text-primary)' }}
          />
        </div>
      </td>
      <td className="py-5 text-center text-xs font-black" style={{ color: 'var(--text-primary)' }}>${total}</td>
      <td className="py-6 pr-4 pl-3  no-print text-right">
        <div className="flex items-center justify-end gap-3 transition-opacity">
          <button onClick={() => onEditClick(item)} className="p-3 rounded-xl bg-white dark:bg-zinc-800 border border-brand-blue/10 text-brand-blue/60 hover:text-brand-blue hover:bg-brand-blue/5 shadow-sm transition-all active:scale-95" style={{ borderColor: 'var(--border-color)' }}><Edit2 size={15} /></button>
          <button onClick={() => onDelete(item.id)} className="p-3 rounded-xl bg-white dark:bg-zinc-800 border border-rose-100 text-rose-400 hover:text-rose-500 hover:bg-rose-50 shadow-sm transition-all active:scale-95" style={{ borderColor: 'var(--border-color)' }}><Trash2 size={15} /></button>
        </div>
      </td>
    </tr>
  );
};

// --- Main Component ---
export default function Invoice() {
  const [isExporting, setIsExporting] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [invoiceData, setInvoiceData] = useState({
    customerName: "Giant Superstore",
    customerTag: "Creative super shop",
    address: "9553 Railroad St undefined Lewisville Minnesota 42281 United States",
    email: "yourmail123@gmail.com",
    phone: "+123 456 789 00",
    issueDate: "2024-01-16",
    deliveryDate: "2024-01-20",
    invoiceNumber: "#1NV-123124124",
    productId: "#69SDF15",
    purchaseNote: ""
  });

  const [items, setItems] = useState([
    { id: "#89SD669", name: "College Bag", qty: 16, price: 10.55, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100" },
    { id: "#89SDF15", name: "Orange Smart watch", qty: 24, price: 100.41, image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=100" },
    { id: "#69SD6D4R", name: "Jacket-154D", qty: 30, price: 80.12, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100" },
    { id: "#69SDF4F6D", name: "Wireless Earbuds", qty: 10, price: 150.34, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100" },
    { id: "#69SD68EE", name: "handbag", qty: 4, price: 42.36, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100" },
  ]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + (parseFloat(item.qty || 0) * parseFloat(item.price || 0)), 0);
    const tax = subtotal * 0.18;
    const additionalCharge = subtotal > 0 ? 3500.65 : 0;
    const discount = subtotal > 0 ? 252.25 : 0;
    const totalAmount = subtotal + tax + additionalCharge - discount;
    return {
      subtotal: subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      tax: tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      additionalCharge: additionalCharge.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      discount: discount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      totalAmount: totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    };
  }, [items]);

  const updateData = (key, val) => setInvoiceData(prev => ({ ...prev, [key]: val }));
  const handleUpdateItem = (id, field, value) => {
    const processedValue = (field === 'qty' || field === 'price') ? (value === '' ? '' : parseFloat(value)) : value;
    setItems(items.map(item => item.id === id ? { ...item, [field]: processedValue } : item));
  };
  const handleSaveEditedItem = (updatedItem) => { setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item)); setEditingItem(null); };
  const handleDeleteItem = (id) => setItems(items.filter(item => item.id !== id));
  const handlePrint = () => window.print();

  const handleExportPDF = () => {
    try {
      setIsExporting(true);
      const doc = new jsPDF();

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(97, 105, 255);
      doc.text('Ment X', 14, 25);

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Invoice: ${invoiceData.invoiceNumber.replace('#', '')}`, 14, 35);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 40);

      const tableColumn = ["Product ID", "Product Name", "Qty", "Price", "Total"];
      const tableRows = items.map(item => {
        const qty = parseFloat(item.qty) || 0;
        const price = parseFloat(item.price) || 0;
        return [
          item.id,
          item.name,
          qty.toString(),
          `$${price.toFixed(2)}`,
          `$${(qty * price).toFixed(2)}`
        ];
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 50,
        headStyles: { fillColor: [97, 105, 255] },
        alternateRowStyles: { fillColor: [245, 247, 250] },
        margin: { top: 50 }
      });

      const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 150;
      doc.setFontSize(12);
      doc.text(`Total Amount: $${totals.totalAmount}`, 196, finalY, { align: 'right' });

      // Open in new tab instead of direct download to avoid localhost issues
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error("PDF Export Error:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const formatDate = (dateStr) => { if (!dateStr) return ""; const date = new Date(dateStr); return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ''); };

  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
  const customers = [
    { name: "Giant Superstore", tag: "Creative super shop", address: "9553 Railroad St, Lewisville, MN 42281", email: "giant@store.com", phone: "+1 234 567 890" },
    { name: "Walmart Inc.", tag: "Retail Giant", address: "702 SW 8th St, Bentonville, AR 72716", email: "contact@walmart.com", phone: "+1 479 273 4000" },
    { name: "Target Corp.", tag: "Supermarket Chain", address: "1000 Nicollet Mall, Minneapolis, MN 55403", email: "info@target.com", phone: "+1 612 304 6073" }
  ];

  const handleSelectCustomer = (cust) => {
    setInvoiceData(prev => ({
      ...prev,
      customerName: cust.name,
      customerTag: cust.tag,
      address: cust.address,
      email: cust.email,
      phone: cust.phone
    }));
    setIsCustomerDropdownOpen(false);
  };

  return (
    <div className="pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-full overflow-hidden">
      <PrintStyles />
      <MasterPrintTemplate invoiceData={invoiceData} items={items} totals={totals} formatDate={formatDate} />
      <EditModal isOpen={!!editingItem} item={editingItem} onClose={() => setEditingItem(null)} onSave={handleSaveEditedItem} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 print:hidden">
        <div className="xl:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[32px] p-5 md:p-8 border shadow-xl relative" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
              <label className="text-[10px] font-black uppercase mb-4 block text-zinc-400">Customer Name</label>
              <div
                onClick={() => setIsCustomerDropdownOpen(!isCustomerDropdownOpen)}
                className="flex items-center justify-between p-4 rounded-2xl border cursor-pointer hover:border-brand-blue/30 transition-all"
                style={{ backgroundColor: 'var(--bg-card-inner)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl border flex items-center justify-center text-brand-blue/70 shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}><Store size={22} /></div>
                  <div className="flex-1">
                    <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{invoiceData.customerName}</p>
                    <p className="text-[10px] font-bold text-zinc-400">{invoiceData.customerTag}</p>
                  </div>
                </div>
                <ChevronDown size={16} className={`text-zinc-400 transition-transform ${isCustomerDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {isCustomerDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsCustomerDropdownOpen(false)} />
                  <div className="absolute left-8 right-8 top-[calc(100%-20px)] mt-2 bg-white dark:bg-zinc-900 border rounded-2xl shadow-2xl z-50 p-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200" style={{ borderColor: 'var(--border-color)' }}>
                    {customers.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectCustomer(c)}
                        className="w-full text-left p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all group"
                      >
                        <p className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>{c.name}</p>
                        <p className="text-[10px] font-bold text-zinc-400">{c.tag}</p>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="rounded-[32px] p-5 md:p-8 border shadow-xl" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
              <label className="text-[10px] font-black uppercase mb-4 block text-zinc-400">Address</label>
              <div className="flex items-start gap-4 p-4 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card-inner)', borderColor: 'var(--border-color)' }}>
                <div className="w-10 h-10 rounded-xl border flex items-center justify-center text-brand-blue/40 shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}><MapPin size={18} /></div>
                <textarea className="w-full bg-transparent text-xs font-bold text-zinc-400 outline-none resize-none h-12 leading-relaxed" value={invoiceData.address} onChange={(e) => updateData('address', e.target.value)} />
              </div>
            </div>
            <div className="rounded-[32px] p-5 md:p-8 border shadow-xl space-y-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
              <h3 className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>Contact Info</h3>
              <InvoiceField label="Mail Address" value={invoiceData.email} icon={Mail} onChange={(v) => updateData('email', v)} />
              <InvoiceField label="Phone Number" value={invoiceData.phone} icon={Phone} onChange={(v) => updateData('phone', v)} />
            </div>
            <div className="rounded-[32px] p-5 md:p-8 border shadow-xl" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
              <h3 className="text-lg font-black mb-6" style={{ color: 'var(--text-primary)' }}>General</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <InvoiceField label="Issue Date" value={invoiceData.issueDate} type="date" icon={Calendar} onChange={(v) => updateData('issueDate', v)} />
                <InvoiceField label="Delivery Date" value={invoiceData.deliveryDate} type="date" icon={Calendar} onChange={(v) => updateData('deliveryDate', v)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InvoiceField label="Invoice Number" value={invoiceData.invoiceNumber} icon={Hash} onChange={(v) => updateData('invoiceNumber', v)} />
                <InvoiceField label="Product ID" value={invoiceData.productId} icon={Package} onChange={(v) => updateData('productId', v)} />
              </div>
            </div>
          </div>
          <div className="rounded-[32px] border shadow-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <div className="p-4 md:p-6 pb-0"><h3 className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>Order Summary</h3></div>
            <div className="p-4 md:p-6 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] uppercase font-black tracking-widest text-zinc-400 border-b" style={{ borderColor: 'var(--border-color)' }}>
                    <th className="pb-4 pl-4">Product ID</th><th className="pb-4">Product name</th><th className="pb-4 text-center">Quantity</th><th className="pb-4 text-center">Price</th><th className="pb-4 text-center">Total price</th><th className="pb-4 pr-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>{items.map((item) => (<OrderRow key={item.id} item={item} onUpdate={handleUpdateItem} onDelete={handleDeleteItem} onEditClick={setEditingItem} />))}</tbody>
              </table>
            </div>
          </div>
          <div className="rounded-[32px] p-5 md:p-8 border shadow-xl space-y-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <h3 className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>Purchase Note:</h3>
            <textarea placeholder="Type here..." value={invoiceData.purchaseNote} onChange={(e) => updateData('purchaseNote', e.target.value)} className="w-full rounded-2xl p-6 text-xs font-bold outline-none h-32 resize-none border border-transparent shadow-sm" style={{ backgroundColor: 'var(--bg-card-inner)', color: 'var(--text-primary)' }}></textarea>
            <div className="flex justify-end"><button className="bg-brand-blue text-white px-10 py-4 rounded-2xl text-xs font-black shadow-lg shadow-brand-blue/30 hover:-translate-y-1 transition-all active:scale-95">Submit Invoice</button></div>
          </div>
        </div>
        <div className="xl:col-span-4">
          <div className="sticky top-6 rounded-[32px] md:rounded-[40px] p-5 md:p-8 border shadow-2xl" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <div className="flex justify-between items-center mb-10"><h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>Invoice Details</h3><button className="text-zinc-400 hover:text-zinc-600"><MoreVertical size={20} /></button></div>
            <div className="space-y-10">
              <div className="space-y-4"><h4 className="text-base font-black" style={{ color: 'var(--text-primary)' }}>{invoiceData.customerName}</h4><div className="flex gap-3"><MapPin size={16} className="text-brand-blue/70 shrink-0 mt-0.5" /><p className="text-[11px] font-bold text-zinc-400 leading-relaxed">{invoiceData.address}</p></div><div className="pt-2 space-y-3"><div className="flex justify-between text-[11px] font-bold"><span className="text-zinc-400 font-black">Issue Date :</span><span style={{ color: 'var(--text-primary)' }}>{formatDate(invoiceData.issueDate)}</span></div><div className="flex justify-between text-[11px] font-bold"><span className="text-zinc-400 font-black">Delivery Date :</span><span style={{ color: 'var(--text-primary)' }}>{formatDate(invoiceData.deliveryDate)}</span></div></div></div>
              <div className="h-px opacity-50" style={{ backgroundColor: 'var(--border-color)' }} />
              <div className="space-y-4"><div className="flex justify-between text-[11px] font-bold"><span className="text-zinc-400 font-black">Invoice Number :</span><span style={{ color: 'var(--text-primary)' }}>{invoiceData.invoiceNumber}</span></div><div className="flex justify-between text-[11px] font-bold"><span className="text-zinc-400 font-black">Product Id :</span><span style={{ color: 'var(--text-primary)' }}>{invoiceData.productId}</span></div><div className="flex justify-between text-[11px] font-bold"><span className="text-zinc-400 font-black">Email :</span><span style={{ color: 'var(--text-primary)' }}>{invoiceData.email}</span></div><div className="flex justify-between text-[11px] font-bold"><span className="text-zinc-400 font-black">Call :</span><span style={{ color: 'var(--text-primary)' }}>{invoiceData.phone}</span></div></div>
              <div className="rounded-[32px] p-6 space-y-4 border border-brand-blue/5 shadow-inner" style={{ backgroundColor: 'var(--bg-card-inner)' }}>
                <div className="flex justify-between text-[11px] font-bold text-zinc-400 uppercase tracking-widest pb-2 border-b" style={{ borderColor: 'var(--border-color)' }}><span>Order Details</span><span>Total Price</span></div>
                <div className="space-y-3 pt-2"><div className="flex justify-between text-[11px] font-bold"><span className="text-zinc-400">Taxable (18%)</span><span style={{ color: 'var(--text-primary)' }}>${totals.tax}</span></div><div className="flex justify-between text-[11px] font-bold"><span className="text-zinc-400">Additional Charge</span><span style={{ color: 'var(--text-primary)' }}>${totals.additionalCharge}</span></div><div className="flex justify-between text-[11px] font-bold"><span className="text-zinc-400">Discount</span><span style={{ color: 'var(--text-primary)' }}>-${totals.discount}</span></div><div className="flex justify-between text-[11px] font-bold"><span className="text-zinc-400">Sub Total</span><span style={{ color: 'var(--text-primary)' }}>${totals.subtotal}</span></div></div>
                <div className="pt-4 border-t flex justify-between items-center" style={{ borderColor: 'var(--border-color)' }}><span className="text-base font-black" style={{ color: 'var(--text-primary)' }}>Total Amount</span><span className="text-xl font-black text-brand-blue">${totals.totalAmount}</span></div>
              </div>
              <div className="grid grid-cols-2 gap-4"><button onClick={handleExportPDF} className="border py-4 rounded-2xl text-[10px] font-black" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>Export PDF</button><button onClick={handlePrint} className="flex items-center justify-center gap-2 bg-brand-blue py-4 rounded-2xl text-[10px] font-black text-white shadow-lg shadow-brand-blue/30"><Printer size={14} /> Print</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
