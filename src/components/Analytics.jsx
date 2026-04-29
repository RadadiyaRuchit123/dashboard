import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  TrendingUp, TrendingDown, Eye, ChevronDown, Calendar,
  Monitor, Smartphone, Tablet, MoreVertical, Search, Bell, ShoppingBag
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const statData = [
  { name: 'Sat', value: 100 },
  { name: 'Sun', value: 200 },
  { name: 'Mon', value: 150 },
  { name: 'Tue', value: 400 },
  { name: 'Wed', value: 800 },
  { name: 'Thu', value: 500 },
  { name: 'Fri', value: 600 },
];

const revenueData = [
  { name: 'Sat', value: 200 },
  { name: 'Sun', value: 300 },
  { name: 'Mon', value: 250 },
  { name: 'Tue', value: 500 },
  { name: 'Wed', value: 700 },
  { name: 'Thu', value: 400 },
  { name: 'Fri', value: 600 },
];

const customerData = [
  { name: 'Sat', value: 1000 },
  { name: 'Sun', value: 2000 },
  { name: 'Mon', value: 1500 },
  { name: 'Tue', value: 4000 },
  { name: 'Wed', value: 8000 },
  { name: 'Thu', value: 5000 },
  { name: 'Fri', value: 6000 },
];

const sellReturnData = [
  { name: '01', sell: 200, return: 100 },
  { name: '02', sell: 400, return: 150 },
  { name: '03', sell: 300, return: 200 },
  { name: '04', sell: 600, return: 180 },
  { name: '05', sell: 500, return: 220 },
  { name: '06', sell: 800, return: 250 },
  { name: '07', sell: 400, return: 200 },
  { name: '08', sell: 500, return: 230 },
  { name: '09', sell: 700, return: 280 },
  { name: '10', sell: 600, return: 300 },
  { name: '11', sell: 900, return: 350 },
  { name: '12', sell: 800, return: 320 },
  { name: '13', sell: 1000, return: 400 },
  { name: '14', sell: 900, return: 380 },
  { name: '15', sell: 1100, return: 450 },
  { name: '16', sell: 1000, return: 420 },
  { name: '17', sell: 1200, return: 480 },
  { name: '18', sell: 1100, return: 460 },
  { name: '19', sell: 1300, return: 500 },
  { name: '20', sell: 1200, return: 480 },
  { name: '21', sell: 1400, return: 550 },
  { name: '22', sell: 1300, return: 520 },
  { name: '23', sell: 1500, return: 600 },
  { name: '24', sell: 1400, return: 580 },
  { name: '25', sell: 1600, return: 650 },
  { name: '26', sell: 1500, return: 620 },
  { name: '27', sell: 1700, return: 700 },
  { name: '28', sell: 1600, return: 680 },
  { name: '29', sell: 1800, return: 750 },
  { name: '30', sell: 1700, return: 720 },
];

const buyersProfile = [
  { name: 'Male', value: 60.5, color: '#10B981' },
  { name: 'Female', value: 40.3, color: '#34D399' },
  { name: 'Others', value: 9.2, color: '#F59E0B' },
];

const topCustomers = [
  { id: '#89SD689', name: 'Leslie Alexander', avatar: 'https://i.pravatar.cc/150?u=Leslie' },
  { id: '#69SDF15', name: 'Darrell Steward', avatar: 'https://i.pravatar.cc/150?u=Darrell' },
  { id: '#89SD6D4R', name: 'Robert Fox', avatar: 'https://i.pravatar.cc/150?u=Robert' },
  { id: '#69SDF4F8D', name: 'Jerome Bell', avatar: 'https://i.pravatar.cc/150?u=Jerome' },
  { id: '#89SD6D4R', name: 'Kathryn Murphy', avatar: 'https://i.pravatar.cc/150?u=Kathryn' },
  { id: '#69SDW2R', name: 'Theresa Webb', avatar: 'https://i.pravatar.cc/150?u=Theresa' },
];

const deviceData = [
  { name: 'Desktop', user: '80.54K', change: '+1.2%', type: 'up', icon: Monitor, color: '#6169FF' },
  { name: 'Mobile', user: '1.5M', change: '-1.7%', type: 'down', icon: Smartphone, color: '#F43F5E' },
  { name: 'Tablet', user: '50.48K', change: '+0.7%', type: 'up', icon: Tablet, color: '#10B981' },
];

const StatCard = ({ title, value, change, color, data, gradientId }) => (
  <div className="premium-card rounded-[48px] p-8 md:p-10 flex flex-col gap-6 group transition-all duration-500 hover:shadow-2xl hover:-translate-y-1" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 opacity-80">{title}</p>
        <h3 className="text-4xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>{value}</h3>
      </div>
      <div className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-black tracking-widest uppercase transition-all group-hover:scale-105 ${color === 'green' ? 'bg-green-500/10 text-green-500' : color === 'orange' ? 'bg-orange-500/10 text-orange-500' : 'bg-rose-500/10 text-rose-500'}`}>
        {color === 'green' ? <TrendingUp size={14} strokeWidth={3} /> : <TrendingDown size={14} strokeWidth={3} />}
        {change}
      </div>
    </div>

    <div className="h-28 w-full mt-2 relative">
      <div className="absolute inset-0 bg-brand-blue blur-3xl opacity-5 group-hover:opacity-10 transition-opacity" />
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color === 'green' ? '#10B981' : color === 'orange' ? '#F59E0B' : '#F43F5E'} stopOpacity={0.5} />
              <stop offset="95%" stopColor={color === 'green' ? '#10B981' : color === 'orange' ? '#F59E0B' : '#F43F5E'} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color === 'green' ? '#10B981' : color === 'orange' ? '#F59E0B' : '#F43F5E'}
            strokeWidth={5}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    <div className="flex justify-between text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mt-2 opacity-50">
      {['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => <span key={day}>{day}</span>)}
    </div>
  </div>
);

export default function Analytics() {
  const { isDark, currency } = useTheme();
  const [activeDropdown, setActiveDropdown] = React.useState(null);
  const [filters, setFilters] = React.useState({
    global: 'This week',
    sellReturn: 'This Month',
    topCustomer: 'This week',
    device: 'This Month'
  });

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setActiveDropdown(null);
  };

  const Dropdown = ({ id, current, options, onSelect }) => (
    <div className="absolute top-full mt-2 right-0 w-40 bg-white dark:bg-zinc-900 border rounded-2xl shadow-2xl z-[100] py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200" style={{ borderColor: 'var(--border-color)' }}>
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${current === opt ? 'bg-brand-blue text-white' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
          style={{ color: current === opt ? '#fff' : 'var(--text-primary)' }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
  return (
    <div className="space-y-8 md:space-y-12 pb-16 animate-in fade-in duration-1000">
      <div className="flex justify-between items-center px-2">
        <div className="space-y-1">
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em]" style={{ color: 'var(--text-primary)' }}>Analytical</h2>
          <p className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em] opacity-60">In-depth performance overview</p>
        </div>
        <div className="relative">
          <div
            onClick={() => toggleDropdown('global')}
            className="flex items-center gap-3 px-6 py-3 border-2 rounded-2xl bg-white/50 dark:bg-white/[0.03] backdrop-blur-md shadow-premium cursor-pointer hover:bg-white/80 dark:hover:bg-white/10 transition-all active:scale-95 group"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <Calendar size={18} className="text-brand-blue" />
            <span className="text-sm font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>{filters.global}</span>
            <ChevronDown size={14} className={`text-zinc-400 transition-transform duration-300 ${activeDropdown === 'global' ? 'rotate-180' : ''}`} />
          </div>
          {activeDropdown === 'global' && (
            <Dropdown
              id="global"
              current={filters.global}
              options={['Today', 'This week', 'This Month', 'This Year']}
              onSelect={(val) => handleFilterChange('global', val)}
            />
          )}
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <StatCard title="Total Amount" value={`${currency}90,584`} change="+5.2%" color="green" data={statData} gradientId="gradAmount" />
        <StatCard title="Total Revenue" value={`${currency}40,584`} change="+2.5%" color="orange" data={revenueData} gradientId="gradRevenue" />
        <StatCard title="Total Customer" value="20,584" change="-1.5%" color="red" data={customerData} gradientId="gradCustomer" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-10">
        {/* Main Sell/Return Chart */}
        <div className="xl:col-span-2 premium-card rounded-[48px] p-8 md:p-10 space-y-10 shadow-premium" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Product Sell / Purchase Return</h3>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>{currency}90,584B</span>
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-500/10 text-green-500 text-xs font-black tracking-wider">
                  <TrendingUp size={14} strokeWidth={3} /> +2.7%
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 md:gap-8">
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.4)]" />
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.15em]">Purchase Return</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.4)]" />
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.15em]">Product Seal</span>
              </div>
              <div className="relative">
                <div
                  onClick={() => toggleDropdown('sellReturn')}
                  className="flex items-center gap-2 px-5 py-2.5 border-2 rounded-xl bg-zinc-50/50 dark:bg-white/[0.03] shadow-sm cursor-pointer hover:bg-zinc-100 transition-all active:scale-95"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <Calendar size={14} className="text-brand-blue" />
                  <span className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>{filters.sellReturn}</span>
                  <ChevronDown size={12} className={`text-zinc-400 transition-transform duration-300 ${activeDropdown === 'sellReturn' ? 'rotate-180' : ''}`} />
                </div>
                {activeDropdown === 'sellReturn' && (
                  <Dropdown
                    id="sellReturn"
                    current={filters.sellReturn}
                    options={['Last 7 Days', 'This Month', 'Last Month', 'Custom Range']}
                    onSelect={(val) => handleFilterChange('sellReturn', val)}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="h-[450px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sellReturnData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSell" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorReturn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9'} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fontWeight: 800, fill: '#94a3b8' }}
                  dy={15}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fontWeight: 800, fill: '#94a3b8' }}
                  tickFormatter={(val) => `${val}K`}
                  dx={-10}
                />
                <Tooltip
                  cursor={{ stroke: 'var(--border-color)', strokeWidth: 2 }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 20, 41, 0.95)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '24px', 
                    padding: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', 
                    fontSize: '13px', 
                    fontWeight: '900',
                    color: '#fff'
                  }}
                  itemStyle={{ padding: '4px 0' }}
                />
                <Area
                  type="monotone"
                  dataKey="sell"
                  stroke="#10B981"
                  strokeWidth={5}
                  fillOpacity={1}
                  fill="url(#colorSell)"
                  animationDuration={1500}
                />
                <Area
                  type="monotone"
                  dataKey="return"
                  stroke="#F59E0B"
                  strokeWidth={5}
                  fillOpacity={1}
                  fill="url(#colorReturn)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Customer Section */}
        <div className="xl:col-span-1 premium-card rounded-[48px] p-8 md:p-10 flex flex-col shadow-premium" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Top Customer</h3>
            <div className="relative">
              <div
                onClick={() => toggleDropdown('topCustomer')}
                className="flex items-center gap-2 px-4 py-2.5 border-2 rounded-xl bg-zinc-50/50 dark:bg-white/[0.03] shadow-sm cursor-pointer hover:bg-zinc-100 transition-all active:scale-95"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <Calendar size={14} className="text-brand-blue" />
                <span className="text-[10px] font-black" style={{ color: 'var(--text-primary)' }}>{filters.topCustomer}</span>
                <ChevronDown size={12} className={`text-zinc-400 transition-transform duration-300 ${activeDropdown === 'topCustomer' ? 'rotate-180' : ''}`} />
              </div>
              {activeDropdown === 'topCustomer' && (
                <Dropdown
                  id="topCustomer"
                  current={filters.topCustomer}
                  options={['Today', 'This week', 'This Month']}
                  onSelect={(val) => handleFilterChange('topCustomer', val)}
                />
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-400/80 bg-zinc-50/50 dark:bg-white/[0.02]" style={{ borderColor: 'var(--border-color)' }}>
                  <th className="py-4 pl-4 rounded-l-2xl">Customer ID</th>
                  <th className="py-4">Name</th>
                  <th className="py-4 text-right pr-4 rounded-r-2xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed" style={{ borderColor: 'var(--border-color)' }}>
                {topCustomers.map((cust, idx) => (
                  <tr key={idx} className="group transition-all hover:bg-white/[0.02] rounded-2xl">
                    <td className="py-5 pl-2 text-[11px] font-black opacity-60 text-zinc-400">{cust.id}</td>
                    <td className="py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-brand-blue blur-sm opacity-20 group-hover:opacity-40 transition-opacity" />
                          <img src={cust.avatar} alt="" className="relative w-10 h-10 rounded-[14px] border-2 border-white/10 shadow-lg object-cover" />
                        </div>
                        <span className="text-[12px] font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>{cust.name}</span>
                      </div>
                    </td>
                    <td className="py-5 text-right pr-2">
                      <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-400 hover:text-brand-blue hover:bg-brand-blue/10 transition-all border border-transparent hover:border-brand-blue/20">
                        <Eye size={16} strokeWidth={3} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 md:gap-10">
        {/* Device Preferences Table */}
        <div className="xl:col-span-3 premium-card rounded-[48px] p-8 md:p-10 shadow-premium" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Device Preferences</h3>
            <div className="relative">
              <div
                onClick={() => toggleDropdown('device')}
                className="flex items-center gap-2 px-5 py-2.5 border-2 rounded-xl bg-zinc-50/50 dark:bg-white/[0.03] shadow-sm cursor-pointer hover:bg-zinc-100 transition-all active:scale-95"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <Calendar size={14} className="text-brand-blue" />
                <span className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>{filters.device}</span>
                <ChevronDown size={12} className={`text-zinc-400 transition-transform duration-300 ${activeDropdown === 'device' ? 'rotate-180' : ''}`} />
              </div>
              {activeDropdown === 'device' && (
                <Dropdown
                  id="device"
                  current={filters.device}
                  options={['Today', 'This Month', 'Last 3 Months']}
                  onSelect={(val) => handleFilterChange('device', val)}
                />
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-400 border-b border-dashed" style={{ borderColor: 'var(--border-color)' }}>
                  <th className="pb-5 pl-2">Platform</th>
                  <th className="pb-5 text-center">User Count</th>
                  <th className="pb-5 text-right pr-2">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed" style={{ borderColor: 'var(--border-color)' }}>
                {deviceData.map((device, idx) => (
                  <tr key={idx} className="group hover:bg-white/[0.01] transition-all">
                    <td className="py-6 pl-2">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-100/50 dark:bg-white/5 flex items-center justify-center text-brand-blue border border-transparent group-hover:border-brand-blue/20 transition-all">
                          <device.icon size={22} strokeWidth={2.5} />
                        </div>
                        <span className="text-sm font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>{device.name}</span>
                      </div>
                    </td>
                    <td className="py-6 text-sm font-black opacity-60 text-center" style={{ color: 'var(--text-primary)' }}>{device.user}</td>
                    <td className="py-6 text-right pr-2">
                      <div className={`flex items-center gap-1.5 text-[11px] font-black tracking-wider uppercase px-4 py-2 rounded-xl inline-flex ${device.type === 'up' ? 'text-green-500 bg-green-500/10' : 'text-rose-500 bg-rose-500/10'}`}>
                        {device.type === 'up' ? <TrendingUp size={14} strokeWidth={3} /> : <TrendingDown size={14} strokeWidth={3} />}
                        {device.change}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Buyers Profile Donut Chart */}
        <div className="xl:col-span-2 premium-card rounded-[48px] p-8 md:p-10 flex flex-col shadow-premium" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Buyers profile</h3>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-400 transition-all">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-12">
            <div className="relative w-56 h-56 group">
              <div className="absolute inset-0 bg-brand-blue blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={buyersProfile}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={95}
                    paddingAngle={8}
                    dataKey="value"
                    animationBegin={200}
                    animationDuration={1500}
                  >
                    {buyersProfile.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke="none"
                        style={{ filter: `drop-shadow(0 0 8px ${entry.color}44)` }}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 20, 41, 0.95)', 
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '20px',
                      padding: '12px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>09,412</span>
                <span className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] opacity-60">Total Buyers</span>
              </div>
            </div>

            <div className="w-full space-y-6">
              {buyersProfile.map((item, idx) => (
                <div key={idx} className="space-y-3 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: item.color, boxShadow: `0 0 12px ${item.color}66` }} />
                      <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">{item.name}</span>
                    </div>
                    <span className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{item.value}%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-zinc-100 dark:bg-white/5 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.2)]" 
                      style={{ width: `${item.value}%`, backgroundColor: item.color }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
