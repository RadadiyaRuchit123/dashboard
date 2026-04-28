import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Eye, Edit2, Trash2, Search, MoreVertical, X, Check, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const initialOrders = [
  { id: 'ORD-001', displayId: '#69SD669', product: 'College Bag', image: 'https://images.unsplash.com/photo-1546750278-40614c540304?w=100', size: 'Small', customer: 'Leslie Alexander', avatar: 'https://i.pravatar.cc/150?u=leslie', price: '10.55', method: 'Cash on Delivery', stock: '858' },
  { id: 'ORD-002', displayId: '#69SDF15', product: 'Orange Smart watch', image: 'https://images.unsplash.com/photo-1508685096489-7aac2914b2b8?w=100', size: '-', customer: 'Darrell Steward', avatar: 'https://i.pravatar.cc/150?u=darrell', price: '100.41', method: 'Cash on Delivery', stock: '500' },
  { id: 'ORD-003', displayId: '#69SD6D4R', product: 'Jacket-154D', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100', size: 'XL', customer: 'Robert Fox', avatar: 'https://i.pravatar.cc/150?u=robert', price: '80.12', method: 'Online', stock: '885' },
  { id: 'ORD-004', displayId: '#69SDF4F6D', product: 'Wireless Earbuds', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100', size: '-', customer: 'Jerome Bell', avatar: 'https://i.pravatar.cc/150?u=jerome', price: '150.34', method: 'Online', stock: '786' },
  { id: 'ORD-005', displayId: '#69SD6D4R', product: 'Polo t-shirt', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100', size: 'XL', customer: 'Kathryn Murphy', avatar: 'https://i.pravatar.cc/150?u=kathryn', price: '80.74', method: 'Online', stock: '250' },
  { id: 'ORD-006', displayId: '#69SDW2R', product: 'Router-575v', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=100', size: '-', customer: 'Theresa Webb', avatar: 'https://i.pravatar.cc/150?u=theresa', price: '140.52', method: 'Cash on Delivery', stock: '400' },
  { id: 'ORD-007', displayId: '#69SD66EE', product: 'handbag', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100', size: 'Small', customer: 'Arlene McCoy', avatar: 'https://i.pravatar.cc/150?u=arlene', price: '42.36', method: 'Cash on Delivery', stock: '857' },
];

/* ── Portal wrapper — renders straight into document.body ── */
function Portal({ children }) {
  return ReactDOM.createPortal(children, document.body);
}

/* ── Backdrop ── */
function Backdrop({ onClose, children }) {
  const { isDark } = useTheme();
  return (
    <Portal>
      <div
        className={!isDark ? 'light' : ''}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
          backgroundColor: 'rgba(15,23,42,0.55)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          animation: 'fadeIn 0.18s ease',
        }}
        onClick={onClose}
      >
        <div
          style={{ animation: 'slideUp 0.22s cubic-bezier(.34,1.56,.64,1)' }}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(24px) scale(0.97) } to { opacity:1; transform:translateY(0) scale(1) } }
      `}</style>
    </Portal>
  );
}

/* ── View Modal ── */
function ViewModal({ order, onClose }) {
  const rows = [
    { label: 'Order ID', value: order.displayId },
    { label: 'Size', value: order.size },
    { label: 'Price', value: order.price },
    { label: 'Payment Method', value: order.method },
    { label: 'Stock', value: order.stock },
  ];
  return (
    <Backdrop onClose={onClose}>
      <div style={{
        background: 'var(--bg-card)', borderRadius: '28px', width: '100%', maxWidth: '520px',
        maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 32px 80px rgba(0,0,0,0.15)',
      }}>
        {/* Product header */}
        <div style={{ background: 'linear-gradient(135deg, var(--bg-card), var(--icon-bg))', padding: '24px 28px 18px', position: 'relative', borderBottom: '1px solid var(--border-color)' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'var(--icon-bg)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={15} style={{ color: 'var(--text-primary)' }} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={order.image} alt={order.product} style={{ width: 64, height: 64, borderRadius: 16, objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }} />
            <div>
              <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{order.product}</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{order.displayId}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
            <img src={order.avatar} alt={order.customer} style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid var(--border-color)' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{order.customer}</span>
          </div>
        </div>
        {/* Details */}
        <div style={{ padding: '20px 24px' }}>
          {rows.map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>{r.label}</span>
              <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 700 }}>{r.value}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '0 24px 24px' }}>
          <button onClick={onClose} style={{ width: '100%', padding: '12px', borderRadius: 16, border: 'none', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 14px rgba(34,197,94,0.35)' }}>
            Done
          </button>
        </div>
      </div>
    </Backdrop>
  );
}

/* ── Edit Modal ── */
function EditModal({ order, onSave, onClose }) {
  const [form, setForm] = useState({ ...order });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const fields = [
    { label: 'Product Name', key: 'product', type: 'text' },
    { label: 'Customer Name', key: 'customer', type: 'text' },
    { label: 'Price', key: 'price', type: 'text' },
    { label: 'Size', key: 'size', type: 'text' },
    { label: 'Stock', key: 'stock', type: 'text' },
  ];

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 12, border: '1.5px solid var(--border-color)',
    fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', background: 'transparent',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
  };

  return (
    <Backdrop onClose={onClose}>
      <div style={{ background: 'var(--bg-card)', borderRadius: 40, width: '100%', maxWidth: 480, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 32px 80px rgba(0,0,0,0.12)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 28px 20px', borderBottom: '1px solid var(--border-color)' }}>
          <div>
            <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Edit Order</p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{order.displayId}</p>
          </div>
          <button onClick={onClose} style={{ background: 'var(--icon-bg)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={16} style={{ color: 'var(--text-primary)' }} />
          </button>
        </div>
        {/* Fields */}
        <div style={{
          padding: '24px 28px',
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
          gap: '20px'
        }}>
          {fields.map(({ label, key }) => (
            <div key={key}>
              <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>{label}</label>
              <input style={inputStyle} value={form[key]} onChange={e => set(key, e.target.value)}
                onFocus={e => e.target.style.borderColor = '#22c55e'}
                onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
              />
            </div>
          ))}
          {/* Payment Method spans full width */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Payment Method</label>
            <select style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }} value={form.method} onChange={e => set('method', e.target.value)}>
              <option>Cash on Delivery</option>
              <option>Online</option>
            </select>
          </div>
        </div>
        {/* Actions */}
        <div style={{ padding: '4px 28px 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={() => { onSave(form); onClose(); }}
            style={{ width: '100%', padding: '14px', borderRadius: 16, border: 'none', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(34,197,94,0.30)' }}>
            <Check size={16} /> Save Changes
          </button>
          <button onClick={onClose} style={{ width: '100%', padding: '12px', borderRadius: 16, border: '1.5px solid var(--border-color)', background: 'transparent', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </div>
    </Backdrop>
  );
}

/* ── Delete Modal ── */
function DeleteModal({ order, onConfirm, onClose }) {
  return (
    <Backdrop onClose={onClose}>
      <div className="w-full max-w-[400px] rounded-[48px] overflow-hidden border shadow-2xl animate-in zoom-in-95 duration-500"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>

        {/* Top Section with Light Palette */}
        <div className="relative p-12 pb-6 text-center">
          {/* Very Soft Aura Glow */}
          <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-300/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative mx-auto w-24 h-24 rounded-[32px] bg-rose-50 dark:bg-rose-500/5 border border-rose-100 dark:border-rose-500/10 flex items-center justify-center mb-8 shadow-inner">
            <div className="w-16 h-16 rounded-[24px] bg-rose-400/90 flex items-center justify-center shadow-lg shadow-rose-200 dark:shadow-none">
              <Trash2 size={26} className="text-white" strokeWidth={2} />
            </div>
          </div>

          <h3 className="text-xl font-black mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Remove Order?
          </h3>
          <p className="text-[13px] font-bold leading-relaxed px-6" style={{ color: 'var(--text-muted)' }}>
            Are you sure you want to remove <br />
            <span className="text-rose-400/80 font-black">
              "{order.product}"
            </span>
          </p>
        </div>



        {/* Actions - Softened Buttons */}
        <div className="p-10 pt-4 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-4 rounded-[20px] text-[11px] font-black border transition-all hover:bg-zinc-50 dark:hover:bg-white/5 active:scale-95"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(order.id); onClose(); }}
            className="flex-1 py-4 rounded-[20px] text-[11px] font-black bg-rose-400/90 text-white shadow-lg shadow-rose-200 dark:shadow-none hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            Yes, Remove
          </button>
        </div>
      </div>
    </Backdrop>
  );
}

/* ── Main Table ── */
export default function OrderTable() {
  const { currency } = useTheme();
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState('');
  const [viewOrder, setViewOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [deleteOrder, setDeleteOrder] = useState(null);

  const handleDelete = (id) => setOrders(prev => prev.filter(o => o.id !== id));
  const handleSave = (updated) => setOrders(prev => prev.map(o => o.id === updated.id ? updated : o));

  const filteredOrders = orders.filter(o =>
    o.product.toLowerCase().includes(search.toLowerCase()) ||
    o.displayId.toLowerCase().includes(search.toLowerCase()) ||
    o.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {viewOrder && <ViewModal order={viewOrder} onClose={() => setViewOrder(null)} />}
      {editOrder && <EditModal order={editOrder} onSave={handleSave} onClose={() => setEditOrder(null)} />}
      {deleteOrder && <DeleteModal order={deleteOrder} onConfirm={handleDelete} onClose={() => setDeleteOrder(null)} />}

      <div className="rounded-3xl border overflow-hidden shadow-2xl transition-colors duration-300"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>

        {/* Header */}
        <div className="p-4 md:p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          style={{ borderColor: 'var(--border-color)' }}>
          <h3 className="text-lg md:text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Recent Orders</h3>
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={14} style={{ color: 'var(--text-muted)' }} />
              <input type="text" placeholder="Search now" value={search} onChange={e => setSearch(e.target.value)}
                className="rounded-lg py-1.5 pl-9 pr-4 text-xs focus:outline-none w-full sm:w-48 border transition-colors duration-300"
                style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
              />
            </div>
            <button style={{ color: 'var(--text-muted)' }} className="flex-shrink-0"><MoreVertical size={20} /></button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto w-full scrollbar-thin">
          <table className="w-full text-left min-w-[900px] md:min-w-full">
            <thead>
              <tr className="text-[10px] uppercase font-bold tracking-wider"
                style={{ backgroundColor: 'var(--bg-card-inner)', color: 'var(--text-muted)' }}>
                <th className="px-4 md:px-6 py-4">Product ID</th>
                <th className="px-4 md:px-6 py-4">Product name</th>
                <th className="px-4 md:px-6 py-4">Size</th>
                <th className="px-4 md:px-6 py-4">Customer name</th>
                <th className="px-4 md:px-6 py-4">Price</th>
                <th className="px-4 md:px-6 py-4">Payment method</th>
                <th className="px-4 md:px-6 py-4">Stock</th>
                <th className="px-4 md:px-6 py-4 text-right pr-6 md:pr-10">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? filteredOrders.map(order => (
                <tr key={order.id} className="transition-colors group"
                  style={{ borderTop: '1px solid var(--border-color)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--icon-bg)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td className="px-4 md:px-6 py-4 text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>{order.displayId}</td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={order.image} alt={order.product} className="w-8 h-8 rounded-lg object-cover" />
                      <span className="text-[11px] font-bold whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>{order.product}</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>{order.size}</td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img src={order.avatar} alt={order.customer} className="w-6 h-6 rounded-full" />
                      <span className="text-[11px] font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-[11px] font-black whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>{currency}{order.price?.toString().replace(/[₹$]/g, '')}</td>
                  <td className="px-4 md:px-6 py-4 text-[11px] font-medium whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>{order.method}</td>
                  <td className="px-4 md:px-6 py-4 text-[11px] font-bold whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>{order.stock}</td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center justify-end gap-3 pr-2 md:pr-4">
                      <button onClick={() => setViewOrder(order)} title="View"
                        className="p-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-500 transition-all" style={{ color: 'var(--text-muted)' }}>
                        <Eye size={14} />
                      </button>
                      <button onClick={() => setEditOrder(order)} title="Edit"
                        className="p-1.5 rounded-lg hover:bg-green-50 hover:text-green-500 transition-all" style={{ color: 'var(--text-muted)' }}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => setDeleteOrder(order)} title="Delete"
                        className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 transition-all" style={{ color: 'var(--text-muted)' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="px-6 py-10 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                    No orders found matching "{search}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y" style={{ borderColor: 'var(--border-color)' }}>
          {filteredOrders.length > 0 ? filteredOrders.map(order => (
            <div key={order.id} className="p-4 space-y-4" style={{ backgroundColor: 'var(--bg-card)' }}>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <img src={order.image} alt={order.product} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <p className="text-[12px] font-bold" style={{ color: 'var(--text-primary)' }}>{order.product}</p>
                    <p className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>{order.displayId}</p>
                  </div>
                </div>
                <p className="text-[13px] font-black" style={{ color: 'var(--text-primary)' }}>{currency}{order.price?.toString().replace(/[₹$]/g, '')}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-2 border-y" style={{ borderColor: 'var(--border-color)' }}>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-muted)' }}>Customer</p>
                  <div className="flex items-center gap-2 mt-1">
                    <img src={order.avatar} alt={order.customer} className="w-5 h-5 rounded-full" />
                    <span className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>{order.customer}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-muted)' }}>Size / Stock</p>
                  <p className="text-[10px] font-medium mt-1" style={{ color: 'var(--text-secondary)' }}>{order.size} / {order.stock}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <p className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>{order.method}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setViewOrder(order)} className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800" style={{ color: 'var(--text-muted)' }}><Eye size={16} /></button>
                  <button onClick={() => setEditOrder(order)} className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800" style={{ color: 'var(--text-muted)' }}><Edit2 size={16} /></button>
                  <button onClick={() => setDeleteOrder(order)} className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800" style={{ color: 'var(--text-muted)' }}><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          )) : (
            <div className="p-10 text-center text-sm" style={{ color: 'var(--text-muted)' }}>No orders found</div>
          )}
        </div>
      </div>
    </>
  );
}
