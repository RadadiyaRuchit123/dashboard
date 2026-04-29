import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, Paperclip, Smile, MoreVertical, Phone, Video, Info, CheckCheck, ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const initialChats = [
  { 
    id: 1, 
    name: 'Michael Johnson', 
    avatar: 'https://i.pravatar.cc/150?u=Michael', 
    lastMsg: 'Hey, did you check the latest invoice?', 
    time: '10:30 AM', 
    unread: 2, 
    online: true,
    messages: [
      { id: 1, sender: 'them', text: 'Hello! Have you reviewed the quarterly analytics?', time: '10:00 AM' },
      { id: 2, sender: 'me', text: 'Hi! Yes, I was just looking at them. The growth looks impressive.', time: '10:05 AM' },
      { id: 3, sender: 'them', text: 'Great. We need to present this to the board next week.', time: '10:10 AM' },
      { id: 4, sender: 'me', text: 'I will prepare the slides and send them over by tomorrow evening.', time: '10:12 AM' },
      { id: 5, sender: 'them', text: 'Perfect, thanks Michael!', time: '10:15 AM' },
    ]
  },
  { 
    id: 2, 
    name: 'Emily Wilson', 
    avatar: 'https://i.pravatar.cc/150?u=Emily', 
    lastMsg: 'The supplier list looks good.', 
    time: '09:45 AM', 
    unread: 0, 
    online: false,
    messages: [
      { id: 1, sender: 'them', text: 'Hi, I just finished the supplier audit.', time: '09:30 AM' },
      { id: 2, sender: 'me', text: 'Excellent work Emily. Any major findings?', time: '09:35 AM' },
      { id: 3, sender: 'them', text: 'Everything seems in order. The supplier list looks good.', time: '09:45 AM' },
    ]
  },
  { 
    id: 3, 
    name: 'David Smith', 
    avatar: 'https://i.pravatar.cc/150?u=David', 
    lastMsg: 'Can we schedule a call?', 
    time: 'Yesterday', 
    unread: 0, 
    online: true,
    messages: [
      { id: 1, sender: 'them', text: 'Can we schedule a call for tomorrow?', time: 'Yesterday' },
    ]
  },
];

export default function Message() {
  const { isDark } = useTheme();
  const [chats, setChats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState(initialChats[0]);
  const [newMessage, setNewMessage] = useState('');
  const [showChatList, setShowChatList] = useState(true); // For mobile responsiveness
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat.messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const msg = {
      id: Date.now(),
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat.id) {
        const updatedMessages = [...chat.messages, msg];
        const updatedChat = { ...chat, messages: updatedMessages, lastMsg: newMessage, time: 'Now' };
        setActiveChat(updatedChat);
        return updatedChat;
      }
      return chat;
    });
    
    setChats(updatedChats);
    setNewMessage('');
  };

  const selectChat = (chat) => {
    setActiveChat(chat);
    setShowChatList(false); // Hide list on mobile when chat selected
  };

  return (
    <div className="flex h-[calc(100vh-140px)] rounded-[32px] overflow-hidden border shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-full mx-2" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
      {/* Sidebar - Chat List */}
      <div className={`${showChatList ? 'flex' : 'hidden'} md:flex w-full md:w-80 lg:w-96 flex-col`} style={{ borderRight: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card-inner)' }}>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>Messages</h2>
            <button className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <MoreVertical size={20} className="text-zinc-400" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full pl-12 pr-4 py-3 border rounded-2xl focus:outline-none focus:border-brand-blue transition-all font-bold text-xs"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', backgroundColor: 'var(--bg-card)' }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-3 space-y-1 pb-4">
          {chats.map(chat => (
            <button 
              key={chat.id}
              onClick={() => selectChat(chat)}
              className={`w-full flex items-center gap-4 p-4 rounded-[24px] transition-all duration-300 ${activeChat.id === chat.id ? 'shadow-lg scale-[1.02]' : 'hover:opacity-80'}`}
              style={{ backgroundColor: activeChat.id === chat.id ? 'var(--bg-card)' : 'transparent' }}
            >
              <div className="relative">
                <img src={chat.avatar} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-zinc-700" />
                {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-zinc-800 rounded-full" />}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className="text-xs font-black truncate" style={{ color: 'var(--text-primary)' }}>{chat.name}</h4>
                  <span className="text-[10px] font-bold text-zinc-400">{chat.time}</span>
                </div>
                <p className={`text-[10px] font-bold truncate ${chat.unread > 0 ? 'text-brand-blue' : 'text-zinc-400'}`}>{chat.lastMsg}</p>
              </div>
              {chat.unread > 0 && (
                <div className="w-5 h-5 bg-brand-blue text-white rounded-full flex items-center justify-center text-[10px] font-black shadow-lg shadow-brand-blue/30">
                  {chat.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`${!showChatList ? 'flex' : 'hidden'} md:flex flex-1 flex-col border-l`} style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
        {/* Chat Header */}
        <div className="p-4 lg:p-6 flex items-center justify-between" style={{ borderBottom: '1px solid transparent' }}>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowChatList(true)} className="md:hidden p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <ArrowLeft size={20} className="text-zinc-400" />
            </button>
            <img src={activeChat.avatar} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-brand-blue/20" />
            <div>
              <h3 className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{activeChat.name}</h3>
              <p className={`text-[10px] font-bold flex items-center gap-1.5 ${activeChat.online ? 'text-green-500' : 'text-zinc-400'}`}>
                {activeChat.online ? (
                  <><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Online Now</>
                ) : 'Offline'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-3 rounded-xl border hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-zinc-400" style={{ borderColor: 'var(--border-color)' }}><Phone size={18} /></button>
            <button className="p-3 rounded-xl border hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-zinc-400" style={{ borderColor: 'var(--border-color)' }}><Video size={18} /></button>
            <button className="p-3 rounded-xl border hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-zinc-400" style={{ borderColor: 'var(--border-color)' }}><Info size={18} /></button>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin" style={{ backgroundColor: 'var(--bg-card-inner)', opacity: 0.8 }}>
          <div className="flex justify-center">
            <span className="px-4 py-1.5 rounded-full border text-[10px] font-black text-zinc-400 uppercase tracking-widest shadow-sm" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}>Conversation Started</span>
          </div>
          
          {activeChat.messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-in fade-in zoom-in-95 duration-300`}>
              <div className={`max-w-[70%] space-y-1`}>
                <div className={`px-5 py-3.5 rounded-[24px] text-xs font-bold shadow-sm ${
                  msg.sender === 'me' 
                    ? 'bg-brand-blue text-white rounded-tr-none' 
                    : 'border rounded-tl-none'
                }`} style={{ 
                  borderColor: msg.sender === 'me' ? 'transparent' : 'var(--border-color)',
                  backgroundColor: msg.sender === 'me' ? 'var(--color-brand-blue)' : 'var(--bg-card)',
                  color: msg.sender === 'me' ? '#fff' : 'var(--text-primary)'
                }}>
                  {msg.text}
                </div>
                <div className={`flex items-center gap-1.5 px-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-[9px] font-bold text-zinc-400">{msg.time}</span>
                  {msg.sender === 'me' && <CheckCheck size={12} className="text-brand-blue" />}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-6" style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-color)' }}>
          <form onSubmit={handleSendMessage} className="flex items-center gap-4 p-2 rounded-[24px] border border-dashed" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card-inner)' }}>
            <div className="flex items-center gap-1 px-2">
              <button type="button" className="p-2.5 rounded-full text-zinc-400 hover:bg-white dark:hover:bg-zinc-800 transition-all"><Paperclip size={18} /></button>
              <button type="button" className="p-2.5 rounded-full text-zinc-400 hover:bg-white dark:hover:bg-zinc-800 transition-all"><Smile size={18} /></button>
            </div>
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none font-bold text-xs shadow-none"
              style={{ color: 'var(--text-primary)', outline: 'none', border: 'none' }}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button 
              type="submit" 
              className="w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center shadow-lg shadow-brand-blue/30 hover:scale-[1.05] active:scale-[0.95] transition-all"
            >
              <Send size={20} strokeWidth={2.5} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
