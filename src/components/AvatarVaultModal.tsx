import React, { useState } from 'react';
import { 
  UserCheck, 
  Plus, 
  X, 
  Sparkles, 
  Trash2, 
  Copy, 
  Edit3, 
  Check, 
  Upload, 
  Eye, 
  Layers,
  Shield,
  HelpCircle
} from 'lucide-react';
import { AvatarProfile, AspectRatioType } from '../types';

interface AvatarVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatars: AvatarProfile[];
  activeAvatarId: string;
  onSelectAvatar: (id: string) => void;
  onSaveAvatar: (avatar: AvatarProfile) => void;
  onDeleteAvatar: (id: string) => void;
}

export const AvatarVaultModal: React.FC<AvatarVaultModalProps> = ({
  isOpen,
  onClose,
  avatars,
  activeAvatarId,
  onSelectAvatar,
  onSaveAvatar,
  onDeleteAvatar
}) => {
  const [editingAvatar, setEditingAvatar] = useState<Partial<AvatarProfile> | null>(null);
  const [isEnhancingPrompt, setIsEnhancingPrompt] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStartCreate = () => {
    setEditingAvatar({
      id: 'avatar-' + Date.now(),
      name: '',
      tagline: 'Kreator UGC Konten Konsisten',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      gender: 'Wanita',
      ageRange: '24-27 tahun',
      visualPrompt: '25yo Southeast Asian creator, warm honey skin tone, natural wavy hair, casual cream hoodie, soft ring light, ultra-realistic 8k',
      negativePrompt: 'blurry, oversaturated, deformed eyes, extra fingers, cartoon, 3d',
      consistencySeed: Math.floor(100000 + Math.random() * 900000),
      aspectRatio: '9:16',
      personaStyle: 'Gen-Z kasual, ekspresif, to-the-point, ramah & kredibel',
      tone: 'Energetik & Autentik',
      createdAt: Date.now()
    });
  };

  const handleStartEdit = (avatar: AvatarProfile) => {
    setEditingAvatar({ ...avatar });
  };

  const handleDuplicate = (avatar: AvatarProfile) => {
    const duplicated: AvatarProfile = {
      ...avatar,
      id: 'avatar-' + Date.now(),
      name: `${avatar.name} (Copy)`,
      consistencySeed: Math.floor(100000 + Math.random() * 900000),
      createdAt: Date.now(),
      isDefault: false
    };
    onSaveAvatar(duplicated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAvatar || !editingAvatar.name) return;

    const fullAvatar: AvatarProfile = {
      id: editingAvatar.id || 'avatar-' + Date.now(),
      name: editingAvatar.name || 'Unnamed Avatar',
      tagline: editingAvatar.tagline || 'Kreator UGC Konsisten',
      avatarUrl: editingAvatar.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      gender: editingAvatar.gender || 'Wanita',
      ageRange: editingAvatar.ageRange || '25 tahun',
      visualPrompt: editingAvatar.visualPrompt || 'Consistent UGC persona portrait, 8k photorealistic',
      negativePrompt: editingAvatar.negativePrompt || 'blurry, deformed, cartoon',
      consistencySeed: editingAvatar.consistencySeed || 778899,
      aspectRatio: (editingAvatar.aspectRatio as AspectRatioType) || '9:16',
      personaStyle: editingAvatar.personaStyle || 'Santai dan meyakinkan',
      tone: editingAvatar.tone || 'Autentik',
      createdAt: editingAvatar.createdAt || Date.now()
    };

    onSaveAvatar(fullAvatar);
    setEditingAvatar(null);
  };

  const handleAiEnhancePrompt = async () => {
    if (!editingAvatar) return;
    setIsEnhancingPrompt(true);
    try {
      const res = await fetch('/api/avatar-enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingAvatar.name,
          baseStyle: editingAvatar.personaStyle,
          gender: editingAvatar.gender,
          age: editingAvatar.ageRange,
          ethnicity: 'Southeast Asian / Indonesian',
          attire: 'Modern chic street style or neat creator outfit',
          lighting: 'Natural soft studio ring-light'
        })
      });
      const data = await res.json();
      if (data.enhancedPrompt) {
        setEditingAvatar((prev) => ({
          ...prev,
          visualPrompt: data.enhancedPrompt,
          negativePrompt: data.negativePrompt || prev?.negativePrompt,
          consistencySeed: data.consistencySeed || prev?.consistencySeed
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsEnhancingPrompt(false);
    }
  };

  const handleCopyPrompt = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setEditingAvatar((prev) => ({
          ...prev,
          avatarUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative my-auto overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Avatar Consistency Vault
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-normal">
                  Identitas Brand Konsisten
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Pilih atau kelola avatar digital konsisten agar setiap konten UGC mempertahankan wajah, gaya, dan persona yang sama
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!editingAvatar && (
              <button
                onClick={handleStartCreate}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
              >
                <Plus className="w-4 h-4" /> Tambah Avatar Baru
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto flex-1">
          {editingAvatar ? (
            /* Edit / Create Form */
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-sm font-bold text-slate-200">
                  {editingAvatar.id && avatars.some(a => a.id === editingAvatar.id) ? 'Edit Profil Avatar' : 'Buat Profil Avatar Baru'}
                </span>
                <button
                  type="button"
                  onClick={() => setEditingAvatar(null)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Batal
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Photo & Seed Info */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-300">
                    Foto / Visual Avatar
                  </label>
                  <div className="w-full aspect-[3/4] rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center group">
                    {editingAvatar.avatarUrl ? (
                      <img 
                        src={editingAvatar.avatarUrl} 
                        alt="Avatar preview" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="text-slate-500 text-xs">Belum ada foto</div>
                    )}
                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-white text-xs gap-1">
                      <Upload className="w-5 h-5" />
                      <span>Ganti Foto</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Atau Masukkan URL Gambar:
                    </label>
                    <input
                      type="url"
                      value={editingAvatar.avatarUrl || ''}
                      onChange={(e) => setEditingAvatar({ ...editingAvatar, avatarUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300 block mb-0.5">Consistency Seed:</span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-purple-400 font-bold">#{editingAvatar.consistencySeed}</span>
                      <button
                        type="button"
                        onClick={() => setEditingAvatar({ ...editingAvatar, consistencySeed: Math.floor(100000 + Math.random() * 900000) })}
                        className="text-xs text-indigo-400 hover:text-indigo-300 underline"
                      >
                        Acak Seed
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main Details */}
                <div className="md:col-span-2 space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Nama Avatar *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingAvatar.name || ''}
                        onChange={(e) => setEditingAvatar({ ...editingAvatar, name: e.target.value })}
                        placeholder="Contoh: Maya Pratama"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Tagline / Role
                      </label>
                      <input
                        type="text"
                        value={editingAvatar.tagline || ''}
                        onChange={(e) => setEditingAvatar({ ...editingAvatar, tagline: e.target.value })}
                        placeholder="Contoh: Gen-Z Beauty Reviewer"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Gender
                      </label>
                      <select
                        value={editingAvatar.gender || 'Wanita'}
                        onChange={(e) => setEditingAvatar({ ...editingAvatar, gender: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
                      >
                        <option value="Wanita">Wanita</option>
                        <option value="Pria">Pria</option>
                        <option value="Netral">Netral / Non-Biner</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Rentang Usia
                      </label>
                      <input
                        type="text"
                        value={editingAvatar.ageRange || '24-27 tahun'}
                        onChange={(e) => setEditingAvatar({ ...editingAvatar, ageRange: e.target.value })}
                        placeholder="24-27 tahun"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Rasio Visual
                      </label>
                      <select
                        value={editingAvatar.aspectRatio || '9:16'}
                        onChange={(e) => setEditingAvatar({ ...editingAvatar, aspectRatio: e.target.value as AspectRatioType })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
                      >
                        <option value="9:16">9:16 (Vertikal TikTok/Reels)</option>
                        <option value="16:9">16:9 (Landscape YouTube)</option>
                        <option value="1:1">1:1 (Square Feed)</option>
                        <option value="4:5">4:5 (Portrait Feed)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Gaya Bahasa / Persona
                      </label>
                      <input
                        type="text"
                        value={editingAvatar.personaStyle || ''}
                        onChange={(e) => setEditingAvatar({ ...editingAvatar, personaStyle: e.target.value })}
                        placeholder="Santai, to-the-point, ga ribet..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Nada Bicara (Tone of Voice)
                      </label>
                      <input
                        type="text"
                        value={editingAvatar.tone || ''}
                        onChange={(e) => setEditingAvatar({ ...editingAvatar, tone: e.target.value })}
                        placeholder="Energetik, Akrab, Jujur..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Visual Prompt Section with AI Enhancer */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-300">
                        Visual Consistency Prompt (Midjourney / Flux / Kling Ready)
                      </label>
                      <button
                        type="button"
                        onClick={handleAiEnhancePrompt}
                        disabled={isEnhancingPrompt}
                        className="flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300 font-semibold transition-colors disabled:opacity-50"
                      >
                        <Sparkles className="w-3 h-3 text-purple-400 animate-spin" />
                        {isEnhancingPrompt ? 'Menyempurnakan...' : 'Optimasi Prompt dengan AI'}
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={editingAvatar.visualPrompt || ''}
                      onChange={(e) => setEditingAvatar({ ...editingAvatar, visualPrompt: e.target.value })}
                      placeholder="Deskripsi fisik, pencahayaan, pakaian, dan lensa konsisten..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 font-mono focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Negative Prompt
                    </label>
                    <input
                      type="text"
                      value={editingAvatar.negativePrompt || ''}
                      onChange={(e) => setEditingAvatar({ ...editingAvatar, negativePrompt: e.target.value })}
                      placeholder="blurry, distorted, bad hands, cartoon..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 font-mono focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingAvatar(null)}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-400 hover:to-purple-500 text-white font-semibold text-xs shadow-lg transition-all"
                    >
                      Simpan Avatar ke Vault
                    </button>
                  </div>
                </div>

              </div>
            </form>
          ) : (
            /* Avatars Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {avatars.map((avatar) => {
                const isActive = avatar.id === activeAvatarId;
                return (
                  <div
                    key={avatar.id}
                    className={`rounded-xl border p-3 flex flex-col justify-between transition-all relative overflow-hidden group ${
                      isActive
                        ? 'border-rose-500 bg-rose-500/10 shadow-lg shadow-rose-500/10 ring-1 ring-rose-500'
                        : 'border-slate-800 bg-slate-950/70 hover:border-slate-700 hover:bg-slate-950'
                    }`}
                  >
                    {/* Active check pill */}
                    {isActive && (
                      <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-md">
                        <Check className="w-3 h-3" /> Aktif
                      </div>
                    )}

                    <div>
                      {/* Image container */}
                      <div className="aspect-[4/5] rounded-lg bg-slate-900 border border-slate-800 overflow-hidden relative mb-3">
                        <img
                          src={avatar.avatarUrl}
                          alt={avatar.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent">
                          <span className="text-[10px] font-semibold text-white px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs">
                            {avatar.aspectRatio} • #{avatar.consistencySeed}
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <h4 className="font-bold text-sm text-white group-hover:text-rose-400 transition-colors truncate">
                        {avatar.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">
                        {avatar.tagline}
                      </p>

                      <div className="space-y-1 text-[11px] text-slate-400 mb-3 bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Tone:</span>
                          <span className="font-medium text-slate-300 truncate max-w-[110px]">{avatar.tone}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Persona:</span>
                          <span className="font-medium text-slate-300 truncate max-w-[110px]">{avatar.personaStyle}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                      <button
                        onClick={() => onSelectAvatar(avatar.id)}
                        className={`w-full py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          isActive
                            ? 'bg-rose-500 text-white cursor-default'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        {isActive ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Avatar Aktif
                          </>
                        ) : (
                          'Pilih Avatar Ini'
                        )}
                      </button>

                      <div className="flex items-center justify-between text-slate-400 pt-1">
                        <button
                          onClick={() => handleCopyPrompt(avatar.visualPrompt, avatar.id)}
                          className="text-[11px] hover:text-white flex items-center gap-1 p-1"
                          title="Salin Visual Prompt"
                        >
                          {copiedId === avatar.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>Prompt</span>
                        </button>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDuplicate(avatar)}
                            className="p-1 hover:text-purple-400 transition-colors"
                            title="Duplikat Avatar"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleStartEdit(avatar)}
                            className="p-1 hover:text-indigo-400 transition-colors"
                            title="Edit Avatar"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          {!avatar.isDefault && (
                            <button
                              onClick={() => onDeleteAvatar(avatar.id)}
                              className="p-1 hover:text-rose-400 transition-colors"
                              title="Hapus Avatar"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info banner */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Semua avatar tersimpan permanen di peramban lokal Anda. Identitas wajah dan seed konsisten akan otomatis diinjeksi ke naskah adegan.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs self-end sm:self-auto"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
