import React from 'react';
import { X, Sparkles, User, Shirt, Video, ArrowRight, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

interface WorkflowGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkflowGuideModal: React.FC<WorkflowGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-lg">
              👗
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-100">Como funciona o Fluxo Completo da ModaIA</h3>
              <p className="text-xs text-zinc-400">Do zero ao anúncio pronto de alta conversão sem gastar cotas de API</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Step Timeline */}
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 font-bold">
              1
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-zinc-100">Aba 1: Crie sua Modelo Matriz (Casting & Cenários)</h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold">
                  Midjourney / Flux
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Use o Prompt da Aba 1 para gerar a foto âncora. Você pode escolher entre casa brasileira, provador moderno
                de boutique, estúdio clean minimalista, cafeteria aconchegante ou um cenário customizado. Essa foto estabelece
                o rosto, tom de pele e biotipo corporal da sua marca.
              </p>
              <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Você só precisa gerar essa modelo UMA ÚNICA VEZ para toda a sua coleção!</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold">
              2
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-zinc-100">Aba 2: Provador por Referência (Imagem A + B)</h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                  Transferência A + B
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Forneça as duas imagens no seu gerador: <strong>Imagem A</strong> (sua modelo base que terá a identidade corporal e facial preservada)
                e <strong>Imagem B</strong> (a foto da roupa nova — a mulher da Imagem B é descartada, mantendo apenas o vestuário).
                Cole o prompt mestre para uma transferência anatômica perfeita.
              </p>
              <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Resulta em catálogos profissionais sem precisar de contratação de modelos ou sessões fotográficas.</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">
              3
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-zinc-100">Aba 3: Troca de Cenário (Imagem A + B)</h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                  Harmonização de Ambiente
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Coloque a sua modelo (Imagem B) dentro de qualquer novo cenário de referência (Imagem A),
                preservando 100% dos traços e harmonizando a iluminação e perspectiva do novo local.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 font-bold">
              4
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-zinc-100">Aba 4: Poses UGC & Caimento</h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                  Caimento & Vestibilidade
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Demonstre como a roupa veste no corpo (puxando a barra, toque no tecido, ajuste de punho, mãos nos bolsos) com 20 poses realistas,
                mantendo rosto, cabelo, roupa e cenário 100% congelados.
              </p>
              <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Compatível com Midjourney, Flux.1, Fooocus e ideal como frame âncora para vídeos.</span>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 font-bold">
              5
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-zinc-100">Aba 5: Vídeos UGC (Master Prompt de 8s)</h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold">
                  TikTok Shop & Reels Showcase
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Transforme a foto final em um vídeo de 8 segundos dividido em 4 tomadas dinâmicas (visão geral, close no tecido/costuras, giro de 45° e movimento de caimento), 100% mudo e pronto para receber narração e legendas.
              </p>
              <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Compatível com Kling AI, Luma Dream Machine, Google Veo 2 e Runway Gen-3.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Advantage Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-zinc-950 border border-emerald-800/40 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-emerald-300">Por que prompts estratégicos superam APIs caras?</h5>
            <p className="text-xs text-zinc-300">
              Ferramentas de API de try-on cobram por cada segundo ou imagem e frequentemente produzem tecidos plásticos colados.
              Ao dominar a engenharia de prompts com regras de física corporal e negações estritas (AVOID), você tem controle total
              e custo zero de mensalidade.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <a
            href="https://flow.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-950/40"
          >
            <Sparkles className="w-4 h-4 text-blue-200" />
            <span>Acessar Google Flow (flow.google.com)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-rose-950/40"
          >
            Entendi, vamos começar!
          </button>
        </div>
      </div>
    </div>
  );
};
