import { GoogleGenAI, Type } from "@google/genai";
import { AiResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeProjectIdea = async (idea: string): Promise<AiResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User Project Idea: "${idea}"`,
      config: {
        systemInstruction: `You are the AI Solutions Architect for T4S Studio, an elite Android development firm specializing in Kotlin, Jetpack Compose, and futuristic UI. 
        Analyze the user's app idea. Return a JSON response with:
        1. 'analysis': A brief, professional, high-tech summary of what the app is.
        2. 'stackRecommendation': An array of specific Android tech stack items (e.g., 'Kotlin Coroutines', 'Room Database', 'Hilt', 'Jetpack Compose', 'Ktor', 'Gemini API').
        3. 'complexity': One of 'Low', 'Medium', 'High', 'Extreme'.
        4. 'technicalNotes': A short sentence on a potential technical challenge or unique feature implementation.
        
        Keep the tone sophisticated, encouraging, and technical.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            stackRecommendation: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            complexity: { type: Type.STRING, enum: ['Low', 'Medium', 'High', 'Extreme'] },
            technicalNotes: { type: Type.STRING }
          },
          required: ['analysis', 'stackRecommendation', 'complexity', 'technicalNotes']
        }
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AiResponse;
    }
    throw new Error("No response text generated");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback response in case of API error
    return {
      analysis: "Unable to connect to Neural Core. Manual analysis required.",
      stackRecommendation: ["Kotlin", "Compose"],
      complexity: "Medium",
      technicalNotes: "Please contact human operatives directly."
    };
  }
};
