import React from 'react';
import { LogOut, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Logout({ onLogout }) {
  const { isDark } = useTheme();

  return (
    <div className="h-[calc(100vh-140px)] flex items-center justify-center animate-in fade-in zoom-in-95 duration-500">
      <div className="relative w-full max-w-lg">
        {/* Background Decorative Elements */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-brand-blue/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl" />
        
        <div className="premium-card p-10 md:p-14 rounded-[48px] border bg-white dark:bg-zinc-900 shadow-2xl relative z-10 text-center space-y-8" style={{ borderColor: 'var(--border-color)' }}>
          <div className="w-24 h-24 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <LogOut size={44} strokeWidth={2.5} className="animate-pulse" />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Are you leaving?</h2>
            <p className="text-sm font-bold text-zinc-400 max-w-xs mx-auto">Don't forget to save your progress before signing out of your dashboard.</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
             <button 
               onClick={onLogout}
               className="w-full py-5 bg-rose-500 text-white rounded-[24px] font-black text-sm shadow-xl shadow-rose-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
             >
               Yes, Sign Out Now
             </button>
             <button 
                onClick={() => window.history.back()}
                className="w-full py-5 bg-zinc-100 dark:bg-zinc-800 rounded-[24px] font-black text-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                style={{ color: 'var(--text-primary)' }}
             >
               <ArrowLeft size={18} strokeWidth={3} /> No, Stay Here
             </button>
          </div>

          <div className="pt-6 border-t border-dashed flex items-center justify-center gap-6" style={{ borderColor: 'var(--border-color)' }}>
             <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
               <ShieldCheck size={14} className="text-green-500" /> Secure Exit
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
               <Zap size={14} className="text-yellow-500" /> Fast Sync
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
