import React, { useState } from 'react';
import { ShoppingCart, ChevronDown, X, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SearchIcon, NotificationIcon } from './icons/CustomIcons';

export default function Header({ onMenuClick, searchQuery, setSearchQuery }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <header
      className="h-20 flex items-center justify-between px-4 md:px-8 mx-2 md:mx-6 mt-6 rounded-[28px] sticky top-6 z-10 border transition-all duration-300 glass-header shadow-premium"
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
            className={`w-full py-3 pl-14 pr-6 rounded-[20px] bg-zinc-50/50 dark:bg-white/[0.03] border-2 focus:outline-none focus:border-brand-blue/50 transition-all font-semibold text-sm ${isSearchVisible ? 'opacity-100 translate-x-0 shadow-inner' : 'opacity-0 translate-x-12 pointer-events-none'}`}
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className={`absolute left-0 w-11 h-11 md:w-13 md:h-13 flex items-center justify-center rounded-[20px] bg-white dark:bg-white/10 border shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all z-10 ${isSearchVisible ? 'border-brand-blue bg-brand-blue/5' : ''}`}
            style={{ borderColor: isSearchVisible ? 'var(--color-brand-blue)' : 'var(--border-color)' }}
          >
            {isSearchVisible ? <X size={20} className="text-brand-blue" /> : <SearchIcon size={20} style={{ color: 'var(--text-secondary)' }} />}
          </button>
        </div>

        <div className={`flex items-center gap-3 md:gap-4 transition-all duration-500 ${isSearchVisible ? 'hidden md:flex opacity-0 scale-90 translate-x-4' : 'flex opacity-100 scale-100 translate-x-0'}`}>
          {/* Bell */}
          <button className="w-11 h-11 md:w-13 md:h-13 flex items-center justify-center rounded-[20px] bg-white dark:bg-white/5 border hover:bg-zinc-50 dark:hover:bg-white transition-all relative group shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
            <NotificationIcon size={20} className="group-hover:rotate-12 group-hover:text-black transition-all" style={{ color: 'var(--text-secondary)' }} />
            <span className="absolute top-3.5 right-3.5 md:top-4 md:right-4 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#0C1021] animate-pulse" />
          </button>

          {/* Cart */}
          <button className="w-11 h-11 md:w-13 md:h-13 flex items-center justify-center rounded-[20px] bg-white dark:bg-white/5 border hover:bg-zinc-50 dark:hover:bg-white hover:text-black dark:hover:text-black transition-all shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
            <ShoppingCart size={20} style={{ color: 'inherit' }} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-11 h-11 md:w-13 md:h-13 flex items-center justify-center rounded-[20px] bg-white dark:bg-white/5 border hover:bg-zinc-50 dark:hover:bg-white transition-all shadow-sm"
            style={{ borderColor: 'var(--border-color)' }}
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
