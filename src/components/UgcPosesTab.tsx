import React, { useState } from 'react';
import { Camera, Wand2, Check, Film, Lock, ShieldCheck, Sparkles, Smile } from 'lucide-react';
import { SavedPrompt } from '../types';
import { buildStrictPosePrompt } from '../data/fashionPresets';
import { PromptOutputCard } from './PromptOutputCard';
import { SuggestionField, SuggestionItem } from './SuggestionField';

interface UgcPosesTabProps {
  onSavePrompt?: (prompt: Omit<SavedPrompt, 'id' | 'createdAt'>) => void;
  savedPrompts?: SavedPrompt[];
}

export const LISTA_POSES_UGC_SUGESTOES: SuggestionItem[] = [
  {
    label: "1. Puxando a Barra Lateral (Elasticidade)",
    value: "One hand gently pulling the side hem of the garment outward to show stretch, fabric weight, and how the material drapes naturally over the hips/torso."
  },
  {
    label: "2. Toque no Tecido do Peito/Ombro (Textura)",
    value: "One hand delicately pinching the fabric on the chest or shoulder area to highlight the material texture, knit pattern, and quality of the garment."
  },
  {
    label: "3. Ajustando a Manga ou Punho",
    value: "Mid-action pose with one hand adjusting the cuff or sleeve length, showing the sleeve fit and arm mobility."
  },
  {
    label: "4. Mãos nos Bolsos Frontais",
    value: "Both hands casually tucked into the front pockets, spreading the fabric slightly to emphasize the waistline, front cut, and relaxed fit."
  },
  {
    label: "5. Giro de 45 Graus de Lado",
    value: "Standing at a slight 45-degree angle, turning the upper body toward the mirror to clearly display the side silhouette, length, and back fit."
  },
  {
    label: "6. Puxando Levemente a Gola",
    value: "One hand gently pulling the collar or neckline downward/forward to show collarbone fit, neck ribbing, and structural structure."
  },
  {
    label: "7. Mão Espalmada na Cintura",
    value: "One hand pressed flat against the waistline or belt area, defining the waist shape and showing how the garment tapers."
  },
  {
    label: "8. Conferindo o Comprimento (Inclinando à frente)",
    value: "Slight forward lean of the upper body, checking the length, hemline fall, and transparency or stretch of the fabric in the mirror."
  },
  {
    label: "9. Braço Cruzado com Mão no Cotovelo",
    value: "One arm crossed across the torso supporting the opposite elbow, naturally pulling the front fabric taut to display body fit."
  },
  {
    label: "10. Alisando a Região Frontal",
    value: "Both hands smoothing down the front fabric from chest to waist to eliminate creases and showcase the clean fit and overall silhouette of the piece."
  },
  {
    label: "11. Transição de Passo (Movimento)",
    value: "One foot stepping forward as if walking past the mirror, capturing realistic fabric movement, folds, and how the lower garment flows."
  },
  {
    label: "12. Mão no Cabelo com Cotovelo Elevado",
    value: "Lifting one arm up with hand touching the hair, raising the elbow to showcase the armhole fit, side seams, and torso hugging shape."
  }
];

const SUGESTOES_FOCO_PRODUTO = [
  "Elasticidade e retorno da malha ao puxar a lateral da peça sem deformar",
  "Textura encorpada do tecido e trama visível sob a iluminação do espelho",
  "Caimento impecável na cintura sem marcar e sem sobras de tecido",
  "Acabamento da gola, costuras duplas reforçadas e corte do decote",
  "Movimento fluido da barra e drapeado natural orgânico ao movimentar",
  "Comprimento exato nas pernas e modelagem traseira valorizando a silhueta",
  "Bolsos funcionais e qualidade dos botões/zíper frontal",
  "Transparência zero e densidade da fibra com toque macio aveludado"
];

const SUGESTOES_EXPRESSAO_UGC = [
  "Sorriso espontâneo de aprovação com expressão genuína de review positivo",
  "Expressão confiante e descontraída de provador de boutique para TikTok",
  "Olhar focado conferindo o caimento no espelho com leve sorriso natural",
  "Atitude casual e autêntica de provador sem pose engessada de estúdio",
  "Expressão amigável e calorosa falando diretamente com o público em vídeo",
  "Sorriso sutil e postura empoderada demonstrando extrema segurança com o look"
];

export const UgcPosesTab: React.FC<UgcPosesTabProps> = ({ onSavePrompt, savedPrompts = [] }) => {
  const [poseDescricao, setPoseDescricao] = useState<string>(LISTA_POSES_UGC_SUGESTOES[0].value);
  const [focoDemonstracao, setFocoDemonstracao] = useState<string>(SUGESTOES_FOCO_PRODUTO[0]);
  const [expressaoUgc, setExpressaoUgc] = useState<string>(SUGESTOES_EXPRESSAO_UGC[0]);

  const [generatedPrompt, setGeneratedPrompt] = useState<string>(() =>
    buildStrictPosePrompt(LISTA_POSES_UGC_SUGESTOES[0].value, SUGESTOES_FOCO_PRODUTO[0], SUGESTOES_EXPRESSAO_UGC[0])
  );
  const [hasGenerated, setHasGenerated] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const prompt = buildStrictPosePrompt(poseDescricao, focoDemonstracao, expressaoUgc);
    setGeneratedPrompt(prompt);
    setHasGenerated(true);
    setSuccessMessage('Prompt de Pose UGC gerado com sucesso!');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const isCurrentSaved = savedPrompts.some((p) => p.prompt === generatedPrompt);

  return (
    <div id="ugc-poses-tab" className="space-y-6">
      {/* Subheader & Caption */}
      <div className="rounded-2xl p-5 bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-900 border border-zinc-800">
        <h2 className="text-lg md:text-xl font-bold text-zinc-100 flex items-center gap-2">
          <span>📸 4. Poses UGC & Caimento</span>
        </h2>
        <p className="mt-1 text-xs md:text-sm text-zinc-400">
          Demonstre caimento, elasticidade e toque do tecido com poses realistas. Você é livre para escrever a ação física que desejar ou usar as sugestões abaixo.
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
            {/* Campo aberto: Ação Física da Pose */}
            <SuggestionField
              id="input-pose-ugc"
              label="Ação Física da Pose / Movimento com a Roupa:"
              icon={<Film className="w-3.5 h-3.5 text-indigo-400" />}
              value={poseDescricao}
              onChange={setPoseDescricao}
              placeholder="Ex: One hand gently pulling the side hem of the garment outward..."
              suggestions={LISTA_POSES_UGC_SUGESTOES}
              multiline={true}
              rows={3}
              accentColor="indigo"
              helperText="Escreva livremente a pose exata que a modelo fará com o tecido ou clique numa das 12 sugestões abaixo."
            />

            {/* Campo aberto: Foco de Demonstração */}
            <SuggestionField
              id="input-foco-produto"
              label="Foco da Demonstração do Produto (Detalhe a Enfatizar):"
              icon={<Sparkles className="w-3.5 h-3.5 text-indigo-400" />}
              value={focoDemonstracao}
              onChange={setFocoDemonstracao}
              placeholder="Ex: Elasticidade e retorno da malha ao puxar a lateral da peça..."
              suggestions={SUGESTOES_FOCO_PRODUTO}
              multiline={true}
              rows={2}
              accentColor="indigo"
              helperText="Qual aspecto da peça deve saltar aos olhos (elasticidade, textura, gola, caimento na cintura)."
            />

            {/* Campo aberto: Expressão Facial & Vibe */}
            <SuggestionField
              id="input-expressao-ugc"
              label="Expressão Facial & Vibe UGC da Modelo:"
              icon={<Smile className="w-3.5 h-3.5 text-indigo-400" />}
              value={expressaoUgc}
              onChange={setExpressaoUgc}
              placeholder="Ex: Sorriso espontâneo de aprovação com expressão genuína..."
              suggestions={SUGESTOES_EXPRESSAO_UGC}
              accentColor="indigo"
              helperText="Expressão humana e autêntica de provador sem parecer forçada."
            />

            {/* Submit Button */}
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

            {/* Success Alert */}
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
              <li>O rosto, corpo e cabelo são travados rigorosamente na modelo base.</li>
              <li>O quarto/ambiente e espelho permanecem 100% idênticos.</li>
              <li>Apenas a postura física interage de forma realista com a roupa.</li>
            </ul>
          </div>
        </div>

        {/* Prompt Output Column */}
        <div className="lg:col-span-7 space-y-4">
          {hasGenerated && (
            <PromptOutputCard
              id="output-pose-ugc"
              title="Prompt de Pose UGC de Caimento Realista"
              badge="Controle Físico 9:16"
              prompt={generatedPrompt}
              onSave={() => {
                if (onSavePrompt) {
                  onSavePrompt({
                    title: 'Pose UGC: Caimento e Elasticidade',
                    type: 'pose',
                    prompt: generatedPrompt,
                    tags: ['Pose UGC', 'Elasticidade', 'Caimento Real'],
                  });
                }
              }}
              isSaved={isCurrentSaved}
              tips={[
                'Use com ControlNet OpenPose ou Inpainting para guiar a mão segurando a roupa.',
                'Perfeito para gerar carrosséis de produtos no Instagram com diferentes ângulos.',
                'Destaque costuras, forro e elasticidade para diminuir devoluções no e-commerce.',
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
};
