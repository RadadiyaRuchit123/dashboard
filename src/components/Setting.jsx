import React, { useState } from 'react';
import { User, Bell, Lock, Globe, Moon, Shield, Palette, Save, Upload, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Setting() {
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'Admin User',
    email: 'admin@mentx.com',
    phone: '+1 234 567 890',
    bio: 'Administrator for Ment X dashboard.',
    notifications: {
      email: true,
      push: true,
      order: true,
      customer: false
    },
    twoFactor: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const inputStyle = {
    backgroundColor: 'var(--bg-card-inner)',
    borderColor: 'var(--border-color)',
    color: 'var(--text-primary)'
  };

  const notificationSettings = [
    { id: 'email', title: 'Email Notifications', desc: 'Receive daily summary of orders via email.' },
    { id: 'push', title: 'Push Notifications', desc: 'Get real-time updates on desktop.' },
    { id: 'order', title: 'Order Updates', desc: 'Notify me when an order status changes.' },
    { id: 'customer', title: 'New Customer', desc: 'Notify me when a new user registers.' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Settings</h2>
        <button className="flex items-center gap-2 bg-brand-blue text-white px-8 py-3 rounded-2xl font-black text-sm shadow-xl shadow-brand-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all btn-glow">
          <Save size={18} strokeWidth={3} /> Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full lg:w-72 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-xs transition-all duration-300 ${activeTab === tab.id ? 'bg-brand-blue text-white shadow-lg' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 dark:text-zinc-500'}`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 premium-card rounded-[32px] border bg-white dark:bg-zinc-900 overflow-hidden shadow-xl" style={{ borderColor: 'var(--border-color)' }}>
          {activeTab === 'profile' && (
            <div className="p-8 md:p-10 space-y-10 animate-in fade-in duration-300">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center gap-8 border-b border-dashed pb-10" style={{ borderColor: 'var(--border-color)' }}>
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl relative">
                    <img src="https://i.pravatar.cc/150?u=Admin" alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Upload size={24} className="text-white" />
                    </div>
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-2 bg-white dark:bg-zinc-800 rounded-full border shadow-lg text-rose-500" style={{ borderColor: 'var(--border-color)' }}><Trash2 size={16} /></button>
                </div>
                <div className="text-center sm:text-left space-y-2">
                  <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>Profile Picture</h3>
                  <p className="text-xs font-bold text-zinc-400">JPG, GIF or PNG. Max size of 800K</p>
                  <button className="px-6 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all">Upload New</button>
                </div>
              </div>

              {/* Profile Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-1">Full Name</label>
                  <input type="text" className="w-full px-6 py-4 rounded-xl border font-bold text-sm" style={inputStyle} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-1">Email Address</label>
                  <input type="email" className="w-full px-6 py-4 rounded-xl border font-bold text-sm" style={inputStyle} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-1">Phone Number</label>
                  <input type="text" className="w-full px-6 py-4 rounded-xl border font-bold text-sm" style={inputStyle} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-1">Location</label>
                  <select className="w-full px-6 py-4 rounded-xl border font-bold text-sm appearance-none" style={inputStyle}>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>India</option>
                  </select>
                </div>
                <div className="col-span-1 md:col-span-2 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-1">Bio</label>
                  <textarea rows={4} className="w-full px-6 py-4 rounded-xl border font-bold text-sm resize-none" style={inputStyle} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="p-8 md:p-10 space-y-10 animate-in fade-in duration-300">
               <div className="space-y-2 border-b border-dashed pb-6" style={{ borderColor: 'var(--border-color)' }}>
                 <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>Appearance</h3>
                 <p className="text-xs font-bold text-zinc-400">Manage how the dashboard looks on your device.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <button 
                  onClick={() => isDark && toggleTheme()}
                  className={`p-6 rounded-[24px] border-2 text-left space-y-4 transition-all ${!isDark ? 'border-brand-blue bg-blue-50/50' : 'border-transparent bg-zinc-50 dark:bg-zinc-800/50'}`}
                 >
                   <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm"><Globe size={24} /></div>
                   <div>
                     <h4 className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Light Mode</h4>
                     <p className="text-[10px] font-bold text-zinc-400 mt-1">Best for brightly lit environments.</p>
                   </div>
                 </button>
                 <button 
                  onClick={() => !isDark && toggleTheme()}
                  className={`p-6 rounded-[24px] border-2 text-left space-y-4 transition-all ${isDark ? 'border-brand-blue bg-brand-blue/10' : 'border-transparent bg-zinc-50 dark:bg-zinc-800/50'}`}
                 >
                   <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-400 shadow-sm"><Moon size={24} /></div>
                   <div>
                     <h4 className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Dark Mode</h4>
                     <p className="text-[10px] font-bold text-zinc-400 mt-1">Easier on the eyes in low light.</p>
                   </div>
                 </button>
               </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="p-8 md:p-10 space-y-8 animate-in fade-in duration-300">
               <div className="space-y-6">
                 {notificationSettings.map((item) => (
                   <div key={item.id} className="flex items-center justify-between p-6 rounded-[24px] bg-zinc-50/50 dark:bg-zinc-800/20 border border-dashed" style={{ borderColor: 'var(--border-color)' }}>
                     <div>
                       <h4 className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                       <p className="text-[10px] font-bold text-zinc-400 mt-1">{item.desc}</p>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={formData.notifications[item.id]} 
                          onChange={() => setFormData({
                            ...formData,
                            notifications: {
                              ...formData.notifications,
                              [item.id]: !formData.notifications[item.id]
                            }
                          })}
                        />
                        <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                     </label>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="p-8 md:p-10 space-y-10 animate-in fade-in duration-300">
               <div className="space-y-6">
                 <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-1">Current Password</label>
                   <input type="password" placeholder="••••••••" className="w-full px-6 py-4 rounded-xl border font-bold text-sm" style={inputStyle} />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-1">New Password</label>
                     <input type="password" placeholder="••••••••" className="w-full px-6 py-4 rounded-xl border font-bold text-sm" style={inputStyle} />
                   </div>
                   <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-1">Confirm New Password</label>
                     <input type="password" placeholder="••••••••" className="w-full px-6 py-4 rounded-xl border font-bold text-sm" style={inputStyle} />
                   </div>
                 </div>
                 <button className="px-6 py-3 bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all">Update Password</button>
               </div>

               <div className="pt-8 border-t border-dashed" style={{ borderColor: 'var(--border-color)' }}>
                 <div className="flex items-center justify-between p-6 rounded-[24px] bg-zinc-50/50 dark:bg-zinc-800/20 border border-dashed" style={{ borderColor: 'var(--border-color)' }}>
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600"><Shield size={24} /></div>
                     <div>
                       <h4 className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Two-Factor Authentication</h4>
                       <p className="text-[10px] font-bold text-zinc-400 mt-1">Add an extra layer of security to your account.</p>
                     </div>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={formData.twoFactor} 
                        onChange={() => setFormData({...formData, twoFactor: !formData.twoFactor})} 
                      />
                      <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                   </label>
                 </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
