import React, { useState } from 'react';
import { Sparkles, User, Palette, Sliders, Wand2, RefreshCw, ChevronDown, ChevronUp, Info, Check, Globe } from 'lucide-react';
import { ModelBaseParams, SavedPrompt } from '../types';
import { PromptOutputCard } from './PromptOutputCard';

interface ModelBaseTabProps {
  onSavePrompt?: (prompt: Omit<SavedPrompt, 'id' | 'createdAt'>) => void;
  savedPrompts?: SavedPrompt[];
}

const OPCOES_CABELO_F = [
  "Long wavy dark brown hair",
  "Morena Cabelo Preto Liso",
  "Ruivo Acobreado Natural",
  "Corte Bob Curto Elegante",
  "Tranças Longas Estilosas"
];

const OPCOES_FISICO_F = [
  "Warm brown eyes, natural gentle smile, soft tanned Brazilian skin tone",
  "Padrão Bronzeada Natural",
  "Morena Iluminada Carioca",
  "Beleza Natural com Sardas",
  "Biotipo Curvilíneo Fit",
  "Beleza Negra Brasileira Radiante",
  "Morena Clara com Traços Suaves"
];

const OPCOES_CABELO_M = [
  "Short dark brown hair, neat trimmed beard",
  "Cabelo Curto Cacheado e Barba Desenhada",
  "Cabelo Crestado Moderno e Limpo"
];

const OPCOES_FISICO_M = [
  "Warm brown eyes, natural masculine features, athletic fit build, Brazilian skin tone",
  "Moreno Atlético Definido",
  "Homem Estilo Urbano Moderno"
];

const OPCOES_CENARIO = [
  "🏠 Quarto Residencial (Estética clássica brasileira com espelho)",
  "🏬 Provador Boutique (Iluminação nítida de loja)",
  "⚪ Estúdio / Fundo Neutro (Fundo liso minimalista sem distrações)",
  "☕ Cafeteria Urbana (Lifestyle urbano aconchegante)"
];

function generateModelPrompt(
  genero: string,
  idade: number,
  corCabelo: string,
  detalhes: string,
  tipoCenario: string
): string {
  const cenarioEscolhido = tipoCenario.includes(" - ") ? tipoCenario.split(" - ")[1] : tipoCenario;

  if (genero.includes("Feminino")) {
    return `AGE
[${idade}+ ONLY — INSERT AGE]

HAIR COLOR
[${corCabelo}]

OTHER CHARACTERISTICS
[${detalhes}]

Create an ultra-photorealistic vertical 9:16 portrait of an attractive adult Brazilian woman with a feminine,
curvy, fit and naturally voluptuous body. She must clearly look like a real Brazilian woman rather than a fashion
render or AI-generated model. Respect exactly the age, hair color and additional characteristics provided above.
She is standing naturally inside the following environment: ${cenarioEscolhido}.
She is casually taking a smartphone mirror selfie with an orange iPhone 17 (or holding it in a natural pose if background is neutral). The phone must look authentic, correctly proportioned and physically believable in her hand.
This image will later be used as the reference character for realistic fashion videos, so her identity, facial features,
hairstyle, body proportions, skin tone and overall appearance must be clearly defined and visually consistent.
Give her an attractive Brazilian appearance with realistic anatomy, naturally feminine curves, a defined waist,
proportional hips and legs, and a flattering silhouette. Her body should look naturally fit and curvy, not
exaggerated, artificial, surgically impossible or cartoonish.
Her pose should already resemble the opening frame of a casual TikTok fashion video: confident, subtly
seductive and feminine but still completely believable. She may slightly shift her weight onto one leg, gently angle
one hip, keep the other leg relaxed, subtly arch her posture and hold her free arm naturally beside her body or
lightly near her waist. The pose must look spontaneous rather than professionally choreographed.
Dress her in a simple random fashionable outfit appropriate for an adult woman, such as a fitted casual dress,
matching top-and-skirt set, fitted top with shorts, or stylish athleisure set. The clothing is temporary and should
not visually obscure her overall body proportions, since it will later be replaced with different fashion products.

Environment details: ${cenarioEscolhido}. 
Keep the lighting natural and cohesive with the environment. Avoid exaggerated cinematic studio lighting or artificial glow.

Photographic look: realistic smartphone photography captured with an iPhone 17-class camera, natural
computational HDR, realistic skin texture, subtle pores, tiny imperfections, realistic hair strands, believable fabric
texture, accurate reflections, natural exposure, moderate smartphone sharpening, realistic dynamic range and
subtle sensor processing. Keep the image clean and high quality.

The mirror reflection or framing must be physically accurate. Her body, hands, fingers, smartphone, clothing, room geometry
and reflection must all be coherent.

Her expression should be relaxed, confident and subtly flirtatious, with natural eyes and mouth. Avoid
exaggerated influencer expressions, duck face or an artificial fashion-model stare.

C R I T I C A L  R E A L I S M  R U L E S
photorealistic adult human real skin texture anatomically correct body
anatomically correct hands and fingers natural facial asymmetry
accurate physics and environment lighting realistic body proportions believable gravity natural posture

A V O I D
AI-looking face plastic skin doll-like appearance excessive beauty retouching
unrealistic hourglass anatomy exaggerated breasts or hips distorted hands extra fingers duplicated limbs
warped phone incorrect mirror reflection duplicated objects floating objects impossible clothing
glossy CGI appearance 3D render illustration anime excessive bokeh text captions logos
watermarks interface elements

I M A G E M  R E S U L T A D O  F I N A L
Aspect ratio: 9:16 vertical. Final result: an extremely realistic, natural, attractive adult Brazilian woman
casually posing in the specified environment, visually indistinguishable from an authentic photo taken by a real person.`;
  } else {
    return `Create an ultra-photorealistic full-body-style vertical 9:16 portrait of a Brazilian male influencer/model in a natural, neutral environment (${cenarioEscolhido}).
Character details:
Gender: Male
Age: [${idade} years old]
Hair and Beard: [${corCabelo}]
Physical characteristics: [${detalhes}]
The person should look like a real Brazilian male content creator, with natural masculine facial features, realistic skin texture, small imperfections, believable proportions, and authentic everyday appearance. Avoid an overly perfect, plastic, cinematic, fantasy, or AI-generated look.
Framing and composition: Show the man from approximately the knees up, not just from the waist up or chest up. The framing must clearly show most of his body so he feels like a real fashion/lifestyle influencer. Keep the full upper body, shoulders, torso, waist, hips, and legs visible down to around the knees. Do not crop too tightly on the face or torso.
The environment should be realistic, simple, and adaptable, matching the selected setting: ${cenarioEscolhido}. The background must remain visually secondary to the model.
Use natural daylight or soft indoor lighting. The image should look like a real smartphone photo or a high-quality casual social media photo, not a professional studio photoshoot. Keep the pose relaxed, natural, masculine, and believable, as if he is casually creating content for Instagram or TikTok.

Important requirements:
- Hyper-realistic photography
- Natural Brazilian male appearance
- Realistic and neutral environment: ${cenarioEscolhido}
- Framing from the knees up
- Authentic masculine facial features
- Realistic skin texture, natural expression, realistic masculine body proportions
- Natural posture and body language
- No exaggerated beauty filters, no cinematic color grading, no artificial smooth skin, no doll-like face, no exaggerated muscles unless specified
- No extra fingers, distorted hands, warped face, bad anatomy, strange eyes, text, logos, watermarks, TikTok UI, or social media interface elements

R E S U L T A D O  F I N A L:
Aspect ratio: 9:16 vertical. An extremely realistic and natural adult Brazilian male influencer casually posing in the specified environment, visually indistinguishable from an authentic photo taken with a real camera.`;
  }
}

export const ModelBaseTab: React.FC<ModelBaseTabProps> = ({ onSavePrompt, savedPrompts = [] }) => {
  const [generoModelo, setGeneroModelo] = useState<string>("👩 Mulher Brasileira (Feminino)");
  const [idade, setIdade] = useState<number>(25);

  const isFeminino = generoModelo.includes("Feminino");

  const [corCabeloF, setCorCabeloF] = useState<string>(OPCOES_CABELO_F[0]);
  const [detalhesF, setDetalhesF] = useState<string>(OPCOES_FISICO_F[0]);

  const [corCabeloM, setCorCabeloM] = useState<string>(OPCOES_CABELO_M[0]);
  const [detalhesM, setDetalhesM] = useState<string>(OPCOES_FISICO_M[0]);

  const [tipoCenario, setTipoCenario] = useState<string>(OPCOES_CENARIO[0]);
  const [isExpanderOpen, setIsExpanderOpen] = useState<boolean>(false);

  const activeCabelo = isFeminino ? corCabeloF : corCabeloM;
  const activeDetalhes = isFeminino ? detalhesF : detalhesM;

  const [generatedPrompt, setGeneratedPrompt] = useState<string>(() =>
    generateModelPrompt(
      "👩 Mulher Brasileira (Feminino)",
      25,
      OPCOES_CABELO_F[0],
      OPCOES_FISICO_F[0],
      OPCOES_CENARIO[0]
    )
  );
  const [hasGenerated, setHasGenerated] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const prompt = generateModelPrompt(generoModelo, idade, activeCabelo, activeDetalhes, tipoCenario);
    setGeneratedPrompt(prompt);
    setHasGenerated(true);
    setSuccessMessage("Prompt gerado com sucesso!");
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const isCurrentSaved = savedPrompts.some((p) => p.prompt === generatedPrompt);

  return (
    <div id="model-base-tab" className="space-y-6">
      {/* Subheader & Caption matching Streamlit */}
      <div className="rounded-2xl p-5 bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-900 border border-zinc-800">
        <h2 className="text-lg md:text-xl font-bold text-zinc-100 flex items-center gap-2">
          <span>👤 1. Criação de Modelo Base (Casting)</span>
        </h2>
        <p className="mt-1 text-xs md:text-sm text-zinc-400">
          Defina a identidade visual e o ambiente para gerar sua modelo âncora.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Controls Column */}
        <div className="lg:col-span-5 space-y-5">
          <form
            id="form_modelo_base"
            onSubmit={handleGenerate}
            className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-5"
          >
            {/* 2 Columns: Gênero e Idade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="select-genero" className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-rose-400" />
                  Gênero do Modelo:
                </label>
                <select
                  id="select-genero"
                  value={generoModelo}
                  onChange={(e) => {
                    const val = e.target.value;
                    setGeneroModelo(val);
                    const newIsFem = val.includes("Feminino");
                    const p = generateModelPrompt(
                      val,
                      idade,
                      newIsFem ? corCabeloF : corCabeloM,
                      newIsFem ? detalhesF : detalhesM,
                      tipoCenario
                    );
                    setGeneratedPrompt(p);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs md:text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                >
                  <option value="👩 Mulher Brasileira (Feminino)">👩 Mulher Brasileira (Feminino)</option>
                  <option value="👨 Homem Brasileiro (Masculino)">👨 Homem Brasileiro (Masculino)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="input-idade" className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-rose-400" />
                  Idade
                </label>
                <input
                  id="input-idade"
                  type="number"
                  min={18}
                  max={60}
                  value={idade}
                  onChange={(e) => setIdade(Math.max(18, Math.min(60, Number(e.target.value) || 18)))}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs md:text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                />
              </div>
            </div>

            {/* Cabelo e Estilo */}
            {isFeminino ? (
              <div className="space-y-1.5">
                <label htmlFor="select-cabelo-f" className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-rose-400" />
                  Cor e Estilo do Cabelo:
                </label>
                <select
                  id="select-cabelo-f"
                  value={corCabeloF}
                  onChange={(e) => setCorCabeloF(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs md:text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                >
                  {OPCOES_CABELO_F.map((op, idx) => (
                    <option key={idx} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-1.5">
                <label htmlFor="select-cabelo-m" className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-blue-400" />
                  Cabelo / Barba:
                </label>
                <select
                  id="select-cabelo-m"
                  value={corCabeloM}
                  onChange={(e) => setCorCabeloM(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs md:text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                >
                  {OPCOES_CABELO_M.map((op, idx) => (
                    <option key={idx} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Características Físicas / Biotipo */}
            {isFeminino ? (
              <div className="space-y-1.5">
                <label htmlFor="select-detalhes-f" className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-rose-400" />
                  Características Físicas / Biotipo:
                </label>
                <select
                  id="select-detalhes-f"
                  value={detalhesF}
                  onChange={(e) => setDetalhesF(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs md:text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                >
                  {OPCOES_FISICO_F.map((op, idx) => (
                    <option key={idx} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-1.5">
                <label htmlFor="select-detalhes-m" className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-blue-400" />
                  Características Físicas:
                </label>
                <select
                  id="select-detalhes-m"
                  value={detalhesM}
                  onChange={(e) => setDetalhesM(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs md:text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                >
                  {OPCOES_FISICO_M.map((op, idx) => (
                    <option key={idx} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Cenário de Fundo */}
            <div className="space-y-1.5">
              <label htmlFor="select-cenario" className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                Cenário de Fundo:
              </label>
              <select
                id="select-cenario"
                value={tipoCenario}
                onChange={(e) => setTipoCenario(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs md:text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              >
                {OPCOES_CENARIO.map((op, idx) => (
                  <option key={idx} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button matching st.form_submit_button("Gerar Prompt de Casting", type="primary") */}
            <div className="pt-2">
              <button
                id="btn-gerar-casting"
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold text-sm shadow-lg shadow-rose-950/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Wand2 className="w-4 h-4" />
                <span>Gerar Prompt de Casting</span>
              </button>
            </div>

            {/* Success Alert if generated */}
            {successMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 transition-all">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}
          </form>

          {/* Expander: 💡 Dicas Estratégicas para Alta Performance (Clique para ver) */}
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/60 transition-all">
            <button
              type="button"
              onClick={() => setIsExpanderOpen(!isExpanderOpen)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-zinc-800/40 transition-colors"
            >
              <span className="text-xs font-semibold text-zinc-200 flex items-center gap-2">
                💡 Dicas Estratégicas para Alta Performance (Clique para ver)
              </span>
              {isExpanderOpen ? (
                <ChevronUp className="w-4 h-4 text-zinc-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              )}
            </button>
            {isExpanderOpen && (
              <div className="px-4 pb-4 pt-1 text-xs text-zinc-400 space-y-2 border-t border-zinc-800/60">
                <ul className="space-y-1.5 list-disc list-inside leading-relaxed text-zinc-300">
                  <li>Gere 4 a 8 variações na sua IA de preferência (Midjourney v6, Flux.1 Pro ou Fooocus).</li>
                  <li>Escolha UMA imagem única com rosto nítido e proporção corporal equilibrada para ser a sua modelo oficial.</li>
                  <li>O cenário escolhido servirá de fundo consistente para as trocas de roupas futuras na Aba 2!</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Prompt Output Column */}
        <div className="lg:col-span-7 space-y-4">
          {hasGenerated && (
            <PromptOutputCard
              id="output-modelo-base"
              title="Prompt de Casting (Modelo Base)"
              badge={isFeminino ? 'Feminino 9:16' : 'Masculino 9:16'}
              prompt={generatedPrompt}
              onSave={() => {
                if (onSavePrompt) {
                  onSavePrompt({
                    title: `Casting: ${generoModelo.includes('Feminino') ? 'Mulher' : 'Homem'} ${idade}a`,
                    type: 'model',
                    prompt: generatedPrompt,
                    tags: ['Casting', 'Modelo Base', '9:16'],
                  });
                }
              }}
              isSaved={isCurrentSaved}
              tips={[
                'Gere 4 a 8 variações na sua IA de preferência (Midjourney v6, Flux.1 Pro ou Fooocus).',
                'Escolha UMA imagem única com rosto nítido e proporção corporal equilibrada para ser a sua modelo oficial.',
                'O cenário escolhido servirá de fundo consistente para as trocas de roupas futuras na Aba 2!',
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
};
