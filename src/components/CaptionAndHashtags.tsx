import React, { useState } from 'react';
import { 
  FileText, 
  Hash, 
  TrendingUp, 
  Copy, 
  Check, 
  MessageCircle, 
  Clock, 
  Volume2, 
  Target
} from 'lucide-react';
import { UgcCaption, UgcHashtags, PlatformNotes } from '../types';

interface CaptionAndHashtagsProps {
  caption?: UgcCaption;
  hashtags?: UgcHashtags;
  platformNotes?: PlatformNotes;
}

export const CaptionAndHashtags: React.FC<CaptionAndHashtagsProps> = ({
  caption,
  hashtags,
  platformNotes
}) => {
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);
  const [copiedComment, setCopiedComment] = useState(false);

  const safeHeadline = caption?.headline || 'Beneran nggak nyangka hasilnya bisa secepet ini! 😱✨';
  const safeBody = caption?.body || 'Jujur awalnya ragu banget buat nyoba, tapi setelah ngerasain sendiri perbedaannya, ini bener-bener game-changer.\n\nTonton videonya sampai habis dan buktiin sendiri!\n\nSave video ini biar nggak lupa pas mau checkout! 📌';
  const safeCta = caption?.callToAction || 'Cek promo spesial di link bio sekarang ya! 🚀';
  const safeComment = caption?.pinnedComment || '💬 Drop pertanyaan kalian di kolom komentar ya, bakal aku jawab satu-satu!';

  const nicheTags = (hashtags?.nicheTags && Array.isArray(hashtags.nicheTags)) ? hashtags.nicheTags : ['#ugcreview', '#solusicepat', '#racuntiktok'];
  const broadTags = (hashtags?.broadTags && Array.isArray(hashtags.broadTags)) ? hashtags.broadTags : ['#fyp', '#foryoupage', '#trending'];
  const trendingKeywords = (hashtags?.trendingKeywords && Array.isArray(hashtags.trendingKeywords)) ? hashtags.trendingKeywords : ['review jujur', 'rekomendasi produk', 'tips viral'];
  const audioStyle = hashtags?.suggestedAudioStyle || 'Upbeat Trending Lo-Fi Instrumental (115-125 BPM)';

  const bestPostingTime = platformNotes?.bestPostingTime || '12:00 - 13:30 WIB atau 19:00 - 21:30 WIB';
  const thumbnailAdvice = platformNotes?.thumbnailAdvice || 'Wajah ekspresi kaget avatar + teks tebal kontras di tengah';

  const fullCaptionText = `${safeHeadline}\n\n${safeBody}\n\n${safeCta}\n\n${nicheTags.join(' ')} ${broadTags.join(' ')}`;

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(fullCaptionText);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const handleCopyHashtags = () => {
    const tags = [...nicheTags, ...broadTags].join(' ');
    navigator.clipboard.writeText(tags);
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 2000);
  };

  const handleCopyComment = () => {
    navigator.clipboard.writeText(safeComment);
    setCopiedComment(true);
    setTimeout(() => setCopiedComment(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      
      {/* Left (7 cols): Ready-to-Post Caption */}
      <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl relative backdrop-blur-sm flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Teks Caption UGC Siap Posting
                </h3>
                <p className="text-xs text-slate-400">
                  Diformat dengan spasi ramah baca dan CTA konversi tinggi
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyCaption}
              className="px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-pink-600/20 transition-all cursor-pointer"
            >
              {copiedCaption ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" /> Tersalin!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Salin Caption Lengkap
                </>
              )}
            </button>
          </div>

          {/* Caption Box Preview */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-200 space-y-3 font-normal leading-relaxed whitespace-pre-line select-text">
            <div className="font-bold text-white text-sm sm:text-base border-b border-slate-850 pb-2">
              {safeHeadline}
            </div>

            <div>{safeBody}</div>

            <div className="font-semibold text-rose-300 pt-1">
              {safeCta}
            </div>

            <div className="pt-2 text-indigo-400 font-mono text-xs">
              {nicheTags.join(' ')} {broadTags.join(' ')}
            </div>
          </div>

          {/* Pinned Comment Box */}
          <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-850 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-300 block text-[11px]">
                  Rekomendasi Komentar Pertama (Sematkan):
                </span>
                <p className="text-slate-300 mt-0.5 font-medium">
                  {safeComment}
                </p>
              </div>
            </div>
            <button
              onClick={handleCopyComment}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs shrink-0 transition-colors"
              title="Salin komentar"
            >
              {copiedComment ? <Check className="w-3 h-3 text-emerald-400" /> : 'Salin'}
            </button>
          </div>
        </div>

        {/* Platform Strategy Notes */}
        <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-850">
            <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mb-0.5">
              <Clock className="w-3 h-3 text-amber-400" /> Jam Posting Optimal:
            </span>
            <span className="text-slate-200 font-medium text-[11px]">
              {bestPostingTime}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-850">
            <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mb-0.5">
              <Target className="w-3 h-3 text-purple-400" /> Trik Thumbnail / Cover:
            </span>
            <span className="text-slate-200 font-medium text-[11px] line-clamp-1">
              {thumbnailAdvice}
            </span>
          </div>
        </div>

      </div>

      {/* Right (5 cols): Auto-Hashtag & Trending Keyword Injector */}
      <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl relative backdrop-blur-sm flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                <Hash className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Hashtag & SEO Keywords
                </h3>
                <p className="text-xs text-slate-400">
                  Kombinasi tagar niche & kata kunci tren algoritma
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyHashtags}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              {copiedTags ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : 'Salin Tag'}
            </button>
          </div>

          {/* Niche Specific Tags */}
          <div className="mb-3.5">
            <span className="text-[11px] uppercase tracking-wider font-bold text-cyan-400 mb-1.5 block">
              Tagar Niche Bernilai Tinggi:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {nicheTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Broad Viral Tags */}
          <div className="mb-3.5">
            <span className="text-[11px] uppercase tracking-wider font-bold text-purple-400 mb-1.5 block">
              Tagar Viral Broad (FYP Booster):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {broadTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* In-Video SEO Trending Keywords */}
          <div className="mb-3.5">
            <span className="text-[11px] uppercase tracking-wider font-bold text-amber-400 mb-1.5 block flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Kata Kunci Tren untuk Text-on-Screen:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {trendingKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800 text-xs"
                >
                  &ldquo;{kw}&rdquo;
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Suggested Background Audio Style */}
        <div className="mt-4 pt-3 border-t border-slate-800 bg-slate-950/60 p-3 rounded-xl border border-slate-850">
          <div className="flex items-center gap-2 text-xs text-rose-300 font-bold mb-1">
            <Volume2 className="w-4 h-4 text-rose-400" />
            Rekomendasi BGM / Audio Trending:
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            {audioStyle}
          </p>
        </div>

      </div>

    </div>
  );
};
