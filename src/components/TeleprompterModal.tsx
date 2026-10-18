import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  X, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Check, 
  Sparkles,
  Smartphone,
  Eye,
  Type
} from 'lucide-react';
import { UgcScriptResult, AvatarProfile } from '../types';

interface TeleprompterModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: UgcScriptResult;
  activeAvatar: AvatarProfile | null;
}

export const TeleprompterModal: React.FC<TeleprompterModalProps> = ({
  isOpen,
  onClose,
  result,
  activeAvatar
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // 0 to 30 seconds
  const [speed, setSpeed] = useState<number>(1);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) {
      handleReset();
    }
  }, [isOpen]);

  // Handle timer tick
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.1 * speed;
          if (next >= 30) {
            setIsPlaying(false);
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            return 30;
          }
          return next;
        });
      }, 100);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, speed]);

  // Sync active scene based on currentTime
  useEffect(() => {
    // 0-3s: scene 0
    // 3-9s: scene 1
    // 9-19s: scene 2
    // 19-25s: scene 3
    // 25-30s: scene 4
    if (currentTime < 3) setActiveSceneIdx(0);
    else if (currentTime < 9) setActiveSceneIdx(1);
    else if (currentTime < 19) setActiveSceneIdx(2);
    else if (currentTime < 25) setActiveSceneIdx(3);
    else setActiveSceneIdx(4);
  }, [currentTime]);

  // Auto-scroll teleprompter smoothly
  useEffect(() => {
    if (scrollContainerRef.current && isPlaying) {
      const scrollHeight = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;
      const progress = currentTime / 30;
      scrollContainerRef.current.scrollTop = scrollHeight * progress;
    }
  }, [currentTime, isPlaying]);

  if (!isOpen) return null;

  const handleTogglePlay = () => {
    if (!isPlaying) {
      if (currentTime >= 30) {
        setCurrentTime(0);
      }
      setIsPlaying(true);

      // Trigger TTS if unmuted
      if (!isAudioMuted && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(result.fullSpokenScript);
        utterance.lang = 'id-ID';
        utterance.rate = 1.05 * speed;
        if (activeAvatar?.gender === 'Pria') {
          utterance.pitch = 0.95;
        } else {
          utterance.pitch = 1.15;
        }
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setIsPlaying(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setActiveSceneIdx(0);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const currentScene = result.scenes[activeSceneIdx] || result.scenes[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl relative my-auto overflow-hidden">
        
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                Teleprompter & Simulasi Video 9:16
              </h3>
              <p className="text-[11px] text-slate-400">
                Latihan baca skrip dengan tempo pas 30 detik sebelum take video
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left Phone Mockup, Right Teleprompter Panel */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left: 9:16 Phone Mockup View (5 cols) */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-[280px] sm:w-[300px] h-[520px] rounded-[36px] bg-black border-4 border-slate-700/80 shadow-2xl relative overflow-hidden flex flex-col justify-between p-4 ring-1 ring-white/10">
              
              {/* Dynamic camera notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full bg-slate-900 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-1 ring-slate-800" />
              </div>

              {/* Background Avatar Visual or Studio Backdrop */}
              {activeAvatar?.avatarUrl && (
                <img
                  src={activeAvatar.avatarUrl}
                  alt="Avatar Visual"
                  className="absolute inset-0 w-full h-full object-cover opacity-35 filter brightness-75 contrast-125"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />

              {/* Phone Header Info */}
              <div className="relative z-10 pt-4 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span className="font-mono font-bold text-[11px]">
                    00:{currentTime < 10 ? `0${Math.floor(currentTime)}` : Math.floor(currentTime)} / 00:30
                  </span>
                </div>
                <div className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full bg-rose-600/80 shadow-sm">
                  {currentScene.phase}
                </div>
              </div>

              {/* On-Screen Caption Dynamic Overlay (Center) */}
              <div className="relative z-10 my-auto text-center px-2">
                <div className="inline-block bg-yellow-400 text-slate-950 font-black text-xs sm:text-sm px-3 py-1.5 rounded-lg shadow-xl uppercase tracking-tight transform -rotate-1 animate-pulse">
                  {currentScene.onScreenText}
                </div>
                <div className="mt-2 text-[10px] text-white/90 bg-black/70 backdrop-blur-md px-2 py-1 rounded border border-white/10 font-mono">
                  SFX: {currentScene.soundFx}
                </div>
              </div>

              {/* Phone Footer: Avatar Tag & Live Dialogue */}
              <div className="relative z-10 text-white space-y-1.5 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-rose-500 p-0.5">
                    <img
                      src={activeAvatar?.avatarUrl || ''}
                      alt="avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold block leading-none">
                      @{activeAvatar?.name.toLowerCase().replace(/\s+/g, '') || 'ugccreator'}
                    </span>
                    <span className="text-[9px] text-slate-300">
                      {activeAvatar?.tone}
                    </span>
                  </div>
                </div>

                <div className="bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10 text-[11px] leading-snug line-clamp-3">
                  <span className="text-yellow-300 font-bold mr-1">
                    [{currentScene.timeframe}]:
                  </span>
                  &ldquo;{currentScene.spokenDialogue}&rdquo;
                </div>
              </div>

              {/* Progress bar at bottom edge */}
              <div className="absolute bottom-0 inset-x-0 h-1.5 bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-indigo-500 transition-all duration-100"
                  style={{ width: `${(currentTime / 30) * 100}%` }}
                />
              </div>

            </div>
          </div>

          {/* Right: Teleprompter Scrolling Text & Controls (7 cols) */}
          <div className="md:col-span-7 flex flex-col justify-between h-full space-y-4">
            
            {/* Teleprompter Box */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 relative overflow-hidden flex flex-col">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-850 text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-purple-400" />
                  Naskah Berjalan (Teleprompter Guide)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Auto-Scroll • Tempo {speed}x
                </span>
              </div>

              {/* Scroll viewport */}
              <div
                ref={scrollContainerRef}
                className="h-64 sm:h-72 overflow-y-auto space-y-4 pr-2 text-sm sm:text-base leading-relaxed text-slate-400 select-none smooth-teleprompter"
              >
                {result.scenes.map((scene, idx) => {
                  const isActive = idx === activeSceneIdx;
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-rose-500/15 border border-rose-500/40 text-white font-bold text-base sm:text-lg scale-[1.01]'
                          : 'opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs mb-1">
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                          {scene.timeframe}
                        </span>
                        <span className="text-[10px] text-rose-400 font-semibold">
                          {scene.phase}
                        </span>
                      </div>
                      <p>{scene.spokenDialogue}</p>
                    </div>
                  );
                })}
              </div>

              {/* Gradient fade overlay */}
              <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
            </div>

            {/* Playback Controls Toolbar */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              {/* Play / Pause / Reset */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleTogglePlay}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
                    isPlaying
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                      : 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/25'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" /> Jeda
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" /> Putar Latihan
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                  title="Ulangi dari 00:00"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsAudioMuted(!isAudioMuted)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isAudioMuted
                      ? 'bg-slate-900 border-slate-800 text-slate-500'
                      : 'bg-indigo-600/20 border-indigo-500/30 text-indigo-300'
                  }`}
                  title={isAudioMuted ? 'Nyalakan Audio Pengisi Suara' : 'Bisukan Suara TTS'}
                >
                  {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Speed Multiplier */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                <span className="text-[10px] text-slate-400 px-2 font-semibold">Kecepatan:</span>
                {[0.8, 1.0, 1.2, 1.5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-2 py-1 rounded-lg font-bold text-xs transition-all ${
                      speed === s
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400 px-6">
          <span>Gunakan simulasi ini untuk melatih pacing ucapan tepat 30 detik tanpa terburu-buru.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium"
          >
            Selesai
          </button>
        </div>

      </div>
    </div>
  );
};
