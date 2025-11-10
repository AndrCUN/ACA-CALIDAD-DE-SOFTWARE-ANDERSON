import { GoogleGenAI } from "@google/genai";
import type { ChallengeQuestion } from '../types';

// Define model name for challenge generation.
const CHALLENGE_MODEL_NAME = 'gemini-2.5-flash';

const getAiClient = () => {
    // API key is automatically sourced from `process.env.API_KEY`
    return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

export const generateChallenge = async (topic: string): Promise<ChallengeQuestion[]> => {
    try {
        const ai = getAiClient();
        const prompt = `
        Crea un quiz de 3 preguntas en español sobre '${topic}'.
        Las preguntas deben ser una mezcla de los siguientes tipos: 'mcq', 'matching', y 'checkbox'.
        Devuelve un array JSON de objetos de pregunta. Cada objeto DEBE tener un campo "type" y los campos correspondientes a su tipo.

        1.  Para el tipo "mcq" (opción múltiple):
            - "type": "mcq"
            - "question": (string) La pregunta.
            - "options": (array de 4 strings) Las opciones.
            - "correctAnswerIndex": (number) El índice de la respuesta correcta en 'options'.

        2.  Para el tipo "matching" (emparejamiento):
            - "type": "matching"
            - "question": (string) La instrucción de emparejamiento.
            - "prompts": (array de 3 a 5 strings) La columna de elementos a emparejar.
            - "options": (array de strings) La columna de opciones. DEBE ser un shuffle de los prompts correctos.
            - "correctMatches": (array de numbers) Para cada 'prompt', el índice de su 'option' correspondiente. Por ejemplo, si prompts[0] coincide con options[2], entonces correctMatches[0] es 2.

        3.  Para el tipo "checkbox" (selección múltiple):
            - "type": "checkbox"
            - "question": (string) La pregunta.
            - "options": (array de 4 a 6 strings) Las opciones.
            - "correctAnswerIndices": (array de numbers) Un array con los índices de TODAS las respuestas correctas.

        Asegúrate de que el JSON esté bien formado y siga estrictamente esta estructura. No incluyas comentarios ni texto explicativo fuera del JSON.
        `;
        
        const response = await ai.models.generateContent({
            model: CHALLENGE_MODEL_NAME, // Use the specific, faster model for challenge generation
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            },
        });

        const jsonText = response.text.trim();
        const questions = JSON.parse(jsonText) as ChallengeQuestion[];
        
        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error("La IA devolvió un formato de datos no válido.");
        }

        questions.forEach(q => {
            if (!q.type || !q.question) throw new Error("Pregunta mal formada recibida de la IA.");
            if (q.type === 'mcq' && (typeof q.correctAnswerIndex !== 'number' || !q.options)) throw new Error("Pregunta MCQ mal formada.");
            if (q.type === 'matching' && (!q.prompts || !q.options || !q.correctMatches)) throw new Error("Pregunta de emparejamiento mal formada.");
            if (q.type === 'checkbox' && (!q.options || !q.correctAnswerIndices)) throw new Error("Pregunta de checkbox mal formada.");
        });

        return questions;

    } catch (error) {
        console.error("Error al generar el desafío:", error);
         if (error instanceof SyntaxError) {
             throw new Error("No se pudo generar el desafío. La IA devolvió un JSON inválido.");
        }
        throw new Error("No se pudo generar el desafío. La IA puede haber devuelto un formato inesperado.");
    }
};
