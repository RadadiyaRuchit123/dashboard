import React, { useState, useMemo } from 'react';
import {
  Mail, Phone, Calendar, Hash, Package, MapPin,
  ChevronDown, Edit2, Trash2, Printer,
  MoreVertical
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useTheme } from '../context/ThemeContext';

const InvoiceField = ({ label, value, icon: Icon, type = "text", placeholder, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand-blue transition-colors">
        {Icon && <Icon size={16} />}
      </div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold outline-none focus:border-brand-blue/30 transition-all shadow-sm"
        style={{ backgroundColor: 'var(--bg-card-inner)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
      />
    </div>
  </div>
);

const OrderRow = ({ id, name, qty, price, image, onDelete }) => {
  const total = (parseFloat(qty) * parseFloat(price)).toFixed(2);

  return (
    <tr className="group border-b last:border-0 hover:bg-zinc-50/50 dark:hover:bg-white/5 transition-colors" style={{ borderColor: 'var(--border-color)' }}>
      <td className="py-5 pl-4 text-[11px] font-bold text-zinc-400">{id}</td>
      <td className="py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
          <span className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>{name}</span>
        </div>
      </td>
      <td className="py-5 text-xs font-bold text-zinc-400">{qty}</td>
      <td className="py-5 text-xs font-bold text-zinc-400">${price}</td>
      <td className="py-5 text-xs font-black" style={{ color: 'var(--text-primary)' }}>${total}</td>
      <td className="py-5 pr-4 no-print">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 rounded-lg bg-white dark:bg-zinc-800 border text-zinc-400 hover:text-brand-blue hover:border-brand-blue/30 shadow-sm transition-all" style={{ borderColor: 'var(--border-color)' }}>
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-2 rounded-lg bg-white dark:bg-zinc-800 border text-zinc-400 hover:text-rose-500 hover:border-rose-200 shadow-sm transition-all"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default function Invoice() {
  const { isDark } = useTheme();
  const [isExporting, setIsExporting] = useState(false);

  // Form State
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

  // Dynamic Calculations
  const totals = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + (item.qty * item.price), 0);
    const tax = subtotal * 0.18; // 18% Tax
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

  const updateData = (key, val) => {
    setInvoiceData(prev => ({ ...prev, [key]: val }));
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      const doc = new jsPDF();
      const pdfCurrency = "$";

      // 1. Header & Branding
      doc.setFontSize(28);
      doc.setTextColor(97, 105, 255); // Brand Blue
      doc.text('Ment X', 14, 25);

      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text('PROFESSIONAL INVOICE', 14, 33);
      doc.text(`DATE: ${new Date().toLocaleDateString()}`, 160, 25);

      // 2. Info Sections
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text('BILL TO:', 14, 50);
      doc.text('INVOICE INFO:', 110, 50);

      doc.setFontSize(10);
      doc.setTextColor(80);
      // Bill To Data
      doc.text(invoiceData.customerName || 'Customer', 14, 58);
      const addressText = invoiceData.address || 'No Address';
      const splitAddress = doc.splitTextToSize(addressText, 80);
      doc.text(splitAddress, 14, 64);

      const emailY = 64 + (splitAddress.length * 6);
      doc.text(`Email: ${invoiceData.email}`, 14, emailY);
      doc.text(`Phone: ${invoiceData.phone}`, 14, emailY + 6);

      // Invoice Info Data
      doc.text(`Invoice No: ${invoiceData.invoiceNumber}`, 110, 58);
      doc.text(`Product ID: ${invoiceData.productId}`, 110, 64);
      doc.text(`Issue Date: ${formatDate(invoiceData.issueDate)}`, 110, 70);
      doc.text(`Delivery Date: ${formatDate(invoiceData.deliveryDate)}`, 110, 76);

      // 3. Product Table
      const tableColumn = ["ID", "Product Name", "Qty", "Price", "Total"];
      const tableRows = items.map(item => [
        item.id,
        item.name,
        item.qty.toString(),
        `${pdfCurrency}${item.price.toFixed(2)}`,
        `${pdfCurrency}${(item.qty * item.price).toFixed(2)}`
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 95,
        theme: 'grid',
        headStyles: { fillColor: [97, 105, 255], textColor: 255, fontStyle: 'bold' },
        styles: { fontSize: 9, cellPadding: 4 },
        alternateRowStyles: { fillColor: [245, 247, 250] }
      });

      // 4. Totals Calculation in Footer
      const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 15 : 150;
      doc.setFontSize(10);
      doc.setTextColor(100);

      const labelX = 110;
      const valueX = 195; // Pushed further right to avoid overlap

      doc.text(`Subtotal:`, labelX, finalY);
      doc.text(`${pdfCurrency}${totals.subtotal}`, valueX, finalY, { align: 'right' });

      doc.text(`Tax (18%):`, labelX, finalY + 10);
      doc.text(`${pdfCurrency}${totals.tax}`, valueX, finalY + 8, { align: 'right' });

      doc.text(`Additional Charge:`, labelX, finalY + 16);
      doc.text(`${pdfCurrency}${totals.additionalCharge}`, valueX, finalY + 16, { align: 'right' });

      doc.text(`Discount:`, labelX, finalY + 24);
      doc.text(`-${pdfCurrency}${totals.discount}`, valueX, finalY + 24, { align: 'right' });

      doc.setDrawColor(230);
      doc.line(labelX, finalY + 30, valueX, finalY + 30);

      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.setFont(undefined, 'bold');
      doc.text(`TOTAL AMOUNT:`, labelX, finalY + 42);
      doc.text(`${pdfCurrency}${totals.totalAmount}`, valueX, finalY + 42, { align: 'right' });

      // 5. Footer Note
      if (invoiceData.purchaseNote) {
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(150);
        const noteY = Math.max(finalY + 55, 250);
        doc.text('PURCHASE NOTE:', 14, noteY);
        doc.text(doc.splitTextToSize(invoiceData.purchaseNote, 180), 14, noteY + 6);
      }

      // Output: Save and also try to open
      const fileName = `Invoice_${invoiceData.invoiceNumber.replace('#', '')}.pdf`;
      doc.save(fileName);

      // Attempt to open in new tab (some browsers block this, but it's good for UX)
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');

    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Failed to generate PDF. Please check the console for details.");
    } finally {
      setIsExporting(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '');
  };

  return (
    <div className="pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Main Form Area */}
        <div className="xl:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Name Card */}
            <div className="rounded-[32px] p-8 border shadow-xl shadow-zinc-200/10" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-4">Customer Name</label>
              <div className="flex items-center justify-between p-4 rounded-2xl border transition-all" style={{ backgroundColor: 'var(--bg-card-inner)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl border flex items-center justify-center overflow-hidden shrink-0" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3yvPqQ6Zq6p0N4v5z9x5X5X5X5X5X5X5X5X&s" alt="Logo" className="w-8 h-8 object-contain" />
                  </div>
                  <div className="flex-1">
                    <input
                      className="w-full bg-transparent text-sm font-black outline-none"
                      style={{ color: 'var(--text-primary)' }}
                      value={invoiceData.customerName}
                      onChange={(e) => updateData('customerName', e.target.value)}
                    />
                    <input
                      className="w-full bg-transparent text-[10px] font-bold text-zinc-400 outline-none"
                      value={invoiceData.customerTag}
                      onChange={(e) => updateData('customerTag', e.target.value)}
                    />
                  </div>
                </div>
                <ChevronDown size={16} className="text-zinc-400" />
              </div>
            </div>

            {/* Address Card */}
            <div className="rounded-[32px] p-8 border shadow-xl shadow-zinc-200/10" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-4">Address</label>
              <div className="flex items-start gap-4 p-4 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card-inner)', borderColor: 'var(--border-color)' }}>
                <div className="w-10 h-10 rounded-xl border flex items-center justify-center text-zinc-400 shrink-0" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                  <MapPin size={18} />
                </div>
                <textarea
                  className="w-full bg-transparent text-xs font-bold text-zinc-400 outline-none resize-none h-12 leading-relaxed"
                  value={invoiceData.address}
                  onChange={(e) => updateData('address', e.target.value)}
                />
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="rounded-[32px] p-8 border shadow-xl shadow-zinc-200/10 space-y-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
              <h3 className="text-lg font-black mb-2" style={{ color: 'var(--text-primary)' }}>Contact Info</h3>
              <InvoiceField label="Mail Address" value={invoiceData.email} icon={Mail} onChange={(v) => updateData('email', v)} />
              <InvoiceField label="Phone Number" value={invoiceData.phone} icon={Phone} onChange={(v) => updateData('phone', v)} />
            </div>

            {/* General Card */}
            <div className="rounded-[32px] p-8 border shadow-xl shadow-zinc-200/10" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
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

          {/* Order Summary Table Card */}
          <div className="rounded-[32px] border shadow-xl shadow-zinc-200/10 overflow-hidden" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <div className="p-8 pb-0">
              <h3 className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>Order Summary</h3>
            </div>
            <div className="p-8 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] uppercase font-black tracking-widest text-zinc-400 border-b" style={{ borderColor: 'var(--border-color)' }}>
                    <th className="pb-4 pl-4 font-black">Product ID <span className="ml-1 text-[8px]">↑↓</span></th>
                    <th className="pb-4 font-black">Product name <span className="ml-1 text-[8px]">↑↓</span></th>
                    <th className="pb-4 font-black">Quantity <span className="ml-1 text-[8px]">↑↓</span></th>
                    <th className="pb-4 font-black">Price <span className="ml-1 text-[8px]">↑↓</span></th>
                    <th className="pb-4 font-black">Total price <span className="ml-1 text-[8px]">↑↓</span></th>
                    <th className="pb-4 pr-4 font-black no-print">Actions <span className="ml-1 text-[8px]">↑↓</span></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <OrderRow
                      key={item.id}
                      {...item}
                      onDelete={handleDeleteItem}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Purchase Note Section */}
          <div className="rounded-[32px] p-8 border shadow-xl shadow-zinc-200/10 space-y-4 no-print" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <h3 className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>Purchase Note:</h3>
            <textarea
              placeholder="Type here..."
              value={invoiceData.purchaseNote}
              onChange={(e) => updateData('purchaseNote', e.target.value)}
              className="w-full rounded-2xl p-6 text-xs font-bold outline-none focus:border-brand-blue/30 transition-all h-32 resize-none"
              style={{ backgroundColor: 'var(--bg-card-inner)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            ></textarea>
            <button className="bg-brand-blue text-white px-10 py-4 rounded-2xl text-xs font-black shadow-lg shadow-brand-blue/30 hover:-translate-y-1 transition-all">
              Submit
            </button>
          </div>
        </div>

        {/* Right Sidebar - Invoice Details */}
        <div className="xl:col-span-4">
          <div className="sticky top-6 rounded-[40px] p-8 border shadow-2xl shadow-zinc-200/10" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>Invoice Details</h3>
              <button className="text-zinc-400 hover:text-zinc-600 no-print">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="space-y-10">
              {/* Client Info Summary */}
              <div className="space-y-4">
                <h4 className="text-base font-black" style={{ color: 'var(--text-primary)' }}>{invoiceData.customerName || "Customer Name"}</h4>
                <div className="flex gap-3">
                  <MapPin size={16} className="text-zinc-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] font-bold text-zinc-400 leading-relaxed">
                    {invoiceData.address || "No address provided"}
                  </p>
                </div>
                <div className="pt-2 space-y-3">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-zinc-400">Issue Date :</span>
                    <span style={{ color: 'var(--text-primary)' }}>{formatDate(invoiceData.issueDate)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-zinc-400">Delivery Date :</span>
                    <span style={{ color: 'var(--text-primary)' }}>{formatDate(invoiceData.deliveryDate)}</span>
                  </div>
                </div>
              </div>

              <div className="h-px" style={{ backgroundColor: 'var(--border-color)' }} />

              {/* Data Summary */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[11px] font-bold">
                  <span className="text-zinc-400">Invoice Number :</span>
                  <span style={{ color: 'var(--text-primary)' }}>{invoiceData.invoiceNumber}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-bold">
                  <span className="text-zinc-400">Product Id :</span>
                  <span style={{ color: 'var(--text-primary)' }}>{invoiceData.productId}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-bold">
                  <span className="text-zinc-400">Email :</span>
                  <span style={{ color: 'var(--text-primary)' }}>{invoiceData.email}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-bold">
                  <span className="text-zinc-400">Call :</span>
                  <span style={{ color: 'var(--text-primary)' }}>{invoiceData.phone}</span>
                </div>
              </div>

              <div className="rounded-[32px] p-6 space-y-4" style={{ backgroundColor: 'var(--bg-card-inner)' }}>
                <div className="flex justify-between items-center text-[11px] font-bold text-zinc-400 uppercase tracking-widest pb-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <span>Order Details</span>
                  <span>Total Price</span>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-zinc-400">Taxable (18%)</span>
                    <span style={{ color: 'var(--text-primary)' }}>${totals.tax}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-zinc-400">Additional Charge</span>
                    <span style={{ color: 'var(--text-primary)' }}>${totals.additionalCharge}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-zinc-400">Discount</span>
                    <span style={{ color: 'var(--text-primary)' }}>-${totals.discount}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-zinc-400">Sub Total</span>
                    <span style={{ color: 'var(--text-primary)' }}>${totals.subtotal}</span>
                  </div>
                </div>
                <div className="pt-4 border-t flex justify-between items-center" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="text-base font-black" style={{ color: 'var(--text-primary)' }}>Total Amount</span>
                  <span className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>${totals.totalAmount}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 no-print">
                <button
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  className={`flex items-center justify-center gap-2 border py-4 rounded-2xl text-[10px] font-black transition-all ${isExporting ? 'opacity-50 cursor-wait' : ''}`}
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  {isExporting ? 'Generating...' : 'Export PDF'}
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 bg-brand-blue py-4 rounded-2xl text-[10px] font-black text-white shadow-lg shadow-brand-blue/30 hover:-translate-y-1 transition-all"
                >
                  <Printer size={14} /> Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
