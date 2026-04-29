import React from 'react';
import { FileText, ChevronDown, MoreVertical } from 'lucide-react';
import { DashboardIcon, ProductsIcon, OrdersIcon, PeopleIcon, AnalyticsIcon, MessageIcon, HelpIcon, SettingsIcon, LogoutIcon, BoxIcon } from './icons/CustomIcons';

const menuItems = [
  { icon: DashboardIcon, label: 'Dashboard' },
  { 
    icon: ProductsIcon, 
    label: 'Products', 
    hasSub: true,
    subItems: ['List Product', 'Add Product']
  },
  { 
    icon: OrdersIcon, 
    label: 'Orders', 
    hasSub: true,
    subItems: ['Order List']
  },
  { 
    icon: PeopleIcon, 
    label: 'People', 
    hasSub: true,
    subItems: ['Customer List', 'Supplier List']
  },
  { icon: AnalyticsIcon, label: 'Analytics' },
  { icon: FileText, label: 'Invoice' },
];

const otherItems = [
  { icon: MessageIcon, label: 'Message' },
  { icon: HelpIcon, label: 'Help' },
  { icon: SettingsIcon, label: 'Setting' },
  { icon: LogoutIcon, label: 'Logout' },
];

export default function Sidebar({ activeItem, setActiveItem, activeSubItem, setActiveSubItem, isOpen, setIsOpen }) {
  const [expandedItem, setExpandedItem] = React.useState('Products'); // Only one item at a time

  const toggleExpand = (label) => {
    setExpandedItem(prev => prev === label ? null : label);
  };
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`w-64 h-screen flex flex-col p-6 fixed left-0 top-0 z-50 border-r transition-all duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          backgroundColor: 'var(--bg-sidebar)',
          borderColor: 'var(--border-sidebar)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between mb-10 px-2 group cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-blue blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative text-brand-blue">
                <BoxIcon size={34} strokeWidth={2.5} />
              </div>
            </div>
            <h1 className="text-2xl font-black tracking-[-0.03em]" style={{ color: 'var(--text-primary)' }}>
              Ment X
            </h1>
          </div>
          <button 
            className="lg:hidden p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <MoreVertical size={20} style={{ color: 'var(--text-muted)' }} />
          </button>
        </div>

      {/* Menu Section */}
      <div
        className="mb-4 text-[10px] uppercase tracking-widest font-bold px-4"
        style={{ color: 'var(--text-label)' }}
      >
        Menu
      </div>
      <nav className="space-y-1 mb-8">
        {menuItems.map((item, index) => {
          const isActive = activeItem === item.label;
          const isExpanded = expandedItem === item.label;
          
          return (
            <div key={index} className="space-y-1">
              <button
                onClick={() => {
                  setActiveItem(item.label);
                  if (item.hasSub) {
                    toggleExpand(item.label);
                    // Automatically select the first sub-item if one isn't already selected for this category
                    if (item.subItems && item.subItems.length > 0) {
                      setActiveSubItem(item.subItems[0]);
                    }
                  } else {
                    // If it's a direct link (no sub-items), close sidebar on mobile
                    setIsOpen(false);
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden ${isActive
                  ? 'bg-brand-blue text-white shadow-[0_8px_20px_-6px_rgba(97,105,255,0.6)]'
                  : 'hover:bg-zinc-100/50 dark:hover:bg-white/[0.03]'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    size={20}
                    className={isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300'}
                  />
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
                {item.hasSub && (
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    style={{ color: isActive ? '#fff' : 'var(--text-muted)' }} 
                  />
                )}
              </button>

                {/* Sub Items - Curved Branch Design with Smooth Transition */}
                {item.hasSub && (
                  <div 
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                      isExpanded ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-7 space-y-1 relative">
                        {/* Main Vertical Line */}
                        <div 
                          className="absolute left-[-12px] top-0 bottom-4 w-[1.5px]" 
                          style={{ backgroundColor: 'var(--border-color)' }}
                        />
                        
                        {item.subItems.map((sub, subIdx) => {
                          const isSubActive = isActive && activeSubItem === sub;
                          return (
                            <div key={subIdx} className="relative">
                              {/* Curved Connector Line */}
                              <div 
                                className={`absolute left-[-12px] w-[14px] h-[20px] border-l-[1.5px] border-b-[1.5px] rounded-bl-2xl transition-all duration-500 ${
                                  isSubActive ? 'border-brand-blue opacity-100' : 'border-zinc-200 dark:border-white/10 opacity-50'
                                }`}
                                style={{ 
                                  top: '-2px',
                                  borderColor: isSubActive ? 'var(--brand-blue)' : ''
                                }}
                              />
                              
                              <button
                                onClick={() => {
                                  setActiveItem(item.label);
                                  setActiveSubItem(sub);
                                  setIsOpen(false);
                                }}
                                className={`w-full text-left pl-7 pr-4 py-2.5 text-xs font-bold transition-all duration-300 rounded-xl focus:outline-none ${
                                  isSubActive 
                                    ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20' 
                                    : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100'
                                }`}
                              >
                                <span>{sub}</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
            </div>
          );
        })}
      </nav>

      {/* Other Section */}
      <div
        className="mb-4 text-[10px] uppercase tracking-widest font-bold px-4"
        style={{ color: 'var(--text-label)' }}
      >
        Other
      </div>
      <nav className="space-y-1">
        {otherItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveItem(item.label);
              setActiveSubItem(null);
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeItem === item.label
                ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20'
                : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
            }`}
            style={{ color: activeItem === item.label ? '#fff' : 'var(--text-secondary)' }}
          >
            <item.icon 
              size={20} 
              className={activeItem === item.label ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300'} 
            />
            <span className="text-sm font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>
      </aside>
    </>
  );
}
