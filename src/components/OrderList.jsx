import React, { useState, useEffect } from 'react';
import { Search, Filter, Printer, Download, Plus, Eye, Trash2, ChevronLeft, ChevronRight, X, AlertCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { useTheme } from '../context/ThemeContext';

const mockOrders = [
  { id: '#69SFF669', product: 'Apple MacBook Air laptop', qty: 12, date: '19 Dec 2023', customer: 'Michael Johnson', price: '₹1050.00', payment: 'Cash on Delivery', status: 'Completed', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=50&h=50&fit=crop' },
  { id: '#69SWE23', product: 'INBOOK Y2 PLUS Intel', qty: 9, date: '02 Nov 2023', customer: 'David Smith', price: '₹6030.23', payment: 'Cash on Delivery', status: 'Completed', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=50&h=50&fit=crop' },
  { id: '#2FSD6D4', product: 'Men Luxury Stainless Steel', qty: 18, date: '10 Nov 2023', customer: 'James Brown', price: '₹2300.65', payment: 'Online', status: 'Progress', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=50&h=50&fit=crop' },
  { id: '#70SDF4F8', product: 'Stainless Steel Analog Watch', qty: 30, date: '26 Dec 2023', customer: 'Emily Johnson', price: '₹7800.00', payment: 'Online', status: 'Completed', image: 'https://images.unsplash.com/photo-1524592091214-8c919d20743b?w=50&h=50&fit=crop' },
  { id: '#70SD6D46', product: 'MI Airdots Wireless Earbuds', qty: 8, date: '17 Jun 2023', customer: 'Sophia Williams', price: '₹620.00', payment: 'Cash on Delivery', status: 'Progress', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=50&h=50&fit=crop' },
];

export default function OrderList({ onCreateOrder }) {
  const { currency } = useTheme();
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('mentx_orders');
    return saved ? JSON.parse(saved) : mockOrders;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    localStorage.setItem('mentx_orders', JSON.stringify(orders));
  }, [orders]);

  const handleDelete = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    setDeleteConfirmId(null);
  };

  const exportAllToPDF = () => {
    const doc = new jsPDF();
    const pdfCurrency = "Rs.";
    
    // 1. Header
    doc.setFontSize(22);
    doc.setTextColor(97, 105, 255);
    doc.text('Ment X - Full Orders Report', 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);
    doc.text(`Total Orders: ${filteredOrders.length}`, 14, 33);

    // 2. Table of All Orders
    const tableColumn = ["Order ID", "Product", "Qty", "Customer", "Date", "Price", "Status"];
    const tableRows = filteredOrders.map(order => [
      order.id,
      order.product,
      order.qty,
      order.customer,
      order.date,
      `${pdfCurrency}${order.price?.toString().replace(/[₹$]/g, '')}`,
      order.status
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [97, 105, 255], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 8, cellPadding: 3 },
      alternateRowStyles: { fillColor: [245, 247, 250] }
    });

    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const exportToPDF = (order) => {
    if (!order) return;
    const data = order;
    const pdfCurrency = "Rs.";
    const doc = new jsPDF();

    // 1. Header & Logo
    doc.setFontSize(24);
    doc.setTextColor(97, 105, 255); // Brand Blue
    doc.text('Ment X', 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('PROFESSIONAL DASHBOARD INVOICE', 14, 28);
    
    // 2. Info Grid (3 Columns)
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Order Info:', 14, 45);
    doc.text('Customer Info:', 75, 45);
    doc.text('Company Info:', 140, 45);
    
    doc.setFontSize(9);
    doc.setTextColor(80);
    // Order info column
    doc.text(`ID: ${data.id || 'N/A'}`, 14, 52);
    doc.text(`Date: ${data.date || 'N/A'}`, 14, 57);
    doc.text(`Status: ${data.status || 'Completed'}`, 14, 62);
    
    // Customer info column
    doc.text(`Name: ${data.customer || 'Guest Customer'}`, 75, 52);
    doc.text(`Email: ${data.customer?.toLowerCase().replace(/\s/g, '') || 'customer'}@example.com`, 75, 57);
    doc.text('Call: +91 98765 43210', 75, 62);
    
    // Company info column
    doc.text('Name: Ment X Tech Ltd.', 140, 52);
    doc.text('Email: support@mentx.com', 140, 57);
    doc.text('Call: +91 123 456 7890', 140, 62);

    // 3. Product Table & Calculations
    const cleanPrice = parseFloat(data.price?.toString().replace(/[₹$,]/g, '') || '0');
    const qty = parseInt(data.qty || '1');
    const tax = cleanPrice * 0.18; // 18% Tax
    const subtotal = (cleanPrice * qty) + tax;
    const shipping = 150.00;
    const total = subtotal + shipping;

    const tableColumn = ["Product ID", "Product name", "Qty", "Price", "Tax (18%)", "Subtotal"];
    const tableRows = [[
      data.id || 'N/A',
      data.product || 'Unnamed Product',
      qty.toString(),
      `${pdfCurrency}${cleanPrice.toFixed(2)}`,
      `${pdfCurrency}${tax.toFixed(2)}`,
      `${pdfCurrency}${subtotal.toFixed(2)}`
    ]];

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 75,
      theme: 'grid',
      headStyles: { fillColor: [97, 105, 255], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 8, cellPadding: 4 },
      alternateRowStyles: { fillColor: [245, 247, 250] }
    });

    // 4. Summary (Bottom Right)
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Tax (GST 18%):', 130, finalY);
    doc.text(`${pdfCurrency}${tax.toFixed(2)}`, 190, finalY, { align: 'right' });
    
    doc.text('Shipping:', 130, finalY + 8);
    doc.text(`${pdfCurrency}${shipping.toFixed(2)}`, 190, finalY + 8, { align: 'right' });
    
    // Add a horizontal line for the total
    doc.setDrawColor(230);
    doc.line(130, finalY + 12, 190, finalY + 12);

    doc.setFontSize(14);
    doc.setTextColor(97, 105, 255);
    doc.text(`Total Paid:`, 130, finalY + 22);
    doc.setFontSize(16);
    doc.text(`${pdfCurrency}${total.toFixed(2)}`, 190, finalY + 22, { align: 'right' });

    // Open & Save
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const filteredOrders = orders.filter(o => 
    o.product.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 if search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  
  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      {/* Premium Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setSelectedOrder(null)} />
          <div className="bg-white dark:bg-zinc-900 w-full max-w-5xl rounded-[32px] overflow-hidden shadow-2xl relative animate-in zoom-in duration-300 border border-white/20">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b flex justify-between items-center" style={{ borderColor: 'var(--border-color)' }}>
              <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>Order Details</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto max-h-[70vh] space-y-10">
              {/* Top Banner: Order Progress */}
              <div className="p-6 rounded-[24px] bg-brand-blue/5 border border-brand-blue/10 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-lg shadow-brand-blue/20">
                    <AlertCircle size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>Order ID: {selectedOrder.id}</h4>
                    <p className="text-sm font-bold opacity-60">Placed on {selectedOrder.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${selectedOrder.status === 'Completed' ? 'bg-[#238636] text-white' : 'bg-brand-blue text-white'}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              {/* 3-Column Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h5 className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40">Order Info</h5>
                  <div className="space-y-1">
                    <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Order Date: {selectedOrder.date}</p>
                    <p className="text-sm font-bold opacity-60">Status: {selectedOrder.status}</p>
                    <p className="text-sm font-bold opacity-60">Method: {selectedOrder.payment}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h5 className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40">Customer Info</h5>
                  <div className="flex items-center gap-3">
                    <img src={`https://i.pravatar.cc/150?u=${selectedOrder.customer}`} alt="" className="w-10 h-10 rounded-full border-2 border-brand-blue/20" />
                    <div>
                      <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{selectedOrder.customer}</p>
                      <p className="text-xs font-bold opacity-50">customer@example.com</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h5 className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40">Company Info</h5>
                  <div className="space-y-1">
                    <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Ment X Tech Ltd.</p>
                    <p className="text-sm font-bold opacity-60">Mumbai, India</p>
                    <p className="text-xs font-bold opacity-50">support@mentx.com</p>
                  </div>
                </div>
              </div>

              {/* Product Table */}
              <div className="border rounded-[24px] overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
                <table className="w-full text-left border-collapse">
                  <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-[10px] uppercase font-black tracking-widest" style={{ color: 'var(--text-secondary)' }}>
                    <tr>
                      <th className="px-6 py-4">Item ID</th>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Qty</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Discount</th>
                      <th className="px-6 py-4">Tax</th>
                      <th className="px-6 py-4">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-[11px] font-bold" style={{ borderColor: 'var(--border-color)' }}>
                    <tr>
                      <td className="px-6 py-4 opacity-60">#2FSD6D4</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <img src={selectedOrder.image} alt="" className="w-6 h-6 rounded-md object-cover" />
                          <span>{selectedOrder.product}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{selectedOrder.qty}</td>
                      <td className="px-6 py-4">{currency}{selectedOrder.price?.toString().replace(/[₹$]/g, '')}</td>
                      <td className="px-6 py-4">0.00</td>
                      <td className="px-6 py-4">{currency}230.00</td>
                      <td className="px-6 py-4">{currency}2630.65</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Summary and Actions */}
              <div className="flex flex-col md:flex-row justify-between items-end gap-8 pt-4">
                <div className="flex gap-4 no-print-area">
                  <button 
                    onClick={() => exportToPDF(selectedOrder)} 
                    className="px-8 py-3 rounded-xl border-2 font-black text-xs hover:bg-zinc-50 transition-all" 
                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    Export PDF
                  </button>
                  <button onClick={() => window.print()} className="px-8 py-3 bg-brand-blue text-white rounded-xl font-black text-xs shadow-lg shadow-brand-blue/20 hover:scale-[1.02] transition-all">Print Invoice</button>
                </div>
                <div className="w-full md:w-80 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="opacity-50 font-bold">Subtotal</span>
                    <span className="font-black" style={{ color: 'var(--text-primary)' }}>{currency}2,380.65</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-50 font-bold">Tax (GST 18%)</span>
                    <span className="font-black" style={{ color: 'var(--text-primary)' }}>{currency}250.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-50 font-bold">Shipping</span>
                    <span className="font-black" style={{ color: 'var(--text-primary)' }}>{currency}150.00</span>
                  </div>
                  <div className="pt-3 border-t flex justify-between items-center" style={{ borderColor: 'var(--border-color)' }}>
                    <span className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>Total Paid</span>
                    <span className="text-2xl font-black text-brand-blue">{currency}2,780.65</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h2 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>List Order</h2>
        <div className="flex flex-wrap items-center gap-3 no-print-area">
          <button onClick={exportAllToPDF} className="flex items-center gap-2 bg-white dark:bg-zinc-900 border px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-zinc-50 transition-all" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}><Download size={18} />Export All PDF</button>
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-white dark:bg-zinc-900 border px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-zinc-50 transition-all" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}><Printer size={18} />Print</button>
          <button onClick={onCreateOrder} className="flex items-center gap-2 bg-brand-blue text-white px-6 py-2.5 rounded-xl font-black text-sm shadow-xl shadow-brand-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all btn-glow"><Plus size={18} strokeWidth={3} />Create Order</button>
        </div>
      </div>

      {/* Custom Modal for Deletion Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setDeleteConfirmId(null)} />
          <div className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom-8 duration-300 border border-white/20">
            <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>Are you sure?</h3>
                <p className="text-sm font-bold opacity-60 px-4">This action will permanently delete this order from the records.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-3.5 rounded-xl border-2 font-black text-xs hover:bg-zinc-50 transition-all" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>Cancel</button>
                <button onClick={() => handleDelete(deleteConfirmId)} className="flex-1 py-3.5 bg-rose-500 text-white rounded-xl font-black text-xs shadow-lg shadow-rose-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Delete Now</button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Table Section */}
      <div className="premium-card rounded-[32px] overflow-hidden" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        <div className="p-8 border-b flex flex-col md:flex-row md:items-center justify-between gap-6 no-print-area" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2.5 border rounded-xl font-bold text-sm hover:bg-zinc-50 transition-all" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}><Filter size={18} />Filter</button>
            <div className="relative flex-1 md:w-80"><Search className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: 'var(--text-muted)' }} /><input type="text" placeholder="Search now" className="w-full pl-12 pr-4 py-2.5 border rounded-xl focus:outline-none focus:border-brand-blue transition-all font-medium text-sm" style={{ backgroundColor: 'var(--bg-root)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="text-[11px] uppercase font-black tracking-widest border-b" style={{ backgroundColor: 'var(--bg-card-inner)', color: 'var(--text-primary)', opacity: 0.9, borderColor: 'var(--border-color)' }}>
                <th className="px-8 py-5">Product ID</th>
                <th className="px-8 py-5">Product name</th>
                <th className="px-8 py-5">Qty</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Customer name</th>
                <th className="px-8 py-5">Price</th>
                <th className="px-8 py-5">Payment method</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
              {currentItems.map((order, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors group">
                  <td className="px-8 py-5 text-xs font-bold" style={{ color: 'var(--text-muted)' }}>{order.id}</td>
                  <td className="px-8 py-5"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl overflow-hidden bg-zinc-100 border p-1" style={{ borderColor: 'var(--border-color)' }}><img src={order.image} alt="" className="w-full h-full object-cover rounded-lg" /></div><span className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>{order.product}</span></div></td>
                  <td className="px-8 py-5 text-xs font-black" style={{ color: 'var(--text-primary)' }}>{order.qty.toString().padStart(2, '0')}</td>
                  <td className="px-8 py-5 text-xs font-bold" style={{ color: 'var(--text-muted)' }}>{order.date}</td>
                  <td className="px-8 py-5"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-zinc-200 border-2 border-white dark:border-zinc-800 overflow-hidden shadow-sm"><img src={`https://i.pravatar.cc/150?u=${order.customer}`} alt="" className="w-full h-full object-cover" /></div><span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{order.customer}</span></div></td>
                  <td className="px-8 py-5 text-xs font-black" style={{ color: 'var(--text-primary)' }}>{currency}{order.price?.toString().replace(/[₹$]/g, '')}</td>
                  <td className="px-8 py-5 text-xs font-bold" style={{ color: 'var(--text-muted)' }}>{order.payment}</td>
                  <td className="px-8 py-5"><span className={`text-[10px] font-black px-4 py-1.5 rounded-lg inline-block text-center min-w-[100px] border transition-all ${order.status === 'Completed' ? 'bg-[#238636]/10 text-[#3fb950] border-[#238636]/20' : order.status === 'Progress' ? 'bg-[#9e6a03]/10 text-[#d29922] border-[#9e6a03]/20' : 'bg-[#da3633]/10 text-[#f85149] border-[#da3633]/20'}`}>{order.status}</span></td>
                  <td className="px-8 py-5"><div className="flex items-center justify-end gap-2 transition-opacity"><button onClick={() => setSelectedOrder(order)} className="p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-brand-blue/30 hover:bg-brand-blue/5 transition-all text-[#58a6ff] hover:text-brand-blue"><Eye size={15} strokeWidth={3} /></button><button onClick={() => setDeleteConfirmId(order.id)} className="p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-rose-500/30 hover:bg-rose-500/5 transition-all text-[#f85149] hover:text-rose-500"><Trash2 size={15} strokeWidth={3} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y" style={{ borderColor: 'var(--border-color)' }}>
          {currentItems.map((order, idx) => (
            <div key={idx} className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-100 border p-1" style={{ borderColor: 'var(--border-color)' }}>
                    <img src={order.image} alt="" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{order.product}</h4>
                    <p className="text-[10px] font-bold opacity-50 uppercase tracking-wider">{order.id}</p>
                  </div>
                </div>
                <span className={`text-[9px] font-black px-3 py-1 rounded-lg border uppercase tracking-widest ${order.status === 'Completed' ? 'bg-[#238636]/10 text-[#3fb950] border-[#238636]/20' : order.status === 'Progress' ? 'bg-[#9e6a03]/10 text-[#d29922] border-[#9e6a03]/20' : 'bg-[#da3633]/10 text-[#f85149] border-[#da3633]/20'}`}>
                  {order.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 py-2">
                <div>
                  <p className="text-[10px] font-black opacity-40 uppercase mb-1">Customer</p>
                  <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{order.customer}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black opacity-40 uppercase mb-1">Price</p>
                  <p className="text-sm font-black text-brand-blue">{currency}{order.price?.toString().replace(/[₹$]/g, '')}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black opacity-40 uppercase mb-1">Date</p>
                  <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{order.date}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black opacity-40 uppercase mb-1">Quantity</p>
                  <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{order.qty} pcs</p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button onClick={() => setSelectedOrder(order)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-black text-xs transition-all hover:bg-zinc-50" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                  <Eye size={14} /> View Details
                </button>
                <button onClick={() => setDeleteConfirmId(order.id)} className="w-12 flex items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 border-t flex items-center justify-center gap-2 no-print-area" style={{ borderColor: 'var(--border-color)' }}>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border hover:bg-zinc-50 disabled:opacity-30" 
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
          >
            <ChevronLeft size={18} />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button 
              key={page} 
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${currentPage === page ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'hover:bg-zinc-50 border'}`} 
              style={{ borderColor: currentPage === page ? 'transparent' : 'var(--border-color)', color: currentPage === page ? 'white' : 'var(--text-primary)' }}
            >
              {page}
            </button>
          ))}

          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border hover:bg-zinc-50 disabled:opacity-30" 
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
