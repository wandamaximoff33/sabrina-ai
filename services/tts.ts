export const speak = (text: string) => {
  if (!("speechSynthesis" in window)) return;

  const utterance = new SpeechSynthesisUtterance(text);

  // pick a cute voice if available
  const voices = speechSynthesis.getVoices();
  const preferred =
    voices.find(v => v.name.includes("Female")) ||
    voices.find(v => v.lang.startsWith("en")) ||
    voices[0];

  if (preferred) utterance.voice = preferred;

  utterance.rate = 1.05; // speed
  utterance.pitch = 1.2; // sass level
  utterance.volume = 1;

  speechSynthesis.cancel(); // stop previous
  speechSynthesis.speak(utterance);
};
