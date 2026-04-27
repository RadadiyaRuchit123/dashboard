import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { ChevronDown, Calendar, TrendingUp, MoreVertical } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';



const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";
const highlightedCountries = {
  "USA": "#3B82F6", // Blue
  "CAN": "#EF4444", // Red
  "GBR": "#DC2626", // Red
  "AUS": "#1D4ED8", // Dark Blue
};

const stats = [
  { name: 'United States', value: '34,851', flag: 'https://flagcdn.com/w80/us.png' },
  { name: 'Canada', value: '28,857', flag: 'https://flagcdn.com/w80/ca.png' },
  { name: 'United Kingdom', value: '10,871', flag: 'https://flagcdn.com/w80/gb.png' },
  { name: 'Australia', value: '8,751', flag: 'https://flagcdn.com/w80/au.png' },
];

export function WeeklyEarnings() {
  const { currency } = useTheme();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [selectedPeriod, setSelectedPeriod] = React.useState('This week');
  const [hoveredDay, setHoveredDay] = React.useState('Tue');
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
  const maxVal = 1000;
  const chartData = [
    { day: 'Sat', amount: 680 },
    { day: 'Sun', amount: 750 },
    { day: 'Mon', amount: 820 },
    { day: 'Tue', amount: 879 },
    { day: 'Wed', amount: 740 },
    { day: 'Thu', amount: 575 },
    { day: 'Fri', amount: 825 },
  ];

  const yTicks = [0, 80, 100, 250, 500, 800];

  return (
    <div
      className="p-5 md:p-7 rounded-3xl border flex flex-col"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)',
        height: '100%',
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3
          className="text-lg md:text-xl font-bold tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Weekly Earnings
        </h3>
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

      {/* Chart area */}
      <div className="flex flex-1 min-h-0">
        {/* Y-axis labels */}
        <div
          className="flex flex-col-reverse justify-between pr-3 pb-6"
          style={{ color: '#B0B0B0', fontSize: '12px', fontWeight: 500, minWidth: '48px' }}
        >
          {yTicks.map((tick) => (
            <span key={tick} className="text-right block" style={{ lineHeight: 1 }}>
              {currency}{tick}K
            </span>
          ))}
        </div>

        {/* Bars + grid */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Grid + bars */}
          <div className="flex-1 relative">

            {/* Bars row */}
            <div className="absolute inset-0 flex items-end justify-between px-0">
              {chartData.map((item, idx) => {
                const heightPct = (item.amount / maxVal) * 100;
                const isHovered = item.day === hoveredDay;
                return (
                  <div
                    key={item.day}
                    className="flex-1 flex flex-col items-center"
                    style={{ 
                      height: '100%', 
                      justifyContent: 'flex-end', 
                      position: 'relative',
                      cursor: 'pointer' 
                    }}
                    onMouseEnter={() => setHoveredDay(item.day)}
                    onMouseLeave={() => setHoveredDay('Tue')} // Keep Tue as default or set to null
                  >
                    {/* Tooltip above hovered bar */}
                    {isHovered && (
                      <div
                        className="absolute"
                        style={{ bottom: `calc(${heightPct}% + 14px)`, zIndex: 10 }}
                      >
                        <div
                          style={{
                            background: '#2ECC71',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '15px',
                            padding: '7px 14px',
                            borderRadius: '12px',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 8px 24px rgba(46,204,113,0.35)',
                            position: 'relative',
                          }}
                        >
                          {currency}{item.amount}K
                          {/* Arrow notch */}
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '-7px',
                              left: '50%',
                              transform: 'translateX(-50%) rotate(45deg)',
                              width: '13px',
                              height: '13px',
                              background: '#2ECC71',
                              borderRadius: '2px',
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Bar */}
                    <div
                      style={{
                        width: '26px',
                        height: `${heightPct}%`,
                        borderRadius: '5px 5px 5px 5px',
                        background: 'linear-gradient(to bottom, #2ECC71 0%, #C8F5DC 100%)',
                        flexShrink: 0,
                        opacity: isHovered ? 1 : 0.8,
                        transition: 'opacity 0.2s'
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between px-0 pt-3">
            {chartData.map((item) => (
              <div
                key={item.day}
                className="flex-1 text-center"
                style={{ color: '#B0B0B0', fontSize: '12px', fontWeight: 500 }}
              >
                {item.day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export function CommercialHub() {
  const { currency } = useTheme();
  const [hoveredIso, setHoveredIso] = React.useState(null);

  const nameToIso = {
    'United States': 'USA',
    'Canada': 'CAN',
    'United Kingdom': 'GBR',
    'Australia': 'AUS'
  };

  return (
    <div
      className="p-4 md:p-8 rounded-[32px] border min-h-[400px] md:min-h-[480px] flex flex-col transition-all duration-300 group hover:shadow-xl hover:shadow-black/5"
      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
    >
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        {/* Left Column: Title + Stats List */}
        <div className="lg:col-span-4 flex flex-col pt-2">
          {/* Header moved inside */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-bold tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>Commercial Hub</h3>
            <div className="flex items-center gap-4 mb-1">
              <h4 className="text-[24px] font-medium leading-[34px] text-[#0D0D0D]" style={{ color: 'var(--text-primary)' }}>{currency}83,330</h4>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#6169FF]/10 text-[#6169FF] text-[10px] md:text-[12px] font-black border border-[#6169FF]/20">
                <TrendingUp size={14} /> +0.5%
              </div>
            </div>
            <p className="text-xs font-semibold opacity-30" style={{ color: 'var(--text-primary)' }}>Contrasted with the Previous Month</p>
          </div>

          <div className="space-y-4 lg:space-y-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex items-center justify-between group/item cursor-pointer"
                onMouseEnter={() => setHoveredIso(nameToIso[stat.name])}
                onMouseLeave={() => setHoveredIso(null)}
              >
                <div className="flex items-center gap-3 lg:gap-5">
                  <div className={`w-10 h-10 rounded-full overflow-hidden bg-[#F5F6F7] dark:bg-zinc-800 flex items-center justify-center shadow-sm border transition-all duration-300 ${hoveredIso === nameToIso[stat.name] ? 'border-[#6169FF] scale-110 shadow-md' : 'border-zinc-200/50 dark:border-zinc-700'}`}>
                    <img
                      src={stat.flag}
                      alt={stat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className={`text-sm lg:text-base font-semibold transition-all duration-300 ${hoveredIso === nameToIso[stat.name] ? 'opacity-100 text-[#6169FF]' : 'opacity-50 text-primary'}`} style={{ color: hoveredIso === nameToIso[stat.name] ? '#6169FF' : 'var(--text-primary)' }}>{stat.name}</span>
                </div>
                <span className={`text-xs lg:text-sm font-bold transition-all duration-300 ${hoveredIso === nameToIso[stat.name] ? 'scale-110 text-[#6169FF]' : ''}`} style={{ color: hoveredIso === nameToIso[stat.name] ? '#6169FF' : 'var(--text-primary)' }}>{currency}{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Full Height Map */}
        <div className="lg:col-span-8 h-full flex items-center justify-end relative min-h-[400px] lg:min-h-[500px]">
          {/* More button moved here for better positioning */}
          <button className="absolute top-0 right-0 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" style={{ color: 'var(--text-muted)' }}>
            <MoreVertical size={24} />
          </button>

          {/* Pattern Definitions */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <pattern id="worldDots" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="currentColor" />
              </pattern>
              {/* Colored Patterns for Hover */}
              {Object.entries(highlightedCountries).map(([code, color]) => (
                <pattern key={code} id={`dots-${code}`} x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill={color} />
                </pattern>
              ))}
            </defs>
          </svg>

          <ComposableMap 
            projectionConfig={{ 
              scale: typeof window !== 'undefined' && window.innerWidth < 768 ? 130 : 145, 
              center: [10, 5] 
            }} 
            className="w-full h-full text-zinc-300 dark:text-zinc-700"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryCode = geo.properties.ISO_A3 || geo.id;
                  const isHovered = countryCode === hoveredIso;
                  const highlightColor = highlightedCountries[countryCode];

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isHovered && highlightColor ? `url(#dots-${countryCode})` : "url(#worldDots)"}
                      fillOpacity={isHovered ? 1 : 0.4}
                      stroke={isHovered ? highlightColor : "transparent"}
                      strokeWidth={isHovered ? 0.5 : 0}
                      style={{
                        default: { outline: "none", transition: "all 300ms" },
                        hover: {
                          outline: "none",
                          fill: highlightColor ? `url(#dots-${countryCode})` : "var(--color-brand-blue)",
                          fillOpacity: 1,
                        },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* Geographic Markers (Robust for Mobile) */}
            {[
              { name: 'Canada', coordinates: [-106, 56], flag: 'ca' },
              { name: 'United Kingdom', coordinates: [-2, 54], flag: 'gb' },
              { name: 'United States', coordinates: [-95, 37], flag: 'us' },
              { name: 'Australia', coordinates: [133, -25], flag: 'au' },
            ].map((stat, i) => {
              const isHovered = nameToIso[stat.name] === hoveredIso;
              return (
                <Marker key={i} coordinates={stat.coordinates}>
                  <g 
                    className="transition-all duration-500 cursor-pointer pointer-events-auto"
                    style={{ 
                      transform: isHovered ? 'scale(1.1) translateY(-5px)' : 'scale(1) translateY(0)',
                    }}
                    onMouseEnter={() => setHoveredIso(nameToIso[stat.name])}
                    onMouseLeave={() => setHoveredIso(null)}
                  >
                    {/* Label Container (SVG-based positioning) */}
                    <foreignObject x="-50" y="-35" width="100" height="40">
                      <div className="flex justify-center">
                        <div className={`shadow-lg border px-2 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl flex items-center gap-1.5 transition-all duration-300 ${isHovered ? 'border-[#6169FF] ring-4 ring-[#6169FF]/5' : ''}`}
                          style={{ 
                            backgroundColor: 'var(--bg-card)', 
                            borderColor: isHovered ? '#6169FF' : 'var(--border-color)',
                            pointerEvents: 'auto'
                          }}
                        >
                          <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full overflow-hidden border border-zinc-100 dark:border-zinc-700">
                            <img src={`https://flagcdn.com/w80/${stat.flag}.png`} alt={stat.flag} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[8px] md:text-[10px] font-bold" 
                            style={{ color: isHovered ? '#6169FF' : 'var(--text-primary)' }}
                          >
                            {stat.name}
                          </span>
                        </div>
                      </div>
                    </foreignObject>
                  </g>
                </Marker>
              );
            })}
          </ComposableMap>
        </div>
      </div>
    </div>
  );
}

