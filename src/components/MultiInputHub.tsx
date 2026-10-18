import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Clipboard, 
  X, 
  Check, 
  Sparkles,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ReferenceFile } from '../types';
import { PRESET_INPUT_SCENARIOS } from '../data/presetAvatars';

interface MultiInputHubProps {
  references: ReferenceFile[];
  onAddReference: (file: ReferenceFile) => void;
  onRemoveReference: (id: string) => void;
  onToggleReference: (id: string) => void;
  pastedText: string;
  onPastedTextChange: (text: string) => void;
  onSelectPresetScenario: (scenario: (typeof PRESET_INPUT_SCENARIOS)[0]) => void;
}

export const MultiInputHub: React.FC<MultiInputHubProps> = ({
  references,
  onAddReference,
  onRemoveReference,
  onToggleReference,
  pastedText,
  onPastedTextChange,
  onSelectPresetScenario
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [pasteSuccessNotice, setPasteSuccessNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pasteBoxRef = useRef<HTMLTextAreaElement>(null);

  // Global paste handler to capture Ctrl+V even when outside text inputs
  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      // If user is typing in another regular input, ignore global capture
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || (activeEl.tagName === 'TEXTAREA' && activeEl !== pasteBoxRef.current))) {
        return;
      }

      if (e.clipboardData) {
        const items = e.clipboardData.items;
        let handled = false;

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            if (file) {
              handleFile(file);
              handled = true;
              showToast('Gambar dari Clipboard berhasil ditambahkan!');
              break;
            }
          }
        }

        if (!handled) {
          const text = e.clipboardData.getData('text');
          if (text && text.trim().length > 0) {
            onPastedTextChange(pastedText ? `${pastedText}\n${text}` : text);
            showToast('Teks dari Clipboard berhasil ditempel!');
          }
        }
      }
    };

    window.addEventListener('paste', handleGlobalPaste);
    return () => window.removeEventListener('paste', handleGlobalPaste);
  }, [pastedText]);

  const showToast = (msg: string) => {
    setPasteSuccessNotice(msg);
    setTimeout(() => setPasteSuccessNotice(null), 3000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach((file) => handleFile(file));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach((file) => handleFile(file));
      e.target.value = '';
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    const isDoc = file.type.includes('pdf') || file.type.includes('text') || file.type.includes('csv') || file.type.includes('json');

    const fileType = isImage ? 'image' : isVideo ? 'video' : isDoc ? 'document' : 'document';
    const sizeFormatted = (file.size / 1024 / 1024).toFixed(2) + ' MB';

    if (isImage) {
      reader.onload = () => {
        onAddReference({
          id: 'ref-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
          name: file.name,
          type: fileType,
          size: sizeFormatted,
          dataUrl: reader.result as string,
          active: true
        });
      };
      reader.readAsDataURL(file);
    } else if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      reader.onload = () => {
        const textContent = (reader.result as string).slice(0, 500);
        onAddReference({
          id: 'ref-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
          name: file.name,
          type: 'document',
          size: sizeFormatted,
          textSnippet: textContent,
          active: true
        });
      };
      reader.readAsText(file);
    } else {
      // General video or doc
      onAddReference({
        id: 'ref-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
        name: file.name,
        type: fileType,
        size: sizeFormatted,
        active: true
      });
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl relative overflow-hidden backdrop-blur-sm">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-black">
              1
            </span>
            Multi-Method Input Hub
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Unggah aset, tempel (Ctrl+V) review/catatan produk, atau coba skenario preset instan
          </p>
        </div>

        {/* Quick presets badge selector */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Presets:
          </span>
          {PRESET_INPUT_SCENARIOS.map((scenario) => (
            <button
              key={scenario.label}
              type="button"
              onClick={() => onSelectPresetScenario(scenario)}
              className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700/60 text-slate-300 font-medium transition-all"
              title={`Isi otomatis dengan: ${scenario.topic}`}
            >
              {scenario.label}
            </button>
          ))}
        </div>
      </div>

      {/* Toast Notice */}
      {pasteSuccessNotice && (
        <div className="mb-3 px-3 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{pasteSuccessNotice}</span>
        </div>
      )}

      {/* Two-column layout: Dropzone & Paste Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 relative group min-h-[160px] ${
            isDragging
              ? 'border-rose-500 bg-rose-500/10 scale-[0.99]'
              : 'border-slate-700/80 bg-slate-950/60 hover:border-slate-600 hover:bg-slate-950/90'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.txt,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-6 h-6 text-rose-400" />
          </div>

          <p className="text-xs sm:text-sm font-semibold text-slate-200">
            Drag & drop file gambar, video, atau dokumen
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Mendukung JPG, PNG, MP4, WebM, PDF, atau TXT
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-[11px] font-medium text-slate-300 group-hover:border-rose-500/50 group-hover:text-rose-300 transition-colors">
            Pilih File Manual
          </div>
        </div>

        {/* Live Paste (Ctrl+V) Zone */}
        <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Clipboard className="w-3.5 h-3.5 text-purple-400" />
                Live Paste Zone (Ctrl+V)
              </label>
              <span className="text-[10px] text-slate-400 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Teks & Review Produk
              </span>
            </div>
            <textarea
              ref={pasteBoxRef}
              value={pastedText}
              onChange={(e) => onPastedTextChange(e.target.value)}
              placeholder="Tempelkan (Ctrl+V) review konsumen, salinan deskripsi produk, skrip kompetitor, atau poin-poin ide di sini..."
              rows={4}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none transition-all"
            />
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-850 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Info className="w-3 h-3 text-slate-400" />
              Bisa langsung paste screenshot dari clipboard
            </span>
            {pastedText && (
              <button
                type="button"
                onClick={() => onPastedTextChange('')}
                className="text-[11px] text-rose-400 hover:text-rose-300 underline font-medium"
              >
                Bersihkan
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Uploaded References Badges / List */}
      {references.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              File Referensi Terlampir ({references.length}):
            </span>
            <span className="text-[10px] text-slate-400">
              Centang untuk mengikutsertakan dalam konteks AI
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {references.map((ref) => (
              <div
                key={ref.id}
                className={`flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-lg border text-xs transition-all ${
                  ref.active
                    ? 'bg-slate-800 border-indigo-500/40 text-slate-200'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 opacity-60'
                }`}
              >
                {ref.type === 'image' && ref.dataUrl ? (
                  <img src={ref.dataUrl} alt={ref.name} className="w-5 h-5 rounded object-cover ring-1 ring-slate-700" />
                ) : ref.type === 'image' ? (
                  <ImageIcon className="w-4 h-4 text-pink-400 shrink-0" />
                ) : ref.type === 'video' ? (
                  <Video className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                )}

                <span className="truncate max-w-[140px] font-medium" title={ref.name}>
                  {ref.name}
                </span>

                <span className="text-[10px] text-slate-400 font-mono">
                  {ref.size}
                </span>

                <button
                  type="button"
                  onClick={() => onToggleReference(ref.id)}
                  className={`p-0.5 rounded hover:bg-slate-700 transition-colors ${
                    ref.active ? 'text-indigo-400' : 'text-slate-400'
                  }`}
                  title={ref.active ? 'Nonaktifkan dari konteks' : 'Aktifkan untuk konteks'}
                >
                  <Check className={`w-3.5 h-3.5 ${ref.active ? 'opacity-100' : 'opacity-30'}`} />
                </button>

                <button
                  type="button"
                  onClick={() => onRemoveReference(ref.id)}
                  className="p-0.5 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors"
                  title="Hapus referensi"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
