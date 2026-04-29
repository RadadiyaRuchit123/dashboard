import React, { useState } from 'react';
import { Mail, Lock, LogIn, ShieldCheck, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Login({ onLogin }) {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden p-4" style={{ backgroundColor: 'var(--bg-root)' }}>
      {/* Animated Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      
      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white/5 dark:bg-zinc-900/40 backdrop-blur-3xl rounded-[48px] border border-white/20 dark:border-white/5 overflow-hidden shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-700">
        
        {/* Left Side: Illustration & Branding */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-brand-blue to-blue-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                <ShieldCheck size={28} strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl font-black tracking-tighter">Ment X</h1>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-5xl font-black leading-tight">Master Your <br/> Business <span className="text-blue-200">Intelligence.</span></h2>
              <p className="text-lg font-bold opacity-80 max-w-md">Experience the next generation of admin dashboards with our futuristic management system.</p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-6 opacity-60">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-brand-blue" alt="" />
              ))}
            </div>
            <p className="text-xs font-black uppercase tracking-widest">Joined by 10k+ Users</p>
          </div>

          {/* Decorative Blobs */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10 lg:hidden">
             <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
                  <ShieldCheck size={18} className="text-white" />
                </div>
                <span className="text-xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>Ment X</span>
             </div>
          </div>

          <div className="space-y-2 mb-10">
            <h3 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Welcome Back</h3>
            <p className="text-sm font-bold text-zinc-400">Enter your credentials to access your portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: 'var(--text-muted)' }}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-brand-blue" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="admin@mentx.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-transparent focus:outline-none focus:border-brand-blue transition-all font-bold text-sm"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Password</label>
                <a href="#" className="text-[10px] font-black text-brand-blue uppercase hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-brand-blue" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-transparent focus:outline-none focus:border-brand-blue transition-all font-bold text-sm"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-blue text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-blue/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 relative overflow-hidden group btn-glow disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <LogIn size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-10 space-y-6">
            <div className="relative flex items-center">
              <div className="flex-grow border-t" style={{ borderColor: 'var(--border-color)' }}></div>
              <span className="flex-shrink mx-4 text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Or Continue With</span>
              <div className="flex-grow border-t" style={{ borderColor: 'var(--border-color)' }}></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => {
                  setLoading(true);
                  setTimeout(onLogin, 1000);
                }}
                className="flex items-center justify-center gap-3 py-3.5 rounded-2xl border hover:bg-zinc-50 dark:hover:bg-white/5 transition-all text-sm font-bold shadow-sm" 
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> GitHub
              </button>
              <button 
                onClick={() => {
                  setLoading(true);
                  setTimeout(onLogin, 1000);
                }}
                className="flex items-center justify-center gap-3 py-3.5 rounded-2xl border hover:bg-zinc-50 dark:hover:bg-white/5 transition-all text-sm font-bold shadow-sm" 
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line></svg> Google
              </button>
            </div>
          </div>
          
          <p className="mt-10 text-center text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
            Don't have an account? <a href="#" className="text-brand-blue hover:underline">Create Account</a>
          </p>
        </div>
      </div>
    </div>
  );
}
