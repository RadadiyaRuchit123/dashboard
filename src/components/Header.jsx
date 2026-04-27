import React, { useState } from 'react';
import { ShoppingCart, ChevronDown, X, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SearchIcon, NotificationIcon } from './icons/CustomIcons';

export default function Header({ onMenuClick, searchQuery, setSearchQuery }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <header
      className="h-20 flex items-center justify-between px-4 md:px-8 mx-2 md:mx-6 mt-6 rounded-[24px] sticky top-6 z-10 border transition-colors duration-300 shadow-sm glass-header"
      style={{
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Left: Mobile Menu + Date */}
      <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          style={{ color: 'var(--text-primary)' }}
        >
          <Menu size={20} />
        </button>
        <div className={`transition-all duration-300 ${isSearchVisible ? 'hidden sm:block opacity-0 w-0' : 'opacity-100'}`}>
          <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-muted)' }}>Hello!</p>
          <h2 className="text-base md:text-xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
            5Feb2024
          </h2>
        </div>
      </div>

      {/* Center/Right: Expandable Search */}
      <div className="flex-1 flex justify-end items-center gap-2 md:gap-6 ml-2">
        <div className={`relative flex items-center transition-all duration-300 ${isSearchVisible ? 'flex-1 max-w-md' : 'w-10 md:w-12'}`}>
          <input 
            type="text"
            placeholder="Search products..."
            className={`w-full py-2.5 pl-12 pr-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border focus:outline-none focus:border-brand-blue transition-all ${isSearchVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className={`absolute left-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900 border hover:bg-zinc-100 transition-all z-10 ${isSearchVisible ? 'border-brand-blue' : ''}`}
            style={{ borderColor: isSearchVisible ? 'var(--color-brand-blue)' : 'var(--border-color)' }}
          >
            {isSearchVisible ? <X size={18} className="text-brand-blue" /> : <SearchIcon size={18} style={{ color: 'var(--text-secondary)' }} />}
          </button>
        </div>

        <div className={`flex items-center gap-2 md:gap-4 transition-all duration-300 ${isSearchVisible ? 'hidden md:flex' : 'flex'}`}>
          {/* Bell */}
          <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900 border hover:bg-zinc-100 transition-all relative" style={{ borderColor: 'var(--border-color)' }}>
            <NotificationIcon size={18} style={{ color: 'var(--text-secondary)' }} />
            <span className="absolute top-3 right-3 md:top-3.5 md:right-3.5 w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900" />
          </button>

          {/* Cart */}
          <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900 border hover:bg-zinc-100 transition-all relative" style={{ borderColor: 'var(--border-color)' }}>
            <ShoppingCart size={18} style={{ color: 'var(--text-secondary)' }} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900 border hover:bg-zinc-100 transition-all"
            style={{ borderColor: 'var(--border-color)' }}
          >
            {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-indigo-500" />}
          </button>
        </div>

        {/* Profile */}
        <div
          className="flex items-center gap-2 md:gap-4 pl-3 md:pl-6 border-l h-8 md:h-10"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=80"
            alt="Profile"
            className="w-9 h-9 md:w-11 md:h-11 rounded-full object-cover border-2 shadow-sm"
            style={{ borderColor: 'var(--border-color)' }}
          />
          <div className="text-left hidden lg:block">
            <div className="flex items-center gap-1 cursor-pointer group">
              <p className="font-black text-sm" style={{ color: 'var(--text-primary)' }}>Jane Cooper</p>
              <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
            </div>
            <p className="text-[11px] font-bold" style={{ color: 'var(--text-muted)' }}>Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
