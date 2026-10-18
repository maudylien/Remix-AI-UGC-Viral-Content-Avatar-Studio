import React, { useState } from 'react';
import { 
  Split, 
  Volume2, 
  VolumeX, 
  Check, 
  Copy, 
  ArrowRight,
  Eye,
  Music,
  Brain
} from 'lucide-react';
import { HookVariation, AvatarProfile } from '../types';

interface HookABTestingCardProps {
  hooks?: HookVariation[];
  activeHookText?: string;
  onApplyHook: (hook: HookVariation) => void;
  activeAvatar: AvatarProfile | null;
}

export const HookABTestingCard: React.FC<HookABTestingCardProps> = ({
  hooks = [],
  activeHookText = '',
  onApplyHook,
  activeAvatar
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const safeHooks: HookVariation[] = (hooks && hooks.length > 0) ? hooks : [
    {
      id: 'hook-1',
      label: 'Contrarian / Pattern Interrupt',
      hookText: 'Stop beli skincare bertahap kalau kamu gamau rugi jutaan!',
      visualAction: 'Kreator melambaikan tangan "stop" cepat ke lensa dengan muka kaget.',
      audioCue: 'Record scratch / vinyl drop',
      psychologicalWhy: 'Interupsi refleks scroll dengan memicu rasa rugi (loss aversion).'
    },
    {
      id: 'hook-2',
      label: 'Curiosity Gap / Insider Secret',
      hookText: 'Cuma 5% orang yang tahu trik simpel ini buat beresin pori-pori!',
      visualAction: 'Berbisik dekat ke mikrofon clip-on sambil memperlihatkan produk sekilas.',
      audioCue: 'Subtle suspense whoosh',
      psychologicalWhy: 'Membuat penonton merasa mendapatkan rahasia eksklusif.'
    },
    {
      id: 'hook-3',
      label: 'Relatable Vulnerability / Confession',
      hookText: 'Sumpah aku sempat nyesel parah nggak tahu formula ini dari dulu...',
      visualAction: 'Menghela napas lega dengan senyum jujur di depan cermin kamar.',
      audioCue: 'Warm lo-fi groove',
      psychologicalWhy: 'Membangun koneksi autentik tanpa kesan iklan jualan kaku.'
    }
  ];

  const handlePlayVoice = (text: string, id: string) => {
    if ('speechSynthesis' in window) {
      if (playingId === id) {
        window.speechSynthesis.cancel();
        setPlayingId(null);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';

      if (activeAvatar?.gender === 'Pria') {
        utterance.pitch = 0.9;
        utterance.rate = 1.05;
      } else {
        utterance.pitch = 1.15;
        utterance.rate = 1.1;
      }

      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);

      setPlayingId(id);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const normalizedActiveHook = (activeHookText || '').trim().toLowerCase();

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl relative backdrop-blur-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Split className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              Variasi Hook A/B Testing (3-Detik Pertama)
            </h3>
            <p className="text-xs text-slate-400">
              Uji 3 pendekatan psikologis berbeda untuk menemukan pemenang retensi penonton
            </p>
          </div>
        </div>

        <span className="text-[11px] text-slate-400 font-medium">
          Klik tombol &quot;Terapkan&quot; untuk mengganti hook pada naskah utama
        </span>
      </div>

      {/* Grid of 3 Hooks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {safeHooks.map((item, index) => {
          const itemText = item.hookText || '';
          const isCurrentActive = normalizedActiveHook.length > 0 && normalizedActiveHook === itemText.trim().toLowerCase();
          const optionLetters = ['A', 'B', 'C'];
          const optionLetter = optionLetters[index] || `${index + 1}`;

          return (
            <div
              key={item.id || `hook-${index}`}
              className={`rounded-xl border p-4 flex flex-col justify-between transition-all relative ${
                isCurrentActive
                  ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500'
                  : 'border-slate-800 bg-slate-950/70 hover:border-slate-700 hover:bg-slate-950'
              }`}
            >
              <div>
                {/* Top badge */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 border border-slate-700 text-amber-300">
                    Opsi {optionLetter}: {item.label || 'Hook Variasi'}
                  </span>
                  {isCurrentActive && (
                    <span className="text-[10px] font-bold text-amber-400 flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> Aktif di Skrip
                    </span>
                  )}
                </div>

                {/* Spoken Hook Text */}
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 mb-3">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 flex items-center justify-between">
                    <span>Kalimat Hook Lisan (0-3s):</span>
                    <button
                      onClick={() => handlePlayVoice(itemText, item.id)}
                      className={`text-[10px] flex items-center gap-1 font-semibold transition-colors ${
                        playingId === item.id ? 'text-rose-400' : 'text-indigo-400 hover:text-indigo-300'
                      }`}
                      title="Dengarkan pengucapan audio hook"
                    >
                      {playingId === item.id ? (
                        <>
                          <VolumeX className="w-3 h-3 animate-pulse" /> Stop
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3" /> Tes Suara
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                    &ldquo;{itemText}&rdquo;
                  </p>
                </div>

                {/* Visual Action & SFX */}
                <div className="space-y-2 text-xs mb-3">
                  <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-850">
                    <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mb-1">
                      <Eye className="w-3 h-3 text-rose-400" /> Aksi Visual Kamera:
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {item.visualAction || 'Close-up ekspresi menghadap kamera'}
                    </p>
                  </div>

                  <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-850">
                    <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mb-1">
                      <Music className="w-3 h-3 text-cyan-400" /> Audio / Sound Effect:
                    </span>
                    <p className="text-[11px] text-cyan-300 font-mono">
                      {item.audioCue || 'Whoosh effect'}
                    </p>
                  </div>

                  <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-850">
                    <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mb-1">
                      <Brain className="w-3 h-3 text-purple-400" /> Landasan Psikologis:
                    </span>
                    <p className="text-[11px] text-purple-300/90 leading-relaxed">
                      {item.psychologicalWhy || 'Pemicu emosional untuk menghentikan refleks scrolling penonton'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onApplyHook(item)}
                  disabled={isCurrentActive}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                    isCurrentActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 cursor-default'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
                  }`}
                >
                  {isCurrentActive ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Sedang Dipakai
                    </>
                  ) : (
                    <>
                      Terapkan Hook Ini <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleCopy(itemText, item.id)}
                  className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Salin teks hook"
                >
                  {copiedId === item.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
