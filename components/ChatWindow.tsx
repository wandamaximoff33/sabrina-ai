
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, MessageType } from '../types';
import { chatWithPro, searchGrounding } from '../services/geminiService';
import { speak } from '../services/tts';
import { ICONS } from '../constants';

interface ChatWindowProps {
  onSuggestEdit: (img: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onSuggestEdit }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "hey bestie! 💖 missed me? tell me everything - i'm all ears. what's the tea today?",
      type: 'text',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  // Force browser to preload voices (VERY IMPORTANT)
  window.speechSynthesis.getVoices();
}, []);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      type: 'text',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Logic to decide if we need Search Grounding
      const needsSearch = /news|latest|what happened|today|who won|release|concert|tickets|weather|time/i.test(input);
      
      let response;
      if (needsSearch) {
        response = await searchGrounding(input);
      } else {
        response = await chatWithPro(input, []);
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || "ugh, my brain is acting up... anyway, what were we saying? 😏",
        type: needsSearch ? 'search-result' : 'text',
        groundingLinks: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
          title: chunk.web?.title || 'Source',
          uri: chunk.web?.uri || '#'
        })),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
      speak(assistantMsg.content);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "something went wrong, but you still look gorgeous btw. ✨",
        type: 'text',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm md:text-base ${
                msg.role === 'user' ? 'bubble-user' : 'bubble-bot'
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              
              {msg.groundingLinks && msg.groundingLinks.length > 0 && (
                <div className="mt-3 pt-2 border-t border-pink-100 flex flex-wrap gap-2">
                  {msg.groundingLinks.map((link, idx) => (
                    <a 
                      key={idx}
                      href={link.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] bg-pink-50 text-pink-600 px-2 py-1 rounded-full hover:bg-pink-100 transition-colors"
                    >
                      🔗 {link.title.substring(0, 20)}...
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bubble-bot rounded-2xl px-4 py-3 flex space-x-1 items-center">
              <div className="w-1.5 h-1.5 bg-pink-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 glass rounded-t-3xl shadow-lg">
        <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 border border-pink-100 focus-within:ring-2 ring-pink-300 transition-all">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="message me..."
            className="flex-1 bg-transparent outline-none py-2 text-gray-700"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 disabled:bg-gray-300 transition-all active:scale-95"
          >
            <ICONS.Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
