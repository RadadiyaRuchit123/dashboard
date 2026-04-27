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
  { name: '24', sell: 1400, fontReturn: 580 },
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
  <div className="premium-card rounded-[32px] p-8 flex flex-col gap-4 group transition-all" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <p className="text-sm font-bold text-zinc-400">{title}</p>
        <h3 className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>{value}</h3>
      </div>
      <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-black ${color === 'green' ? 'bg-green-500/10 text-green-500' : 'bg-rose-500/10 text-rose-500'}`}>
        {color === 'green' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {change}
      </div>
    </div>
    
    <div className="h-24 w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color === 'green' ? '#10B981' : color === 'orange' ? '#F59E0B' : '#F43F5E'} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color === 'green' ? '#10B981' : color === 'orange' ? '#F59E0B' : '#F43F5E'} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={color === 'green' ? '#10B981' : color === 'orange' ? '#F59E0B' : '#F43F5E'} 
            strokeWidth={3} 
            fillOpacity={1} 
            fill={`url(#${gradientId})`} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    
    <div className="flex justify-between text-[10px] font-black text-zinc-400 mt-2">
      <span>Sat</span>
      <span>Sun</span>
      <span>Mon</span>
      <span>Tue</span>
      <span>Wed</span>
      <span>Thu</span>
      <span>Fri</span>
    </div>
  </div>
);

export default function Analytics() {
  const { isDark } = useTheme();

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Analytical</h2>
        <div className="flex items-center gap-2 px-4 py-2 border rounded-xl bg-white dark:bg-zinc-900 shadow-sm cursor-pointer" style={{ borderColor: 'var(--border-color)' }}>
          <Calendar size={16} className="text-zinc-400" />
          <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>This week</span>
          <ChevronDown size={14} className="text-zinc-400" />
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Amount" value="$90,584" change="+5.2%" color="green" data={statData} gradientId="gradAmount" />
        <StatCard title="Total Revenue" value="$40,584" change="+2.5%" color="orange" data={revenueData} gradientId="gradRevenue" />
        <StatCard title="Total Customer" value="20,584" change="-1.5%" color="red" data={customerData} gradientId="gradCustomer" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Sell/Return Chart */}
        <div className="xl:col-span-2 premium-card rounded-[32px] p-8 space-y-8" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>Product Sell / Purchase Return</h3>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>$90,584B</span>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-green-500/10 text-green-500 text-[10px] font-black">
                  <TrendingUp size={10} /> +2.7%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-400" />
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Purchase Return</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Product Seal</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 border rounded-xl bg-zinc-50 dark:bg-zinc-800 shadow-sm cursor-pointer ml-4" style={{ borderColor: 'var(--border-color)' }}>
                <Calendar size={14} className="text-zinc-400" />
                <span className="text-[10px] font-black" style={{ color: 'var(--text-primary)' }}>This Month</span>
                <ChevronDown size={12} className="text-zinc-400" />
              </div>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sellReturnData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSell" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorReturn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1e293b' : '#f1f5f9'} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                  interval={1}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                  tickFormatter={(val) => `${val}K`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#fff', border: 'none', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                  itemStyle={{ padding: '2px 0' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sell" 
                  stroke="#10B981" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorSell)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="return" 
                  stroke="#F59E0B" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorReturn)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Customer Section */}
        <div className="xl:col-span-1 premium-card rounded-[32px] p-8 flex flex-col" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>Top Customer</h3>
            <div className="flex items-center gap-2 px-4 py-2 border rounded-xl bg-zinc-50 dark:bg-zinc-800 shadow-sm cursor-pointer" style={{ borderColor: 'var(--border-color)' }}>
              <Calendar size={14} className="text-zinc-400" />
              <span className="text-[10px] font-black" style={{ color: 'var(--text-primary)' }}>This week</span>
              <ChevronDown size={12} className="text-zinc-400" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase font-black tracking-widest text-zinc-400 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <th className="pb-4">Customer ID</th>
                  <th className="pb-4">Customer name</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
                {topCustomers.map((cust, idx) => (
                  <tr key={idx} className="group">
                    <td className="py-4 text-[11px] font-bold text-zinc-400">{cust.id}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img src={cust.avatar} alt="" className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-800 shadow-sm" />
                        <span className="text-[11px] font-black" style={{ color: 'var(--text-primary)' }}>{cust.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <button className="p-2 rounded-xl border border-transparent hover:border-brand-blue/30 hover:bg-brand-blue/5 text-zinc-400 hover:text-brand-blue transition-all">
                        <Eye size={14} strokeWidth={3} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Device Preferences Table */}
        <div className="xl:col-span-3 premium-card rounded-[32px] p-8" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>User Base by Device Preferences</h3>
            <div className="flex items-center gap-2 px-4 py-2 border rounded-xl bg-zinc-50 dark:bg-zinc-800 shadow-sm cursor-pointer" style={{ borderColor: 'var(--border-color)' }}>
              <Calendar size={14} className="text-zinc-400" />
              <span className="text-[10px] font-black" style={{ color: 'var(--text-primary)' }}>This Month</span>
              <ChevronDown size={12} className="text-zinc-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase font-black tracking-widest text-zinc-400 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <th className="pb-4">Device Name</th>
                  <th className="pb-4">User</th>
                  <th className="pb-4">Average</th>
                </tr>
              </thead>
              <tbody>
                {deviceData.map((device, idx) => (
                  <tr key={idx} className="border-b last:border-0" style={{ borderColor: 'var(--border-color)' }}>
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                          <device.icon size={18} />
                        </div>
                        <span className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>{device.name}</span>
                      </div>
                    </td>
                    <td className="py-5 text-xs font-bold text-zinc-400">{device.user}</td>
                    <td className="py-5">
                      <div className={`flex items-center gap-1 text-[10px] font-black ${device.type === 'up' ? 'text-green-500 bg-green-500/10' : 'text-rose-500 bg-rose-500/10'} px-2 py-1 rounded-lg inline-flex`}>
                        {device.type === 'up' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
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
        <div className="xl:col-span-2 premium-card rounded-[32px] p-8 flex flex-col" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>Buyers profile</h3>
            <button className="text-zinc-400 hover:text-zinc-600 transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>

          <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={buyersProfile}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {buyersProfile.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>09,412</span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Total Buyers</span>
              </div>
            </div>

            <div className="flex-1 space-y-4 w-full">
              {buyersProfile.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>{item.value}%</span>
                    <div className={`w-16 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden`}>
                      <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                    </div>
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
