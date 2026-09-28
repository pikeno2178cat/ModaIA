import React from 'react';
import { Sparkles, X, Check } from 'lucide-react';

export interface SuggestionItem {
  label: string;
  value: string;
}

interface SuggestionFieldProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  suggestions: (string | SuggestionItem)[];
  multiline?: boolean;
  rows?: number;
  helperText?: string;
  accentColor?: 'rose' | 'amber' | 'emerald' | 'indigo' | 'purple' | 'blue';
}

const COLOR_MAP = {
  rose: {
    borderFocus: 'focus:border-rose-500 focus:ring-rose-500',
    badgeActive: 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-sm',
    badgeHover: 'hover:bg-rose-500/10 hover:text-rose-200 hover:border-rose-500/30',
    indicator: 'text-rose-400',
  },
  amber: {
    borderFocus: 'focus:border-amber-500 focus:ring-amber-500',
    badgeActive: 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm',
    badgeHover: 'hover:bg-amber-500/10 hover:text-amber-200 hover:border-amber-500/30',
    indicator: 'text-amber-400',
  },
  emerald: {
    borderFocus: 'focus:border-emerald-500 focus:ring-emerald-500',
    badgeActive: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm',
    badgeHover: 'hover:bg-emerald-500/10 hover:text-emerald-200 hover:border-emerald-500/30',
    indicator: 'text-emerald-400',
  },
  indigo: {
    borderFocus: 'focus:border-indigo-500 focus:ring-indigo-500',
    badgeActive: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50 shadow-sm',
    badgeHover: 'hover:bg-indigo-500/10 hover:text-indigo-200 hover:border-indigo-500/30',
    indicator: 'text-indigo-400',
  },
  purple: {
    borderFocus: 'focus:border-purple-500 focus:ring-purple-500',
    badgeActive: 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-sm',
    badgeHover: 'hover:bg-purple-500/10 hover:text-purple-200 hover:border-purple-500/30',
    indicator: 'text-purple-400',
  },
  blue: {
    borderFocus: 'focus:border-blue-500 focus:ring-blue-500',
    badgeActive: 'bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-sm',
    badgeHover: 'hover:bg-blue-500/10 hover:text-blue-200 hover:border-blue-500/30',
    indicator: 'text-blue-400',
  },
};

export const SuggestionField: React.FC<SuggestionFieldProps> = ({
  id,
  label,
  icon,
  value,
  onChange,
  placeholder,
  suggestions,
  multiline = false,
  rows = 3,
  helperText,
  accentColor = 'rose',
}) => {
  const normalizedSuggestions: SuggestionItem[] = suggestions.map((s) =>
    typeof s === 'string' ? { label: s, value: s } : s
  );

  const colors = COLOR_MAP[accentColor] || COLOR_MAP.rose;

  const handleSelectSuggestion = (suggestedValue: string) => {
    onChange(suggestedValue);
  };

  return (
    <div className="space-y-2">
      {/* Label and Clear text button */}
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
          {icon}
          <span>{label}</span>
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[11px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors"
            title="Limpar campo para digitar do zero"
          >
            <X className="w-3 h-3" />
            <span>Limpar</span>
          </button>
        )}
      </div>

      {/* Free-text Input or Textarea */}
      <div className="relative">
        {multiline ? (
          <textarea
            id={id}
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || 'Digite livremente o que desejar...'}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs md:text-sm focus:outline-none focus:ring-1 transition-colors leading-relaxed ${colors.borderFocus}`}
          />
        ) : (
          <input
            id={id}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || 'Digite livremente o que desejar...'}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-xs md:text-sm focus:outline-none focus:ring-1 transition-colors ${colors.borderFocus}`}
          />
        )}
      </div>

      {helperText && (
        <p className="text-[11px] text-zinc-500 leading-tight">
          {helperText}
        </p>
      )}

      {/* Suggestions Section Underneath */}
      <div className="pt-1 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-zinc-400">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className={`w-3 h-3 ${colors.indicator}`} />
            Sugestões ({normalizedSuggestions.length}): clique para preencher ou editar livremente
          </span>
        </div>

        {/* Suggestion Badges */}
        <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1 scrollbar-thin">
          {normalizedSuggestions.map((item, idx) => {
            const isSelected = value.trim() === item.value.trim();
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggestion(item.value)}
                className={`text-left text-[11px] px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 leading-tight ${
                  isSelected
                    ? colors.badgeActive
                    : `bg-zinc-950/60 border-zinc-800/80 text-zinc-400 ${colors.badgeHover}`
                }`}
                title={item.value}
              >
                {isSelected && <Check className="w-3 h-3 shrink-0" />}
                <span className="line-clamp-2">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
