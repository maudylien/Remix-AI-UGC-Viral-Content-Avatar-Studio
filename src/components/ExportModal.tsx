import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  X, 
  FileJson, 
  FileSpreadsheet, 
  FileText, 
  Sparkles,
  Share2,
  Workflow
} from 'lucide-react';
import { UgcScriptResult, AvatarProfile } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: UgcScriptResult;
  activeAvatar: AvatarProfile | null;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  result,
  activeAvatar
}) => {
  const [activeTab, setActiveTab] = useState<'json' | 'csv' | 'markdown'>('json');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Build JSON Automation Payload (for Make.com / n8n / Zapier)
  const jsonPayload = {
    generated_at: new Date().toISOString(),
    workflow_compatibility: ['Make.com', 'n8n', 'Zapier', 'Airtable'],
    title: result.title,
    duration_seconds: result.durationSeconds,
    primary_hook: result.primaryHook,
    avatar_profile: activeAvatar ? {
      name: activeAvatar.name,
      tagline: activeAvatar.tagline,
      gender: activeAvatar.gender,
      aspect_ratio: activeAvatar.aspectRatio,
      consistency_seed: activeAvatar.consistencySeed,
      visual_prompt: activeAvatar.visualPrompt,
      negative_prompt: activeAvatar.negativePrompt,
      persona_style: activeAvatar.personaStyle,
      tone: activeAvatar.tone
    } : null,
    viral_score: result.viralScore,
    hook_variations: result.hookVariations,
    scenes: result.scenes.map((s) => ({
      scene_number: s.sceneNumber,
      timeframe: s.timeframe,
      phase: s.phase,
      spoken_dialogue: s.spokenDialogue,
      camera_action: s.visualAction,
      camera_angle: s.cameraAngle,
      on_screen_text: s.onScreenText,
      ai_image_prompt: s.aiImagePrompt,
      sound_fx: s.soundFx
    })),
    full_spoken_script: result.fullSpokenScript,
    caption: result.caption,
    hashtags: result.hashtags,
    platform_notes: result.platformNotes
  };

  const jsonString = JSON.stringify(jsonPayload, null, 2);

  // Build CSV Format
  const escapeCsv = (str: string) => `"${(str || '').replace(/"/g, '""')}"`;
  const csvHeaders = ['Scene_Number', 'Timeframe', 'Phase', 'Spoken_Dialogue', 'On_Screen_Text', 'Visual_Action', 'AI_Image_Prompt', 'Sound_FX'];
  const csvRows = result.scenes.map((s) => [
    s.sceneNumber,
    escapeCsv(s.timeframe),
    escapeCsv(s.phase),
    escapeCsv(s.spokenDialogue),
    escapeCsv(s.onScreenText),
    escapeCsv(s.visualAction),
    escapeCsv(s.aiImagePrompt),
    escapeCsv(s.soundFx)
  ].join(','));
  const csvString = [csvHeaders.join(','), ...csvRows].join('\n');

  // Build Markdown format
  const markdownString = `# ${result.title}
**Durasi:** ${result.durationSeconds} Detik | **Avatar:** ${activeAvatar?.name || 'Kreator UGC'} (#${activeAvatar?.consistencySeed || '894312'})
**Viral Score:** ${result.viralScore.overall}/100 (${result.viralScore.verdict})

## 🎣 Primary Hook (0-3 Detik)
"${result.primaryHook}"

## 🎬 Shot-by-Shot Timeline
${result.scenes.map((s) => `### Scene ${s.sceneNumber} (${s.timeframe}) - ${s.phase}
- **Dialog Lisan:** "${s.spokenDialogue}"
- **Aksi Kamera:** ${s.visualAction} (${s.cameraAngle})
- **Teks di Layar:** ${s.onScreenText}
- **AI Prompt:** \`${s.aiImagePrompt}\`
- **Audio Cue:** ${s.soundFx}
`).join('\n')}

## 📝 Naskah Lengkap Lisan
${result.fullSpokenScript}

## 📱 Caption & Tagar
${result.caption.headline}

${result.caption.body}

${result.caption.callToAction}

${result.hashtags.nicheTags.join(' ')} ${result.hashtags.broadTags.join(' ')}
`;

  const getActiveContent = () => {
    if (activeTab === 'json') return jsonString;
    if (activeTab === 'csv') return csvString;
    return markdownString;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = getActiveContent();
    const mime = activeTab === 'json' ? 'application/json' : activeTab === 'csv' ? 'text/csv' : 'text/markdown';
    const ext = activeTab === 'json' ? 'json' : activeTab === 'csv' ? 'csv' : 'md';
    const blob = new Blob([content], { type: `${mime};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ugc-viral-${result.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.${ext}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl relative my-auto overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Ekspor Data & Workflow Automasi
              </h3>
              <p className="text-xs text-slate-400">
                Unduh atau salin format JSON terstruktur (Make.com, n8n, Zapier) atau CSV tabel
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

        {/* Tabs Bar */}
        <div className="flex items-center justify-between px-5 pt-3 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('json')}
              className={`px-3 py-2 text-xs font-bold rounded-t-xl flex items-center gap-1.5 transition-colors border-b-2 ${
                activeTab === 'json'
                  ? 'border-indigo-500 text-indigo-400 bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileJson className="w-4 h-4" />
              <span>JSON (n8n / Make.com)</span>
            </button>

            <button
              onClick={() => setActiveTab('csv')}
              className={`px-3 py-2 text-xs font-bold rounded-t-xl flex items-center gap-1.5 transition-colors border-b-2 ${
                activeTab === 'csv'
                  ? 'border-emerald-500 text-emerald-400 bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>CSV Spreadsheet</span>
            </button>

            <button
              onClick={() => setActiveTab('markdown')}
              className={`px-3 py-2 text-xs font-bold rounded-t-xl flex items-center gap-1.5 transition-colors border-b-2 ${
                activeTab === 'markdown'
                  ? 'border-rose-500 text-rose-400 bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Markdown / Dokumen</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 pb-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Tersalin!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Salin Teks
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Unduh File .{activeTab === 'markdown' ? 'md' : activeTab}
            </button>
          </div>
        </div>

        {/* Content Viewer */}
        <div className="p-5 overflow-y-auto flex-1 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed max-h-[50vh]">
          <pre className="whitespace-pre-wrap break-all select-all">
            {getActiveContent()}
          </pre>
        </div>

        {/* Footer info */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Workflow className="w-4 h-4 text-purple-400" />
            <span>Skema JSON siap pakai untuk integrasi webhook automasi video render tanpa coding ulang.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
