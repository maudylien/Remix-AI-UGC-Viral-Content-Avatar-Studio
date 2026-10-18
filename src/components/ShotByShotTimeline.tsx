import React, { useState } from 'react';
import { 
  Film, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  Type as TypeIcon, 
  Sparkles, 
  Music, 
  Camera
} from 'lucide-react';
import { UgcScene, AvatarProfile } from '../types';

interface ShotByShotTimelineProps {
  scenes?: UgcScene[];
  durationSeconds?: number;
  estimatedWordCount?: number;
  readingPaceWpm?: number;
  activeAvatar: AvatarProfile | null;
  onCopyAllScenesPrompt: () => void;
}

export const ShotByShotTimeline: React.FC<ShotByShotTimelineProps> = ({
  scenes = [],
  durationSeconds = 30,
  estimatedWordCount = 85,
  readingPaceWpm = 165,
  activeAvatar,
  onCopyAllScenesPrompt
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopyPrompt = (prompt: string, idx: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedIndex(idx);
    setCopiedType('prompt');
    setTimeout(() => {
      setCopiedIndex(null);
      setCopiedType(null);
    }, 2000);
  };

  const handleCopyDialogue = (dialogue: string, idx: number) => {
    navigator.clipboard.writeText(dialogue);
    setCopiedIndex(idx);
    setCopiedType('dialogue');
    setTimeout(() => {
      setCopiedIndex(null);
      setCopiedType(null);
    }, 2000);
  };

  const handleSpeakDialogue = (text: string, idx: number) => {
    if ('speechSynthesis' in window) {
      if (playingIndex === idx) {
        window.speechSynthesis.cancel();
        setPlayingIndex(null);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';

      if (activeAvatar?.gender === 'Pria') {
        utterance.pitch = 0.95;
        utterance.rate = 1.05;
      } else {
        utterance.pitch = 1.15;
        utterance.rate = 1.1;
      }

      utterance.onend = () => setPlayingIndex(null);
      utterance.onerror = () => setPlayingIndex(null);

      setPlayingIndex(idx);
      window.speechSynthesis.speak(utterance);
    }
  };

  const getPhaseColor = (phaseStr: string = '') => {
    const p = (phaseStr || '').toLowerCase();
    if (p.includes('hook')) return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    if (p.includes('agit')) return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    if (p.includes('solut')) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    if (p.includes('proof')) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl relative backdrop-blur-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              Timeline Naskah Shot-by-Shot ({durationSeconds} Detik)
            </h3>
            <p className="text-xs text-slate-400">
              Sinkronisasi dialog lisan, arahan kamera, teks di layar, dan prompt visual AI avatar konsisten
            </p>
          </div>
        </div>

        {/* Stats badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono">
            ⏱️ {durationSeconds}s
          </span>
          <span className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono">
            📝 ~{estimatedWordCount} kata
          </span>
          <span className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono">
            ⚡ {readingPaceWpm} WPM
          </span>
          <button
            onClick={onCopyAllScenesPrompt}
            className="text-[11px] px-3 py-1 rounded-lg bg-indigo-600/90 hover:bg-indigo-600 text-white font-medium flex items-center gap-1 shadow-sm transition-all"
            title="Salin seluruh prompt visual untuk Midjourney/Runway"
          >
            <Sparkles className="w-3 h-3 text-amber-300" /> Salin Semua Prompt
          </button>
        </div>
      </div>

      {/* Timeline items list */}
      <div className="space-y-4 pt-5">
        {(scenes || []).map((scene, idx) => {
          const sceneNum = scene.sceneNumber ?? (idx + 1);
          const timeframe = scene.timeframe || `00:${idx * 6} - 00:${(idx + 1) * 6}`;
          const phase = scene.phase || 'Adegan';
          const spoken = scene.spokenDialogue || '';
          const visual = scene.visualAction || 'Close-up kreator berinteraksi';
          const cam = scene.cameraAngle || 'Handheld selfie camera';
          const screenText = scene.onScreenText || '';
          const prompt = scene.aiImagePrompt || `${activeAvatar?.visualPrompt || 'UGC creator portrait'}, 9:16 vertical`;
          const sfx = scene.soundFx || 'Background Music Groove';

          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 transition-all hover:border-slate-700 relative group overflow-hidden"
            >
              {/* Top Scene Meta Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-850">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-200 flex items-center justify-center text-xs font-black">
                    #{sceneNum}
                  </span>
                  <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                    {timeframe}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPhaseColor(phase)}`}>
                    {phase}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Music className="w-3 h-3 text-cyan-400" />
                    SFX: <span className="text-slate-300 font-medium">{sfx}</span>
                  </span>
                </div>
              </div>

              {/* Grid: Left (Spoken & Visual action), Right (AI Image/Video Prompt) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* Spoken Dialogue & Camera Action (7 cols) */}
                <div className="lg:col-span-7 space-y-3">
                  
                  {/* Spoken Dialogue */}
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-rose-400" />
                        Dialog Lisan Avatar ({activeAvatar?.name || 'Kreator'}):
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSpeakDialogue(spoken, idx)}
                          className={`text-[10px] flex items-center gap-1 font-semibold ${
                            playingIndex === idx ? 'text-rose-400' : 'text-slate-400 hover:text-white'
                          }`}
                          title="Dengarkan pengucapan dialog ini"
                        >
                          {playingIndex === idx ? (
                            <>
                              <VolumeX className="w-3 h-3 text-rose-400 animate-pulse" /> Stop
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3" /> Putar
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopyDialogue(spoken, idx)}
                          className="text-[10px] text-slate-400 hover:text-white flex items-center gap-0.5"
                          title="Salin dialog lisan"
                        >
                          {copiedIndex === idx && copiedType === 'dialogue' ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                      &ldquo;{spoken}&rdquo;
                    </p>
                  </div>

                  {/* Camera Action & On-Screen Text */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-850">
                      <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mb-1">
                        <Camera className="w-3 h-3 text-indigo-400" /> Aksi & Framing Kamera:
                      </span>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        {visual}
                      </p>
                      <div className="text-[10px] text-slate-400 mt-1 font-mono">
                        Sudut: {cam}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-850">
                      <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mb-1">
                        <TypeIcon className="w-3 h-3 text-amber-400" /> Teks Caption di Layar:
                      </span>
                      <div className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 leading-tight">
                        {screenText}
                      </div>
                    </div>
                  </div>

                </div>

                {/* AI Avatar Visual Prompt (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        AI Visual Prompt ({activeAvatar?.aspectRatio || '9:16'}):
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                        Midjourney/Kling/Runway
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-300 bg-slate-950/90 p-2.5 rounded-md border border-slate-850 leading-relaxed break-words select-all">
                      {prompt}
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-855 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">
                      Seed konsisten: #{activeAvatar?.consistencySeed || 894312}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyPrompt(prompt, idx)}
                      className="px-2.5 py-1 rounded-md bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                      title="Salin Prompt Generator Visual"
                    >
                      {copiedIndex === idx && copiedType === 'prompt' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" /> Tersalin!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Salin Prompt
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
