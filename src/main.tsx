import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return <h1>Sabrina AI is alive 🖤</h1>;
};

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
