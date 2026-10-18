import React from 'react';
import { 
  Sparkles, 
  UserCheck, 
  PlaySquare, 
  Download, 
  RotateCcw,
  Zap,
  Send
} from 'lucide-react';
import { AvatarProfile } from '../types';

interface NavbarProps {
  activeAvatar: AvatarProfile | null;
  onOpenAvatarVault: () => void;
  onOpenTeleprompter: () => void;
  onOpenExport: () => void;
  onOpenTelegram: () => void;
  onReset: () => void;
  hasResult: boolean;
  avatarCount: number;
  hasTelegramChatId: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeAvatar,
  onOpenAvatarVault,
  onOpenTeleprompter,
  onOpenExport,
  onOpenTelegram,
  onReset,
  hasResult,
  avatarCount,
  hasTelegramChatId
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-rose-500/20 ring-1 ring-white/20">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                AI UGC Viral Studio
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Zap className="w-3 h-3 mr-1" /> v3.8 Flash
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Avatar Consistency Vault & 30s Viral Content Engine
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Avatar Button */}
          <button
            onClick={onOpenAvatarVault}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900/90 hover:bg-slate-800 hover:border-purple-500/50 transition-all text-xs sm:text-sm text-slate-200 shadow-sm group"
            title="Buka Avatar Consistency Vault"
          >
            {activeAvatar?.avatarUrl ? (
              <img 
                src={activeAvatar.avatarUrl} 
                alt={activeAvatar.name}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-rose-500" 
              />
            ) : (
              <UserCheck className="w-4 h-4 text-purple-400" />
            )}
            <div className="text-left hidden md:block">
              <div className="text-[10px] text-slate-400 font-medium leading-none">Avatar Konsisten</div>
              <div className="font-semibold text-slate-200 leading-tight truncate max-w-[110px]">
                {activeAvatar?.name || 'Pilih Avatar'}
              </div>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">
              {avatarCount}
            </span>
          </button>

          {/* Telegram Bot Button */}
          <button
            onClick={onOpenTelegram}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 shadow-sm shadow-sky-500/10 cursor-pointer"
            title="Integrasi Telegram Bot (@xAIgen112121_bot)"
          >
            <Send className="w-3.5 h-3.5 -rotate-12" />
            <span className="hidden sm:inline">Telegram Bot</span>
            <span className={`w-2 h-2 rounded-full ${hasTelegramChatId ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
          </button>

          {/* Teleprompter Preview Button (available when result generated) */}
          <button
            onClick={onOpenTeleprompter}
            disabled={!hasResult}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              hasResult 
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 cursor-pointer'
                : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed opacity-60'
            }`}
            title="Pratinjau Teleprompter 9:16"
          >
            <PlaySquare className="w-4 h-4" />
            <span className="hidden sm:inline">Teleprompter</span>
          </button>

          {/* Export Data Button */}
          <button
            onClick={onOpenExport}
            disabled={!hasResult}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              hasResult 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 cursor-pointer'
                : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed opacity-60'
            }`}
            title="Ekspor JSON / CSV untuk Automasi"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Ekspor</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors"
            title="Reset Form"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
