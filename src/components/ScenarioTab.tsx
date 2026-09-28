import React, { useState } from 'react';
import { Compass, Wand2, Check, Info, Sun, Sparkles, MapPin } from 'lucide-react';
import { SavedPrompt } from '../types';
import { buildScenarioABPrompt } from '../data/fashionPresets';
import { PromptOutputCard } from './PromptOutputCard';
import { SuggestionField } from './SuggestionField';

interface ScenarioTabProps {
  onSavePrompt?: (prompt: Omit<SavedPrompt, 'id' | 'createdAt'>) => void;
  savedPrompts?: SavedPrompt[];
}

const SUGESTOES_NOVO_AMBIENTE = [
  "Apartamento penthouse moderno com janelas panorâmicas e luz de pôr do sol dourada",
  "Provador luxuoso de boutique de moda em Milão com mármore e espelho bronze",
  "Café parisiense ao ar livre com mesinhas redondas e luz suave da manhã",
  "Rua charmosa de paralelepípedo nos Jardins/SP com fachadas modernas e árvores",
  "Lounge de resort tropical em Trancoso com deck de madeira e coqueiros",
  "Estúdio minimalista editorial de moda com iluminação suave de softbox e fundo cinza",
  "Quarto de hotel boutique com cabeceira de linho, cortinas brancas e luz difusa",
  "Rooftop urbano contemporâneo ao entardecer com vista para o skyline da cidade"
];

const SUGESTOES_ILUMINACAO = [
  "Luz natural quente de Golden Hour com reflexos dourados e sombras suaves",
  "Iluminação difusa de dia nublado, suave, sem sombras duras e cores puras",
  "Luz direta de sol de verão com contraste vivo e sombras nítidas autênticas",
  "Iluminação suave de provador boutique com temperatura de cor neutra de 5000K",
  "Luz de ambiente aconchegante interna com abajures de luz âmbar quente",
  "Luz editorial de estúdio com rim-light suave realçando o contorno dos cabelos"
];

const SUGESTOES_INTERACAO = [
  "Em pé próxima à janela segurando o celular para selfie no espelho com postura relaxada",
  "Sentada casualmente em poltrona de design contemporâneo apoiando um dos braços",
  "Apoiada levemente na bancada de mármore olhando de soslaio com sorriso espontâneo",
  "Caminhando em direção à câmera como se estivesse passeando pelo local",
  "Encostada sutilmente no batente da porta de vidro admirando a vista externa",
  "Em pé em frente a um grande espelho de chão com moldura orgânica elegante"
];

export const ScenarioTab: React.FC<ScenarioTabProps> = ({ onSavePrompt, savedPrompts = [] }) => {
  const [novoAmbiente, setNovoAmbiente] = useState<string>(SUGESTOES_NOVO_AMBIENTE[0]);
  const [iluminacao, setIluminacao] = useState<string>(SUGESTOES_ILUMINACAO[0]);
  const [interacao, setInteracao] = useState<string>(SUGESTOES_INTERACAO[0]);

  const [generatedPrompt, setGeneratedPrompt] = useState<string>(() =>
    buildScenarioABPrompt(SUGESTOES_NOVO_AMBIENTE[0], SUGESTOES_ILUMINACAO[0], SUGESTOES_INTERACAO[0])
  );
  const [hasGenerated, setHasGenerated] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const prompt = buildScenarioABPrompt(novoAmbiente, iluminacao, interacao);
    setGeneratedPrompt(prompt);
    setHasGenerated(true);
    setSuccessMessage('Prompt de Troca de Cenário gerado com sucesso!');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const isCurrentSaved = savedPrompts.some((p) => p.prompt === generatedPrompt);

  return (
    <div id="scenario-tab" className="space-y-6">
      {/* Subheader & Caption */}
      <div className="rounded-2xl p-5 bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-900 border border-zinc-800">
        <h2 className="text-lg md:text-xl font-bold text-zinc-100 flex items-center gap-2">
          <span>🌍 3. Troca de Cenário por Referência</span>
        </h2>
        <p className="mt-1 text-xs md:text-sm text-zinc-400">
          Insira sua modelo em um novo ambiente mantendo rigorosamente a identidade. Digite o cenário e iluminação que desejar ou clique nas sugestões abaixo.
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
            {/* Info box */}
            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs flex items-start gap-2.5 leading-relaxed">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-blue-200">📌 Imagem A:</span> Novo Cenário |{' '}
                <span className="font-semibold text-blue-200">Imagem B:</span> Foto da sua Modelo
              </div>
            </div>

            {/* Campo aberto: Novo Ambiente */}
            <SuggestionField
              id="input-novo-ambiente"
              label="Novo Cenário Desejado (Imagem A):"
              icon={<MapPin className="w-3.5 h-3.5 text-emerald-400" />}
              value={novoAmbiente}
              onChange={setNovoAmbiente}
              placeholder="Ex: Apartamento penthouse moderno com janelas panorâmicas..."
              suggestions={SUGESTOES_NOVO_AMBIENTE}
              multiline={true}
              rows={2}
              accentColor="emerald"
              helperText="Campo livre: descreva o local exato ou selecione uma das 8 opções sugeridas."
            />

            {/* Campo aberto: Iluminação */}
            <SuggestionField
              id="input-iluminacao-ambiente"
              label="Iluminação & Atmosfera do Ambiente:"
              icon={<Sun className="w-3.5 h-3.5 text-emerald-400" />}
              value={iluminacao}
              onChange={setIluminacao}
              placeholder="Ex: Luz natural quente de Golden Hour com reflexos dourados..."
              suggestions={SUGESTOES_ILUMINACAO}
              multiline={true}
              rows={2}
              accentColor="emerald"
              helperText="Defina o clima luminoso (golden hour, luz difusa, estúdio) ou use uma sugestão."
            />

            {/* Campo aberto: Interação da Modelo */}
            <SuggestionField
              id="input-interacao-modelo"
              label="Posicionamento e Interação da Modelo no Cenário:"
              icon={<Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
              value={interacao}
              onChange={setInteracao}
              placeholder="Ex: Em pé próxima à janela segurando o celular para selfie no espelho..."
              suggestions={SUGESTOES_INTERACAO}
              multiline={true}
              rows={2}
              accentColor="emerald"
              helperText="Como a modelo deve se portar dentro do novo ambiente."
            />

            {/* Submit Button */}
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

            {/* Success Alert */}
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
