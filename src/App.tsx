import React, { useState, useEffect } from 'react';
import { Sparkles, User, Shirt, Video, Bookmark, Check, ShieldCheck, HelpCircle, Camera, Compass, ExternalLink } from 'lucide-react';
import { Header } from './components/Header';
import { ModelBaseTab } from './components/ModelBaseTab';
import { TryOnTab } from './components/TryOnTab';
import { ScenarioTab } from './components/ScenarioTab';
import { UgcPosesTab } from './components/UgcPosesTab';
import { VideoTab } from './components/VideoTab';
import { WorkflowGuideModal } from './components/WorkflowGuideModal';
import { SavedPromptsDrawer } from './components/SavedPromptsDrawer';
import { SavedPrompt } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'model' | 'tryon' | 'scenario' | 'poses' | 'video'>('model');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load saved prompts from localStorage
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>(() => {
    try {
      const stored = localStorage.getItem('modaia_saved_prompts');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('modaia_saved_prompts', JSON.stringify(savedPrompts));
    } catch {
      // ignore
    }
  }, [savedPrompts]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSavePrompt = (newPromptData: Omit<SavedPrompt, 'id' | 'createdAt'>) => {
    // Check if duplicate prompt text already exists
    const exists = savedPrompts.some((p) => p.prompt === newPromptData.prompt);
    if (exists) {
      // Toggle remove or notify
      setSavedPrompts(savedPrompts.filter((p) => p.prompt !== newPromptData.prompt));
      showToast('Prompt removido dos favoritos.');
      return;
    }

    const newPrompt: SavedPrompt = {
      ...newPromptData,
      id: `prompt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: Date.now(),
    };
    setSavedPrompts([newPrompt, ...savedPrompts]);
    showToast('Prompt salvo nos seus favoritos!');
  };

  const handleDeleteSavedPrompt = (id: string) => {
    setSavedPrompts(savedPrompts.filter((p) => p.id !== id));
    showToast('Prompt excluído.');
  };

  const handleClearAllSaved = () => {
    if (window.confirm('Tem certeza de que deseja limpar todo o histórico de prompts salvos?')) {
      setSavedPrompts([]);
      showToast('Histórico limpo com sucesso.');
    }
  };

  return (
    <div id="modaia-app" className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-rose-500/30 selection:text-rose-200">
      {/* Top Header */}
      <Header
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        savedCount={savedPrompts.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Title & Introduction Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Engenharia de Prompt Especializada em Moda & E-commerce
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight">
            👗 ModaIA Studio
          </h1>
          <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
            Fábrica de Prompts de Alta Performance: casting, isolamento e provador, troca de cenários, poses de caimento e vídeos UGC.
          </p>

          <div className="pt-1 flex flex-wrap items-center justify-center gap-3">
            <a
              id="hero-flow-link"
              href="https://flow.google.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Acessar o Google Flow para gerar suas imagens com IA"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-950/50 transition-all active:scale-95 group border border-blue-400/25"
            >
              <Sparkles className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
              <span>Gerar Imagens no Google Flow (flow.google.com)</span>
              <ExternalLink className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Tab Navigation matching Streamlit st.tabs */}
        <div className="border-b border-zinc-800 flex justify-center">
          <nav className="flex space-x-1.5 sm:space-x-2 md:space-x-3 overflow-x-auto pb-2 scrollbar-none" aria-label="Tabs">
            <button
              id="tab-btn-modelo-base"
              type="button"
              onClick={() => setActiveTab('model')}
              className={`py-3 px-3.5 sm:px-4 md:px-5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === 'model'
                  ? 'bg-rose-500/15 text-rose-300 border border-rose-500/40 shadow-lg shadow-rose-950/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
              }`}
            >
              <User className={`w-4 h-4 ${activeTab === 'model' ? 'text-rose-400' : 'text-zinc-500'}`} />
              <span>1. Modelo</span>
            </button>

            <button
              id="tab-btn-provador-ab"
              type="button"
              onClick={() => setActiveTab('tryon')}
              className={`py-3 px-3.5 sm:px-4 md:px-5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === 'tryon'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-950/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
              }`}
            >
              <Shirt className={`w-4 h-4 ${activeTab === 'tryon' ? 'text-amber-400' : 'text-zinc-500'}`} />
              <span>2. Provador</span>
            </button>

            <button
              id="tab-btn-cenario-ab"
              type="button"
              onClick={() => setActiveTab('scenario')}
              className={`py-3 px-3.5 sm:px-4 md:px-5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === 'scenario'
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-950/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
              }`}
            >
              <Compass className={`w-4 h-4 ${activeTab === 'scenario' ? 'text-emerald-400' : 'text-zinc-500'}`} />
              <span>3. Cenário</span>
            </button>

            <button
              id="tab-btn-poses-ugc"
              type="button"
              onClick={() => setActiveTab('poses')}
              className={`py-3 px-3.5 sm:px-4 md:px-5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === 'poses'
                  ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/40 shadow-lg shadow-indigo-950/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
              }`}
            >
              <Camera className={`w-4 h-4 ${activeTab === 'poses' ? 'text-indigo-400' : 'text-zinc-500'}`} />
              <span>4. Poses</span>
            </button>

            <button
              id="tab-btn-video-extra"
              type="button"
              onClick={() => setActiveTab('video')}
              className={`py-3 px-3.5 sm:px-4 md:px-5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === 'video'
                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/40 shadow-lg shadow-purple-950/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
              }`}
            >
              <Video className={`w-4 h-4 ${activeTab === 'video' ? 'text-purple-400' : 'text-zinc-500'}`} />
              <span>5. Vídeos UGC</span>
            </button>
          </nav>
        </div>

        {/* Tab Content Display */}
        <div className="pt-2">
          {activeTab === 'model' && (
            <ModelBaseTab onSavePrompt={handleSavePrompt} savedPrompts={savedPrompts} />
          )}

          {activeTab === 'tryon' && (
            <TryOnTab onSavePrompt={handleSavePrompt} savedPrompts={savedPrompts} />
          )}

          {activeTab === 'scenario' && (
            <ScenarioTab onSavePrompt={handleSavePrompt} savedPrompts={savedPrompts} />
          )}

          {activeTab === 'poses' && (
            <UgcPosesTab onSavePrompt={handleSavePrompt} savedPrompts={savedPrompts} />
          )}

          {activeTab === 'video' && (
            <VideoTab onSavePrompt={handleSavePrompt} savedPrompts={savedPrompts} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-zinc-800/80 bg-zinc-950/60 py-8 text-center text-xs text-zinc-500 space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-6 text-zinc-400">
          <button
            type="button"
            onClick={() => setIsGuideOpen(true)}
            className="hover:text-rose-400 transition-colors flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Guia do Fluxo E-commerce</span>
          </button>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            Zero Consumo de Créditos / API
          </span>
          <span>•</span>
          <span>Compatível com Midjourney, Flux, Kling, Veo e Runway</span>
        </div>
        <p className="text-zinc-600 text-[11px]">
          ModaIA • Textos estratégicos de alta fidelidade para marcas de vestuário, moda feminina e e-commerce de conversão.
        </p>
      </footer>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Workflow Modal */}
      <WorkflowGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      {/* Saved Prompts Drawer */}
      <SavedPromptsDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedPrompts={savedPrompts}
        onDeletePrompt={handleDeleteSavedPrompt}
        onClearAll={handleClearAllSaved}
      />
    </div>
  );
}
