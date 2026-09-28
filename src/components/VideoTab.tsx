import React, { useState } from 'react';
import { Video, Wand2, Check, ChevronDown, ChevronUp, Clock, Film, Sparkles, MessageSquare, Cpu } from 'lucide-react';
import { SavedPrompt } from '../types';
import { buildMasterVideoUgcPrompt } from '../data/fashionPresets';
import { PromptOutputCard } from './PromptOutputCard';
import { SuggestionField } from './SuggestionField';

interface VideoTabProps {
  onSavePrompt?: (prompt: Omit<SavedPrompt, 'id' | 'createdAt'>) => void;
  savedPrompts?: SavedPrompt[];
}

const SUGESTOES_LOOK_VIDEO = [
  "Vestido midi canelado verde oliva com fenda lateral sutil e caimento perfeito",
  "Conjunto alfaiataria em linho cru com colete cropped e calça pantalona wide leg",
  "Vestido longo fluido estampado floral em viscose premium com alças finas",
  "Top cropped em poliamida compressiva e calça flare canelada preta",
  "Camisa oversized em algodão nobre com shorts de alfaiataria cintura alta",
  "Conjunto fitness sem costura lilás com leggings de alta compressão",
  "Vestido envelope transpassado em crepe duna terracota com amarração",
  "Biquíni cortininha texturizado com saída de praia longa em gaze de algodão"
];

const SUGESTOES_ACAO_VIDEO = [
  "Giro suave de 45° mostrando frente e costas com puxadinha sutil na barra para exibir elasticidade",
  "Caminhar natural em direção à câmera sorrindo e alisando a cintura para mostrar modelagem",
  "Toque delicado no tecido perto do ombro e conferindo o caimento no espelho",
  "Aproximação em plano detalhe revelando costuras, gola e textura encorpada da malha",
  "Movimento fluido de caminhar com o tecido esvoaçando com a gravidade natural",
  "Mãos nos bolsos com leve balanço lateral demonstrando o conforto e caimento solto",
  "Ajuste na gola e no punho com olhar natural de aprovação no reflexo do espelho"
];

const SUGESTOES_HOOKS_VIDEO = [
  "Meninas, olha o caimento desse conjunto no corpo... Não marca absolutamente nada!",
  "POV: Você comprou a roupa na internet e ela vestiu infinitamente melhor do que no site.",
  "Chegou reposição do nosso best-seller! 8 segundos para vocês verem cada costura.",
  "Aquele look que você veste e parece que foi feito sob medida pro seu corpo.",
  "Testando a elasticidade e o caimento da peça real: nota 10 de 10!",
  "Dica de ouro: o tecido não amassa, é zero transparente e tem toque aveludado.",
  "Se eu soubesse que vestia tão bem, teria comprado todas as cores disponíveis!"
];

const SUGESTOES_ENGINE_VIDEO = [
  "Google Veo 2 (Física de tecido ultra-realista e luz natural de ambiente)",
  "Kling 1.5 / 2.0 (Fluidez de movimentos humanos e estética TikTok 9:16)",
  "Runway Gen-3 Alpha (Controle cinematográfico de câmera e textura de pele)",
  "Luma Dream Machine (Giros suaves e consistência espacial 360°)",
  "Minimax / Hailuo Video (Expressões faciais vivas e gestos naturais)",
  "Pika 2.0 (Transições rápidas e micro-movimentos de tecido)"
];

export const VideoTab: React.FC<VideoTabProps> = ({ onSavePrompt, savedPrompts = [] }) => {
  const [lookRoupa, setLookRoupa] = useState<string>(SUGESTOES_LOOK_VIDEO[0]);
  const [acaoMovimento, setAcaoMovimento] = useState<string>(SUGESTOES_ACAO_VIDEO[0]);
  const [hookTexto, setHookTexto] = useState<string>(SUGESTOES_HOOKS_VIDEO[0]);
  const [ferramentaIa, setFerramentaIa] = useState<string>(SUGESTOES_ENGINE_VIDEO[0]);

  const [generatedPrompt, setGeneratedPrompt] = useState<string>(() =>
    buildMasterVideoUgcPrompt(SUGESTOES_LOOK_VIDEO[0], SUGESTOES_ACAO_VIDEO[0], SUGESTOES_HOOKS_VIDEO[0], SUGESTOES_ENGINE_VIDEO[0])
  );
  const [hasGenerated, setHasGenerated] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isExpanderOpen, setIsExpanderOpen] = useState<boolean>(false);

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const prompt = buildMasterVideoUgcPrompt(lookRoupa, acaoMovimento, hookTexto, ferramentaIa);
    setGeneratedPrompt(prompt);
    setHasGenerated(true);
    setSuccessMessage('Master Prompt de Vídeo UGC gerado com sucesso!');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const isCurrentSaved = savedPrompts.some((p) => p.prompt === generatedPrompt);

  return (
    <div id="video-tab" className="space-y-6">
      {/* Subheader & Caption */}
      <div className="rounded-2xl p-5 bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-900 border border-zinc-800">
        <h2 className="text-lg md:text-xl font-bold text-zinc-100 flex items-center gap-2">
          <span>🎬 5. Vídeos UGC Master (8 Segundos)</span>
        </h2>
        <p className="mt-1 text-xs md:text-sm text-zinc-400">
          Vídeo vertical estilo TikTok Shop / Reels com foco total no produto e caimento. Todos os campos são abertos para você escrever livremente ou clicar nas sugestões abaixo.
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
            {/* Campo aberto: Look / Peça */}
            <SuggestionField
              id="input-look-video"
              label="Look / Peça em Destaque no Vídeo:"
              icon={<Sparkles className="w-3.5 h-3.5 text-purple-400" />}
              value={lookRoupa}
              onChange={setLookRoupa}
              placeholder="Ex: Vestido midi canelado verde oliva com fenda lateral..."
              suggestions={SUGESTOES_LOOK_VIDEO}
              multiline={true}
              rows={2}
              accentColor="purple"
              helperText="Campo aberto: digite o look que será demonstrado no vídeo ou escolha uma das 8 sugestões."
            />

            {/* Campo aberto: Ação Principal */}
            <SuggestionField
              id="input-acao-video"
              label="Ação Principal de Demonstração (8s):"
              icon={<Film className="w-3.5 h-3.5 text-purple-400" />}
              value={acaoMovimento}
              onChange={setAcaoMovimento}
              placeholder="Ex: Giro suave de 45° mostrando frente e costas com puxadinha sutil na barra..."
              suggestions={SUGESTOES_ACAO_VIDEO}
              multiline={true}
              rows={2}
              accentColor="purple"
              helperText="Movimento que a criadora fará para mostrar o caimento e acabamentos."
            />

            {/* Campo aberto: Hook de Conversão */}
            <SuggestionField
              id="input-hook-video"
              label="Gancho / Hook de Conversão (Texto ou Narração):"
              icon={<MessageSquare className="w-3.5 h-3.5 text-purple-400" />}
              value={hookTexto}
              onChange={setHookTexto}
              placeholder="Ex: Meninas, olha o caimento desse conjunto no corpo..."
              suggestions={SUGESTOES_HOOKS_VIDEO}
              multiline={true}
              rows={2}
              accentColor="purple"
              helperText="Frase persuasiva para reter o público nos 3 primeiros segundos."
            />

            {/* Campo aberto: Ferramenta IA Recomendada */}
            <SuggestionField
              id="input-engine-video"
              label="Motor de IA de Vídeo Recomendado:"
              icon={<Cpu className="w-3.5 h-3.5 text-purple-400" />}
              value={ferramentaIa}
              onChange={setFerramentaIa}
              placeholder="Ex: Google Veo 2 / Kling 1.5..."
              suggestions={SUGESTOES_ENGINE_VIDEO}
              accentColor="purple"
              helperText="Plataforma de IA que você usará para animar a foto de referência."
            />

            {/* Estrutura dos 4 cortes */}
            <div className="space-y-3 pt-1">
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

            {/* Submit Button */}
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

            {/* Success Alert */}
            {successMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 transition-all">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}
          </form>

          {/* Expander com dicas adicionais */}
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/60 transition-all">
            <button
              type="button"
              onClick={() => setIsExpanderOpen(!isExpanderOpen)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-zinc-800/40 transition-colors"
            >
              <span className="text-xs font-semibold text-zinc-200 flex items-center gap-2">
                💬 Dicas para Máxima Retenção no TikTok & Reels
              </span>
              {isExpanderOpen ? (
                <ChevronUp className="w-4 h-4 text-zinc-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              )}
            </button>
            {isExpanderOpen && (
              <div className="px-4 pb-4 pt-1 text-xs text-zinc-300 space-y-2 border-t border-zinc-800/60">
                <p className="text-zinc-400">
                  Os vídeos com maior taxa de conversão em e-commerce de moda duram exatamente entre 7 e 9 segundos em loop contínuo.
                </p>
                <p className="text-zinc-400">
                  Mostre a mão interagindo com o tecido nos primeiros 3 segundos para quebrar o ceticismo de compras online.
                </p>
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
                    tags: ['Vídeo UGC', '8s Showcase', 'TikTok Shop'],
                  });
                }
              }}
              isSaved={isCurrentSaved}
              tips={[
                'Insira este prompt como Prompt de Vídeo (Image-to-Video) na sua ferramenta preferida.',
                'Utilize a foto gerada na Aba 2 (Provador) ou Aba 4 (Poses) como imagem de entrada (First Frame).',
                'O prompt trava o produto como sujeito principal, evitando distorções na roupa.',
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
};
