
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { PERSONA_PROMPT } from "../constants";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const chatWithPro = async (message: string, history: { role: string; parts: string }[]) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: PERSONA_PROMPT,
    },
  });

  // We convert history to the format required by the SDK
  // but since we want to keep the persona very tight, we'll just send the current interaction
  // to avoid history dilution if it gets too long.
  const response = await chat.sendMessage({ message });
  return response;
};

export const searchGrounding = async (message: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{ parts: [{ text: message }] }],
    config: {
      systemInstruction: PERSONA_PROMPT + "\n\nYou MUST use Google Search to provide up-to-date information.",
      tools: [{ googleSearch: {} }],
    },
  });
  return response;
};

export const editImage = async (imageB64: string, prompt: string, mimeType: string = 'image/png') => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: imageB64.split(',')[1],
            mimeType: mimeType,
          },
        },
        {
          text: `You are an expert photo editor with a pop-star aesthetic. ${prompt}. Keep the edited photo stylish, high quality, and matching a pop-diva vibe. Return the modified image.`,
        },
      ],
    },
  });

  for (const part of response.candidates?.[0]?.content.parts || []) {
    if (part.inlineData) {
      return `data:${mimeType};base64,${part.inlineData.data}`;
    }
  }
  return null;
};
