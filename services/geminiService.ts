import { GoogleGenAI } from "@google/genai";
import { FactCheckResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Tu es "Tounes Fact Check AI", un assistant expert en vérification des informations et rumeurs, spécialisé sur la Tunisie.
Ta mission est d'analyser un texte ou un lien donné pour vérifier sa véracité.

Tu dois retourner un objet JSON (et UNIQUEMENT du JSON) suivant strictement ce format :
{
  "resume": "Résumé clair et concis de l'information analysée (en Français).",
  "verdict": "VRAI" | "FAUX" | "TROMPEUR" | "NON VÉRIFIABLE",
  "explication_tunisien": "Une explication courte en dialecte tunisien (Derja) ÉCRITE EN LETTRES ARABES (Arabic Script), simple et compréhensible.",
  "sources": [
    {"nom": "Nom de la source", "lien": "URL de la source"}
  ],
  "ui_hints": {
    "couleur_verdict": "vert" (si VRAI) | "rouge" (si FAUX ou TROMPEUR) | "orange" (si NON VÉRIFIABLE),
    "icon": "✅" (VRAI) | "❌" (FAUX) | "⚠️" (TROMPEUR) | "❓" (NON VÉRIFIABLE)
  },
  "is_tunisia_related": boolean (true si le sujet concerne la Tunisie, false sinon)
}

Règles importantes :
1. DÉTECTION DU CONTEXTE : Analyse si l'information concerne la Tunisie (politique, société, sport, économie, buzz local).
2. Si ce n'est PAS Tunisien : Mets "is_tunisia_related": false. Traite quand même la demande, mais commence ton explication en Derja par préciser que ça ne concerne pas la Tunisie (ex: "Hédhi la7keya saret fil Marroc mouch fi Tounes...").
3. EXPLICATION : DOIT ETRE EN CARACTÈRES ARABES (Tunisian Arabic script). Pas de latin/chat.
4. UTILISE GOOGLE SEARCH : Vérifie toujours les faits récents.
`;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const checkFactWithGemini = async (query: string): Promise<FactCheckResult> => {
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Vérifie cette information ou ce lien : ${query}`,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text;
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Le modèle n'a pas retourné un JSON valide.");
      }

      const result: FactCheckResult = JSON.parse(jsonMatch[0]);
      return result;

    } catch (error: any) {
      console.error(`Gemini API Error (Attempt ${attempt + 1}/${maxRetries}):`, error);

      const isOverloaded = error.message?.includes('429') || error.message?.includes('503') || error.status === 429 || error.status === 503;

      if (isOverloaded && attempt < maxRetries - 1) {
        const waitTime = 2000 * (attempt + 1); // Attente exponentielle : 2s, 4s, 6s
        await delay(waitTime);
        attempt++;
      } else {
        throw new Error("Service saturé. Veuillez réessayer dans quelques secondes.");
      }
    }
  }

  throw new Error("Impossible de vérifier l'information pour le moment.");
};