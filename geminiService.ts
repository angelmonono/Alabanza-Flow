
import { GoogleGenAI, Type } from "@google/genai";
import { getSystemPrompt } from "./constants";
import { GenerationResponse, UserProfile, Song } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateSetlist = async (
  userInput: string, 
  profile: UserProfile, 
  openingSong?: Song | null
): Promise<GenerationResponse> => {
  try {
    let customizedPrompt = userInput;
    if (openingSong) {
      customizedPrompt += `\n\nIMPORTANTE: La "CANCIÓN 0 (Apertura)" DEBE SER "${openingSong.title}" en la tonalidad de ${openingSong.key}. Ajusta el resto del bloque rápido para que sea coherente con esta canción.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: customizedPrompt }] }],
      config: {
        systemInstruction: getSystemPrompt(profile),
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            setlist: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  order: { type: Type.NUMBER },
                  type: { type: Type.STRING },
                  title: { type: Type.STRING },
                  key: { type: Type.STRING },
                  tempo: { type: Type.STRING },
                  note: { type: Type.STRING },
                },
                required: ["order", "type", "title", "key", "tempo", "note"],
              },
            },
            commentary: { type: Type.STRING },
          },
          required: ["setlist", "commentary"],
        },
      },
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating setlist:", error);
    throw error;
  }
};
