import React, { useState } from 'react';
import { Camera, Wand2, Check, Film, Lock, ShieldCheck } from 'lucide-react';
import { SavedPrompt } from '../types';
import { buildStrictPosePrompt } from '../data/fashionPresets';
import { PromptOutputCard } from './PromptOutputCard';

interface UgcPosesTabProps {
  onSavePrompt?: (prompt: Omit<SavedPrompt, 'id' | 'createdAt'>) => void;
  savedPrompts?: SavedPrompt[];
}

export const LISTA_POSES_UGC_REAIS: Record<string, string> = {
  "1. Puxando a Barra Lateral (Elasticidade)": "One hand gently pulling the side hem of the garment outward to show stretch, fabric weight, and how the material drapes naturally over the hips/torso.",
  "2. Toque no Tecido do Peito/Ombro (Textura)": "One hand delicately pinching the fabric on the chest or shoulder area to highlight the material texture, knit pattern, and quality of the garment.",
  "3. Ajustando a Manga ou Punho": "Mid-action pose with one hand adjusting the cuff or sleeve length, showing the sleeve fit and arm mobility.",
  "4. Mãos nos Bolsos Frontais": "Both hands casually tucked into the front pockets, spreading the fabric slightly to emphasize the waistline, front cut, and relaxed fit.",
  "5. Giro de 45 Graus de Lado": "Standing at a slight 45-degree angle, turning the upper body toward the mirror to clearly display the side silhouette, length, and back fit.",
  "6. Puxando Levemente a Gola": "One hand gently pulling the collar or neckline downward/forward to show collarbone fit, neck ribbing, and structural structure.",
  "7. Mão Espalmada na Cintura": "One hand pressed flat against the waistline or belt area, defining the waist shape and showing how the garment tapers.",
  "8. Conferindo o Comprimento (Inclinando à frente)": "Slight forward lean of the upper body, checking the length, hemline fall, and transparency or stretch of the fabric in the mirror.",
  "9. Braço Cruzado com Mão no Cotovelo": "One arm crossed across the torso supporting the opposite elbow, naturally pulling the front fabric taut to display body fit.",
  "10. Alisando a Região Frontal": "Both hands smoothing down the front fabric from chest to waist to eliminate creases and showcase the clean fit and overall silhouette of the piece.",
  "11. Pose Dinâmica de Transição de Passo": "One foot stepping forward as if walking past the mirror, capturing realistic fabric movement, folds, and how the lower garment flows.",
  "12. Mão Passando pelo Cabelo (Cava/Lateral)": "Lifting one arm up with hand touching the hair, raising the elbow to showcase the armhole fit, side seams, and torso hugging shape.",
  "13. Puxando a Parte Traseira (Costas)": "One hand reaching back to lightly tug the back fabric, demonstrating the stretch, drape, and shoulder comfort across the back.",
  "14. Encostado(a) de Lado no Batente/Parede": "Leaning sideways against the room structure, letting the clothing relax naturally against gravity to display its loose or fitted structure.",
  "15. Segurando a Lateral da Saia/Calça": "Fingers pinching the sides of the trousers or skirt to slightly pull it outward, demonstrating fabric flare, width, and fluidity.",
  "16. Olhar Direto para a Peça no Espelho": "Head tilted slightly downward, gazing directly at the clothing reflection in the mirror to inspect print placement or texture details.",
  "17. Mão no Bolso Traseiro / Lateral": "One hand tucked loosely into a back or side pocket, shifting weight to one hip to display how the pants/shorts hug the body curves.",
  "18. Ajustando o Cinto ou Cós": "One hand interacting with the waistband or belt loops, drawing natural attention to the waist fit and product hardware.",
  "19. Braços Soltos ao Lado do Corpo": "Standing straight with arms relaxed naturally at the sides, displaying the true, unaltered vertical drop and length of the outfit.",
  "20. Sorriso de Aprovação (Review UGC)": "Subtle expression of approval looking at the mirror reflection, casual thumbs-up near the waist to simulate an honest review video frame."
};

export const UgcPosesTab: React.FC<UgcPosesTabProps> = ({ onSavePrompt, savedPrompts = [] }) => {
  const poseKeys = Object.keys(LISTA_POSES_UGC_REAIS);
  const [poseSelecionada, setPoseSelecionada] = useState<string>(poseKeys[0]);

  const descricaoPose = LISTA_POSES_UGC_REAIS[poseSelecionada];

  const [generatedPrompt, setGeneratedPrompt] = useState<string>(() =>
    buildStrictPosePrompt(LISTA_POSES_UGC_REAIS[poseKeys[0]])
  );
  const [hasGenerated, setHasGenerated] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const prompt = buildStrictPosePrompt(descricaoPose);
    setGeneratedPrompt(prompt);
    setHasGenerated(true);
    setSuccessMessage('Prompt de Pose gerado!');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const isCurrentSaved = savedPrompts.some((p) => p.prompt === generatedPrompt);

  return (
    <div id="ugc-poses-tab" className="space-y-6">
      {/* Subheader & Caption matching Streamlit */}
      <div className="rounded-2xl p-5 bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-900 border border-zinc-800">
        <h2 className="text-lg md:text-xl font-bold text-zinc-100 flex items-center gap-2">
          <span>📸 4. Poses UGC & Caimento</span>
        </h2>
        <p className="mt-1 text-xs md:text-sm text-zinc-400">
          Demonstre caimento, elasticidade e toque do tecido com poses realistas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Controls Column */}
        <div className="lg:col-span-5 space-y-5">
          <form
            id="form_poses_ugc"
            onSubmit={handleGenerate}
            className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-5"
          >
            {/* Selectbox matching st.selectbox("Selecione a Ação de Caimento:", list(lista_poses_ugc_reais.keys())) */}
            <div className="space-y-1.5">
              <label htmlFor="select-pose-ugc" className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-indigo-400" />
                Selecione a Ação de Caimento:
              </label>
              <select
                id="select-pose-ugc"
                value={poseSelecionada}
                onChange={(e) => {
                  const val = e.target.value;
                  setPoseSelecionada(val);
                  setGeneratedPrompt(buildStrictPosePrompt(LISTA_POSES_UGC_REAIS[val]));
                }}
                className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs md:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              >
                {poseKeys.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>

            {/* Instruction description box */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                Ação Física da Pose:
              </span>
              <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs leading-relaxed font-mono">
                {descricaoPose}
              </div>
            </div>

            {/* Button matching st.button("Gerar Prompt de Pose UGC", type="primary") */}
            <div>
              <button
                id="btn-gerar-pose-ugc"
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm shadow-lg shadow-indigo-950/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Wand2 className="w-4 h-4" />
                <span>Gerar Prompt de Pose UGC</span>
              </button>
            </div>

            {/* Success Alert matching Streamlit */}
            {successMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 transition-all">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}
          </form>

          {/* Critical Lock Rules Card */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2 text-xs text-zinc-400">
            <div className="font-semibold text-zinc-200 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              Preservação Rigorosa de Identidade & Ambiente:
            </div>
            <ul className="space-y-1 list-disc list-inside text-zinc-400">
              <li>Rosto, cabelo e biotipo 100% inalterados.</li>
              <li>Mesma peça de roupa, cor, estampa e textura da referência.</li>
              <li>Mesmo quarto, espelho e iluminação de fundo.</li>
              <li>Apenas a postura física varia para demonstrar elasticidade e drapeamento.</li>
            </ul>
          </div>
        </div>

        {/* Prompt Output Column */}
        <div className="lg:col-span-7 space-y-4">
          {hasGenerated && (
            <PromptOutputCard
              id="output-pose-estrito"
              title={`Prompt de Pose UGC: ${poseSelecionada}`}
              badge="Caimento & Vestibilidade"
              prompt={generatedPrompt}
              onSave={() => {
                if (onSavePrompt) {
                  onSavePrompt({
                    title: `Pose UGC: ${poseSelecionada}`,
                    type: 'pose',
                    prompt: generatedPrompt,
                    tags: ['Pose UGC', 'Caimento', 'Bloqueio Estrito'],
                  });
                }
              }}
              isSaved={isCurrentSaved}
              tips={[
                'No Midjourney: use como Image-to-Image com a foto original da modelo.',
                'No Fooocus/Flux: use prompt com a imagem original em FaceSwap/ControlNet.',
                'Permite criar carrosséis com o mesmo produto em vários ângulos realistas.',
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
};
