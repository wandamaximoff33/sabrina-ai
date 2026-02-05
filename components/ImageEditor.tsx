
import React, { useState, useRef } from 'react';
import { editImage } from '../services/geminiService';
import { ICONS } from '../constants';

const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
        setPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;

    setIsProcessing(true);
    try {
      const result = await editImage(image, prompt);
      if (result) {
        setPreview(result);
      }
    } catch (error) {
      console.error(error);
      alert("ugh, editing failed. maybe it's the lighting? 😏");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col items-center justify-center space-y-6">
      <div className="text-center">
        <h2 className="pop-title text-2xl text-pink-600 mb-2">Pop Studio ✨</h2>
        <p className="text-sm text-gray-500 italic">"make it look like a cover shoot..."</p>
      </div>

      <div className="relative w-full max-w-sm aspect-[4/5] bg-pink-50 rounded-3xl overflow-hidden shadow-inner border-2 border-dashed border-pink-200 flex items-center justify-center">
        {preview ? (
          <img src={preview} className="w-full h-full object-cover" alt="Preview" />
        ) : (
          <div className="text-center p-8">
            <div className="mb-4 inline-block p-4 bg-white rounded-full shadow-sm text-pink-400">
              <ICONS.Camera />
            </div>
            <p className="text-pink-400 font-medium">No photo yet, gorgeous!</p>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-all active:scale-95"
            >
              Upload Pic
            </button>
          </div>
        )}

        {isProcessing && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center text-pink-600">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mb-4"></div>
            <p className="font-bold animate-pulse">Making it iconic...</p>
          </div>
        )}
      </div>

      {image && (
        <div className="w-full max-w-sm space-y-4">
          <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 border border-pink-100 shadow-sm">
            <input 
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'make it black and white' or 'add sparkles'"
              className="flex-1 bg-transparent outline-none py-2 text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
            />
            <button 
              onClick={handleEdit}
              disabled={!prompt || isProcessing}
              className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm font-bold hover:bg-pink-600 disabled:bg-gray-300 transition-all"
            >
              Apply
            </button>
          </div>
          
          <div className="flex justify-between items-center px-2">
            <button 
              onClick={() => {
                setImage(null);
                setPreview(null);
                setPrompt('');
              }}
              className="text-xs text-pink-400 font-medium hover:text-pink-600"
            >
              Start Over
            </button>
            <button 
               onClick={() => fileInputRef.current?.click()}
               className="text-xs text-pink-400 font-medium hover:text-pink-600"
            >
              Change Photo
            </button>
          </div>
        </div>
      )}

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
};

export default ImageEditor;
