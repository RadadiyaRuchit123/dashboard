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

const ContactCard = ({ icon: Icon, title, desc, action, color }) => (
  <div className="group premium-card p-6 rounded-[32px] border transition-all duration-300" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      <Icon size={24} strokeWidth={2.5} />
    </div>
    <h4 className="text-sm font-black mb-1" style={{ color: 'var(--text-primary)' }}>{title}</h4>
    <p className="text-[10px] font-bold text-zinc-400 mb-4">{desc}</p>
    <button className="text-[10px] font-black text-brand-blue uppercase tracking-widest hover:underline flex items-center gap-2">
      {action} <ChevronRight size={14} />
    </button>
  </div>
);

export default function Help() {
  const { isDark } = useTheme();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 max-w-full overflow-x-hidden">
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
        {faqCategories.map((cat, i) => (
          <div key={i} className="premium-card p-6 md:p-8 rounded-[40px] border flex flex-col items-center text-center space-y-4 hover:translate-y-[-10px] transition-all cursor-pointer group hover:bg-zinc-50 dark:hover:bg-white hover:text-black dark:hover:text-black shadow-sm" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <div className={`w-16 h-16 ${cat.bg} ${cat.color} rounded-3xl flex items-center justify-center group-hover:rotate-12 transition-all`}>
              <cat.icon size={32} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-black text-xs md:text-sm" style={{ color: 'var(--text-primary)' }}>{cat.title}</h3>
              <p className="text-[10px] font-bold text-zinc-400 mt-1 uppercase tracking-widest">{cat.count} Articles</p>
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
                className={`p-6 rounded-[32px] border transition-all cursor-pointer group ${openFaq === i ? 'shadow-xl scale-[1.01]' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`} 
                style={{ backgroundColor: 'var(--bg-card)', borderColor: openFaq === i ? 'var(--brand-blue)' : 'var(--border-color)' }}
              >
                <div className="flex justify-between items-center gap-4">
                  <h4 className={`text-sm font-black transition-colors ${openFaq === i ? 'text-brand-blue' : ''}`} style={{ color: openFaq === i ? '' : 'var(--text-primary)' }}>{faq.q}</h4>
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
              color="bg-green-500/10 text-green-500" 
            />
            <ContactCard 
              icon={Mail} 
              title="Email Support" 
              desc="support@mentx.dashboard.com" 
              action="Send an Email" 
              color="bg-blue-500/10 text-blue-500" 
            />
            <ContactCard 
              icon={Phone} 
              title="Phone Support" 
              desc="+1 (234) 567 890" 
              action="Call Now" 
              color="bg-purple-500/10 text-purple-500" 
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
