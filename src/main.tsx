import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

function speak(text: string) {
  if (!window.speechSynthesis) return;

  speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);

  const voices = speechSynthesis.getVoices();
  utter.voice =
    voices.find(v => /female|woman|samantha|zira|aria/i.test(v.name)) ||
    voices.find(v => v.lang === "en-US") ||
    voices[0];

  utter.rate = 0.95;
  utter.pitch = 1.05;
  utter.lang = "en-US";

  speechSynthesis.speak(utter);
}

const App = () => {
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string }[]
  >([
    { role: "bot", text: "Hi, I’m Sabrina. How can I help you today?" },
  ]);

  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    speechSynthesis.getVoices();
  }, []);

  function sendMessage() {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");

    setMessages(prev => [...prev, { role: "user", text: userMessage }]);

    setTimeout(() => {
      const reply = `You said: ${userMessage}`;
      setMessages(prev => [...prev, { role: "bot", text: reply }]);
      speak(reply);
    }, 400);
  }

  return (
    <main
      aria-label="Sabrina AI chat"
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        fontFamily: "system-ui",
      }}
    >
      <h1>Sabrina AI 💜</h1>

      <section
        aria-live="polite"
        style={{
          border: "1px solid #ddd",
          padding: "1rem",
          height: 300,
          overflowY: "auto",
          marginBottom: "1rem",
        }}
      >
        {messages.map((m, i) => (
          <p key={i}>
            <strong>{m.role === "user" ? "You" : "Sabrina"}:</strong>{" "}
            {m.text}
          </p>
        ))}
      </section>

      <form
        onSubmit={e => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <label htmlFor="chat-input" className="sr-only">
          Type your message
        </label>

        <input
          id="chat-input"
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message…"
          style={{ width: "75%", padding: "0.5rem" }}
        />

        <button
          type="submit"
          style={{ padding: "0.5rem", marginLeft: "0.5rem" }}
        >
          Send
        </button>
      </form>
    </main>
  );
};

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
