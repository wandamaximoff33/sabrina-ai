// src/services/tts.ts

let cachedVoices: SpeechSynthesisVoice[] = [];
let voicesLoaded = false;

const loadVoices = () =>
  new Promise<SpeechSynthesisVoice[]>(resolve => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve(window.speechSynthesis.getVoices());
      };
    }
  });

// 🔥 Kill emojis, symbols, and weird Unicode noises
const sanitizeText = (text: string) =>
  text
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')
    .replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, '')
    .trim();

const pickBestVoice = (voices: SpeechSynthesisVoice[]) =>
  voices.find(v =>
    v.lang === 'en-US' &&
    /female|woman|girl|aria|jenny|emma|samantha|all
