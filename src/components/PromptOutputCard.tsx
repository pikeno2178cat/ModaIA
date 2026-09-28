import React, { useState } from 'react';
import { Copy, Check, Download, Bookmark, BookmarkCheck, Sparkles, Eye, Code, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PromptOutputCardProps {
  title: string;
  prompt: string;
  badge?: string;
  onSave?: () => void;
  isSaved?: boolean;
  tips?: string[];
  id?: string;
}

export const PromptOutputCard: React.FC<PromptOutputCardProps> = ({
  title,
  prompt,
  badge = 'Pronto para Copiar',
  onSave,
  isSaved = false,
  tips = [],
  id = 'prompt-output-card',
}) => {
  const [copied, setCopied] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const wordCount = prompt.trim().split(/\s+/).filter(Boolean).length;
  const charCount = prompt.length;
  const estimatedTokens = Math.round(charCount / 4);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = prompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([prompt], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_prompt.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div id={id} className="relative rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="font-semibold text-zinc-100 text-sm md:text-base flex items-center gap-2">
            {title}
          </h3>
          <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
            {badge}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {onSave && (
            <button
              id={`${id}-btn-save`}
              type="button"
              onClick={onSave}
              title={isSaved ? 'Salvo nos favoritos' : 'Salvar no histórico'}
              aria-label={isSaved ? 'Salvo nos favoritos' : 'Salvar no histórico'}
              className={`p-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                isSaved
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 border-zinc-700/60'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSaved ? 'Salvo' : 'Salvar'}</span>
            </button>
          )}

          <button
            id={`${id}-btn-download`}
            type="button"
            onClick={handleDownload}
            title="Baixar prompt em .txt"
            aria-label="Baixar prompt em .txt"
            className="p-2 rounded-lg text-xs font-medium bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/60 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Baixar .txt</span>
          </button>

          <button
            id={`${id}-btn-copy`}
            type="button"
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-900/40'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/40 active:scale-95'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Prompt</span>
              </>
            )}
          </button>

          {/* Button to go directly to Google Flow */}
          <a
            id={`${id}-btn-google-flow`}
            href="https://flow.google.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir Google Flow (flow.google.com) para gerar a imagem"
            className="px-3.5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-sm shadow-blue-950/40 active:scale-95 border border-blue-400/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            <span>Gerar no Flow</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-200" />
          </a>
        </div>
      </div>

      {/* Metric ribbon */}
      <div className="px-5 py-2 bg-zinc-950/60 border-b border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-4">
          <span>
            <strong className="text-zinc-200">{charCount}</strong> caracteres
          </span>
          <span className="text-zinc-600">•</span>
          <span>
            <strong className="text-zinc-200">{wordCount}</strong> palavras
          </span>
          <span className="text-zinc-600">•</span>
          <span>
            ~<strong className="text-zinc-200">{estimatedTokens}</strong> tokens
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowFull(!showFull)}
          className="text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors flex items-center gap-1"
        >
          {showFull ? (
            <>
              <Code className="w-3.5 h-3.5" />
              <span>Modo compacto</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Expandir tudo</span>
            </>
          )}
        </button>
      </div>

      {/* Code / Text Container */}
      <div className="relative p-5">
        <pre
          className={`font-mono text-xs md:text-sm leading-relaxed text-zinc-200 whitespace-pre-wrap select-all overflow-x-auto bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 transition-all ${
            showFull ? 'max-h-none' : 'max-h-[380px] overflow-y-auto'
          }`}
        >
          <code>{prompt}</code>
        </pre>

        {copied && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-8 right-8 px-4 py-2 bg-emerald-500 text-zinc-950 font-semibold text-xs rounded-lg shadow-lg flex items-center gap-2 pointer-events-none"
            >
              <Check className="w-4 h-4" />
              Prompt copiado! Cole agora no Google Flow (flow.google.com)
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Google Flow Direct Generator Callout */}
      <div className="mx-5 mb-5 p-3.5 rounded-xl bg-gradient-to-r from-blue-950/50 via-indigo-950/40 to-zinc-900 border border-blue-500/25 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3 text-xs text-blue-200">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-blue-300" />
          </div>
          <div>
            <p className="font-semibold text-zinc-100">
              Pronto para gerar? Vá direto para o Google Flow
            </p>
            <p className="text-[11px] text-zinc-400">
              Copie o prompt e acesse <span className="text-blue-300 font-mono">flow.google.com</span> para renderizar suas imagens com IA.
            </p>
          </div>
        </div>

        <a
          id={`${id}-btn-callout-flow`}
          href="https://flow.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-950/60 transition-all active:scale-95 group border border-blue-400/20"
        >
          <span>Abrir Google Flow</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Tips footer */}
      {tips.length > 0 && (
        <div className="px-5 py-3.5 bg-zinc-950/70 border-t border-zinc-800/80">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dicas Estratégicas para Alta Performance:</span>
          </div>
          <ul className="space-y-1.5 text-xs text-zinc-400 list-disc list-inside">
            {tips.map((tip, idx) => (
              <li key={idx} className="leading-snug">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
