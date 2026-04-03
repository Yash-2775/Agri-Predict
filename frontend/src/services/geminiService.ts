// src/services/geminiService.ts

const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY || "";

export const getFarmingAdvice = async (
  userQuestion: string,
  language: string,
): Promise<string> => {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: `You are KisanBot, an expert Indian Agriculture AI assistant. 
Help Indian farmers with crop diseases, fertilizers, pest control, and farming tips.
Always respond in ${language} language.
Keep answers short and easy to understand.`,
            },
            {
              role: "user",
              content: userQuestion,
            },
          ],
          max_tokens: 400,
          temperature: 0.7,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq Error:", data);
      return `❌ Error: ${data?.error?.message || "Unknown error"}`;
    }

    return (
      data?.choices?.[0]?.message?.content || "Sorry, no response generated."
    );
  } catch (error: any) {
    console.error("Error:", error.message);
    return "⚠️ Network error. Please check your connection.";
  }
};

// ─── NEW: Disease Detection via Groq Vision ───────────────────────────────────

export interface DiseaseAnalysis {
  success: boolean;
  plant_type?: string;
  disease_name?: string;
  confidence?: number;
  severity?: string;
  symptoms?: string[];
  treatments?: string[];
  preventions?: string[];
  organic_solutions?: string[];
  estimated_recovery?: string;
  solution?: string;
  additional_notes?: string;
  error?: string;
}

// Convert local image URI to base64
const uriToBase64 = async (uri: string): Promise<string> => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const analyzeCropDisease = async (
  imageUri: string,
  language: string,
): Promise<DiseaseAnalysis> => {
  try {
    // Convert image to base64
    const base64Image = await uriToBase64(imageUri);

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-scout-17b-16e-instruct", // vision model
          messages: [
            {
              role: "system",
              content: `You are an expert plant pathologist and Indian agriculture specialist.
Analyze crop/plant images and identify diseases accurately.
Always respond ONLY with a valid JSON object — no extra text, no markdown.`,
            },
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${base64Image}`,
                  },
                },
                {
                  type: "text",
                  text: `Analyze this crop/plant image and respond in ${language} language.
Return ONLY a JSON object with this exact structure:
{
  "success": true,
  "plant_type": "name of the plant",
  "disease_name": "name of disease or Healthy",
  "confidence": 0.85,
  "severity": "Mild/Moderate/Severe or None if healthy",
  "symptoms": ["symptom 1", "symptom 2"],
  "treatments": ["treatment 1", "treatment 2", "treatment 3"],
  "preventions": ["prevention 1", "prevention 2"],
  "organic_solutions": ["organic solution 1", "organic solution 2"],
  "estimated_recovery": "time estimate",
  "solution": "one-line quick fix",
  "additional_notes": "any extra advice for Indian farmers"
}
If the image is not a plant, return:
{ "success": false, "error": "Not a plant image" }`,
                },
              ],
            },
          ],
          max_tokens: 800,
          temperature: 0.2, // low temp for consistent structured output
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq Vision Error:", data);
      return {
        success: false,
        error: data?.error?.message || "API error occurred",
      };
    }

    const rawText = data?.choices?.[0]?.message?.content || "";

    // Strip markdown fences if model wraps in ```json ... ```
    const cleaned = rawText
      .replace(/```json\n?/gi, "")
      .replace(/```\n?/gi, "")
      .trim();

    const parsed: DiseaseAnalysis = JSON.parse(cleaned);
    return parsed;
  } catch (error: any) {
    console.error("Disease detection error:", error.message);
    return {
      success: false,
      error: "⚠️ Could not analyze image. Please try a clearer photo.",
    };
  }
};
