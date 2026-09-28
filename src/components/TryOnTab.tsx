import React, { useState } from 'react';
import { Shirt, Scissors, Wand2, Check, Info, Layers, Sparkles } from 'lucide-react';
import { SavedPrompt } from '../types';
import { buildClothingIsolationPrompt, buildTryOnIsolatedABPrompt } from '../data/fashionPresets';
import { PromptOutputCard } from './PromptOutputCard';
import { SuggestionField } from './SuggestionField';

interface TryOnTabProps {
  onSavePrompt?: (prompt: Omit<SavedPrompt, 'id' | 'createdAt'>) => void;
  savedPrompts?: SavedPrompt[];
}

const SUGESTOES_PECA_ISOLAMENTO = [
  "Vestido midi envelope fluido em linho cru com decote V e amarração lateral",
  "Conjunto alfaiataria com colete cropped e calça pantalona wide leg",
  "Vestido canelado tubinho verde oliva com fenda lateral sutil",
  "Top cropped estilo corset estruturado em alfaiataria com zíper traseiro",
  "Camisa social oversized em tricoline 100% algodão branca",
  "Conjunto fitness sem costura lilás com top e legging canelada",
  "Biquíni cortininha canelado terracota com amarração fina e acabamento impecável",
  "Jaqueta jeans cropped oversized com lavagem vintage clara e botões de metal"
];

const SUGESTOES_FUNDO_PACKSHOT = [
  "Fundo branco puro estúdio com iluminação comercial difusa plana e sem sombras duras",
  "Mesa de madeira rústica clara com luz natural suave de janela lateral",
  "Fundo cinza neutro 18% para fidelidade máxima de cores de e-commerce",
  "Superfície de mármore claro fosco com sombras suaves e elegantes",
  "Fundo bege areia minimalista contemporâneo com drapeado suave",
  "Tecido de linho cru como base natural orgânica com textura sutil"
];

const SUGESTOES_CAIMENTO_TRYON = [
  "Caimento impecável ajustado à cintura sem deformar o tecido e com drapeado natural",
  "Modelagem ampla e fluida com caimento solto e drapeado orgânico leve",
  "Ajuste justo e compressivo realçando as curvas com elasticidade natural",
  "Caimento estruturado de alfaiataria com ombros e gola definidos",
  "Efeito oversized despojado com ombros caídos e barra solta na medida",
  "Caimento esvoaçante e leve com movimento suave ao redor das pernas"
];

const SUGESTOES_PRESERVACAO_COSTURAS = [
  "Preservar costuras originais, pespontos e botões idênticos à peça de referência",
  "Manter tom de cor exato, estampas sem distorções e textura original do tecido",
  "Preservar acabamento canelado ribana e elasticidade nas bordas",
  "Fidelidade total aos aviamentos metálicos, zíperes e etiquetas aparentes",
  "Preservar transparência sutil das mangas e tecido esvoaçante da saia",
  "Manter fenda lateral na altura exata e decote fiel sem fechar ou abrir"
];

export const TryOnTab: React.FC<TryOnTabProps> = ({ onSavePrompt, savedPrompts = [] }) => {
  const [activeSubTab, setActiveSubTab] = useState<'passo1' | 'passo2'>('passo1');

  // Passo 1 States
  const [pecaDesc, setPecaDesc] = useState<string>(SUGESTOES_PECA_ISOLAMENTO[0]);
  const [fundoPackshot, setFundoPackshot] = useState<string>(SUGESTOES_FUNDO_PACKSHOT[0]);

  // Passo 2 States
  const [caimentoSilhueta, setCaimentoSilhueta] = useState<string>(SUGESTOES_CAIMENTO_TRYON[0]);
  const [preservacaoCosturas, setPreservacaoCosturas] = useState<string>(SUGESTOES_PRESERVACAO_COSTURAS[0]);

  const [promptPasso1, setPromptPasso1] = useState<string>(() =>
    buildClothingIsolationPrompt(SUGESTOES_PECA_ISOLAMENTO[0], SUGESTOES_FUNDO_PACKSHOT[0])
  );
  const [promptPasso2, setPromptPasso2] = useState<string>(() =>
    buildTryOnIsolatedABPrompt(SUGESTOES_CAIMENTO_TRYON[0], SUGESTOES_PRESERVACAO_COSTURAS[0])
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const activePrompt = activeSubTab === 'passo1' ? promptPasso1 : promptPasso2;

  const handleGerarPasso1 = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const p = buildClothingIsolationPrompt(pecaDesc, fundoPackshot);
    setPromptPasso1(p);
    setSuccessMessage('Prompt de Isolamento gerado com sucesso!');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleGerarPasso2 = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const p = buildTryOnIsolatedABPrompt(caimentoSilhueta, preservacaoCosturas);
    setPromptPasso2(p);
    setSuccessMessage('Prompt de Provador Virtual gerado com sucesso!');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const isCurrentSaved = savedPrompts.some((p) => p.prompt === activePrompt);

  return (
    <div id="tryon-tab" className="space-y-6">
      {/* Subheader & Caption */}
      <div className="rounded-2xl p-5 bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-900 border border-zinc-800">
        <h2 className="text-lg md:text-xl font-bold text-zinc-100 flex items-center gap-2">
          <span>👕 2. Provador Virtual & Isolamento</span>
        </h2>
        <p className="mt-1 text-xs md:text-sm text-zinc-400">
          Isole a peça de roupas de terceiros em flat-lay e transfira para o seu modelo base mantendo 100% de consistência. Digite o que quiser nos campos ou utilize as sugestões rápidas.
        </p>
      </div>

      {/* Sub-tabs */}
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
            <span>Passo 1: Isolar Peça (Flat-Lay)</span>
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
            <form
              id="form_isolamento"
              onSubmit={handleGerarPasso1}
              className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-5"
            >
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-amber-400" />
                  Preparação da Peça (Packshot Flat-Lay)
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Gere uma imagem limpa da roupa sem modelo ou manequim a partir de fotos de terceiros, com costuras e proporções fiéis.
                </p>
              </div>

              {/* Campo aberto: Descrição da Peça */}
              <SuggestionField
                id="input-peca-desc"
                label="Descrição / Tipo da Peça de Roupa:"
                icon={<Shirt className="w-3.5 h-3.5 text-amber-400" />}
                value={pecaDesc}
                onChange={setPecaDesc}
                placeholder="Ex: Vestido midi envelope fluido em linho cru com decote V..."
                suggestions={SUGESTOES_PECA_ISOLAMENTO}
                multiline={true}
                rows={2}
                accentColor="amber"
                helperText="Campo aberto: descreva o modelo, cor, corte ou selecione uma das opções abaixo."
              />

              {/* Campo aberto: Fundo e Superfície */}
              <SuggestionField
                id="input-fundo-packshot"
                label="Superfície e Fundo do Flat-Lay:"
                icon={<Layers className="w-3.5 h-3.5 text-amber-400" />}
                value={fundoPackshot}
                onChange={setFundoPackshot}
                placeholder="Ex: Fundo branco puro estúdio com iluminação comercial difusa..."
                suggestions={SUGESTOES_FUNDO_PACKSHOT}
                multiline={true}
                rows={2}
                accentColor="amber"
                helperText="Defina o tipo de fundo (estúdio branco, madeira, mármore) ou selecione uma sugestão."
              />

              {/* Submit Button */}
              <div>
                <button
                  id="btn-gerar-isolamento"
                  type="submit"
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
            </form>
          ) : (
            <form
              id="form_transferencia"
              onSubmit={handleGerarPasso2}
              className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-5"
            >
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                  <Shirt className="w-4 h-4 text-amber-400" />
                  Transferência da Peça Isolada (A + B)
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Veste a peça do Passo 1 na sua modelo oficial, congelando rigorosamente o ambiente e a iluminação.
                </p>
              </div>

              {/* Info box */}
              <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs flex items-start gap-2.5 leading-relaxed">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-blue-200">📌 Imagem A:</span> Modelo base (Cenário travado) |{' '}
                  <span className="font-semibold text-blue-200">Imagem B:</span> Peça isolada (Passo 1)
                </div>
              </div>

              {/* Campo aberto: Caimento & Silhueta */}
              <SuggestionField
                id="input-caimento-tryon"
                label="Caimento & Silhueta Desejada no Corpo:"
                icon={<Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                value={caimentoSilhueta}
                onChange={setCaimentoSilhueta}
                placeholder="Ex: Caimento impecável ajustado à cintura sem deformar o tecido..."
                suggestions={SUGESTOES_CAIMENTO_TRYON}
                multiline={true}
                rows={2}
                accentColor="amber"
                helperText="Especifique se o caimento deve ser justo, oversized, fluido ou selecione uma opção."
              />

              {/* Campo aberto: Preservação de Costuras */}
              <SuggestionField
                id="input-preservacao-costuras"
                label="Fidelidade de Costuras, Detalhes e Aviamentos:"
                icon={<Layers className="w-3.5 h-3.5 text-amber-400" />}
                value={preservacaoCosturas}
                onChange={setPreservacaoCosturas}
                placeholder="Ex: Preservar costuras originais, pespontos e botões idênticos..."
                suggestions={SUGESTOES_PRESERVACAO_COSTURAS}
                multiline={true}
                rows={2}
                accentColor="amber"
                helperText="Detalhes críticos como costuras, fendas, botões e transparência."
              />

              {/* Submit Button */}
              <div>
                <button
                  id="btn-gerar-transferencia"
                  type="submit"
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
            </form>
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
