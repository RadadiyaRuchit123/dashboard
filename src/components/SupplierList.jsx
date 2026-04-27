import React, { useState } from 'react';
import { 
  Search, Filter, Download, Printer, Plus, MoreVertical, 
  Edit2, Trash2, Eye, ChevronLeft, ChevronRight, X, 
  Upload, Calendar, Mail, Phone, Globe, Hash, Building2, User, AlertCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const initialSuppliers = [
  { id: "#SUP001", company: "Apple Inc", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", supplier: "Michael Johnson", avatar: "https://i.pravatar.cc/150?u=Michael", date: "06 May 2023", email: "yourmail12@gmail.com", phone: "+123 325 789 212", country: "USA", gst: "546987321" },
  { id: "#SUP002", company: "Volkswagen Group", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg", supplier: "David Smith", avatar: "https://i.pravatar.cc/150?u=David", date: "10 May 2023", email: "mymail58@gmail.com", phone: "+123 555 752 566", country: "USA", gst: "987564125" },
  { id: "#SUP003", company: "Toyota Motor Corporation", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Toyota_EU.svg", supplier: "James Brown", avatar: "https://i.pravatar.cc/150?u=James", date: "27 May 2023", email: "hellomail65@gmail.com", phone: "+123 998 788 554", country: "UK", gst: "369852147" },
  { id: "#SUP004", company: "Procter & Gamble Co.", logo: "https://upload.wikimedia.org/wikipedia/commons/8/85/Procter_%26_Gamble_logo.svg", supplier: "Emily Johnson", avatar: "https://i.pravatar.cc/150?u=Emily", date: "08 Jun 2023", email: "mailmy789@gmail.com", phone: "+123 789 455 454", country: "USA", gst: "741852963" },
  { id: "#SUP005", company: "Royal Dutch Shell", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Shell_logo.svg", supplier: "Sophia Williams", avatar: "https://i.pravatar.cc/150?u=Sophia", date: "14 Jun 2023", email: "hellomail54@gmail.com", phone: "+123 741 369 123", country: "UK", gst: "159357642" },
  { id: "#SUP006", company: "Exxon Mobil Corporation", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Exxon_Mobil_Logo.svg/1200px-Exxon_Mobil_Logo.svg.png", supplier: "Isabella Wilson", avatar: "https://i.pravatar.cc/150?u=Isabella", date: "23 Jun 2023", email: "hihelmail787@gmail.com", phone: "+123 456 789 321", country: "UK", gst: "987654123" },
  { id: "#SUP007", company: "BP plc", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/BP_Logo.svg/1200px-BP_Logo.svg.png", supplier: "Thomas Anderson", avatar: "https://i.pravatar.cc/150?u=Thomas", date: "30 Jun 2023", email: "hibppc12@gmail.com", phone: "+123 321 654 987", country: "CA", gst: "359648217" },
];

export default function SupplierList() {
  const { currency } = useTheme();
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [viewingSupplier, setViewingSupplier] = useState(null);
  const [currentPage, setCurrentPage] = useState(2); 
  
  const [formData, setFormData] = useState({
    company: '',
    supplier: '',
    date: '08 Jun 2023',
    email: '',
    phone: '',
    country: 'USA',
    gst: '',
    avatar: null
  });

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      company: supplier.company,
      supplier: supplier.supplier,
      date: supplier.date,
      email: supplier.email,
      phone: supplier.phone,
      country: supplier.country,
      gst: supplier.gst,
      avatar: supplier.avatar
    });
    setIsModalOpen(true);
  };

  const handleView = (supplier) => {
    setViewingSupplier(supplier);
    setIsViewModalOpen(true);
  };

  const handleDelete = (id) => {
    setSuppliers(prev => prev.filter(s => s.id !== id));
    setDeleteConfirmId(null);
  };

  const handleSave = () => {
    if (editingSupplier) {
      setSuppliers(prev => prev.map(s => s.id === editingSupplier.id ? { ...s, ...formData } : s));
    } else {
      const newId = `#SUP${Math.floor(Math.random() * 90000) + 10000}`;
      const newSup = {
        ...formData,
        id: newId,
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", // Default for demo
        avatar: formData.avatar || `https://i.pravatar.cc/150?u=${formData.supplier}`
      };
      setSuppliers([newSup, ...suppliers]);
    }
    setIsModalOpen(false);
    setEditingSupplier(null);
  };

  const inputStyle = {
    backgroundColor: 'var(--bg-card-inner)',
    borderColor: 'var(--border-color)',
    color: 'var(--text-primary)'
  };

  const filteredSuppliers = suppliers.filter(s => 
    s.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header section matches image */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h2 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Supplier List</h2>
        <div className="flex items-center gap-3 no-print-area">
          <button className="flex items-center gap-2 bg-white dark:bg-zinc-900 border px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-zinc-50 transition-all shadow-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
            Export PDF
          </button>
          <button className="flex items-center gap-2 bg-white dark:bg-zinc-900 border px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-zinc-50 transition-all shadow-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
            <Printer size={18} /> Print
          </button>
          <button 
            onClick={() => {
              setEditingSupplier(null);
              setFormData({ company: '', supplier: '', date: '08 Jun 2023', email: '', phone: '', country: 'USA', gst: '', avatar: null });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-brand-blue text-white px-6 py-2.5 rounded-xl font-black text-sm shadow-xl shadow-brand-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all btn-glow"
          >
            Add Suppliers <Plus size={18} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Filter and Search matches image */}
      <div className="flex items-center gap-4 no-print-area">
        <button className="flex items-center gap-2 px-6 py-2.5 border rounded-xl font-black text-sm hover:bg-zinc-50 transition-all bg-white dark:bg-zinc-900 shadow-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
          Filter <Filter size={18} />
        </button>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search now" 
            className="w-full pl-12 pr-4 py-2.5 border rounded-xl focus:outline-none focus:border-brand-blue transition-all font-bold text-sm bg-white dark:bg-zinc-900 shadow-sm" 
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="premium-card rounded-[32px] overflow-hidden shadow-sm border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="text-[11px] uppercase font-black tracking-widest border-b" style={{ backgroundColor: 'var(--bg-card-inner)', color: 'var(--text-primary)', opacity: 0.8, borderColor: 'var(--border-color)' }}>
                <th className="px-8 py-5">Company name</th>
                <th className="px-8 py-5">Supplier name</th>
                <th className="px-8 py-5">Reg date</th>
                <th className="px-8 py-5">Email</th>
                <th className="px-8 py-5">Phone number</th>
                <th className="px-8 py-5">Country</th>
                <th className="px-8 py-5">GST No</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
              {filteredSuppliers.map((s, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-zinc-50 p-1 flex items-center justify-center border" style={{ borderColor: 'var(--border-color)' }}>
                        <img src={s.logo} alt="" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{s.company}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm border-2 border-white dark:border-zinc-800">
                        <img src={s.avatar} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{s.supplier}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-xs font-bold" style={{ color: 'var(--text-primary)', opacity: 0.7 }}>{s.date}</td>
                  <td className="px-8 py-5 text-xs font-bold" style={{ color: 'var(--text-primary)', opacity: 0.7 }}>{s.email}</td>
                  <td className="px-8 py-5 text-xs font-bold" style={{ color: 'var(--text-primary)', opacity: 0.7 }}>{s.phone}</td>
                  <td className="px-8 py-5 text-xs font-black uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>{s.country}</td>
                  <td className="px-8 py-5 text-xs font-bold" style={{ color: 'var(--text-primary)', opacity: 0.7 }}>{s.gst}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleView(s)} className="p-2.5 rounded-xl border hover:border-brand-blue/30 hover:bg-brand-blue/5 transition-all text-zinc-400 hover:text-brand-blue" style={{ borderColor: 'var(--border-color)' }}><Eye size={15} strokeWidth={3} /></button>
                      <button onClick={() => handleEdit(s)} className="p-2.5 rounded-xl border hover:border-brand-blue/30 hover:bg-brand-blue/5 transition-all text-zinc-400 hover:text-brand-blue" style={{ borderColor: 'var(--border-color)' }}><Edit2 size={15} strokeWidth={3} /></button>
                      <button onClick={() => setDeleteConfirmId(s.id)} className="p-2.5 rounded-xl border hover:border-rose-500/30 hover:bg-rose-500/5 transition-all text-zinc-400 hover:text-rose-500" style={{ borderColor: 'var(--border-color)' }}><Trash2 size={15} strokeWidth={3} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination matches image style */}
        <div className="p-6 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-xs font-bold text-zinc-400">Showing 1 to 10 of 50 entries</p>
          <div className="flex items-center gap-1.5">
            <button className="p-2 rounded-lg border hover:bg-zinc-50 transition-all opacity-40" style={{ borderColor: 'var(--border-color)' }}><ChevronLeft size={16} /></button>
            {[1, 2, 3, 4, 5].map(p => (
              <button key={p} className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${currentPage === p ? 'bg-brand-blue text-white shadow-lg' : 'hover:bg-zinc-50 border text-zinc-400'}`} style={{ borderColor: currentPage === p ? 'transparent' : 'var(--border-color)' }}>
                {p}
              </button>
            ))}
            <button className="p-2 rounded-lg border hover:bg-zinc-50 transition-all" style={{ borderColor: 'var(--border-color)' }}><ChevronRight size={16} /></button>
            <div className="flex items-center gap-2 ml-4">
              <span className="text-xs font-bold text-zinc-400">Go to</span>
              <input type="text" className="w-10 h-8 border rounded-lg text-xs font-black text-center focus:outline-none focus:border-brand-blue transition-all" style={inputStyle} />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setDeleteConfirmId(null)} />
          <div className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom-8 duration-300 border border-white/20">
            <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>Are you sure?</h3>
                <p className="text-sm font-bold opacity-60 px-4">This action will permanently delete this supplier from the records.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-3.5 rounded-xl border-2 font-black text-xs hover:bg-zinc-50 transition-all" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>Cancel</button>
                <button onClick={() => handleDelete(deleteConfirmId)} className="flex-1 py-3.5 bg-rose-500 text-white rounded-xl font-black text-xs shadow-lg shadow-rose-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Delete Now</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Supplier Modal - PROFESSIONAL READ-ONLY VIEW */}
      {isViewModalOpen && viewingSupplier && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsViewModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-[32px] border shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
            <div className="p-8 md:p-10 space-y-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>Supplier Details</h3>
                    <p className="text-xs font-bold text-zinc-400">{viewingSupplier.id}</p>
                  </div>
                </div>
                <button onClick={() => setIsViewModalOpen(false)} className="p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                  <X size={20} className="text-zinc-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Company</label>
                    <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{viewingSupplier.company}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Supplier Name</label>
                    <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{viewingSupplier.supplier}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Email Address</label>
                    <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{viewingSupplier.email}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Phone Number</label>
                    <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{viewingSupplier.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Country</label>
                    <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{viewingSupplier.country}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">GST Number</label>
                    <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{viewingSupplier.gst}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-[24px] bg-zinc-50 dark:bg-zinc-800/40 border border-dashed flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl">
                    <img src={viewingSupplier.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Official Avatar</p>
                    <p className="text-[10px] font-bold text-zinc-400 italic">Registered on {viewingSupplier.date}</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl border flex items-center justify-center p-2 bg-white dark:bg-zinc-900" style={{ borderColor: 'var(--border-color)' }}>
                   <img src={viewingSupplier.logo} alt="" className="w-full h-full object-contain" />
                </div>
              </div>

              <button 
                onClick={() => setIsViewModalOpen(false)} 
                className="w-full py-4 bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white rounded-2xl font-black text-sm shadow-xl hover:scale-[1.01] transition-all"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Add Supplier Modal - MATCHES IMAGE EXACTLY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[32px] border shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
            <div className="p-8 md:p-10 space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>{editingSupplier ? 'Edit Supplier' : 'Add Supplier'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                  <X size={20} className="text-zinc-400" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Company Name</label>
                  <div className="relative">
                    <select 
                      className="w-full px-6 py-4 pr-12 rounded-xl border focus:outline-none focus:border-brand-blue transition-all font-bold text-sm appearance-none cursor-pointer" 
                      style={inputStyle}
                      value={formData.company}
                      onChange={e => setFormData({...formData, company: e.target.value})}
                    >
                      <option value="">Select company</option>
                      <option value="Procter & Gamble Co.">Procter & Gamble co.</option>
                      <option value="Apple Inc">Apple Inc</option>
                      <option value="Volkswagen Group">Volkswagen Group</option>
                      <option value="Toyota">Toyota</option>
                    </select>
                    <Building2 size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Supplier Name</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Emily Johnson" 
                        className="w-full px-6 py-4 pr-12 rounded-xl border focus:outline-none focus:border-brand-blue transition-all font-bold text-sm" 
                        style={inputStyle}
                        value={formData.supplier}
                        onChange={e => setFormData({...formData, supplier: e.target.value})}
                      />
                      <User size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Registered Date</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="08 Jun 2023" 
                        className="w-full pl-14 pr-6 py-4 rounded-xl border focus:outline-none focus:border-brand-blue transition-all font-bold text-sm" 
                        style={inputStyle}
                        value={formData.date}
                        onChange={e => setFormData({...formData, date: e.target.value})}
                      />
                      <Calendar size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Email</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        placeholder="mailmy789@gmail.com" 
                        className="w-full px-6 py-4 pr-12 rounded-xl border focus:outline-none focus:border-brand-blue transition-all font-bold text-sm" 
                        style={inputStyle}
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                      <Mail size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Phone Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="+123 789 455 454" 
                        className="w-full pl-14 pr-6 py-4 rounded-xl border focus:outline-none focus:border-brand-blue transition-all font-bold text-sm" 
                        style={inputStyle}
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                      <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Country Name</label>
                    <div className="relative">
                      <select 
                        className="w-full px-6 py-4 pr-12 rounded-xl border focus:outline-none focus:border-brand-blue transition-all font-bold text-sm appearance-none cursor-pointer" 
                        style={inputStyle}
                        value={formData.country}
                        onChange={e => setFormData({...formData, country: e.target.value})}
                      >
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="CA">Canada</option>
                      </select>
                      <Globe size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400">GST No</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="741852963" 
                        className="w-full px-6 py-4 pr-12 rounded-xl border focus:outline-none focus:border-brand-blue transition-all font-bold text-sm" 
                        style={inputStyle}
                        value={formData.gst}
                        onChange={e => setFormData({...formData, gst: e.target.value})}
                      />
                      <Hash size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Avatar</label>
                  <div className="border-2 border-dashed rounded-[24px] p-10 flex flex-col items-center justify-center gap-4 group hover:border-brand-blue/50 transition-all cursor-pointer" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-root)' }}>
                    <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-brand-blue/10 group-hover:text-brand-blue transition-all">
                      <Upload size={24} strokeWidth={2.5} />
                    </div>
                    <p className="text-xs font-bold text-zinc-400">Drag and drop a file to upload</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 pt-4">
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-10 py-4 rounded-2xl font-black text-sm hover:bg-zinc-100 transition-all"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-14 py-4 bg-brand-blue text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all btn-glow"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
