import React, { useState } from 'react';
import { Shirt, Scissors, Wand2, Check, Info } from 'lucide-react';
import { SavedPrompt } from '../types';
import { buildClothingIsolationPrompt, buildTryOnIsolatedABPrompt } from '../data/fashionPresets';
import { PromptOutputCard } from './PromptOutputCard';

interface TryOnTabProps {
  onSavePrompt?: (prompt: Omit<SavedPrompt, 'id' | 'createdAt'>) => void;
  savedPrompts?: SavedPrompt[];
}

export const TryOnTab: React.FC<TryOnTabProps> = ({ onSavePrompt, savedPrompts = [] }) => {
  const [activeSubTab, setActiveSubTab] = useState<'passo1' | 'passo2'>('passo1');

  const [promptPasso1, setPromptPasso1] = useState<string>(() => buildClothingIsolationPrompt());
  const [promptPasso2, setPromptPasso2] = useState<string>(() => buildTryOnIsolatedABPrompt());
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const activePrompt = activeSubTab === 'passo1' ? promptPasso1 : promptPasso2;

  const handleGerarPasso1 = () => {
    const p = buildClothingIsolationPrompt();
    setPromptPasso1(p);
    setSuccessMessage('Prompt de Isolamento gerado!');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleGerarPasso2 = () => {
    const p = buildTryOnIsolatedABPrompt();
    setPromptPasso2(p);
    setSuccessMessage('Prompt de Provador gerado!');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const isCurrentSaved = savedPrompts.some((p) => p.prompt === activePrompt);

  return (
    <div id="tryon-tab" className="space-y-6">
      {/* Subheader & Caption matching Streamlit */}
      <div className="rounded-2xl p-5 bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-900 border border-zinc-800">
        <h2 className="text-lg md:text-xl font-bold text-zinc-100 flex items-center gap-2">
          <span>👕 2. Provador Virtual & Isolamento</span>
        </h2>
        <p className="mt-1 text-xs md:text-sm text-zinc-400">
          Isole a peça de roupas de terceiros e transfira para o seu modelo base.
        </p>
      </div>

      {/* Sub-tabs matching st.tabs(["Passo 1: Isolar Peça", "Passo 2: Vestir na Modelo (A + B)"]) */}
      <div className="border-b border-zinc-800">
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setActiveSubTab('passo1')}
            className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeSubTab === 'passo1'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <Scissors className="w-4 h-4 text-amber-400" />
            <span>Passo 1: Isolar Peça</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('passo2')}
            className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeSubTab === 'passo2'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <Shirt className="w-4 h-4 text-amber-400" />
            <span>Passo 2: Vestir na Modelo (A + B)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-5">
          {activeSubTab === 'passo1' ? (
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-5">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-zinc-100">
                  Preparação da Peça (Packshot Flat-Lay)
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Gere uma imagem limpa da roupa sem modelo ou manequim a partir de fotos de terceiros, com costuras e proporções fiéis.
                </p>
              </div>

              {/* Button matching st.button("Gerar Prompt de Isolamento de Roupa", type="primary") */}
              <div>
                <button
                  id="btn-gerar-isolamento"
                  type="button"
                  onClick={handleGerarPasso1}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-semibold text-sm shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Gerar Prompt de Isolamento de Roupa</span>
                </button>
              </div>

              {successMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 transition-all">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-5">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-zinc-100">
                  Transferência da Peça Isolada
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Veste a peça do Passo 1 na sua modelo oficial, congelando rigorosamente o ambiente e a iluminação.
                </p>
              </div>

              {/* St.info box */}
              <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs flex items-start gap-2.5 leading-relaxed">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-blue-200">📌 Imagem A:</span> Modelo base (Cenário travado) |{' '}
                  <span className="font-semibold text-blue-200">Imagem B:</span> Peça isolada (Passo 1)
                </div>
              </div>

              {/* Button matching st.button("Gerar Prompt de Transferência (A + B)", type="primary") */}
              <div>
                <button
                  id="btn-gerar-transferencia"
                  type="button"
                  onClick={handleGerarPasso2}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-semibold text-sm shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Gerar Prompt de Transferência (A + B)</span>
                </button>
              </div>

              {successMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 transition-all">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}
            </div>
          )}

          {/* Quick info card */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 space-y-1.5">
            <div className="font-semibold text-zinc-200 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400" />
              Como aplicar no seu gerador:
            </div>
            <p>
              {activeSubTab === 'passo1'
                ? 'Insira a foto da roupa em outra pessoa no gerador e aplique o prompt de isolamento para obter o produto em fundo neutro.'
                : 'Faça upload da Imagem A (sua modelo oficial) e Imagem B (a roupa limpa). O prompt garante que o cenário e o rosto fiquem 100% idênticos.'}
            </p>
          </div>
        </div>

        {/* Prompt Output Column */}
        <div className="lg:col-span-7 space-y-4">
          <PromptOutputCard
            id={activeSubTab === 'passo1' ? 'output-isolamento' : 'output-transferencia-ab'}
            title={
              activeSubTab === 'passo1'
                ? 'Prompt de Isolamento de Roupa (Flat-lay Packshot)'
                : 'Prompt de Transferência de Roupa (Imagem A + B)'
            }
            badge={activeSubTab === 'passo1' ? 'Passo 1: Isolamento' : 'Passo 2: Transferência A+B'}
            prompt={activePrompt}
            onSave={() => {
              if (onSavePrompt) {
                onSavePrompt({
                  title:
                    activeSubTab === 'passo1'
                      ? 'Isolamento de Roupa (Flat-lay)'
                      : 'Transferência de Roupa (Imagem A + B)',
                  type: 'tryon',
                  prompt: activePrompt,
                  tags: ['Provador', activeSubTab === 'passo1' ? 'Passo 1' : 'Passo 2'],
                });
              }
            }}
            isSaved={isCurrentSaved}
            tips={
              activeSubTab === 'passo1'
                ? [
                    'Elimina pessoas anteriores, mãos e manequins.',
                    'Gera um arquivo limpo pronto para alimentar a transferência do Passo 2.',
                  ]
                : [
                    'Preserva 100% da iluminação, geometria do quarto e traços faciais da Imagem A.',
                    'Apenas a roupa da Imagem B é ajustada ao corpo da modelo.',
                  ]
            }
          />
        </div>
      </div>
    </div>
  );
};
