import React, { useState } from 'react';
import { Video, Wand2, Check, ChevronDown, ChevronUp, Clock, Film } from 'lucide-react';
import { SavedPrompt } from '../types';
import { buildMasterVideoUgcPrompt } from '../data/fashionPresets';
import { PromptOutputCard } from './PromptOutputCard';

interface VideoTabProps {
  onSavePrompt?: (prompt: Omit<SavedPrompt, 'id' | 'createdAt'>) => void;
  savedPrompts?: SavedPrompt[];
}

export const VideoTab: React.FC<VideoTabProps> = ({ onSavePrompt, savedPrompts = [] }) => {
  const [generatedPrompt, setGeneratedPrompt] = useState<string>(() => buildMasterVideoUgcPrompt());
  const [hasGenerated, setHasGenerated] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isExpanderOpen, setIsExpanderOpen] = useState<boolean>(false);

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const prompt = buildMasterVideoUgcPrompt();
    setGeneratedPrompt(prompt);
    setHasGenerated(true);
    setSuccessMessage('Master Prompt de Vídeo gerado!');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const isCurrentSaved = savedPrompts.some((p) => p.prompt === generatedPrompt);

  return (
    <div id="video-tab" className="space-y-6">
      {/* Subheader & Caption matching Streamlit */}
      <div className="rounded-2xl p-5 bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-900 border border-zinc-800">
        <h2 className="text-lg md:text-xl font-bold text-zinc-100 flex items-center gap-2">
          <span>🎬 5. Vídeos UGC Master (8 Segundos)</span>
        </h2>
        <p className="mt-1 text-xs md:text-sm text-zinc-400">
          Vídeo vertical estilo TikTok Shop / Reels com foco total no produto e caimento.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Controls Column */}
        <div className="lg:col-span-5 space-y-5">
          <form
            id="form_video_ugc"
            onSubmit={handleGenerate}
            className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                <Clock className="w-4 h-4 text-purple-400" />
                Estrutura Dinâmica em 4 Cortes (8 Segundos):
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <span className="font-bold text-purple-400">SHOT 1 (0–2s):</span>
                  <span className="text-zinc-300 ml-1.5">Plano médio-cheio mostrando caimento, silhueta e comprimento.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <span className="font-bold text-purple-400">SHOT 2 (2–4s):</span>
                  <span className="text-zinc-300 ml-1.5">Close na textura do tecido, costuras, gola, alças ou zíper.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <span className="font-bold text-purple-400">SHOT 3 (4–6s):</span>
                  <span className="text-zinc-300 ml-1.5">Giro natural de 45° mostrando a lateral e caimento traseiro.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <span className="font-bold text-purple-400">SHOT 4 (6–8s):</span>
                  <span className="text-zinc-300 ml-1.5">Movimento sutil para visualização fluida do tecido e finalização.</span>
                </div>
              </div>
            </div>

            {/* Submit Button matching st.button("Gerar Master Prompt de Vídeo UGC", type="primary") */}
            <div>
              <button
                id="btn-gerar-video-master"
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold text-sm shadow-lg shadow-purple-950/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Wand2 className="w-4 h-4" />
                <span>Gerar Master Prompt de Vídeo UGC</span>
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

          {/* Expander: 💬 Ganhos (Hooks) de Alta Conversão Sugeridos */}
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/60 transition-all">
            <button
              type="button"
              onClick={() => setIsExpanderOpen(!isExpanderOpen)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-zinc-800/40 transition-colors"
            >
              <span className="text-xs font-semibold text-zinc-200 flex items-center gap-2">
                💬 Ganhos (Hooks) de Alta Conversão Sugeridos
              </span>
              {isExpanderOpen ? (
                <ChevronUp className="w-4 h-4 text-zinc-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              )}
            </button>
            {isExpanderOpen && (
              <div className="px-4 pb-4 pt-1 text-xs text-zinc-300 space-y-2 border-t border-zinc-800/60">
                <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/70 italic">
                  “Meninas, olha o caimento desse conjunto no corpo... Não marca nada!”
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/70 italic">
                  “POV: O look que você comprou vestiu infinitamente melhor do que no site.”
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/70 italic">
                  “Chegou reposição do nosso best-seller! 8 segundos para vocês verem cada costura.”
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Prompt Output Column */}
        <div className="lg:col-span-7 space-y-4">
          {hasGenerated && (
            <PromptOutputCard
              id="output-video-ugc"
              title="Master Prompt de Vídeo UGC (8s - TikTok / Reels)"
              badge="8 Segundos Showcase"
              prompt={generatedPrompt}
              onSave={() => {
                if (onSavePrompt) {
                  onSavePrompt({
                    title: 'Vídeo UGC Master 8s (TikTok / Reels)',
                    type: 'video',
                    prompt: generatedPrompt,
                    tags: ['Vídeo', 'UGC', '8s', 'TikTok Shop'],
                  });
                }
              }}
              isSaved={isCurrentSaved}
              tips={[
                'Submeta a foto da modelo vestindo o produto (gerada na Aba 2 ou 4) no modo Image-to-Video.',
                'Compatível com Kling AI, Luma Dream Machine, Google Veo 2 e Runway Gen-3.',
                'O prompt garante um vídeo silencioso e limpo para você inserir narração e legendas nativas do TikTok.',
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
};
