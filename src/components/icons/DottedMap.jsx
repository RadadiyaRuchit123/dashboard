import React from 'react';
import { WorldMapSVG } from './WorldMapSVG';

export const DottedMap = ({ className }) => {
  return (
    <div className={`relative ${className}`}>
      <WorldMapSVG className="w-full h-auto text-zinc-400 dark:text-zinc-500" />
      
      {/* Pins/Labels aligned to the new 1000x500 map grid */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Canada */}
        <div className="absolute top-[15%] left-[15%]">
          <div className="bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md shadow-xl border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-full flex items-center gap-2 animate-pulse">
             <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
             <span className="text-[10px] font-black" style={{ color: 'var(--text-primary)' }}>Canada</span>
          </div>
        </div>
        
        {/* UK */}
        <div className="absolute top-[12%] left-[48%]">
          <div className="bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md shadow-xl border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-full flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></span>
             <span className="text-[10px] font-black" style={{ color: 'var(--text-primary)' }}>United Kingdom</span>
          </div>
        </div>

        {/* USA */}
        <div className="absolute top-[35%] left-[22%]">
          <div className="bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md shadow-xl border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-full flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]"></span>
             <span className="text-[10px] font-black" style={{ color: 'var(--text-primary)' }}>United States</span>
          </div>
        </div>

        {/* Australia */}
        <div className="absolute top-[75%] left-[82%]">
          <div className="bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md shadow-xl border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-full flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]"></span>
             <span className="text-[10px] font-black" style={{ color: 'var(--text-primary)' }}>Australia</span>
          </div>
        </div>
      </div>
    </div>
  );
};
