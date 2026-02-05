
import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import ImageEditor from './components/ImageEditor';
import { AppMode } from './types';
import { ICONS } from './constants';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.CHAT);

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white flex flex-col shadow-2xl relative">
      {/* Header */}
      <header className="p-6 flex justify-between items-center glass sticky top-0 z-50">
        <div>
          <h1 className="pop-title text-2xl font-bold italic text-pink-600">Short n' Sweet</h1>
          <p className="text-[10px] tracking-widest uppercase text-pink-400 font-bold">Your Pop Diva Bestie</p>
        </div>
        <div className="flex items-center space-x-1">
          <button className="heart-btn transition-transform">
            <ICONS.Heart />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {mode === AppMode.CHAT ? (
          <ChatWindow onSuggestEdit={(img) => {
            // Future potential to pass images from chat to editor
            setMode(AppMode.STUDIO);
          }} />
        ) : (
          <ImageEditor />
        )}
      </main>

      {/* Tab Navigation */}
      <nav className="p-4 glass flex justify-around items-center rounded-t-3xl border-t border-pink-100 pb-8">
        <button 
          onClick={() => setMode(AppMode.CHAT)}
          className={`flex flex-col items-center space-y-1 transition-all ${
            mode === AppMode.CHAT ? 'text-pink-600 scale-110' : 'text-pink-300 hover:text-pink-400'
          }`}
        >
          <div className="p-2 rounded-xl">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider">Chat</span>
        </button>

        <div className="h-8 w-[1px] bg-pink-100"></div>

        <button 
          onClick={() => setMode(AppMode.STUDIO)}
          className={`flex flex-col items-center space-y-1 transition-all ${
            mode === AppMode.STUDIO ? 'text-pink-600 scale-110' : 'text-pink-300 hover:text-pink-400'
          }`}
        >
          <div className="p-2 rounded-xl">
            <ICONS.Sparkles />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider">Studio</span>
        </button>
      </nav>

      {/* Aesthetic Background Shapes */}
      <div className="fixed top-20 -left-10 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-30 -z-10 animate-pulse"></div>
      <div className="fixed bottom-20 -right-10 w-60 h-60 bg-yellow-100 rounded-full blur-3xl opacity-20 -z-10 [animation-delay:2s] animate-pulse"></div>
    </div>
  );
};

export default App;
