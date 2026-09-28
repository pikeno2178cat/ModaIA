import React, { useState } from 'react';
import { X, Trash2, Copy, Check, Bookmark, Download, ExternalLink, Sparkles } from 'lucide-react';
import { SavedPrompt } from '../types';

interface SavedPromptsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedPrompts: SavedPrompt[];
  onDeletePrompt: (id: string) => void;
  onClearAll: () => void;
}

export const SavedPromptsDrawer: React.FC<SavedPromptsDrawerProps> = ({
  isOpen,
  onClose,
  savedPrompts,
  onDeletePrompt,
  onClearAll,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = savedPrompts.filter((p) => {
    if (filterType === 'all') return true;
    return p.type === filterType;
  });

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleExportAll = () => {
    const textContent = savedPrompts
      .map(
        (p, idx) =>
          `=== [${idx + 1}] ${p.title} (${p.type.toUpperCase()}) ===\nData: ${new Date(
            p.createdAt
          ).toLocaleString()}\n\n${p.prompt}\n\n`
      )
      .join('--------------------------------------------------\n\n');

    const element = document.createElement('a');
    const file = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `modaia_prompts_salvos_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-zinc-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-md h-full bg-zinc-900 border-l border-zinc-800 p-6 flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-5 h-5 text-rose-400" />
            <h3 className="font-bold text-zinc-100 text-base">Prompts Favoritos</h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              {savedPrompts.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between py-3">
          <div className="flex gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'model', label: 'Modelos' },
              { id: 'tryon', label: 'Provador' },
              { id: 'scenario', label: 'Cenários' },
              { id: 'poses', label: 'Poses' },
              { id: 'video', label: 'Vídeos' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  filterType === tab.id
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-semibold'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {savedPrompts.length > 0 && (
            <button
              onClick={handleExportAll}
              title="Exportar todos em .txt"
              className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1 font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar</span>
            </button>
          )}
        </div>

        {/* Prompts List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-1">
          {filtered.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500 space-y-3">
              <Bookmark className="w-10 h-10 opacity-30" />
              <p className="text-xs">Nenhum prompt salvo nesta categoria.</p>
              <p className="text-[11px] text-zinc-600">
                Clique no botão "Salvar" no topo de qualquer prompt gerado para guardar aqui no seu navegador.
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2.5 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h5 className="text-xs font-semibold text-zinc-200 line-clamp-1">{item.title}</h5>
                    <span className="text-[10px] text-zinc-500">
                      {new Date(item.createdAt).toLocaleDateString('pt-BR')} • {item.type.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <a
                      href="https://flow.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white transition-colors"
                      title="Abrir no Google Flow"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => handleCopy(item.id, item.prompt)}
                      className={`p-1.5 rounded-lg text-xs transition-colors ${
                        copiedId === item.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                      title="Copiar prompt"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => onDeletePrompt(item.id)}
                      className="p-1.5 rounded-lg bg-zinc-800/60 text-zinc-500 hover:text-rose-400 hover:bg-zinc-800 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800/60 font-mono text-[11px] text-zinc-400 line-clamp-3 leading-relaxed">
                  {item.prompt}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedPrompts.length > 0 && (
          <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
            <button
              onClick={onClearAll}
              className="text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors"
            >
              Limpar todo o histórico
            </button>
            <span className="text-[11px] text-zinc-500">Salvo no seu navegador</span>
          </div>
        )}
      </div>
    </div>
  );
};
