import React from 'react';
import { Sparkles, Bookmark, BookOpen, ExternalLink } from 'lucide-react';

interface HeaderProps {
  onOpenGuide: () => void;
  onOpenSaved: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenGuide, onOpenSaved, savedCount }) => {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-600 flex items-center justify-center shadow-lg shadow-rose-950/40 text-2xl select-none">
            👗
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-extrabold text-zinc-100 tracking-tight flex items-center gap-2">
                ModaIA Studio
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  PRO
                </span>
              </h1>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">
              Fábrica de Prompts de Alta Performance para E-commerce
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5">
          {/* Direct Link to Google Flow */}
          <a
            id="btn-header-google-flow"
            href="https://flow.google.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Ir para o Google Flow (flow.google.com) para gerar imagens"
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-950/50 transition-all active:scale-95 group border border-blue-400/20"
          >
            <Sparkles className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Gerar no</span>
            <span>Google Flow</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-200 ml-0.5" />
          </a>

          <button
            id="btn-open-guide"
            type="button"
            onClick={onOpenGuide}
            className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 border border-zinc-800 text-xs font-semibold flex items-center gap-2 transition-all active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">Guia do Fluxo</span>
          </button>

          <button
            id="btn-open-saved"
            type="button"
            onClick={onOpenSaved}
            className="relative px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 border border-zinc-800 text-xs font-semibold flex items-center gap-2 transition-all active:scale-95"
          >
            <Bookmark className="w-4 h-4 text-rose-400" />
            <span className="hidden md:inline">Favoritos</span>
            {savedCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white leading-none">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
