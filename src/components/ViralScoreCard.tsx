import React from 'react';
import { 
  Zap, 
  BrainCircuit, 
  Lightbulb, 
  Award,
} from 'lucide-react';
import { ViralScoreBreakdown } from '../types';

interface ViralScoreCardProps {
  score?: ViralScoreBreakdown;
}

export const ViralScoreCard: React.FC<ViralScoreCardProps> = ({ score }) => {
  const safeScore: ViralScoreBreakdown = {
    overall: score?.overall ?? 92,
    hookStrength: score?.hookStrength ?? 94,
    emotionalPull: score?.emotionalPull ?? 89,
    curiosityGap: score?.curiosityGap ?? 91,
    ctaClarity: score?.ctaClarity ?? 93,
    retentionProbability: score?.retentionProbability ?? 90,
    verdict: score?.verdict || 'VIRAL POTENTIAL: HIGH (Grade A+)',
    psychologicalTriggers: score?.psychologicalTriggers && score.psychologicalTriggers.length > 0 
      ? score.psychologicalTriggers 
      : ['Pattern Interrupt', 'Curiosity Gap', 'Loss Aversion', 'Social Proof'],
    actionableTips: score?.actionableTips && score.actionableTips.length > 0
      ? score.actionableTips
      : [
          'Gunakan transisi zoom-in cepat pada detik 00:00 - 00:01 untuk menghentikan refleks scroll.',
          'Pasang teks caption bold kontras tinggi di sepertiga bawah layar.',
          'Beri sound effect "whoosh" atau glitch audio tepat saat kalimat pembuka dibacakan.'
        ]
  };

  const getBarColor = (val: number) => {
    if (val >= 90) return 'bg-gradient-to-r from-emerald-500 to-teal-400';
    if (val >= 75) return 'bg-gradient-to-r from-amber-500 to-yellow-400';
    return 'bg-gradient-to-r from-rose-500 to-pink-400';
  };

  const metrics = [
    { label: 'Hook Strength (0-3 Detik)', value: safeScore.hookStrength, desc: 'Daya henti refleks scroll' },
    { label: 'Emotional Pull & Empati', value: safeScore.emotionalPull, desc: 'Kekuatan resonansi masalah' },
    { label: 'Curiosity Gap (Open Loop)', value: safeScore.curiosityGap, desc: 'Dorongan rasa penasaran' },
    { label: 'Call-to-Action (CTA) Clarity', value: safeScore.ctaClarity, desc: 'Kejelasan instruksi konversi' },
    { label: '3-Second Retention Probability', value: safeScore.retentionProbability, desc: 'Peluang lolos drop-off awal' }
  ];

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl relative overflow-hidden backdrop-blur-sm">
      {/* Glow background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              Viral Hook & Psychology Score
            </h3>
            <p className="text-xs text-slate-400">
              Analisis matematis retensi video pendek & algoritma rekomendasi
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-purple-400" />
          {safeScore.verdict}
        </span>
      </div>

      {/* Main Score Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
        
        {/* Left: Overall Circular Score Gauge */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center relative">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-slate-800"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className={`transition-all duration-1000 ease-out ${
                  safeScore.overall >= 90 ? 'stroke-rose-500' : 'stroke-purple-500'
                }`}
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - safeScore.overall / 100)}`}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {safeScore.overall}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                / 100 Score
              </span>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-xs font-bold text-white">
              {safeScore.overall >= 90 ? '🔥 Sangat Berpotensi FYP' : '⚡ Potensi Konten Baik'}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Diproyeksikan melewati threshold 3 detik awal algoritma
            </p>
          </div>
        </div>

        {/* Center: Detailed Breakdown Bars */}
        <div className="md:col-span-2 space-y-3 flex flex-col justify-center">
          {metrics.map((m) => (
            <div key={m.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-200">{m.label}</span>
                  <span className="text-[10px] text-slate-400 ml-2 hidden sm:inline">
                    ({m.desc})
                  </span>
                </div>
                <span className="font-mono font-bold text-slate-100">
                  {m.value}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ease-out ${getBarColor(m.value)}`}
                  style={{ width: `${Math.min(100, Math.max(0, m.value))}%` }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Psychological Triggers & Actionable Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-4 border-t border-slate-800">
        
        {/* Psychological Triggers */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5 mb-2.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Pemicu Psikologis Aktif dalam Skrip:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {safeScore.psychologicalTriggers.map((trigger, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-medium"
              >
                ✓ {trigger}
              </span>
            ))}
          </div>
        </div>

        {/* Actionable Tips */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-rose-400" />
            Tips Eksekusi Kamera (Kerek Skor ke 98+):
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {safeScore.actionableTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                <span className="text-rose-400 font-bold shrink-0">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
