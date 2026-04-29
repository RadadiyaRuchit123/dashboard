import React, { useState } from 'react';
import { Search, HelpCircle, Book, MessageSquare, Phone, Mail, ChevronRight, Play, ExternalLink, MessageCircle, LifeBuoy, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const faqCategories = [
  { icon: Book, title: 'Getting Started', count: 12, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { icon: LifeBuoy, title: 'General Info', count: 8, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { icon: Phone, title: 'Connectivity', count: 5, color: 'text-green-500', bg: 'bg-green-500/10' },
  { icon: MessageSquare, title: 'Community', count: 15, color: 'text-orange-500', bg: 'bg-orange-500/10' },
];

const faqsData = [
  { q: 'How do I export my invoices to PDF?', a: 'You can export any invoice by clicking the "Print" or "Download" icon in the Invoice module. For bulk exports, go to Order List and select "Export PDF".' },
  { q: 'Can I add multiple users to my dashboard?', a: 'Currently, the dashboard supports a single admin account. Multi-user support is in our roadmap and will be released in the next major update.' },
  { q: 'How to update my supplier information?', a: 'Navigate to the People > Supplier List section, click the edit icon on the supplier row, and update the details in the popup form.' },
  { q: 'Is my data secure on this dashboard?', a: 'Yes, we use industry-standard encryption for all your data. Your local storage is handled securely by your browser sessions.' },
];

const ContactCard = ({ icon: Icon, title, desc, action, gradient, shadow }) => (
  <div className="group premium-card p-6 rounded-[32px] border transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-white hover:shadow-xl" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
    <div className={`w-14 h-14 bg-gradient-to-br ${gradient} ${shadow} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg relative overflow-hidden`}>
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Icon size={28} strokeWidth={2.5} className="text-white relative z-10" />
    </div>
    <h4 className="text-sm font-black mb-1 group-hover:!text-black" style={{ color: 'var(--text-primary)' }}>{title}</h4>
    <p className="text-[10px] font-bold text-zinc-400 mb-6 group-hover:!text-zinc-600">{desc}</p>
    <button className="text-[10px] font-black text-brand-blue uppercase tracking-widest hover:underline flex items-center gap-2 group-hover:!text-brand-blue">
      {action} <ChevronRight size={14} />
    </button>
  </div>
);

export default function Help() {
  const { isDark } = useTheme();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 max-w-full overflow-x-hidden px-4 md:px-6">
      {/* Hero Section */}
      <div className="relative rounded-[48px] overflow-hidden bg-brand-blue p-12 md:p-20 text-center shadow-2xl shadow-brand-blue/30">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[100px] animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">Support Center</span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">Hello! How can we <br/> help you?</h1>
          <div className="relative mt-8">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" size={24} />
            <input 
              type="text" 
              placeholder="Search for articles, guides and more..." 
              className="w-full pl-16 pr-6 py-6 rounded-[28px] font-bold text-sm shadow-2xl focus:outline-none focus:scale-[1.02] transition-all placeholder:text-zinc-400"
              style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }}
            />
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { icon: Book, title: 'Getting Started', count: 12, gradient: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-500/20' },
          { icon: LifeBuoy, title: 'General Info', count: 8, gradient: 'from-purple-500 to-purple-600', shadow: 'shadow-purple-500/20' },
          { icon: Phone, title: 'Connectivity', count: 5, gradient: 'from-green-500 to-green-600', shadow: 'shadow-green-500/20' },
          { icon: MessageSquare, title: 'Community', count: 15, gradient: 'from-orange-500 to-orange-600', shadow: 'shadow-orange-500/20' },
        ].map((cat, i) => (
          <div key={i} className="premium-card p-6 md:p-8 rounded-[40px] border flex flex-col items-center text-center space-y-4 hover:translate-y-[-10px] transition-all cursor-pointer group hover:bg-zinc-50 dark:hover:bg-white hover:text-black dark:hover:text-black shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <div className={`w-20 h-20 bg-gradient-to-br ${cat.gradient} ${cat.shadow} rounded-[28px] flex items-center justify-center group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-500 shadow-xl relative overflow-hidden`}>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <cat.icon size={36} strokeWidth={2.5} className="text-white relative z-10" />
            </div>
            <div>
              <h3 className="font-black text-xs md:text-sm group-hover:!text-black" style={{ color: 'var(--text-primary)' }}>{cat.title}</h3>
              <p className="text-[10px] font-bold text-zinc-400 mt-1 uppercase tracking-widest group-hover:!text-zinc-600">{cat.count} Articles</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* FAQs Section */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex justify-between items-center px-4">
            <h2 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Frequently Asked Questions</h2>
            <button className="text-xs font-black text-brand-blue hover:underline">See all FAQ</button>
          </div>
          
          <div className="space-y-4">
            {faqsData.map((faq, i) => (
              <div 
                key={i} 
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className={`p-6 rounded-[32px] border transition-all duration-500 cursor-pointer group ${openFaq === i ? 'shadow-2xl shadow-brand-blue/10 scale-[1.01]' : 'hover:bg-zinc-50 dark:hover:bg-white/5'}`} 
                style={{ 
                  backgroundColor: 'var(--bg-card)', 
                  borderColor: openFaq === i ? 'var(--color-brand-blue)' : 'var(--border-color)',
                  boxShadow: openFaq === i ? '0 20px 40px -15px rgba(97, 105, 255, 0.2)' : ''
                }}
              >
                <div className="flex justify-between items-center gap-4">
                  <h4 className={`text-sm font-black transition-all duration-300 ${openFaq === i ? 'text-brand-blue scale-105 origin-left' : ''}`} style={{ color: openFaq === i ? 'var(--color-brand-blue)' : 'var(--text-primary)' }}>{faq.q}</h4>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${openFaq === i ? 'bg-brand-blue text-white rotate-180' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}`}>
                    <ChevronDown size={18} />
                  </div>
                </div>
                {openFaq === i && (
                  <div className="mt-4 pt-4 border-t border-dashed animate-in slide-in-from-top-2 duration-300" style={{ borderColor: 'var(--border-color)' }}>
                    <p className="text-xs font-bold text-zinc-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-2xl font-black tracking-tight px-4" style={{ color: 'var(--text-primary)' }}>Contact Support</h2>
          <div className="grid grid-cols-1 gap-4">
            <ContactCard 
              icon={MessageCircle} 
              title="Live Chat" 
              desc="Average response time: 2 mins" 
              action="Start Chatting" 
              gradient="from-green-500 to-emerald-600"
              shadow="shadow-green-500/20"
            />
            <ContactCard 
              icon={Mail} 
              title="Email Support" 
              desc="support@mentx.dashboard.com" 
              action="Send an Email" 
              gradient="from-blue-500 to-indigo-600"
              shadow="shadow-blue-500/20"
            />
            <ContactCard 
              icon={Phone} 
              title="Phone Support" 
              desc="+1 (234) 567 890" 
              action="Call Now" 
              gradient="from-purple-500 to-violet-600"
              shadow="shadow-purple-500/20"
            />
          </div>

          {/* Quick Links Card */}
          <div className="p-8 rounded-[40px] bg-zinc-900 text-white space-y-6 shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-black leading-tight">Watch Video Tutorials</h3>
              <p className="text-[10px] font-bold opacity-60">Learn how to master Ment X Dashboard in minutes with our quick guides.</p>
              <button className="w-full py-4 bg-brand-blue text-white rounded-2xl font-black text-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <Play size={16} fill="white" /> Watch Now
              </button>
            </div>
            {/* Abstract Background Element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-blue/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          </div>
        </div>
      </div>
    </div>
  );
}
