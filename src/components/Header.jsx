import React, { useState } from 'react';
import { ShoppingCart, ChevronDown, X, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SearchIcon, NotificationIcon } from './icons/CustomIcons';

export default function Header({ onMenuClick, searchQuery, setSearchQuery }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const notifications = [
    { id: 1, title: 'New Order Received', time: '5 min ago', type: 'order', unread: true },
    { id: 2, title: 'Server Update Successful', time: '1 hour ago', type: 'system', unread: true },
    { id: 3, title: 'New Customer Registered', time: '3 hours ago', type: 'user', unread: false },
  ];

  return (
    <header
      className="h-20 flex items-center justify-between px-4 md:px-8 mx-2 md:mx-6 mt-6 rounded-[28px] sticky top-6 z-50 border transition-all duration-300 glass-header shadow-premium"
      style={{
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Left: Mobile Menu + Date */}
      <div className="flex items-center gap-2 md:gap-5 min-w-0">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2.5 rounded-2xl bg-zinc-100/50 dark:bg-white/5 hover:scale-105 transition-all active:scale-95"
          style={{ color: 'var(--text-primary)' }}
        >
          <Menu size={20} />
        </button>
        <div className={`transition-all duration-500 transform ${isSearchVisible ? 'hidden sm:block opacity-0 -translate-x-4 scale-95' : 'opacity-100 translate-x-0 scale-100'}`}>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-60" style={{ color: 'var(--text-muted)' }}>Hello!</p>
          <h2 className="text-base md:text-xl font-black tracking-[-0.02em] whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
            5 Feb 2024
          </h2>
        </div>
      </div>

      {/* Center/Right: Expandable Search */}
      <div className="flex-1 flex justify-end items-center gap-3 md:gap-6 ml-4">
        <div className={`relative flex items-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isSearchVisible ? 'flex-1 max-w-md' : 'w-11 md:w-13'}`}>
          <input 
            type="text"
            placeholder="Search analytics, orders..."
            className={`w-full py-3 pl-14 pr-6 rounded-[20px] border-2 focus:outline-none transition-all font-bold text-sm shadow-sm ${isSearchVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'}`}
            style={{ 
              backgroundColor: 'var(--bg-card-inner)',
              borderColor: isSearchVisible ? 'var(--color-brand-blue)' : 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className={`absolute left-0 w-11 h-11 md:w-13 md:h-13 flex items-center justify-center rounded-[20px] border shadow-sm hover:shadow-md transition-all z-10 ${isSearchVisible ? 'rotate-90' : ''}`}
            style={{ 
              backgroundColor: isSearchVisible ? 'var(--bg-card)' : 'var(--bg-card)',
              borderColor: isSearchVisible ? 'var(--color-brand-blue)' : 'var(--border-color)' 
            }}
          >
            {isSearchVisible ? <X size={18} className="text-brand-blue" strokeWidth={3} /> : <SearchIcon size={20} style={{ color: 'var(--text-primary)' }} />}
          </button>
        </div>

        <div className={`flex items-center gap-3 md:gap-4 transition-all duration-500 ${isSearchVisible ? 'hidden md:flex opacity-0 scale-90 translate-x-4' : 'flex opacity-100 scale-100 translate-x-0'}`}>
          {/* Bell */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="w-11 h-11 md:w-13 md:h-13 flex items-center justify-center rounded-[20px] border hover:opacity-80 transition-all relative group shadow-sm" 
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            >
              <NotificationIcon size={20} className="group-hover:rotate-12 transition-all" style={{ color: 'var(--text-primary)' }} />
              <span className="absolute top-3.5 right-3.5 md:top-4 md:right-4 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#0C1021] animate-pulse" />
            </button>

            {isNotificationOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsNotificationOpen(false)} />
                <div className="absolute right-0 mt-4 w-80 bg-white dark:bg-zinc-900 rounded-[32px] border shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="p-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-sm" style={{ color: 'var(--text-primary)' }}>Notifications</h3>
                      <span className="px-2 py-0.5 bg-brand-blue/10 text-brand-blue text-[10px] font-black rounded-full uppercase">2 New</span>
                    </div>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className={`p-4 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors cursor-pointer border-b last:border-0 ${n.unread ? 'bg-blue-50/30 dark:bg-brand-blue/5' : ''}`} style={{ borderColor: 'var(--border-color)' }}>
                        <div className="flex gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.type === 'order' ? 'bg-green-100 text-green-600' : n.type === 'system' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                            <NotificationIcon size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-black leading-tight mb-1" style={{ color: 'var(--text-primary)' }}>{n.title}</p>
                            <p className="text-[10px] font-bold text-zinc-400">{n.time}</p>
                          </div>
                          {n.unread && <div className="w-2 h-2 bg-brand-blue rounded-full mt-2 shrink-0" />}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full p-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-brand-blue transition-colors bg-zinc-50/50 dark:bg-white/5">
                    View All Notifications
                  </button>
                </div>
              </>
            )}
          </div>
 
          {/* Cart */}
          <button className="w-11 h-11 md:w-13 md:h-13 flex items-center justify-center rounded-[20px] border hover:opacity-80 transition-all shadow-sm group" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <ShoppingCart size={20} className="transition-all" style={{ color: 'var(--text-primary)' }} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-11 h-11 md:w-13 md:h-13 flex items-center justify-center rounded-[20px] border hover:opacity-80 transition-all shadow-sm"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            {isDark ? <Sun size={20} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" /> : <Moon size={20} className="text-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.4)]" />}
          </button>
        </div>

        {/* Profile */}
        <div
          className="flex items-center gap-3 md:gap-5 pl-4 md:pl-8 border-l-2 h-10 md:h-12"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-brand-blue blur-md opacity-20" />
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=80"
              alt="Profile"
              className="relative w-10 h-10 md:w-13 md:h-13 rounded-[18px] object-cover border-2 shadow-sm ring-4 ring-white/5"
              style={{ borderColor: 'var(--border-color)' }}
            />
          </div>
          <div className="text-left hidden xl:block">
            <div className="flex items-center gap-1.5 cursor-pointer group">
              <p className="font-black text-sm tracking-tight" style={{ color: 'var(--text-primary)' }}>Jane Cooper</p>
              <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" style={{ color: 'var(--text-muted)' }} />
            </div>
            <p className="text-[11px] font-black uppercase tracking-widest opacity-60" style={{ color: 'var(--text-muted)' }}>Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
