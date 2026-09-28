import 'dotenv/config';
import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();

// Middleware
app.use(express.json());

// CORS configuration for local development and production
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

// Helper: Safely initialize GoogleGenAI without leaking keys or throwing unhandled errors
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'MY_GEMINI_API_KEY') {
    throw new Error('GEMINI_API_KEY_NOT_CONFIGURED');
  }
  return new GoogleGenAI({ apiKey });
}

// Resilient content generation with model fallback
async function generateWithFallback(
  ai: GoogleGenAI,
  contents: string,
  systemInstruction?: string,
  temperature: number = 0.7
): Promise<string> {
  const models = ['gemini-flash-latest', 'gemini-3.1-pro-preview', 'gemini-3.8-flash', 'gemini-3.1-flash-lite'];
  let lastError: unknown = null;

  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction,
          temperature,
        },
      });
      if (response.text) {
        return response.text.trim();
      }
    } catch (err: unknown) {
      lastError = err;
      console.warn(`[ModaIA API] Modelo ${model} indisponível ou com alta demanda, tentando fallback...`);
    }
  }

  throw lastError || new Error('Não foi possível gerar resposta com nenhum dos modelos disponíveis.');
}

/**
 * GET /api/health
 * Healthcheck route - Confirms backend status and Gemini configuration status
 * (Never returns or exposes the API key)
 */
app.get('/api/health', (req: Request, res: Response) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const isKeyConfigured = Boolean(apiKey && apiKey.trim() !== '' && apiKey !== 'MY_GEMINI_API_KEY');

  res.status(200).json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'production',
    geminiConfigured: isKeyConfigured,
    service: 'ModaIA Studio Express API',
    timestamp: new Date().toISOString(),
  });
});

/**
 * POST /api/gemini/enhance-prompt
 * Uses Gemini (server-side only) to refine, optimize, and expand fashion prompts
 */
app.post('/api/gemini/enhance-prompt', async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, instruction, targetTool } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      res.status(400).json({ error: 'O campo "prompt" é obrigatório e deve ser um texto válido.' });
      return;
    }

    let ai: GoogleGenAI;
    try {
      ai = getGeminiClient();
    } catch {
      res.status(503).json({
        error: 'Chave GEMINI_API_KEY não configurada no servidor. Configure a variável no painel da Vercel ou no arquivo .env local.',
        geminiConfigured: false,
      });
      return;
    }

    const systemInstruction = `Você é um Engenheiro Sênior de Prompts especializado em Fotografia de Moda de E-commerce, Catálogo Têxtil e Vídeos UGC para Redes Sociais.
Sua missão é enriquecer o prompt do usuário, tornando-o hiper-realista, mantendo fidelidade absoluta ao produto têxtil, biotipo anatômico e regras de iluminação.
Mantenha o idioma original do prompt (geralmente inglês técnico para ferramentas como Midjourney, Flux, Google Flow, Kling, etc.).
Não adicione texto explicativo ou introduções; responda estritamente com o prompt aprimorado pronto para uso.`;

    const userPromptContent = `Aprimore e refine tecnicamente o seguinte prompt de moda para máxima qualidade visual no ${targetTool || 'Google Flow / Midjourney / Flux'}:

PROMPT ATUAL:
${prompt}

${instruction ? `INSTRUÇÃO DE MELHORIA: ${instruction}` : ''}`;

    const enhancedPrompt = await generateWithFallback(
      ai,
      userPromptContent,
      systemInstruction,
      0.7
    );

    res.status(200).json({
      success: true,
      enhancedPrompt,
      originalPrompt: prompt,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro interno ao processar prompt';
    console.error('[ModaIA API] Erro ao comunicar com Gemini:', message);

    res.status(500).json({
      error: 'Não foi possível processar a melhoria com a IA no momento. Tente novamente mais tarde.',
    });
  }
});

/**
 * POST /api/gemini/generate-prompt
 * Generates tailored fashion prompts from scratch based on custom user ideas
 */
app.post('/api/gemini/generate-prompt', async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, idea, targetEngine } = req.body;

    if (!idea || typeof idea !== 'string' || idea.trim() === '') {
      res.status(400).json({ error: 'O campo "idea" é obrigatório.' });
      return;
    }

    let ai: GoogleGenAI;
    try {
      ai = getGeminiClient();
    } catch {
      res.status(503).json({
        error: 'Chave GEMINI_API_KEY não configurada no servidor. Configure a variável no painel da Vercel ou no arquivo .env local.',
        geminiConfigured: false,
      });
      return;
    }

    const systemInstruction = `Você é um especialista em criar prompts de moda de alta conversão para e-commerce.
Crie um prompt profissional formatado para ${targetEngine || 'Google Flow / Midjourney / Flux'}, com proporção 9:16 vertical, detalhes anatômicos e regras de iluminação.
Retorne exclusivamente o prompt final.`;

    const userPrompt = `Categoria: ${category || 'Moda Geral'}
Ideia do usuário: ${idea}
Crie um prompt mestre de alta fidelidade visual.`;

    const generatedPrompt = await generateWithFallback(
      ai,
      userPrompt,
      systemInstruction,
      0.7
    );

    res.status(200).json({
      success: true,
      generatedPrompt,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro interno';
    console.error('[ModaIA API] Erro ao gerar prompt:', message);

    res.status(500).json({
      error: 'Falha ao gerar prompt personalizado com IA.',
    });
  }
});

export default app;
