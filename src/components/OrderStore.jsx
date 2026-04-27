import React from 'react';
import { MoreVertical, Calendar, TrendingUp, ChevronDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const platforms = [
  { name: 'Amazon',    progress: 80, color: '#f97316', icon: 'https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg' },
  { name: 'Facebook',  progress: 85, color: '#22c55e', icon: 'https://www.vectorlogo.zone/logos/facebook/facebook-icon.svg' },
  { name: 'Instagram', progress: 88, color: '#ef4444', icon: 'https://www.vectorlogo.zone/logos/instagram/instagram-icon.svg' },
  { name: 'Pinterest', progress: 80, color: '#a3e635', icon: 'https://www.vectorlogo.zone/logos/pinterest/pinterest-icon.svg' },
];

const chartData = [
  { name: 'Orange', value: 25, color: '#f97316' }, // Top Right
  { name: 'Light Green', value: 20, color: '#a3e635' }, // Bottom Right
  { name: 'Red', value: 25, color: '#ef4444' }, // Bottom Left
  { name: 'Green', value: 30, color: '#22c55e' }, // Top Left
];

export default function OrderStore() {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [selectedPeriod, setSelectedPeriod] = React.useState('This week');
  const [selectedPlatform, setSelectedPlatform] = React.useState(1);
  const dropdownRef = React.useRef(null);

  const periods = ['This week', 'Last week', 'This month', 'Last month'];

  React.useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="p-4 md:p-8 rounded-3xl border h-full flex flex-col"
      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
    >
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-lg md:text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Order Store</h3>
        {/* Dropdown wrapper */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(o => !o)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl border"
            style={{
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-secondary)',
              borderColor: dropdownOpen ? 'var(--color-brand-blue)' : 'var(--border-color)',
              fontSize: '14px',
              fontWeight: 500,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <Calendar size={15} style={{ color: 'var(--text-muted)' }} />
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{selectedPeriod}</span>
            <ChevronDown
              size={15}
              style={{
                color: 'var(--text-muted)',
                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.20)',
                overflow: 'hidden',
                zIndex: 50,
                minWidth: '150px',
              }}
            >
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => { setSelectedPeriod(period); setDropdownOpen(false); }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 16px',
                    fontSize: '13px',
                    fontWeight: period === selectedPeriod ? 700 : 500,
                    color: period === selectedPeriod ? '#2ECC71' : 'var(--text-primary)',
                    backgroundColor: period === selectedPeriod ? 'var(--bg-root)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { if (period !== selectedPeriod) e.target.style.backgroundColor = 'var(--bg-root)'; }}
                  onMouseLeave={e => { if (period !== selectedPeriod) e.target.style.backgroundColor = 'transparent'; }}
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Platforms List */}
        <div className="space-y-8">
          {platforms.map((platform, i) => {
            const isSelected = selectedPlatform === i;
            return (
              <div
                key={i}
                className="space-y-2"
                onClick={() => setSelectedPlatform(i)}
                style={{ cursor: 'pointer' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
                      style={{
                        backgroundColor: isSelected ? `${platform.color}18` : 'transparent',
                        padding: '4px',
                      }}
                    >
                      <img src={platform.icon} alt={platform.name} className="w-full h-full object-contain" />
                    </div>
                    <span
                      className="text-sm font-semibold transition-all duration-200"
                      style={{
                        color: isSelected ? platform.color : 'var(--text-primary)',
                        opacity: isSelected ? 1 : 0.5,
                        fontWeight: isSelected ? 700 : 600,
                      }}
                    >
                      {platform.name}
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-bold transition-all duration-200"
                    style={{
                      color: isSelected ? platform.color : 'var(--text-primary)',
                      opacity: isSelected ? 1 : 0.4,
                    }}
                  >
                    {platform.progress}%
                  </span>
                </div>
                <div
                  className="h-1.5 w-full rounded-full overflow-hidden transition-all duration-200"
                  style={{ backgroundColor: isSelected ? `${platform.color}20` : 'var(--border-color)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${platform.progress}%`, backgroundColor: platform.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Circular Chart */}
        <div className="h-full w-full flex items-center justify-center relative min-h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius="75%"
                outerRadius="95%"
                paddingAngle={2}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => {
                  const selectedColor = platforms[selectedPlatform]?.color;
                  const isHighlighted = entry.color === selectedColor;
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      fillOpacity={isHighlighted ? 1 : 0.25}
                      style={{ transition: 'fill-opacity 0.3s' }}
                    />
                  );
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Inner Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp size={24} style={{ color: 'var(--text-primary)' }} className="opacity-80" />
              <span className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>+180%</span>
            </div>
            <span className="text-[10px] font-medium opacity-40 uppercase tracking-[0.2em]" style={{ color: 'var(--text-primary)' }}>Last Week</span>
          </div>

        </div>
      </div>
    </div>
  );
}
