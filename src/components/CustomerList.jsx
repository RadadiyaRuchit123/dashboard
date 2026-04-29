import React, { useState } from 'react';
import { 
  Search, Filter, Download, Printer, Plus, MoreVertical, 
  Edit2, Trash2, Eye, ChevronLeft, ChevronRight, X, 
  Upload, Calendar, Mail, Phone, Globe, Hash, Building2, User, AlertCircle, DollarSign
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { useTheme } from '../context/ThemeContext';

const initialCustomers = [
  { id: "#CUST001", name: "Robert Fox", avatar: "https://i.pravatar.cc/150?u=Robert", date: "12 May 2023", email: "robert.fox@gmail.com", phone: "+1 202-555-0143", status: "Active", spent: "1,250.00" },
  { id: "#CUST002", name: "Jane Cooper", avatar: "https://i.pravatar.cc/150?u=Jane", date: "15 May 2023", email: "jane.cooper@yahoo.com", phone: "+1 202-555-0168", status: "Active", spent: "3,420.50" },
  { id: "#CUST003", name: "Wade Warren", avatar: "https://i.pravatar.cc/150?u=Wade", date: "20 May 2023", email: "wade.warren@outlook.com", phone: "+1 202-555-0192", status: "Inactive", spent: "850.00" },
  { id: "#CUST004", name: "Cameron Williamson", avatar: "https://i.pravatar.cc/150?u=Cameron", date: "05 Jun 2023", email: "cameron.w@gmail.com", phone: "+1 202-555-0121", status: "Active", spent: "2,100.00" },
  { id: "#CUST005", name: "Brooklyn Simmons", avatar: "https://i.pravatar.cc/150?u=Brooklyn", date: "10 Jun 2023", email: "brooklyn.s@live.com", phone: "+1 202-555-0154", status: "Active", spent: "5,680.20" },
  { id: "#CUST006", name: "Guy Hawkins", avatar: "https://i.pravatar.cc/150?u=Guy", date: "18 Jun 2023", email: "guy.h@gmail.com", phone: "+1 202-555-0187", status: "Inactive", spent: "450.00" },
  { id: "#CUST007", name: "Leslie Alexander", avatar: "https://i.pravatar.cc/150?u=Leslie", date: "25 Jun 2023", email: "leslie.alex@yahoo.com", phone: "+1 202-555-0136", status: "Active", spent: "9,800.00" },
];

export default function CustomerList() {
  const { currency } = useTheme();
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [viewingCustomer, setViewingCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5;
  
  const [formData, setFormData] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0],
    email: '',
    phone: '',
    status: 'Active',
    spent: '0.00',
    avatar: null,
    avatarPreview: null
  });

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      date: customer.date.includes(' ') ? new Date(customer.date).toISOString().split('T')[0] : customer.date,
      email: customer.email,
      phone: customer.phone,
      status: customer.status,
      spent: customer.spent,
      avatar: customer.avatar,
      avatarPreview: customer.avatar
    });
    setIsModalOpen(true);
  };

  const handleView = (customer) => {
    setViewingCustomer(customer);
    setIsViewModalOpen(true);
  };

  const handleDelete = (id) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
    setDeleteConfirmId(null);
  };

  const handleSave = () => {
    let formattedDate = formData.date;
    if (formData.date.includes('-')) {
      const d = new Date(formData.date);
      formattedDate = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    }

    if (editingCustomer) {
      setCustomers(prev => prev.map(c => c.id === editingCustomer.id ? { ...c, ...formData, date: formattedDate } : c));
    } else {
      const newId = `#CUST${Math.floor(Math.random() * 90000) + 10000}`;
      const newCust = {
        ...formData,
        date: formattedDate,
        id: newId,
        avatar: formData.avatar || `https://i.pravatar.cc/150?u=${formData.name}`
      };
      setCustomers([newCust, ...customers]);
    }
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: reader.result,
          avatarPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFormData(prev => ({
      ...prev,
      avatar: null,
      avatarPreview: null
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(97, 105, 255);
    doc.text('Ment X - Customer Directory', 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);
    doc.text(`Total Customers: ${filteredCustomers.length}`, 14, 33);

    const tableColumn = ["ID", "Name", "Email", "Phone", "Join Date", "Status", "Total Spent"];
    const tableRows = filteredCustomers.map(c => [
      c.id,
      c.name,
      c.email,
      c.phone,
      c.date,
      c.status,
      `${currency === '₹' ? 'Rs.' : currency}${c.spent}`
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [97, 105, 255], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 7, cellPadding: 2 },
      alternateRowStyles: { fillColor: [245, 247, 250] }
    });

    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const inputStyle = {
    backgroundColor: 'var(--bg-card-inner)',
    borderColor: 'var(--border-color)',
    color: 'var(--text-primary)'
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h2 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Customer List</h2>
        <div className="flex items-center gap-3 no-print-area">
          <button onClick={handleExportPDF} className="flex items-center gap-2 px-6 py-2.5 border rounded-xl font-black text-sm hover:bg-zinc-50 dark:hover:bg-white dark:hover:text-black transition-all shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}><Download size={18} />Export</button>
          <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-2.5 border rounded-xl font-black text-sm hover:bg-zinc-50 dark:hover:bg-white dark:hover:text-black transition-all shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}><Printer size={18} />Print</button>
          <button 
            onClick={() => {
              setEditingCustomer(null);
              setFormData({ name: '', date: new Date().toISOString().split('T')[0], email: '', phone: '', status: 'Active', spent: '0.00', avatar: null, avatarPreview: null });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-brand-blue text-white px-6 py-2.5 rounded-xl font-black text-sm shadow-xl shadow-brand-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all btn-glow"
          >
            Add Customer <Plus size={18} strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 no-print-area">
        <button className="flex items-center gap-2 px-6 py-2.5 border rounded-xl font-black text-sm hover:bg-zinc-50 transition-all bg-white dark:bg-zinc-900 shadow-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
          Filter <Filter size={18} />
        </button>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search customer..." 
            className="w-full pl-12 pr-4 py-2.5 border rounded-xl focus:outline-none focus:border-brand-blue transition-all font-bold text-sm shadow-sm" 
            style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>

      <div className="premium-card rounded-[32px] overflow-hidden shadow-sm border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="text-[11px] uppercase font-black tracking-widest border-b" style={{ backgroundColor: 'var(--bg-card-inner)', color: 'var(--text-primary)', opacity: 0.8, borderColor: 'var(--border-color)' }}>
                <th className="px-8 py-5">Customer Name</th>
                <th className="px-8 py-5">Email</th>
                <th className="px-8 py-5">Phone</th>
                <th className="px-8 py-5">Join Date</th>
                <th className="px-8 py-5">Spent</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
              {currentItems.map((c, idx) => (
                <tr key={idx} className="hover:bg-white transition-all duration-300 group cursor-pointer border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white dark:border-zinc-800 shadow-sm">
                        <img src={c.avatar} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-xs font-bold transition-all group-hover:!text-black" style={{ color: 'var(--text-primary)' }}>{c.name}</span>
                        <p className="text-[10px] font-bold text-zinc-400">{c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-xs font-bold transition-all group-hover:!text-black group-hover:!opacity-100" style={{ color: 'var(--text-primary)', opacity: 0.7 }}>{c.email}</td>
                  <td className="px-8 py-5 text-xs font-bold transition-all group-hover:!text-black group-hover:!opacity-100" style={{ color: 'var(--text-primary)', opacity: 0.7 }}>{c.phone}</td>
                  <td className="px-8 py-5 text-xs font-bold transition-all group-hover:!text-black group-hover:!opacity-100" style={{ color: 'var(--text-primary)', opacity: 0.7 }}>{c.date}</td>
                  <td className="px-8 py-5 text-xs font-black transition-all group-hover:!text-black" style={{ color: 'var(--text-primary)' }}>{currency}{c.spent}</td>
                  <td className="px-8 py-5">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-lg border ${c.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleView(c)} className="p-2.5 rounded-xl border hover:border-brand-blue/30 hover:bg-brand-blue/5 transition-all text-zinc-400 hover:text-brand-blue" style={{ borderColor: 'var(--border-color)' }}><Eye size={15} strokeWidth={3} /></button>
                      <button onClick={() => handleEdit(c)} className="p-2.5 rounded-xl border hover:border-brand-blue/30 hover:bg-brand-blue/5 transition-all text-zinc-400 hover:text-brand-blue" style={{ borderColor: 'var(--border-color)' }}><Edit2 size={15} strokeWidth={3} /></button>
                      <button onClick={() => setDeleteConfirmId(c.id)} className="p-2.5 rounded-xl border hover:border-rose-500/30 hover:bg-rose-500/5 transition-all text-zinc-400 hover:text-rose-500" style={{ borderColor: 'var(--border-color)' }}><Trash2 size={15} strokeWidth={3} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y" style={{ borderColor: 'var(--border-color)' }}>
          {currentItems.map((c, idx) => (
            <div key={idx} className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-zinc-800 shadow-sm">
                    <img src={c.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{c.name}</h4>
                    <p className="text-[10px] font-bold text-zinc-400">{c.id}</p>
                  </div>
                </div>
                <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg border ${c.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                  {c.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 py-2">
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-[10px] font-black opacity-40 uppercase mb-1">Email Address</p>
                  <p className="text-xs font-bold break-all" style={{ color: 'var(--text-primary)' }}>{c.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black opacity-40 uppercase mb-1">Phone Number</p>
                  <p className="text-xs font-bold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>{c.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black opacity-40 uppercase mb-1">Total Spent</p>
                  <p className="text-sm font-black text-brand-blue">{currency}{c.spent}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button onClick={() => handleView(c)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-black text-xs transition-all hover:bg-zinc-50" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                  <Eye size={14} /> View
                </button>
                <button onClick={() => handleEdit(c)} className="p-3 rounded-xl border hover:bg-zinc-50" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}><Edit2 size={14} /></button>
                <button onClick={() => setDeleteConfirmId(c.id)} className="p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-500"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-xs font-bold text-zinc-400">Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCustomers.length)} of {filteredCustomers.length} entries</p>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 rounded-lg border hover:bg-zinc-50 disabled:opacity-20" style={{ borderColor: 'var(--border-color)' }}><ChevronLeft size={16} /></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setCurrentPage(p)} className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${currentPage === p ? 'bg-brand-blue text-white shadow-lg' : 'hover:bg-zinc-50 border text-zinc-400'}`} style={{ borderColor: currentPage === p ? 'transparent' : 'var(--border-color)' }}>{p}</button>
            ))}
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 rounded-lg border hover:bg-zinc-50 disabled:opacity-20" style={{ borderColor: 'var(--border-color)' }}><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

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
                <p className="text-sm font-bold opacity-60 px-4">This action will permanently delete this customer.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-3.5 rounded-xl border-2 font-black text-xs hover:bg-zinc-50 transition-all" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>Cancel</button>
                <button onClick={() => handleDelete(deleteConfirmId)} className="flex-1 py-3.5 bg-rose-500 text-white rounded-xl font-black text-xs">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[24px] sm:rounded-[32px] border shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh]" style={{ borderColor: 'var(--border-color)' }}>
            <div className="p-5 sm:p-8 md:p-10 space-y-6 sm:space-y-8 overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>{editingCustomer ? 'Edit Customer' : 'Add Customer'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2.5 rounded-full hover:bg-zinc-100 transition-colors"><X size={20} className="text-zinc-400" /></button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Full Name</label>
                    <div className="relative">
                      <input type="text" placeholder="John Doe" className="w-full px-6 py-4 pr-12 rounded-xl border font-bold text-sm" style={inputStyle} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      <User size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Join Date</label>
                    <div className="relative">
                      <input type="date" className="w-full px-6 py-4 rounded-xl border font-bold text-sm" style={inputStyle} value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Email</label>
                    <div className="relative">
                      <input type="email" placeholder="john@example.com" className="w-full px-6 py-4 pr-12 rounded-xl border font-bold text-sm" style={inputStyle} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      <Mail size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Phone</label>
                    <div className="relative">
                      <input type="text" placeholder="+1 000-000-0000" className="w-full px-6 py-4 pr-12 rounded-xl border font-bold text-sm" style={inputStyle} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                      <Phone size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Status</label>
                    <select className="w-full px-6 py-4 rounded-xl border font-bold text-sm" style={inputStyle} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Total Spent</label>
                    <div className="flex border rounded-xl overflow-hidden focus-within:border-brand-blue transition-all" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card-inner)' }}>
                      <div className="px-5 py-4 border-r bg-zinc-50 dark:bg-zinc-800/40 font-black text-zinc-400">
                        {currency}
                      </div>
                      <input 
                        type="text" 
                        placeholder="0.00" 
                        className="flex-1 px-6 py-4 bg-transparent focus:outline-none font-bold text-sm" 
                        style={{ color: 'var(--text-primary)' }}
                        value={formData.spent} 
                        onChange={e => setFormData({...formData, spent: e.target.value})} 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Avatar</label>
                  <label className="border-2 border-dashed rounded-[24px] p-6 flex flex-col items-center justify-center gap-3 group hover:border-brand-blue/50 transition-all cursor-pointer relative overflow-hidden bg-zinc-50/50 dark:bg-zinc-800/20" style={{ borderColor: 'var(--border-color)' }}>
                    <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                    {formData.avatarPreview ? (
                      <div className="flex flex-col items-center gap-2">
                        <img src={formData.avatarPreview} alt="Preview" className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl" />
                        <button type="button" onClick={removeAvatar} className="text-[10px] font-black uppercase text-rose-500">Remove</button>
                      </div>
                    ) : (
                      <>
                        <Upload size={24} className="text-zinc-400 group-hover:text-brand-blue" />
                        <p className="text-[10px] font-bold text-zinc-400">Click to upload avatar</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 font-black text-sm" style={{ color: 'var(--text-primary)' }}>Cancel</button>
                <button onClick={handleSave} className="flex-1 py-4 bg-brand-blue text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-blue/20">Save Customer</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isViewModalOpen && viewingCustomer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsViewModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-[24px] sm:rounded-[32px] border shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh]" style={{ borderColor: 'var(--border-color)' }}>
            <div className="p-5 sm:p-8 md:p-10 space-y-6 sm:space-y-8 overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-4">
                <img src={viewingCustomer.avatar} alt="" className="w-20 h-20 rounded-full border-4 border-brand-blue/20" />
                <div>
                  <h3 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{viewingCustomer.name}</h3>
                  <p className="text-sm font-bold text-brand-blue">{viewingCustomer.id}</p>
                </div>
                <button onClick={() => setIsViewModalOpen(false)} className="ml-auto p-2.5 rounded-full hover:bg-zinc-100 transition-colors"><X size={20} className="text-zinc-400" /></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div><p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Email</p><p className="text-sm font-bold break-all">{viewingCustomer.email}</p></div>
                <div><p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Phone</p><p className="text-sm font-bold whitespace-nowrap">{viewingCustomer.phone}</p></div>
                <div><p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Join Date</p><p className="text-sm font-bold">{viewingCustomer.date}</p></div>
                <div><p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Total Spent</p><p className="text-sm font-black text-brand-blue">{currency}{viewingCustomer.spent}</p></div>
              </div>
              <button onClick={() => setIsViewModalOpen(false)} className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-black text-sm">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
