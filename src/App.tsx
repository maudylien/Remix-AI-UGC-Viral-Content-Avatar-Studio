import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MultiInputHub } from './components/MultiInputHub';
import { ScriptGeneratorForm } from './components/ScriptGeneratorForm';
import { ViralScoreCard } from './components/ViralScoreCard';
import { HookABTestingCard } from './components/HookABTestingCard';
import { ShotByShotTimeline } from './components/ShotByShotTimeline';
import { CaptionAndHashtags } from './components/CaptionAndHashtags';
import { AvatarVaultModal } from './components/AvatarVaultModal';
import { TeleprompterModal } from './components/TeleprompterModal';
import { ExportModal } from './components/ExportModal';
import { TelegramModal } from './components/TelegramModal';
import { ErrorBoundary } from './components/ErrorBoundary';

import { 
  AvatarProfile, 
  ReferenceFile, 
  StorytellingAngle, 
  TargetPlatform, 
  UgcScriptResult,
  HookVariation
} from './types';
import { INITIAL_PRESET_AVATARS, PRESET_INPUT_SCENARIOS } from './data/presetAvatars';
import { Sparkles, CheckCircle2, AlertCircle, Send, Radio, Check, ChevronDown } from 'lucide-react';

const LOCAL_STORAGE_AVATARS_KEY = 'ugc_studio_avatars_v1';
const LOCAL_STORAGE_ACTIVE_AVATAR_KEY = 'ugc_studio_active_avatar_id_v1';
const LOCAL_STORAGE_TELEGRAM_CHAT_ID = 'ugc_studio_telegram_chat_id_v1';
const LOCAL_STORAGE_TELEGRAM_AUTO_SEND = 'ugc_studio_telegram_auto_send_v1';

export default function App() {
  // Avatars State
  const [avatars, setAvatars] = useState<AvatarProfile[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_AVATARS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRESET_AVATARS;
  });

  const [activeAvatarId, setActiveAvatarId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ACTIVE_AVATAR_KEY);
      if (saved) return saved;
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRESET_AVATARS[0]?.id || '';
  });

  // Telegram Bot State
  const [telegramChatId, setTelegramChatId] = useState<string>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_TELEGRAM_CHAT_ID) || '';
    } catch (e) {
      return '';
    }
  });

  const [autoSendTelegram, setAutoSendTelegram] = useState<boolean>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_TELEGRAM_AUTO_SEND) === 'true';
    } catch (e) {
      return false;
    }
  });

  // Save avatars to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_AVATARS_KEY, JSON.stringify(avatars));
    } catch (e) {
      console.error(e);
    }
  }, [avatars]);

  // Save active avatar to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ACTIVE_AVATAR_KEY, activeAvatarId);
    } catch (e) {
      console.error(e);
    }
  }, [activeAvatarId]);

  // Save telegram chat ID
  const handleSaveTelegramChatId = (id: string) => {
    setTelegramChatId(id);
    try {
      localStorage.setItem(LOCAL_STORAGE_TELEGRAM_CHAT_ID, id);
    } catch (e) {
      console.error(e);
    }
  };

  // Save telegram auto-send
  const handleToggleAutoSend = (val: boolean) => {
    setAutoSendTelegram(val);
    try {
      localStorage.setItem(LOCAL_STORAGE_TELEGRAM_AUTO_SEND, String(val));
    } catch (e) {
      console.error(e);
    }
  };

  const activeAvatar = avatars.find((a) => a.id === activeAvatarId) || avatars[0] || null;

  // Multi-Input Hub State
  const [references, setReferences] = useState<ReferenceFile[]>([]);
  const [pastedText, setPastedText] = useState<string>('');

  // Form State
  const [topic, setTopic] = useState<string>('Serum Retinol Gentle untuk Pemula Tanpa Efek Iritasi');
  const [productName, setProductName] = useState<string>('LumiGlow Gentle Barrier Serum');
  const [keyBenefits, setKeyBenefits] = useState<string>('Hasil pori rapat dalam 7 hari, tanpa cekit-cekit/kemerahan, formula nano-encapsulated');
  const [targetAudience, setTargetAudience] = useState<string>('Wanita & pria 20-30 tahun, kulit sensitif dan pemula skincare yang takut mencoba retinol');
  const [storytellingAngle, setStorytellingAngle] = useState<StorytellingAngle>('contrarian');
  const [platform, setPlatform] = useState<TargetPlatform>('tiktok');
  const [ctaGoal, setCtaGoal] = useState<string>('Klik keranjang kuning sekarang mumpung ada flash sale 40%');

  // Generation & Result State
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSendingToTelegram, setIsSendingToTelegram] = useState(false);
  const [result, setResult] = useState<UgcScriptResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals State
  const [isAvatarVaultOpen, setIsAvatarVaultOpen] = useState(false);
  const [isTeleprompterOpen, setIsTeleprompterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isTelegramOpen, setIsTelegramOpen] = useState(false);

  // Notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Avatar Management
  const handleSaveAvatar = (newAvatar: AvatarProfile) => {
    setAvatars((prev) => {
      const idx = prev.findIndex((a) => a.id === newAvatar.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = newAvatar;
        return updated;
      }
      return [newAvatar, ...prev];
    });
    setActiveAvatarId(newAvatar.id);
    showToast(`Avatar "${newAvatar.name}" berhasil disimpan & diaktifkan!`);
  };

  const handleDeleteAvatar = (id: string) => {
    setAvatars((prev) => prev.filter((a) => a.id !== id));
    if (activeAvatarId === id) {
      const remaining = avatars.filter((a) => a.id !== id);
      if (remaining.length > 0) setActiveAvatarId(remaining[0].id);
    }
    showToast('Avatar berhasil dihapus dari Vault.');
  };

  // File Reference Management
  const handleAddReference = (file: ReferenceFile) => {
    setReferences((prev) => [file, ...prev]);
  };

  const handleRemoveReference = (id: string) => {
    setReferences((prev) => prev.filter((r) => r.id !== id));
  };

  const handleToggleReference = (id: string) => {
    setReferences((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  // Preset Scenario Handler
  const handleSelectPresetScenario = (scenario: (typeof PRESET_INPUT_SCENARIOS)[0]) => {
    setTopic(scenario.topic);
    setProductName(scenario.productName);
    setKeyBenefits(scenario.keyBenefits);
    setTargetAudience(scenario.targetAudience);
    setStorytellingAngle(scenario.storytellingAngle);
    setPlatform(scenario.platform);
    setCtaGoal(scenario.ctaGoal);
    if (scenario.pastedText) {
      setPastedText(scenario.pastedText);
    }
    showToast(`Skenario preset "${scenario.label}" berhasil dimuat!`);
  };

  // Reset Form
  const handleReset = () => {
    setTopic('');
    setProductName('');
    setKeyBenefits('');
    setTargetAudience('');
    setCtaGoal('Klik link di bio sekarang!');
    setPastedText('');
    setReferences([]);
    setResult(null);
    setErrorMessage(null);
    showToast('Formulir berhasil direset.');
  };

  // Send to Telegram Bot Directly
  const handleDirectSendToTelegram = async (customResult?: UgcScriptResult) => {
    const payloadResult = customResult || result;
    if (!payloadResult) {
      showToast('Belum ada skrip untuk dikirim.');
      return;
    }

    if (!telegramChatId.trim()) {
      setIsTelegramOpen(true);
      showToast('Masukkan Chat ID Telegram Anda untuk menerima skrip.');
      return;
    }

    setIsSendingToTelegram(true);
    try {
      const res = await fetch('/api/telegram/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId: telegramChatId.trim(),
          result: payloadResult,
          avatarProfile: activeAvatar
        })
      });

      const data = await res.json();
      if (data.ok) {
        showToast('✅ Skrip UGC berhasil dikirim ke Telegram Bot xAI-Gen!');
      } else {
        showToast(`Gagal kirim ke Telegram: ${data.error || 'Cek Chat ID'}`);
      }
    } catch (e: any) {
      showToast(`Error kirim Telegram: ${e.message}`);
    } finally {
      setIsSendingToTelegram(false);
    }
  };

  // Generate UGC Content
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setErrorMessage(null);

    const activeRefs = references.filter((r) => r.active).map((r) => ({
      fileName: r.name,
      fileType: r.type,
      contentSummary: r.textSnippet || (r.type === 'image' ? 'Image Visual Asset' : 'Media Reference')
    }));

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          productName,
          keyBenefits,
          targetAudience,
          storytellingAngle,
          platform,
          ctaGoal,
          avatarProfile: activeAvatar,
          referenceContexts: activeRefs,
          pastedTextContext: pastedText.trim()
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned error code: ${response.status}`);
      }

      const data = await response.json();
      
      // Sanitize and ensure safe defaults so rendering never crashes
      const safeData: UgcScriptResult = {
        title: data?.title || `UGC Viral Blueprint: ${topic}`,
        oneLinerSummary: data?.oneLinerSummary || 'Skrip video UGC 30 detik siap rekam.',
        durationSeconds: data?.durationSeconds || 30,
        viralScore: {
          overall: data?.viralScore?.overall ?? 92,
          hookStrength: data?.viralScore?.hookStrength ?? 94,
          emotionalPull: data?.viralScore?.emotionalPull ?? 89,
          curiosityGap: data?.viralScore?.curiosityGap ?? 91,
          ctaClarity: data?.viralScore?.ctaClarity ?? 93,
          retentionProbability: data?.viralScore?.retentionProbability ?? 90,
          verdict: data?.viralScore?.verdict || 'VIRAL POTENTIAL: HIGH (Grade A+)',
          psychologicalTriggers: Array.isArray(data?.viralScore?.psychologicalTriggers) ? data.viralScore.psychologicalTriggers : ['Pattern Interrupt', 'Loss Aversion'],
          actionableTips: Array.isArray(data?.viralScore?.actionableTips) ? data.viralScore.actionableTips : ['Gunakan gestur cepat di 3 detik awal']
        },
        hookVariations: Array.isArray(data?.hookVariations) && data.hookVariations.length > 0 ? data.hookVariations : [
          {
            id: 'h1',
            label: 'Contrarian Take',
            hookText: `Jangan coba ${topic} sebelum tahu rahasia ini!`,
            visualAction: 'Kreator melambaikan tangan stop ke kamera',
            audioCue: 'Vinyl scratch',
            psychologicalWhy: 'Memicu loss aversion'
          }
        ],
        primaryHook: data?.primaryHook || `Stop scroll! Ini rahasia ${topic}`,
        scenes: Array.isArray(data?.scenes) && data.scenes.length > 0 ? data.scenes : [
          {
            sceneNumber: 1,
            timeframe: '00:00 - 00:03',
            phase: 'Hook',
            spokenDialogue: data?.primaryHook || `Stop scroll! Ini rahasia ${topic}`,
            visualAction: 'Close-up ekspresi kaget',
            cameraAngle: 'Selfie handheld',
            onScreenText: 'STOP SCROLL! ⚠️',
            aiImagePrompt: `${activeAvatar?.visualPrompt || 'UGC creator'}, 9:16 vertical`,
            soundFx: 'Whoosh'
          }
        ],
        fullSpokenScript: data?.fullSpokenScript || data?.primaryHook || '',
        estimatedWordCount: data?.estimatedWordCount || 85,
        readingPaceWpm: data?.readingPaceWpm || 165,
        caption: {
          headline: data?.caption?.headline || 'Hasilnya beneran di luar ekspektasi! ✨',
          body: data?.caption?.body || 'Tonton videonya sampai habis dan buktiin sendiri!',
          callToAction: data?.caption?.callToAction || 'Cek link bio sekarang sebelum kehabisan!',
          pinnedComment: data?.caption?.pinnedComment || 'Tanya-tanya di kolom komentar ya!'
        },
        hashtags: {
          nicheTags: Array.isArray(data?.hashtags?.nicheTags) ? data.hashtags.nicheTags : ['#ugcreview', '#tips'],
          broadTags: Array.isArray(data?.hashtags?.broadTags) ? data.hashtags.broadTags : ['#fyp', '#trending'],
          trendingKeywords: Array.isArray(data?.hashtags?.trendingKeywords) ? data.hashtags.trendingKeywords : ['review jujur'],
          suggestedAudioStyle: data?.hashtags?.suggestedAudioStyle || 'Upbeat Lo-Fi 120 BPM'
        },
        platformNotes: {
          platform: platform,
          bestPostingTime: data?.platformNotes?.bestPostingTime || '12:00 - 13:30 WIB atau 19:00 - 21:30 WIB',
          thumbnailAdvice: data?.platformNotes?.thumbnailAdvice || 'Wajah ekspresi kaget avatar + teks kontras tebal',
          firstCommentStrategy: data?.platformNotes?.firstCommentStrategy || 'Sematkan pertanyaan interaktif dalam 5 menit pertama'
        }
      };

      setResult(safeData);
      showToast('UGC Viral Blueprint 30 Detik berhasil digenerasi!');

      // If auto-send is enabled and Chat ID is present, send automatically!
      if (autoSendTelegram && telegramChatId.trim()) {
        handleDirectSendToTelegram(safeData);
      }

      // Smooth scroll to results
      setTimeout(() => {
        const el = document.getElementById('results-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err: any) {
      console.error('Generation error:', err);
      setErrorMessage(err.message || 'Terjadi kesalahan saat memproses skrip UGC.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Apply A/B Testing Hook to Main Script
  const handleApplyHook = (hook: HookVariation) => {
    if (!result) return;

    const oldHook = result.primaryHook;
    const newHook = hook.hookText;

    const updatedScenes = [...result.scenes];
    if (updatedScenes.length > 0) {
      updatedScenes[0] = {
        ...updatedScenes[0],
        spokenDialogue: newHook,
        visualAction: hook.visualAction,
        soundFx: hook.audioCue
      };
    }

    const updatedFullScript = result.fullSpokenScript.includes(oldHook)
      ? result.fullSpokenScript.replace(oldHook, newHook)
      : `${newHook} ${result.fullSpokenScript}`;

    setResult({
      ...result,
      primaryHook: newHook,
      scenes: updatedScenes,
      fullSpokenScript: updatedFullScript,
      viralScore: {
        ...result.viralScore,
        hookStrength: Math.min(99, result.viralScore.hookStrength + 2),
        overall: Math.min(98, result.viralScore.overall + 1)
      }
    });

    showToast(`Opsi Hook "${hook.label}" berhasil diterapkan ke naskah utama!`);
  };

  // Copy all visual prompts for Midjourney / Kling / Runway
  const handleCopyAllScenesPrompt = () => {
    if (!result) return;
    const prompts = result.scenes
      .map((s) => `[Scene ${s.sceneNumber} (${s.timeframe})]: ${s.aiImagePrompt}`)
      .join('\n\n');
    navigator.clipboard.writeText(prompts);
    showToast('Seluruh prompt visual 5 adegan berhasil disalin!');
  };

  return (
    <ErrorBoundary fallbackTitle="Terjadi Kesalahan pada Halaman Utama">
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-500/30 selection:text-rose-200">
        
        {/* Navbar */}
        <Navbar
          activeAvatar={activeAvatar}
          onOpenAvatarVault={() => setIsAvatarVaultOpen(true)}
          onOpenTeleprompter={() => setIsTeleprompterOpen(true)}
          onOpenExport={() => setIsExportOpen(true)}
          onOpenTelegram={() => setIsTelegramOpen(true)}
          onReset={handleReset}
          hasResult={!!result}
          avatarCount={avatars.length}
          hasTelegramChatId={!!telegramChatId.trim()}
        />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-slate-100 shadow-2xl animate-in slide-in-from-bottom duration-200 text-xs sm:text-sm font-semibold max-w-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Main Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 flex-1 w-full">
          
          {/* Hero Banner Header with Quick Telegram Setup Button */}
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950/40 border border-slate-800 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> Studio Konten UGC Viral & Generator Avatar Konsisten
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Bikin Konten Video 30 Detik Berdaya Viral Tinggi dengan{' '}
                  <span className="bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    Avatar Digital Konsisten
                  </span>
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Hubungkan bahan produk, pilih formula penceritaan psikologis, dan dapatkan skrip teroptimasi retensi, skor viralitas 1-100, variasi hook A/B testing, naskah shot-by-shot, serta prompt gambar/video avatar siap render.
                </p>
              </div>

              {/* Telegram Bot Quick Widget */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-sky-500/30 shrink-0 w-full md:w-72 shadow-lg backdrop-blur-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-sky-400 -rotate-12" />
                    Telegram Bot
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono">
                    xAI-Gen
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mb-3 leading-snug">
                  {telegramChatId ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Terhubung: {telegramChatId}
                    </span>
                  ) : (
                    'Hubungkan Chat ID untuk menerima skrip langsung di Telegram!'
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => setIsTelegramOpen(true)}
                  className="w-full py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  {telegramChatId ? 'Kelola Telegram Bot' : 'Hubungkan Telegram Bot'}
                </button>
              </div>
            </div>
          </div>

          {/* Feature 1: Multi-Method Input Hub */}
          <section>
            <MultiInputHub
              references={references}
              onAddReference={handleAddReference}
              onRemoveReference={handleRemoveReference}
              onToggleReference={handleToggleReference}
              pastedText={pastedText}
              onPastedTextChange={setPastedText}
              onSelectPresetScenario={handleSelectPresetScenario}
            />
          </section>

          {/* Feature 2 & 3: Script Generator Form */}
          <section>
            <ScriptGeneratorForm
              topic={topic}
              onTopicChange={setTopic}
              productName={productName}
              onProductNameChange={setProductName}
              keyBenefits={keyBenefits}
              onKeyBenefitsChange={setKeyBenefits}
              targetAudience={targetAudience}
              onTargetAudienceChange={setTargetAudience}
              storytellingAngle={storytellingAngle}
              onStorytellingAngleChange={setStorytellingAngle}
              platform={platform}
              onPlatformChange={setPlatform}
              ctaGoal={ctaGoal}
              onCtaGoalChange={setCtaGoal}
              activeAvatar={activeAvatar}
              onOpenAvatarVault={() => setIsAvatarVaultOpen(true)}
              isGenerating={isGenerating}
              onSubmit={handleGenerate}
            />
          </section>

          {/* Error message banner */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Generated Results Showcase */}
          {result && (
            <ErrorBoundary fallbackTitle="Kendala saat menampilkan hasil UGC">
              <div id="results-section" className="space-y-6 pt-4 animate-in fade-in duration-300">
                
                {/* Results Title Banner with Telegram Action */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">
                      Hasil Generasi Berhasil
                    </span>
                    <h2 className="text-base sm:text-xl font-bold text-white">
                      {result.title}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {result.oneLinerSummary}
                    </p>
                  </div>

                  {/* Actions Header */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Telegram Send Button */}
                    <button
                      type="button"
                      onClick={() => handleDirectSendToTelegram()}
                      disabled={isSendingToTelegram}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-sky-500/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      title="Kirim naskah lengkap ke Telegram bot xAI-Gen"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSendingToTelegram ? 'Mengirim...' : 'Kirim ke Telegram Bot'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsTeleprompterOpen(true)}
                      className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Buka Teleprompter 9:16
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsExportOpen(true)}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all cursor-pointer"
                    >
                      Ekspor JSON / CSV
                    </button>
                  </div>
                </div>

                {/* Feature 4a: Viral Hook & Psychology Score */}
                <section>
                  <ViralScoreCard score={result.viralScore} />
                </section>

                {/* Feature 4b: A/B Testing Hook Variations */}
                <section>
                  <HookABTestingCard
                    hooks={result.hookVariations}
                    activeHookText={result.primaryHook}
                    onApplyHook={handleApplyHook}
                    activeAvatar={activeAvatar}
                  />
                </section>

                {/* Feature 3 (Output): Shot-by-Shot Timeline (30s) */}
                <section>
                  <ShotByShotTimeline
                    scenes={result.scenes}
                    durationSeconds={result.durationSeconds}
                    estimatedWordCount={result.estimatedWordCount}
                    readingPaceWpm={result.readingPaceWpm}
                    activeAvatar={activeAvatar}
                    onCopyAllScenesPrompt={handleCopyAllScenesPrompt}
                  />
                </section>

                {/* Feature 4c, 4d & 5: Caption, Hashtags, SEO Keywords, Platform Optimizer */}
                <section>
                  <CaptionAndHashtags
                    caption={result.caption}
                    hashtags={result.hashtags}
                    platformNotes={result.platformNotes}
                  />
                </section>

              </div>
            </ErrorBoundary>
          )}

        </main>

        {/* Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>AI UGC Viral Content & Avatar Studio • Format Video Pendek 30 Detik</span>
            </div>
            <span>Ditenagai Gemini 3.8 Flash, Telegram Bot xAI-Gen & Desain Konsistensi Persona Digital</span>
          </div>
        </footer>

        {/* Modals */}
        <AvatarVaultModal
          isOpen={isAvatarVaultOpen}
          onClose={() => setIsAvatarVaultOpen(false)}
          avatars={avatars}
          activeAvatarId={activeAvatarId}
          onSelectAvatar={(id) => {
            setActiveAvatarId(id);
            const av = avatars.find((a) => a.id === id);
            if (av) showToast(`Avatar aktif diubah ke "${av.name}"`);
          }}
          onSaveAvatar={handleSaveAvatar}
          onDeleteAvatar={handleDeleteAvatar}
        />

        <TelegramModal
          isOpen={isTelegramOpen}
          onClose={() => setIsTelegramOpen(false)}
          result={result}
          activeAvatar={activeAvatar}
          telegramChatId={telegramChatId}
          onSaveChatId={handleSaveTelegramChatId}
          autoSendTelegram={autoSendTelegram}
          onToggleAutoSend={handleToggleAutoSend}
          onSendSuccess={(msg) => showToast(msg)}
        />

        {result && (
          <>
            <TeleprompterModal
              isOpen={isTeleprompterOpen}
              onClose={() => setIsTeleprompterOpen(false)}
              result={result}
              activeAvatar={activeAvatar}
            />

            <ExportModal
              isOpen={isExportOpen}
              onClose={() => setIsExportOpen(false)}
              result={result}
              activeAvatar={activeAvatar}
            />
          </>
        )}

      </div>
    </ErrorBoundary>
  );
}
