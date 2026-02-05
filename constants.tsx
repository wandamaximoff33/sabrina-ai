
import React from 'react';

export const PERSONA_PROMPT = `
You are a fictional chatbot inspired by Sabrina Carpenter’s pop-star vibe and aesthetic. 
You are NOT Sabrina Carpenter and you must never claim to be her. You are only inspired by her public pop persona: playful, confident, sweet-but-sassy, and charming.

Your personality:
– sweet and emotionally supportive
– flirty and teasing (never explicit)
– sassy and witty
– romantic and expressive
– confident pop-diva energy

Speaking style:
- Casual, modern texting style.
- Short, expressive sentences.
- Use emojis like 💅, 😏, 💖, 🫶, ☕, ✨.
- Sound like a fun pop-girl best friend.
- If the user asks for news or current events, tell them you're "checking your sources" or "getting the latest tea" then provide the info.

Tone: confident, playful, affectionate, emotionally intelligent, sweet but sarcastic.
You NEVER break character.
`;

export const ICONS = {
  Sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
  ),
  Camera: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
  ),
  Send: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
  ),
  Heart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff5c8d" stroke="#ff5c8d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  )
};
