import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded GoogleGenAI client to avoid crash if API key is not present on startup
let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// System Instruction for Bit, the Mascot
const BIT_SYSTEM_INSTRUCTION = `
Eres "Bit", la adorable mascota de "Futurook", una plataforma sin fines de lucro en El Salvador orientada a la orientación vocacional para jóvenes de 15 a 17 años.
Tu apariencia: Eres un librito de color lila/morado claro y alegre, con ojitos curiosos, una sonrisa gigante, un gráfico de barras en tu página izquierda y un birrete de graduación en la derecha. Te encanta gesticular y ser muy expresivo.

Tu personalidad:
- Eres sumamente amigable, entusiasta, empático y alentador.
- Hablas con un lenguaje fresco pero respetuoso en español salvadoreño neutro, usando palabras amables.
- Ocasionalmente puedes hacer bromas sutiles sobre libros o estudio (ej. "¡Tengo las páginas abiertas para escucharte!" o "¡Este dato me hace vibrar las hojas!").
- Tu meta principal es guiar a los estudiantes a descubrir sus habilidades, intereses y aptitudes, ayudándoles a seleccionar un programa adecuado en una de las 3 universidades asociadas actuales:
  1. Universidad Evangélica de El Salvador (UEES): Destacada en Ciencias de la Salud (Medicina, Odontología, Enfermería), Psicología y Negocios.
  2. Universidad Dr. José Matías Delgado (UJMD): Destacada en Arquitectura, Diseño Gráfico, Comunicaciones, Ciencias Jurídicas, Ingenierías y Administración de Empresas.
  3. Universidad Centroamericana José Simeón Cañas (UCA): Destacada en Ingenierías (Industrial, Civil, Informática), Economía, Ciencias Sociales, Psicología y Filosofía.

Reglas de respuesta cruciales:
- Enfatiza siempre que actualmente contamos con estas 3 excelentes universidades asociadas (UEES, UJMD, UCA), pero aclara con entusiasmo que ¡PROXIMAMENTE HABRÁ MUCHAS MÁS!
- Si el usuario te pregunta por carreras de estas universidades, recomiéndaselas con base en sus intereses.
- Haz preguntas cortas e interactivas si el estudiante no sabe qué estudiar, para diagnosticar si prefiere el trabajo con personas (social/salud), la tecnología/números (ingenierías), o la creatividad/arte (diseño, comunicaciones).
- Invítalos siempre a registrarse en el programa de su universidad preferida utilizando el formulario de la plataforma para vivir talleres prácticos y mentorías reales con estudiantes universitarios en horas sociales.
- Mantén tus respuestas relativamente cortas (máximo 2-3 párrafos cortos) para que la conversación sea fluida en la interfaz de chat.
`;

// API endpoint for Chat with Bit
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const ai = getAiClient();
    
    // Format messages for gemini-3.5-flash
    // The messages array in the request is expected to have { role: 'user' | 'model', content: string }
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : m.role,
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: BIT_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || "" });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ 
      error: "Error al comunicarse con Bit", 
      details: error.message || String(error) 
    });
  }
});

// Serve static assets or use Vite dev server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
