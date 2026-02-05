// src/services/tts.ts

let voicesReady = false;
let cachedVoices: SpeechSynthesisVoice[] = [];

const loadVoices = () => {
  return new Promise<SpeechSynthesisVoice[]>((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve(window.speechSynthesis.getVoices());
      };
    }
  });
};

// Remove emojis & weird symbols
const sanitizeText = (text: string) =>
  text.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g,
    ''
  );

export const speak = async (text: string) => {
  if (!text || typeof window === 'undefined') return;

  window.speechSynthesis.cancel();

  if (!voicesReady) {
    cachedVoices = await loadVoices();
    voicesReady = true;
  }

  const utterance = new SpeechSynthesisUtterance(sanitizeText(text));

  utterance.lang = 'en-GB';
  utterance.rate = 1;
  utterance.pitch = 1.15;
  utterance.volume = 1;

  // 🎀 Prefer English female voices
  const voice =
    cachedVoices.find(v =>
      v.lang === 'en-GB' &&
      /female|woman|girl|victoria|libby|susan|amy/i.test(v.name)
    ) ||
    cachedVoices.find(v =>
      v.lang.startsWith('en') &&
      /female|woman|girl/i.test(v.name)
    ) ||
    cachedVoices.find(v => v.lang.startsWith('en'));

  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
};
