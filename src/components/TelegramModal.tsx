import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Check, 
  X, 
  ExternalLink, 
  Sparkles, 
  RefreshCw, 
  Radio, 
  MessageSquare, 
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Bell
} from 'lucide-react';
import { UgcScriptResult, AvatarProfile } from '../types';

interface TelegramModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: UgcScriptResult | null;
  activeAvatar: AvatarProfile | null;
  telegramChatId: string;
  onSaveChatId: (id: string) => void;
  autoSendTelegram: boolean;
  onToggleAutoSend: (val: boolean) => void;
  onSendSuccess?: (msg: string) => void;
}

export const TelegramModal: React.FC<TelegramModalProps> = ({
  isOpen,
  onClose,
  result,
  activeAvatar,
  telegramChatId,
  onSaveChatId,
  autoSendTelegram,
  onToggleAutoSend,
  onSendSuccess
}) => {
  const [chatIdInput, setChatIdInput] = useState(telegramChatId);
  const [customNote, setCustomNote] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedChats, setDetectedChats] = useState<any[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    setChatIdInput(telegramChatId);
  }, [telegramChatId]);

  if (!isOpen) return null;

  const handleSaveAndSelectChat = (id: string) => {
    setChatIdInput(id);
    onSaveChatId(id);
    setStatusMessage({ type: 'success', text: `Chat ID ${id} berhasil disimpan!` });
  };

  const handleDetectChats = async () => {
    setIsDetecting(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/telegram/detect-chat');
      const data = await res.json();
      if (data.ok && data.chats) {
        setDetectedChats(data.chats);
        if (data.chats.length > 0) {
          const first = data.chats[0];
          handleSaveAndSelectChat(first.chatId);
          setStatusMessage({
            type: 'success',
            text: `Berhasil mendeteksi Chat ID: ${first.chatId} (${first.title})!`
          });
        } else {
          setStatusMessage({
            type: 'error',
            text: 'Belum ada pesan baru ke bot. Buka t.me/xAIgen112121_bot, tekan Start/kirim pesan apa saja, lalu klik tombol ini lagi!'
          });
        }
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Gagal mendeteksi chat.' });
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Terjadi kesalahan jaringan.' });
    } finally {
      setIsDetecting(false);
    }
  };

  const handleTestConnection = async () => {
    const targetId = chatIdInput.trim();
    if (!targetId) {
      setStatusMessage({ type: 'error', text: 'Silakan isi Chat ID terlebih dahulu!' });
      return;
    }

    setIsTesting(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/telegram/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId: targetId })
      });
      const data = await res.json();
      if (data.ok) {
        onSaveChatId(targetId);
        setStatusMessage({
          type: 'success',
          text: 'Pesan tes berhasil dikirim! Silakan periksa aplikasi Telegram Anda.'
        });
        if (onSendSuccess) onSendSuccess('Koneksi Telegram bot terverifikasi!');
      } else {
        setStatusMessage({
          type: 'error',
          text: data.error || 'Gagal mengirim pesan tes. Pastikan Anda sudah menekan /start pada bot.'
        });
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Gagal menghubungi server.' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSendResult = async () => {
    const targetId = chatIdInput.trim();
    if (!targetId) {
      setStatusMessage({ type: 'error', text: 'Chat ID Telegram wajib diisi!' });
      return;
    }

    if (!result) {
      setStatusMessage({ type: 'error', text: 'Belum ada konten UGC yang digenerasi.' });
      return;
    }

    setIsSending(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/telegram/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId: targetId,
          result: result,
          avatarProfile: activeAvatar,
          customNote: customNote.trim()
        })
      });
      const data = await res.json();
      if (data.ok) {
        onSaveChatId(targetId);
        setStatusMessage({
          type: 'success',
          text: '✅ Seluruh paket skrip UGC 30 detik berhasil dikirim ke Telegram Anda!'
        });
        if (onSendSuccess) onSendSuccess('Skrip UGC berhasil dikirim ke Telegram bot!');
      } else {
        setStatusMessage({
          type: 'error',
          text: data.error || 'Gagal mengirim ke Telegram. Pastikan Chat ID valid.'
        });
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Gagal mengirim ke server.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl relative my-auto overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
              <Send className="w-5 h-5 -rotate-12" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Integrasi Telegram Bot
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Bot Online
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Kirim otomatis skrip 30 detik, prompt visual avatar, dan caption ke akun/channel Telegram
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

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          
          {/* Bot Info Banner */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-sky-400" />
                Bot Aktif: <span className="text-white">xAI-Gen</span>
                <span className="text-sky-400 font-mono">(@xAIgen112121_bot)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Langkah 1: Klik tombol di kanan untuk membuka bot di Telegram dan klik tombol <b>Start</b>.
              </p>
            </div>

            <a
              href="https://t.me/xAIgen112121_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors shrink-0 shadow-md shadow-sky-600/20"
            >
              <span>Buka @xAIgen112121_bot</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Chat ID Configuration Card */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <span>Chat ID / Channel Telegram Anda:</span>
              </label>
              <button
                type="button"
                onClick={handleDetectChats}
                disabled={isDetecting}
                className="text-[11px] text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 transition-colors self-start sm:self-auto disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isDetecting ? 'animate-spin' : ''}`} />
                {isDetecting ? 'Mencari...' : 'Deteksi Chat ID Otomatis'}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                value={chatIdInput}
                onChange={(e) => setChatIdInput(e.target.value)}
                placeholder="Contoh: 123456789 atau @nama_channel"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 font-mono placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTesting || !chatIdInput.trim()}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {isTesting ? 'Menguji...' : 'Tes Koneksi'}
                </button>
                <button
                  type="button"
                  onClick={() => onSaveChatId(chatIdInput.trim())}
                  className="px-3 py-2 rounded-xl bg-sky-600/30 hover:bg-sky-600/40 text-sky-300 font-semibold text-xs border border-sky-500/30 transition-colors whitespace-nowrap"
                >
                  Simpan ID
                </button>
              </div>
            </div>

            {/* Detected Chats List */}
            {detectedChats.length > 0 && (
              <div className="pt-2 border-t border-slate-850">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                  Daftar Obrolan Terakhir Ditemukan:
                </span>
                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {detectedChats.map((c) => (
                    <div
                      key={c.chatId}
                      onClick={() => handleSaveAndSelectChat(c.chatId)}
                      className={`p-2 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-all ${
                        chatIdInput === c.chatId
                          ? 'bg-sky-500/20 border-sky-500/40 text-sky-200'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-bold">{c.title}</span>
                        {c.username && <span className="text-slate-400">{c.username}</span>}
                        <span className="text-[10px] text-slate-400 font-mono">({c.type})</span>
                      </div>
                      <span className="font-mono text-sky-400 font-bold ml-2 shrink-0">
                        {c.chatId}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Tips: Chat ID berupa angka unik akun Anda, atau @username untuk public channel.</span>
            </div>
          </div>

          {/* Auto-Send Toggle */}
          <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-purple-400" />
              <div>
                <span className="text-xs font-bold text-slate-200 block">
                  Kirim Otomatis Setiap Selesai Generate
                </span>
                <span className="text-[11px] text-slate-400">
                  Hasil skrip UGC baru akan langsung dipusatkan ke Telegram Anda tanpa perlu klik kirim manual
                </span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoSendTelegram}
                onChange={(e) => onToggleAutoSend(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
            </label>
          </div>

          {/* Custom Note input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Catatan Tambahan untuk Pesan Telegram (Opsional):
            </label>
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="Contoh: Draf kampanye TikTok affiliate batch #1"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Status Message Notice */}
          {statusMessage && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed">{statusMessage.text}</span>
            </div>
          )}

          {/* Preview of Content to be Sent */}
          {result && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
              <span className="font-bold text-slate-300 text-[11px] uppercase tracking-wider block">
                Paket Konten yang Akan Dikirim:
              </span>
              <div className="text-white font-semibold truncate">
                🎬 {result.title}
              </div>
              <div className="text-slate-400 text-[11px]">
                Hook 3s, 5 Adegan Shot-by-Shot, Prompt Visual Avatar ({activeAvatar?.name}), Caption & Hashtags
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Tutup
          </button>

          <button
            onClick={handleSendResult}
            disabled={isSending || !result || !chatIdInput.trim()}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all ${
              isSending || !result || !chatIdInput.trim()
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-sky-500/20 active:scale-95 cursor-pointer'
            }`}
          >
            {isSending ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Mengirim ke Telegram...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Kirim Hasil UGC ke Telegram Bot Sekarang</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
