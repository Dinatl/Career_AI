import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import api from '../lib/axios';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! I am your CareerAI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    const newMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setLoading(true);
    
    try {
      // Call Laravel API
      const response = await api.post('/chat', { message: newMsg.content });
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.message }]);
    } catch (err) {
      if (err.response?.status === 401) {
         setMessages(prev => [...prev, { role: 'assistant', content: "Please Sign In to use the AI Assistant!" }]);
      } else {
         setMessages(prev => [...prev, { role: 'assistant', content: err.response?.data?.message || "The backend encountered an error connecting to Gemini API." }]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-16 h-16 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all z-50 ${isOpen ? 'scale-0' : 'scale-100 hover:scale-110 active:scale-95'}`}
      >
        <MessageSquare className="w-7 h-7" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300 h-[500px] max-h-[80vh]">
          {/* Header */}
          <div className="bg-primary-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <span className="font-semibold">CareerAI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-primary-100 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4 scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-primary-100 text-primary-700' : 'bg-white border border-gray-200 text-primary-600'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4"/> : <Bot className="w-4 h-4"/>}
                </div>
                <div className={`p-3 rounded-2xl max-w-[75%] text-sm ${msg.role === 'user' ? 'bg-primary-600 text-white rounded-tr-sm' : 'bg-white border border-gray-100 shadow-sm rounded-tl-sm text-gray-700 whitespace-pre-wrap'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-white border border-gray-200 text-primary-600 flex items-center justify-center"><Bot className="w-4 h-4"/></div>
                 <div className="p-3 bg-white border border-gray-100 text-gray-400 rounded-2xl text-sm animate-pulse">Assistant is thinking...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..." 
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-primary-500 outline-none text-sm"
              disabled={loading}
            />
            <button type="submit" disabled={loading} className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors disabled:bg-primary-400">
              <Send className="w-4 h-4 ml-1" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
