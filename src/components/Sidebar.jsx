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
  const [expandedItems, setExpandedItems] = React.useState(['Products']); // Keep Products expanded by default to match screenshot

  const toggleExpand = (label) => {
    setExpandedItems(prev => 
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
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
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div style={{ color: 'var(--text-secondary)' }}>
              <BoxIcon size={32} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Ment X
            </h1>
          </div>
          {/* Close button for mobile */}
          <button 
            className="lg:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => setIsOpen(false)}
          >
            <MoreVertical size={20} />
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
            const isExpanded = expandedItems.includes(item.label);
            
            return (
              <div key={index} className="space-y-1">
                <button
                  onClick={() => {
                    setActiveItem(item.label);
                    if (item.hasSub) {
                      toggleExpand(item.label);
                      if (item.subItems && item.subItems.length > 0) {
                        setActiveSubItem(item.subItems[0]);
                      }
                    } else {
                      setIsOpen(false);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                    ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20'
                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
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

                {/* Sub Items - Curved Branch Design */}
                {item.hasSub && isExpanded && (
                  <div className="ml-7 space-y-1 mt-1 relative">
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
                            className={`absolute left-[-12px] top-[18px] w-[12px] h-[12px] border-l-[1.5px] border-b-[1.5px] rounded-bl-lg transition-colors duration-300 ${
                              isSubActive ? 'border-brand-blue' : 'border-zinc-200 dark:border-zinc-800'
                            }`}
                            style={{ 
                              top: '0px',
                              height: '18px',
                              borderColor: isSubActive ? 'var(--brand-blue)' : 'var(--border-color)'
                            }}
                          />
                          
                          <button
                            onClick={() => {
                              setActiveItem(item.label);
                              setActiveSubItem(sub);
                              setIsOpen(false);
                            }}
                            className={`w-full text-left ml-3 px-4 py-2.5 text-xs font-bold transition-all duration-300 rounded-xl ${
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-es-lg transition-all duration-200 group"
            style={{ color: 'var(--text-secondary)' }}
          >
            <item.icon size={20} style={{ color: 'var(--text-muted)' }} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      </aside>
    </>
  );
}
