import React, { useState } from 'react';
import { Compass, Wand2, Check, Info } from 'lucide-react';
import { SavedPrompt } from '../types';
import { buildScenarioABPrompt } from '../data/fashionPresets';
import { PromptOutputCard } from './PromptOutputCard';

interface ScenarioTabProps {
  onSavePrompt?: (prompt: Omit<SavedPrompt, 'id' | 'createdAt'>) => void;
  savedPrompts?: SavedPrompt[];
}

export const ScenarioTab: React.FC<ScenarioTabProps> = ({ onSavePrompt, savedPrompts = [] }) => {
  const [generatedPrompt, setGeneratedPrompt] = useState<string>(() => buildScenarioABPrompt());
  const [hasGenerated, setHasGenerated] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const prompt = buildScenarioABPrompt();
    setGeneratedPrompt(prompt);
    setHasGenerated(true);
    setSuccessMessage('Prompt de Cenário gerado!');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const isCurrentSaved = savedPrompts.some((p) => p.prompt === generatedPrompt);

  return (
    <div id="scenario-tab" className="space-y-6">
      {/* Subheader & Caption matching Streamlit */}
      <div className="rounded-2xl p-5 bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-900 border border-zinc-800">
        <h2 className="text-lg md:text-xl font-bold text-zinc-100 flex items-center gap-2">
          <span>🌍 3. Troca de Cenário por Referência</span>
        </h2>
        <p className="mt-1 text-xs md:text-sm text-zinc-400">
          Insira sua modelo em um novo ambiente mantendo rigorosamente a identidade.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Controls Column */}
        <div className="lg:col-span-5 space-y-5">
          <form
            id="form_cenario_ab"
            onSubmit={handleGenerate}
            className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-5"
          >
            {/* St.info box */}
            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs flex items-start gap-2.5 leading-relaxed">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-blue-200">📌 Imagem A:</span> Novo Cenário |{' '}
                <span className="font-semibold text-blue-200">Imagem B:</span> Foto da sua Modelo
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Coloca completamente a pessoa da Imagem B dentro do cenário da Imagem A, mantendo a iluminação, perspectiva e profundidade originais do local escolhido sem alterar o rosto ou biotipo.
            </p>

            {/* Button matching st.button("Gerar Prompt de Troca de Cenário", type="primary") */}
            <div>
              <button
                id="btn-gerar-cenario-ab"
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-sm shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Wand2 className="w-4 h-4" />
                <span>Gerar Prompt de Troca de Cenário</span>
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

          {/* Practical guide card */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 space-y-2">
            <div className="font-semibold text-zinc-200 flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              Regras do Fluxo Imagem A + B:
            </div>
            <ul className="space-y-1 list-disc list-inside text-zinc-400">
              <li>Imagem A define a composição, luz, enquadramento e perspectiva.</li>
              <li>Imagem B define o rosto, cabelo e biotipo da sua modelo oficial.</li>
              <li>Evita deriva de identidade e iluminação incompatível com o fundo.</li>
            </ul>
          </div>
        </div>

        {/* Prompt Output Column */}
        <div className="lg:col-span-7 space-y-4">
          {hasGenerated && (
            <PromptOutputCard
              id="output-cenario-ab"
              title="Prompt de Troca de Cenário (Imagem A + B)"
              badge="Troca de Ambiente 9:16"
              prompt={generatedPrompt}
              onSave={() => {
                if (onSavePrompt) {
                  onSavePrompt({
                    title: 'Troca de Cenário: Imagem A + B',
                    type: 'scenario',
                    prompt: generatedPrompt,
                    tags: ['Cenário', 'Imagem A + B', 'Identidade Preservada'],
                  });
                }
              }}
              isSaved={isCurrentSaved}
              tips={[
                'No Midjourney: utilize as URLs das duas imagens seguidas pelo prompt.',
                'No Fooocus: utilize a Imagem A como CP (ImagePrompt) e a Imagem B como FaceSwap.',
                'No Flux/ComfyUI: utilize IP-Adapter ou ControlNet para manter composição e identidade.',
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
};
