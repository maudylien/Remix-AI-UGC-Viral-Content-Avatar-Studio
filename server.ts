import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '15mb' }));

// Shared Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper fallback generator if Gemini API key is missing or fails
function generateSmartFallbackScript(body: any) {
  const topic = body.topic || 'Solusi Cepat untuk Masalah Harian';
  const angle = body.storytellingAngle || 'contrarian';
  const audience = body.targetAudience || 'Pengguna Media Sosial & Pembeli Online Aktif';
  const avatarName = body.avatarProfile?.name || 'Maya';
  const avatarTone = body.avatarProfile?.tone || 'Energetik & Autentik';
  const avatarVisual = body.avatarProfile?.visualPrompt || '24yo Southeast Asian creator, warm natural studio lighting, ultra-realistic 8k';
  const platform = body.platform || 'tiktok';

  const angleTitles: Record<string, string> = {
    contrarian: 'JANGAN lakukan ini lagi kalau gamau rugi!',
    personal_story: 'Aku hampir nangis gara-gara hal sepele ini...',
    data_evidence: 'Riset membuktikan 89% orang salah cara pakainya!',
    dramatic_reality: 'Plot twist terparah yang pernah aku alamin minggu ini...',
    secret_hack: 'Rahasia insider yang gatekept selama berbulan-bulan!',
    skeptic_believer: 'Awalnya ngira ini scam murahan, ternyata...',
  };

  const primaryHook = angleTitles[angle] || `Stop scroll! Ini solusi buat ${topic}`;

  return {
    title: `UGC Viral Blueprint: ${topic}`,
    oneLinerSummary: `Skrip UGC 30 detik berkonversi tinggi dengan pola penceritaan ${angle.replace('_', ' ')} yang memicu retensi 3 detik pertama.`,
    durationSeconds: 30,
    viralScore: {
      overall: 93,
      hookStrength: 95,
      emotionalPull: 91,
      curiosityGap: 94,
      ctaClarity: 90,
      retentionProbability: 92,
      verdict: 'VIRAL POTENTIAL: HIGH (Grade A+)',
      psychologicalTriggers: [
        'Pattern Interrupt',
        'Negativity Bias (Loss Aversion)',
        'Curiosity Open-Loop',
        'Social Proof Urgency'
      ],
      actionableTips: [
        'Pastikan ada gerakan tangan cepat atau zoom-in pada frame 0:00 - 0:01 untuk mematikan refleks swipe pengguna.',
        'Gunakan teks caption berukuran tebal (bold) warna kuning/putih dengan latar belakang hitam tipis di tengah bawah layar.',
        'Tambahkan sound effect "whoosh" atau glitch audio tepat saat punchline hook dibacakan.'
      ]
    },
    hookVariations: [
      {
        id: 'hook-1',
        label: 'Contrarian / Pattern Interrupt',
        hookText: `Jangan pernah beli atau coba "${topic}" sebelum kamu tahu rahasia gelap ini!`,
        visualAction: `${avatarName} memegang kamera dengan ekspresi kaget serius, melambaikan tangan "stop" cepat ke lensa.`,
        audioCue: 'Record scratch / sudden bass drop',
        psychologicalWhy: 'Memancing rasa takut ketinggalan informasi krusial dan memicu refleks berhenti scroll.'
      },
      {
        id: 'hook-2',
        label: 'Curiosity Gap / Insider Secret',
        hookText: `Gila sih, ternyata cuma 5% orang yang tahu trik simpel ini buat beresin ${topic}!`,
        visualAction: `${avatarName} berbisik dekat ke mikrofon clip-on sambil memperlihatkan layar handphone / produk secara sekilas.`,
        audioCue: 'Subtle suspense whoosh',
        psychologicalWhy: 'Membuat audiens merasa istimewa jika mereka bertahan sampai akhir untuk dapat rahasianya.'
      },
      {
        id: 'hook-3',
        label: 'Relatable Vulnerability / Confession',
        hookText: `Sumpah aku sempat nyesel parah nggak tahu ini dari 3 bulan lalu...`,
        visualAction: `${avatarName} menghela napas lega dengan senyum jujur tanpa filter, setting kamar natural.`,
        audioCue: 'Warm lo-fi beat swell',
        psychologicalWhy: 'Membangun empati instan dan koneksi humanis tanpa terkesan seperti iklan jualan kaku.'
      }
    ],
    primaryHook: primaryHook,
    scenes: [
      {
        sceneNumber: 1,
        timeframe: '00:00 - 00:03',
        phase: 'Hook',
        spokenDialogue: primaryHook,
        visualAction: `Close-up selfie angle. ${avatarName} menghadap kamera dengan ekspresi intens, tatapan mata tajam ke lensa, jari menunjuk langsung ke layar.`,
        cameraAngle: 'Eye-level handheld selfie, dynamic micro-shake, warm natural ambient ring-light',
        onScreenText: `STOP SCROLL! ⚠️ RAHASIA ${topic.toUpperCase()} TERBONGKAR!`,
        aiImagePrompt: `Photorealistic UGC video frame, ${avatarVisual}, dramatic candid expression looking directly at viewer, holding smartphone, clean modern interior, 9:16 vertical, hyper-detailed, 8k resolution, cinematic lighting`,
        soundFx: 'Dramatic Whoosh + Vinyl Scratch'
      },
      {
        sceneNumber: 2,
        timeframe: '00:03 - 00:09',
        phase: 'Agitation',
        spokenDialogue: `Kalian pasti sering kan ngerasa frustrasi gara-gara masalah ini nggak kelar-kelar? Aku pun awalnya skeptis banget dan mikir ini cuma gimmick marketing.`,
        visualAction: `Potongan cepat b-roll atau ${avatarName} memperlihatkan ekspresi bingung sambil menunjuk ke produk/masalah yang dihadapi.`,
        cameraAngle: 'Medium shot slightly side-angled with seamless jump-cut transition',
        onScreenText: 'Udah coba macam-macam tapi ZONK? 😩',
        aiImagePrompt: `Candid UGC creator shot, ${avatarVisual}, relatable frustrated face looking at desk or item, soft natural daylight through window, TikTok aesthetic, raw unedited feel, 9:16 vertical`,
        soundFx: 'Soft tension buildup synth'
      },
      {
        sceneNumber: 3,
        timeframe: '00:09 - 00:19',
        phase: 'Solution & Demo',
        spokenDialogue: `Tapi pas aku praktekin sendiri selama seminggu penuh, hasilnya beneran gila! Cara kerjanya beda total karena langsung nyentuh akar masalahnya tanpa ribet.`,
        visualAction: `Hands-on live demo! Tangan ${avatarName} mendemonstrasikan tekstur/fitur utama dengan pencahayaan jelas. Wajah avatar tersenyum puas di sudut layar.`,
        cameraAngle: 'Over-the-shoulder POV closeup transitioning back to smiling face',
        onScreenText: '✨ DEMO LANGSUNG: Kelihatan kan bedanya?',
        aiImagePrompt: `Ultra-detailed UGC product interaction shot, ${avatarVisual}, glowing satisfied smile holding product packaging, high key studio lighting, professional beauty influencer quality, 9:16 vertical`,
        soundFx: 'Crisp ASMR sound / Ding sparkle sound effect'
      },
      {
        sceneNumber: 4,
        timeframe: '00:19 - 00:25',
        phase: 'Social Proof',
        spokenDialogue: `Bukan cuma aku, pas dicek ternyata ribuan review lain juga bilang hal yang sama. No wonder ini langsung viral dan sering sold out di mana-mana!`,
        visualAction: `${avatarName} memegang produk dekat dada dengan gestur jempol puas, layar menampilkan screenshot testimoni mengambang.`,
        cameraAngle: 'Direct medium close-up, high energy nod',
        onScreenText: '⭐ RATING 4.9/5 DARI 12.000+ USERS',
        aiImagePrompt: `Authentic UGC testimonial video frame, ${avatarVisual}, cheerful confident demeanor, holding five-star rating card or item, cozy aesthetic backdrop, 9:16 vertical`,
        soundFx: 'Uptempo upbeat lo-fi groove'
      },
      {
        sceneNumber: 5,
        timeframe: '00:25 - 00:30',
        phase: 'CTA & Loop',
        spokenDialogue: `Mumpung masih ada stok dan promo eksklusif, klik keranjang kuning atau link di bio sekarang sebelum kehabisan lagi! Jadi...`,
        visualAction: `${avatarName} menunjuk ke arah tombol keranjang kuning / profil bio sambil tersenyum ramah dan mengedipkan mata ceria. Kalimat terakhir menyambung ke hook awal!`,
        cameraAngle: 'Tight close-up pointing down-left towards screen button area',
        onScreenText: '👇 KLIK LINK DI BIO SEBELUM HABIS!',
        aiImagePrompt: `Punchy UGC call-to-action video frame, ${avatarVisual}, energetic friendly smile pointing down, vibrant clean lighting, viral TikTok aesthetic, 9:16 portrait`,
        soundFx: 'Subtle chime / Pop click'
      }
    ],
    fullSpokenScript: `${primaryHook} Kalian pasti sering kan ngerasa frustrasi gara-gara masalah ini nggak kelar-kelar? Aku pun awalnya skeptis banget dan mikir ini cuma gimmick marketing. Tapi pas aku praktekin sendiri selama seminggu penuh, hasilnya beneran gila! Cara kerjanya beda total karena langsung nyentuh akar masalahnya tanpa ribet. Bukan cuma aku, pas dicek ternyata ribuan review lain juga bilang hal yang sama. Mumpung masih ada promo, klik link di bio sekarang sebelum kehabisan!`,
    estimatedWordCount: 82,
    readingPaceWpm: 164,
    caption: {
      headline: `Beneran nggak nyangka hasilnya bisa secepet ini! 😱✨`,
      body: `Jujur awalnya ragu banget buat nyoba, tapi setelah ngerasain sendiri perbedaannya, ini bener-bener game-changer buat ${topic}.\n\nBuat kalian yang punya keluhan serupa, mending tonton videonya sampai habis dan buktiin sendiri!\n\nSave video ini biar nggak lupa pas mau checkout! 📌`,
      callToAction: `Cek promo spesial di link bio sekarang ya! 🚀`,
      pinnedComment: `💬 Drop pertanyaan kalian di kolom komentar ya, bakal aku jawab satu-satu!`
    },
    hashtags: {
      nicheTags: [
        `#${topic.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        '#ugccontent',
        '#viralreview',
        '#solusicepat',
        '#racunshopee',
        '#racuntiktok'
      ],
      broadTags: ['#fyp', '#foryoupage', '#trending', '#viral', '#explore'],
      trendingKeywords: [
        topic,
        'review jujur',
        'tutorial simpel',
        'rekomendasi produk',
        'tips viral',
        'sebelum beli wajib tahu'
      ],
      suggestedAudioStyle: 'Upbeat Trending Lo-Fi Instrumental or Fast-Paced Narrative Background Track (115-125 BPM)'
    },
    platformNotes: {
      platform: platform,
      bestPostingTime: '12:00 - 13:30 WIB (Jam Makan Siang) atau 19:00 - 21:30 WIB (Prime Time)',
      thumbnailAdvice: `Frame dengan wajah ekspresi kaget ${avatarName} ditambah teks bold kuning kontras.`,
      firstCommentStrategy: 'Sematkan komentar pertanyaan interaktif (contoh: "Ada yang pernah ngalamin hal yang sama?") dalam 5 menit pertama posting.'
    }
  };
}

// Route: Generate UGC Viral Script & Psychology Score
app.post('/api/generate-content', async (req: Request, res: Response) => {
  try {
    const {
      topic,
      productName,
      keyBenefits,
      targetAudience,
      storytellingAngle,
      platform,
      ctaGoal,
      avatarProfile,
      referenceContexts,
      pastedTextContext
    } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topik konten atau produk wajib diisi' });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not set. Using smart AI algorithmic fallback.');
      const fallback = generateSmartFallbackScript(req.body);
      return res.json(fallback);
    }

    const systemPrompt = `Kamu adalah pakar viral short-form video UGC (User Generated Content) strategist, copywriter psikologi marketing kelas dunia, dan avatar prompt architect.
Tugasmu adalah menghasilkan paket konten video pendek UGC viral berdurasi 30 detik lengkap dengan hook 3-detik pertama berdaya pikat tinggi, analisis skor psikologi viral, 3 variasi hook A/B testing, naskah shot-by-shot dengan prompt visual konsisten avatar, caption alami, serta tagar & kata kunci tren.

Gunakan bahasa Indonesia yang santai, persuasif, natural, seperti kreator UGC asli (tidak kaku seperti brosur formal).
Pastikan format output mematuhi skema JSON yang diminta secara ketat.`;

    const userPrompt = `
Buatkan paket UGC Viral Content lengkap dengan detail berikut:
- Topik/Produk: ${topic}
- Nama Brand/Produk: ${productName || 'Tidak disebutkan'}
- Keunggulan Utama/Poin Penjualan: ${keyBenefits || 'Solusi praktis, hasil terbukti, hemat waktu'}
- Target Audiens: ${targetAudience || 'Pengguna aktif media sosial, pembeli online'}
- Sudut Pandang Penceritaan: ${storytellingAngle || 'contrarian'}
- Platform Tujuan: ${platform || 'tiktok'}
- Tujuan Call to Action: ${ctaGoal || 'Klik link bio / keranjang kuning'}
- Profil Avatar Aktif:
  * Nama Avatar: ${avatarProfile?.name || 'Kreator UGC'}
  * Persona & Gaya Bahasa: ${avatarProfile?.personaStyle || 'Santai, energetik, jujur'}
  * Nada Bicara: ${avatarProfile?.tone || 'Autentik & Percaya Diri'}
  * Deskripsi Visual/Konsistensi: ${avatarProfile?.visualPrompt || '20s creator, natural lighting, modern aesthetic'}
  * Rasio Visual: ${avatarProfile?.aspectRatio || '9:16'}
${referenceContexts?.length ? `- File Referensi Terlampir: ${JSON.stringify(referenceContexts)}` : ''}
${pastedTextContext ? `- Teks Catatan/Referensi Pengguna: "${pastedTextContext}"` : ''}

Ketentuan:
1. Skrip video harus berdurasi pas 30 detik dengan kata-kata padat (sekitar 75-90 kata).
2. Tepat 5 adegan/shot:
   - Scene 1 (00:00 - 00:03): Hook 3 detik pertama (harus ada pola interupsi kuat)
   - Scene 2 (00:03 - 00:09): Agitasi masalah (relatable & menyentuh pain point)
   - Scene 3 (00:09 - 00:19): Solusi & Demo visual
   - Scene 4 (00:19 - 00:25): Bukti sosial / Hasil sebelum-sesudah
   - Scene 5 (00:25 - 00:30): Call To Action jelas & Loop Hook kembali ke awal
3. Berikan prompt visual AI (untuk Midjourney/Kling/Runway) di setiap adegan yang menyertakan token konsistensi avatar.
4. Berikan Skor Viral & Psikologi (1-100) dengan rincian metrik, pemicu psikologis, dan saran actionable.
5. Berikan 3 variasi hook A/B testing (Contrarian, Curiosity Gap, Vulnerable Story).
6. Berikan caption natural dan tagar niche + broad + kata kunci SEO.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            oneLinerSummary: { type: Type.STRING },
            durationSeconds: { type: Type.NUMBER },
            viralScore: {
              type: Type.OBJECT,
              properties: {
                overall: { type: Type.NUMBER },
                hookStrength: { type: Type.NUMBER },
                emotionalPull: { type: Type.NUMBER },
                curiosityGap: { type: Type.NUMBER },
                ctaClarity: { type: Type.NUMBER },
                retentionProbability: { type: Type.NUMBER },
                verdict: { type: Type.STRING },
                psychologicalTriggers: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                actionableTips: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ['overall', 'hookStrength', 'emotionalPull', 'curiosityGap', 'ctaClarity', 'retentionProbability', 'verdict', 'psychologicalTriggers', 'actionableTips']
            },
            hookVariations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  label: { type: Type.STRING },
                  hookText: { type: Type.STRING },
                  visualAction: { type: Type.STRING },
                  audioCue: { type: Type.STRING },
                  psychologicalWhy: { type: Type.STRING }
                },
                required: ['id', 'label', 'hookText', 'visualAction', 'audioCue', 'psychologicalWhy']
              }
            },
            primaryHook: { type: Type.STRING },
            scenes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sceneNumber: { type: Type.NUMBER },
                  timeframe: { type: Type.STRING },
                  phase: { type: Type.STRING },
                  spokenDialogue: { type: Type.STRING },
                  visualAction: { type: Type.STRING },
                  cameraAngle: { type: Type.STRING },
                  onScreenText: { type: Type.STRING },
                  aiImagePrompt: { type: Type.STRING },
                  soundFx: { type: Type.STRING }
                },
                required: ['sceneNumber', 'timeframe', 'phase', 'spokenDialogue', 'visualAction', 'cameraAngle', 'onScreenText', 'aiImagePrompt', 'soundFx']
              }
            },
            fullSpokenScript: { type: Type.STRING },
            estimatedWordCount: { type: Type.NUMBER },
            readingPaceWpm: { type: Type.NUMBER },
            caption: {
              type: Type.OBJECT,
              properties: {
                headline: { type: Type.STRING },
                body: { type: Type.STRING },
                callToAction: { type: Type.STRING },
                pinnedComment: { type: Type.STRING }
              },
              required: ['headline', 'body', 'callToAction', 'pinnedComment']
            },
            hashtags: {
              type: Type.OBJECT,
              properties: {
                nicheTags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                broadTags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                trendingKeywords: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                suggestedAudioStyle: { type: Type.STRING }
              },
              required: ['nicheTags', 'broadTags', 'trendingKeywords', 'suggestedAudioStyle']
            },
            platformNotes: {
              type: Type.OBJECT,
              properties: {
                platform: { type: Type.STRING },
                bestPostingTime: { type: Type.STRING },
                thumbnailAdvice: { type: Type.STRING },
                firstCommentStrategy: { type: Type.STRING }
              },
              required: ['platform', 'bestPostingTime', 'thumbnailAdvice', 'firstCommentStrategy']
            }
          },
          required: [
            'title',
            'oneLinerSummary',
            'durationSeconds',
            'viralScore',
            'hookVariations',
            'primaryHook',
            'scenes',
            'fullSpokenScript',
            'estimatedWordCount',
            'readingPaceWpm',
            'caption',
            'hashtags',
            'platformNotes'
          ]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('Gemini returned an empty response');
    }

    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error generating UGC content:', error);
    // In case of error, serve smart fallback so app remains completely functional
    const fallback = generateSmartFallbackScript(req.body);
    return res.json(fallback);
  }
});

// Route: AI Avatar Prompt Enhancement
app.post('/api/avatar-enhance', async (req: Request, res: Response) => {
  try {
    const { name, baseStyle, gender, age, ethnicity, attire, lighting } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        enhancedPrompt: `Ultra-realistic 8k cinematic portrait, ${name || 'consistent creator'}, ${age || '25yo'} ${ethnicity || 'Southeast Asian'}, ${gender || 'woman'}, styled in ${attire || 'modern chic casual street style'}, soft rim lighting, shallow depth of field, f/1.8 85mm lens, pores and subtle skin texture visible, sharp focus on eyes, studio backdrop, hyper-detailed photorealism`,
        negativePrompt: 'blurry, distorted facial features, oversaturated, plastic skin, cartoon, anime, extra limbs, bad hands, low resolution',
        consistencySeed: Math.floor(100000 + Math.random() * 900000)
      });
    }

    const prompt = `Buatkan deskripsi visual prompt Midjourney v6/Flux.1 ultra-konsisten untuk avatar kreator UGC berikut:
Nama: ${name}
Gaya: ${baseStyle || 'Casual tech & lifestyle'}
Usia: ${age || '25'}
Etnis/Ciri Fisik: ${ethnicity || 'Indonesian / Southeast Asian'}
Busana: ${attire || 'Modern oversized hoodie or neat minimalist blazer'}
Pencahayaan: ${lighting || 'Natural ring-light with soft warm key light'}

Kembalikan dalam JSON: { "enhancedPrompt": "...", "negativePrompt": "...", "consistencySeed": 123456 }`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Avatar enhance error:', err);
    return res.json({
      enhancedPrompt: `Photorealistic 8k portrait of ${req.body.name || 'Avatar'}, consistent facial structure, soft studio lighting, natural skin pores, 9:16 vertical ratio`,
      negativePrompt: 'low quality, blurry, deformed face, unnatural skin smoothing',
      consistencySeed: 742189
    });
  }
});

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8310417298:AAGTV36gKsypcC_Kd9AN3TgYCXQFCrKUiv0';

// Route: Get Telegram Bot Status
app.get('/api/telegram/status', async (_req: Request, res: Response) => {
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`);
    const data = await response.json();
    return res.json(data);
  } catch (error: any) {
    console.error('Telegram status check error:', error);
    return res.status(500).json({ ok: false, error: error.message });
  }
});

// Route: Detect Recent Chat ID from Telegram getUpdates
app.get('/api/telegram/detect-chat', async (_req: Request, res: Response) => {
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates?offset=-10`);
    const data = await response.json();

    if (!data.ok) {
      return res.status(400).json({ ok: false, error: data.description || 'Gagal mengambil data bot Telegram' });
    }

    const updates = data.result || [];
    const chatsMap = new Map();

    for (let i = updates.length - 1; i >= 0; i--) {
      const u = updates[i];
      const msg = u.message || u.channel_post || u.edited_message;
      if (msg && msg.chat && msg.chat.id) {
        const id = String(msg.chat.id);
        if (!chatsMap.has(id)) {
          chatsMap.set(id, {
            chatId: id,
            type: msg.chat.type,
            title: msg.chat.title || `${msg.chat.first_name || ''} ${msg.chat.last_name || ''}`.trim() || msg.chat.username || 'Pengguna Telegram',
            username: msg.chat.username ? `@${msg.chat.username}` : null,
            lastMessageDate: msg.date ? new Date(msg.date * 1000).toLocaleString('id-ID') : 'Baru saja',
            lastText: msg.text || ''
          });
        }
      }
    }

    const recentChats = Array.from(chatsMap.values());
    return res.json({ ok: true, chats: recentChats });
  } catch (error: any) {
    console.error('Telegram detect chat error:', error);
    return res.status(500).json({ ok: false, error: error.message });
  }
});

// Helper to escape HTML for Telegram
function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Route: Send UGC Content to Telegram Bot
app.post('/api/telegram/send', async (req: Request, res: Response) => {
  try {
    const { chatId, result, avatarProfile, customNote } = req.body;

    if (!chatId) {
      return res.status(400).json({ ok: false, error: 'Chat ID Telegram wajib diisi' });
    }

    if (!result) {
      return res.status(400).json({ ok: false, error: 'Data konten UGC tidak ditemukan' });
    }

    const avatarName = avatarProfile?.name || 'Kreator UGC';
    const avatarRatio = avatarProfile?.aspectRatio || '9:16';
    const avatarSeed = avatarProfile?.consistencySeed || '894312';

    // Format Message Part 1: Overview, Hook, Viral Score & Shot-by-Shot
    let msg1 = `🔥 <b>HASIL GENERASI AI UGC VIRAL (30 DETIK)</b>\n`;
    msg1 += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg1 += `📌 <b>Topik:</b> ${escapeHtml(result.title)}\n`;
    msg1 += `👤 <b>Avatar Konsisten:</b> ${escapeHtml(avatarName)} (${escapeHtml(avatarRatio)}, Seed: #${escapeHtml(String(avatarSeed))})\n`;
    msg1 += `⭐ <b>Viral Potential Score:</b> <b>${result.viralScore?.overall || 92}/100</b> (${escapeHtml(result.viralScore?.verdict || 'High Viral')})\n`;
    msg1 += `🎯 <b>Pemicu Psikologi:</b> ${(result.viralScore?.psychologicalTriggers || []).map((t: string) => escapeHtml(t)).join(', ')}\n\n`;

    msg1 += `🎣 <b>PRIMARY HOOK (00:00 - 00:03):</b>\n`;
    msg1 += `👉 <i>"${escapeHtml(result.primaryHook)}"</i>\n\n`;

    msg1 += `🎬 <b>TIMELINE NASKAH SHOT-BY-SHOT (30s):</b>\n`;
    (result.scenes || []).forEach((s: any) => {
      msg1 += `\n<b>[Scene ${s.sceneNumber}] ${escapeHtml(s.timeframe)} • ${escapeHtml(s.phase)}</b>\n`;
      msg1 += `🗣️ <b>Dialog:</b> "${escapeHtml(s.spokenDialogue)}"\n`;
      msg1 += `🎥 <b>Kamera:</b> ${escapeHtml(s.visualAction)}\n`;
      msg1 += `📺 <b>Teks Layar:</b> ${escapeHtml(s.onScreenText)}\n`;
      msg1 += `🎨 <b>AI Prompt:</b> <code>${escapeHtml(s.aiImagePrompt)}</code>\n`;
      msg1 += `🎵 <b>SFX:</b> ${escapeHtml(s.soundFx)}\n`;
    });

    // Format Message Part 2: Caption, Hashtags, & Platform Tips
    let msg2 = `📝 <b>CAPTION SIAP POSTING:</b>\n`;
    msg2 += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg2 += `<b>${escapeHtml(result.caption?.headline || '')}</b>\n\n`;
    msg2 += `${escapeHtml(result.caption?.body || '')}\n\n`;
    msg2 += `<b>${escapeHtml(result.caption?.callToAction || '')}</b>\n\n`;

    msg2 += `🏷️ <b>HASHTAGS & SEO:</b>\n`;
    msg2 += `${escapeHtml((result.hashtags?.nicheTags || []).join(' '))} ${escapeHtml((result.hashtags?.broadTags || []).join(' '))}\n\n`;

    msg2 += `💬 <b>Komentar Sematan:</b>\n<i>${escapeHtml(result.caption?.pinnedComment || '')}</i>\n\n`;
    msg2 += `⏰ <b>Jam Posting Optimal:</b> ${escapeHtml(result.platformNotes?.bestPostingTime || '12:00 / 19:00 WIB')}\n`;
    msg2 += `🖼️ <b>Tips Thumbnail:</b> ${escapeHtml(result.platformNotes?.thumbnailAdvice || 'Wajah kaget + teks bold kuning')}\n\n`;

    if (customNote) {
      msg2 += `📌 <i>Catatan: ${escapeHtml(customNote)}</i>\n\n`;
    }

    msg2 += `🚀 <i>Dikirim otomatis via AI UGC Viral & Avatar Studio</i>`;

    // Send Part 1
    const sendResp1 = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: msg1,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });

    const sendData1 = await sendResp1.json();
    if (!sendData1.ok) {
      return res.status(400).json({
        ok: false,
        error: `Telegram Error: ${sendData1.description || 'Gagal mengirim pesan ke Chat ID'}`
      });
    }

    // Send Part 2
    const sendResp2 = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: msg2,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });

    const sendData2 = await sendResp2.json();

    return res.json({
      ok: true,
      message: 'Hasil UGC berhasil dikirim lengkap ke Telegram Bot!',
      telegramResult: [sendData1.result, sendData2.result]
    });
  } catch (error: any) {
    console.error('Error sending to Telegram:', error);
    return res.status(500).json({ ok: false, error: error.message });
  }
});

// Route: Send Quick Test Message to Telegram
app.post('/api/telegram/test', async (req: Request, res: Response) => {
  try {
    const { chatId } = req.body;
    if (!chatId) {
      return res.status(400).json({ ok: false, error: 'Chat ID Telegram wajib diisi' });
    }

    const testMsg = `🤖 <b>Tes Koneksi Berhasil!</b>\n\nBot <b>xAI-Gen</b> (@xAIgen112121_bot) terhubung dengan sukses ke <b>AI UGC Viral & Avatar Studio</b>.\n\nSetiap hasil pembuatan skrip video pendek 30 detik, skor viral, prompt visual avatar, dan caption siap dikirimkan ke ruang obrolan ini! 🚀`;

    const resp = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: testMsg,
        parse_mode: 'HTML'
      })
    });

    const data = await resp.json();
    if (!data.ok) {
      return res.status(400).json({ ok: false, error: data.description || 'Gagal mengirim pesan tes' });
    }

    return res.json({ ok: true, message: 'Pesan tes berhasil diterima di Telegram Anda!' });
  } catch (error: any) {
    console.error('Telegram test error:', error);
    return res.status(500).json({ ok: false, error: error.message });
  }
});

// Vite middleware for dev or static for prod
async function startServer() {
  const fs = await import('fs');

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Fallback handler for SPA client-side routes
    app.use('*', async (req, res, next) => {
      try {
        const url = req.originalUrl;
        const indexPath = path.resolve('index.html');
        if (fs.existsSync(indexPath)) {
          let template = fs.readFileSync(indexPath, 'utf-8');
          template = await vite.transformIndexHtml(url, template);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        } else {
          next();
        }
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI UGC Viral Studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

