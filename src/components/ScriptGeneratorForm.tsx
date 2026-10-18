import React from 'react';
import { 
  Sparkles, 
  Flame, 
  TrendingUp, 
  HeartHandshake, 
  AlertTriangle, 
  Key, 
  ShieldCheck, 
  Share2, 
  Send, 
  User, 
  Check, 
  Clock, 
  Target,
  Layers,
  HelpCircle
} from 'lucide-react';
import { StorytellingAngle, TargetPlatform, AvatarProfile } from '../types';

interface ScriptGeneratorFormProps {
  topic: string;
  onTopicChange: (val: string) => void;
  productName: string;
  onProductNameChange: (val: string) => void;
  keyBenefits: string;
  onKeyBenefitsChange: (val: string) => void;
  targetAudience: string;
  onTargetAudienceChange: (val: string) => void;
  storytellingAngle: StorytellingAngle;
  onStorytellingAngleChange: (angle: StorytellingAngle) => void;
  platform: TargetPlatform;
  onPlatformChange: (platform: TargetPlatform) => void;
  ctaGoal: string;
  onCtaGoalChange: (val: string) => void;
  activeAvatar: AvatarProfile | null;
  onOpenAvatarVault: () => void;
  isGenerating: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const STORYTELLING_ANGLES: Array<{
  id: StorytellingAngle;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ReactNode;
  color: string;
}> = [
  {
    id: 'contrarian',
    title: 'Contrarian Take',
    subtitle: 'Interupsi pola negatif ("Stop lakukan ini!", membongkar mitos umum industri)',
    badge: 'Tertinggi Retensi',
    icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
    color: 'border-amber-500/40 hover:border-amber-500 text-amber-300'
  },
  {
    id: 'personal_story',
    title: 'Personal Story Hook',
    subtitle: 'Curhat emosional & jujur ("Aku hampir nangis gara-gara masalah ini...")',
    badge: 'Membangun Trust',
    icon: <HeartHandshake className="w-4 h-4 text-pink-400" />,
    color: 'border-pink-500/40 hover:border-pink-500 text-pink-300'
  },
  {
    id: 'data_evidence',
    title: 'Data & Evidence Angle',
    subtitle: 'Fakta mengejutkan & riset ("89% orang salah cara menggunakannya")',
    badge: 'Otoritas Tinggi',
    icon: <TrendingUp className="w-4 h-4 text-cyan-400" />,
    color: 'border-cyan-500/40 hover:border-cyan-500 text-cyan-300'
  },
  {
    id: 'dramatic_reality',
    title: 'Dramatic Reality TV Vibe',
    subtitle: 'Ketegangan & plot twist cepat ("Aku nemu hal aneh yang bikin merinding")',
    badge: 'Hype Maksimal',
    icon: <Flame className="w-4 h-4 text-rose-400" />,
    color: 'border-rose-500/40 hover:border-rose-500 text-rose-300'
  },
  {
    id: 'secret_hack',
    title: 'Secret Insider Hack',
    subtitle: 'Trik rahasia yang selama ini di-gatekeep ("Jangan kasih tahu siapa-siapa")',
    badge: 'Tinggi Shares & Saves',
    icon: <Key className="w-4 h-4 text-purple-400" />,
    color: 'border-purple-500/40 hover:border-purple-500 text-purple-300'
  },
  {
    id: 'skeptic_believer',
    title: 'Skeptic to Believer',
    subtitle: 'Uji coba produk dari ragu/nyangka bohong hingga jadi pelanggan setia',
    badge: 'Tinggi Konversi',
    icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
    color: 'border-emerald-500/40 hover:border-emerald-500 text-emerald-300'
  }
];

const PLATFORMS: Array<{ id: TargetPlatform; name: string; tag: string }> = [
  { id: 'tiktok', name: 'TikTok', tag: 'Fast Paced, Sound Centric' },
  { id: 'reels', name: 'IG Reels', tag: 'Aesthetic, Clean Bio Link' },
  { id: 'shorts', name: 'YT Shorts', tag: 'Loop Retention, Search SEO' },
  { id: 'facebook', name: 'FB Groups/Pages', tag: 'Relatable Story, Older Demographics' },
  { id: 'twitter', name: 'X / Twitter', tag: 'Thread Hook, Punchy Lines' },
  { id: 'linkedin', name: 'LinkedIn Video', tag: 'Professional Growth & Insight' }
];

export const ScriptGeneratorForm: React.FC<ScriptGeneratorFormProps> = ({
  topic,
  onTopicChange,
  productName,
  onProductNameChange,
  keyBenefits,
  onKeyBenefitsChange,
  targetAudience,
  onTargetAudienceChange,
  storytellingAngle,
  onStorytellingAngleChange,
  platform,
  onPlatformChange,
  ctaGoal,
  onCtaGoalChange,
  activeAvatar,
  onOpenAvatarVault,
  isGenerating,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl relative backdrop-blur-sm space-y-5">
      
      {/* Header with Active Avatar Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-black">
              2
            </span>
            Generator Skrip UGC & Konten Viral 30 Detik
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Diformulasikan dengan psikologi retensi 3-detik pertama & naskah shot-by-shot
          </p>
        </div>

        {/* Selected Avatar Pill with Quick Change */}
        <div 
          onClick={onOpenAvatarVault}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition-all group self-start sm:self-auto"
        >
          {activeAvatar?.avatarUrl ? (
            <img 
              src={activeAvatar.avatarUrl} 
              alt={activeAvatar.name}
              className="w-7 h-7 rounded-lg object-cover ring-1 ring-purple-500 group-hover:scale-105 transition-transform" 
            />
          ) : (
            <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
              <User className="w-4 h-4" />
            </div>
          )}
          <div className="text-left">
            <div className="text-[10px] text-slate-400 font-medium">Avatar Aktif:</div>
            <div className="text-xs font-bold text-slate-200 group-hover:text-purple-400 transition-colors flex items-center gap-1">
              {activeAvatar?.name || 'Pilih Avatar'}
              <span className="text-[10px] text-slate-400 font-normal">({activeAvatar?.aspectRatio || '9:16'})</span>
            </div>
          </div>
          <span className="text-[10px] text-purple-400 font-semibold underline ml-1">
            Ganti
          </span>
        </div>
      </div>

      {/* Row 1: Topic & Product Name */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-200 mb-1.5">
            Topik Produk / Cerita Konten <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            required
            value={topic}
            onChange={(e) => onTopicChange(e.target.value)}
            placeholder="Contoh: Serum Retinol Gentle untuk Pemula Tanpa Efek Kemerahan"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5">
            Nama Brand / Produk
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => onProductNameChange(e.target.value)}
            placeholder="Contoh: LumiGlow Serum"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Row 2: Key Benefits & Target Audience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5">
            Keunggulan Utama / Unique Selling Proposition (USP)
          </label>
          <input
            type="text"
            value={keyBenefits}
            onChange={(e) => onKeyBenefitsChange(e.target.value)}
            placeholder="Contoh: Hasil pori rapat 7 hari, nano-encapsulated, tidak ada cekit-cekit"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center justify-between">
            <span>Target Audiens Spesifik</span>
            <span className="text-[10px] text-slate-400 font-normal">Demografi & Pain Point</span>
          </label>
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => onTargetAudienceChange(e.target.value)}
            placeholder="Contoh: Wanita 20-30th, kulit sensitif berjerawat, takut mencoba retinol"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Storytelling Angle Selector Cards */}
      <div>
        <label className="block text-xs font-semibold text-slate-200 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            Sudut Pandang Penceritaan (Storytelling Angle)
          </span>
          <span className="text-[10px] text-slate-400 font-normal">
            Pilih formula psikologi hook yang paling cocok
          </span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {STORYTELLING_ANGLES.map((angle) => {
            const isSelected = storytellingAngle === angle.id;
            return (
              <div
                key={angle.id}
                onClick={() => onStorytellingAngleChange(angle.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all text-left flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-slate-950 border-rose-500 shadow-md shadow-rose-500/10 ring-1 ring-rose-500'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                      {angle.icon}
                      <span>{angle.title}</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                      {angle.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                    {angle.subtitle}
                  </p>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-850 flex items-center justify-between text-[10px]">
                  <span className={isSelected ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                    {isSelected ? '✓ Terpilih' : 'Klik untuk memilih'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Platform & CTA Goal Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Platform Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5">
            Platform Tujuan (Format & Algoritma Khusus)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {PLATFORMS.map((p) => {
              const isSelected = platform === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onPlatformChange(p.id)}
                  className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-all text-center flex flex-col items-center justify-center ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                  }`}
                >
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Call to Action Goal */}
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center justify-between">
            <span>Tujuan Call to Action (CTA)</span>
            <span className="text-[10px] text-slate-400">Detik 25 - 30</span>
          </label>
          <input
            type="text"
            value={ctaGoal}
            onChange={(e) => onCtaGoalChange(e.target.value)}
            placeholder="Contoh: Klik keranjang kuning sebelum flash sale berakhir"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
          <div className="flex gap-2 mt-1.5">
            {['Keranjang Kuning', 'Link di Bio', 'Komen "MAU"', 'Share ke Teman'].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => onCtaGoalChange(`Klik ${preset} sekarang!`)}
                className="text-[10px] text-slate-400 hover:text-slate-200 underline font-medium"
              >
                +{preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isGenerating || !topic.trim()}
          className={`w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-xl ${
            isGenerating || !topic.trim()
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white shadow-rose-500/20 hover:shadow-rose-500/30 cursor-pointer active:scale-[0.99]'
          }`}
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin text-rose-300" />
              <span>Memproses Algoritma Viral & Naskah UGC 30 Detik...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Hasilkan UGC Viral Script, Viral Score & Visual Prompt</span>
            </>
          )}
        </button>
      </div>

    </form>
  );
};
