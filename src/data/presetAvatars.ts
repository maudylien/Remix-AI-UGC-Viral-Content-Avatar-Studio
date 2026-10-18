import { AvatarProfile } from '../types';

export const INITIAL_PRESET_AVATARS: AvatarProfile[] = [
  {
    id: 'avatar-maya',
    name: 'Maya Pratama',
    tagline: 'Gen-Z Tech & Beauty Bestie (High Conversion)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    gender: 'Wanita',
    ageRange: '23-26 tahun',
    visualPrompt: '24yo Southeast Asian female creator, wavy shoulder-length brunette hair, natural warm honey skin tone, candid friendly expression, minimal gold jewelry, cream oversized hoodie, natural studio ring light, crisp 8k photorealism, f/1.8 depth of field',
    negativePrompt: 'blurry, oversaturated, plastic skin, distorted teeth, extra fingers, cartoon, 3d render',
    consistencySeed: 894312,
    aspectRatio: '9:16',
    personaStyle: 'Gen-Z kasual, ekspresif, jujur tanpa basa-basi, sering memakai gesture tangan aktif',
    tone: 'Energetik, Akrab & Terbuka',
    isDefault: true,
    createdAt: Date.now() - 10000000
  },
  {
    id: 'avatar-rian',
    name: 'Rian Dirgantara',
    tagline: 'Direct-to-Camera Founder & Contrarian Reviewer',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    gender: 'Pria',
    ageRange: '28-32 tahun',
    visualPrompt: '30yo Indonesian male tech founder, sharp jawline, short neat fade haircut, wearing dark minimalist crewneck t-shirt, subtle rim-lighting from left, modern desk workspace background with soft neon ambient, 8k cinematic raw photo',
    negativePrompt: 'grainy, low resolution, fake smile, extra limbs, anime style, deformed facial anatomy',
    consistencySeed: 541298,
    aspectRatio: '9:16',
    personaStyle: 'Lugas, to-the-point, membongkar mitos industri, analitis tapi mudah dipahami orang awam',
    tone: 'Kritis, Percaya Diri & Data-Driven',
    isDefault: false,
    createdAt: Date.now() - 8000000
  },
  {
    id: 'avatar-sarah',
    name: 'Sarah Lestari',
    tagline: 'Warm Lifestyle Mom & Honest Home Reviewer',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    gender: 'Wanita',
    ageRange: '31-35 tahun',
    visualPrompt: '32yo Asian woman, gentle warm eyes, soft tied-back hair with loose strands, cozy pastel knit sweater, warm home kitchen or living room background with soft window daylight, authentic wholesome atmosphere, 8k portrait photography',
    negativePrompt: 'harsh shadows, heavy makeup, artificial lighting, cartoon, blurry, unrealistic eyes',
    consistencySeed: 632190,
    aspectRatio: '9:16',
    personaStyle: 'Empatik, keibuan yang santai, fokus ke solusi hemat waktu dan kenyamanan keluarga',
    tone: 'Hangat, Menenangkan & Meyakinkan',
    isDefault: false,
    createdAt: Date.now() - 6000000
  },
  {
    id: 'avatar-kenzo',
    name: 'Kenzo Wijaya',
    tagline: 'Hyper-Energetic TikTok Trend Hunter & Unboxer',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    gender: 'Pria',
    ageRange: '21-24 tahun',
    visualPrompt: '22yo modern Asian male trendsetter, stylish messy layered hair, wearing streetwear jacket, dynamic handheld selfie camera angle with wide lens effect, vibrant colorful background lighting, expressive excited facial emotion, 8k crisp details',
    negativePrompt: 'static stiff pose, pale flat lighting, deformed hands, cartoonish, low quality',
    consistencySeed: 781932,
    aspectRatio: '9:16',
    personaStyle: 'Super cepat, penuh kata pancingan hype, ekspresi muka kaget dramatis, sound bite master',
    tone: 'Super Antusias & Fun',
    isDefault: false,
    createdAt: Date.now() - 4000000
  }
];

export const PRESET_INPUT_SCENARIOS = [
  {
    label: '✨ Glowing Retinol Serum',
    category: 'Skincare / Beauty',
    topic: 'Serum Retinol Gentle untuk Pemula Tanpa Iritasi',
    productName: 'LumiGlow Gentle Barrier Serum',
    keyBenefits: 'Hasil pori rapat dalam 7 hari, tidak ada efek purging/cekit-cekit, formula nano-encapsulated',
    targetAudience: 'Wanita & Pria 19-29 tahun yang takut pakai retinol tapi ingin kulit mulus bebas bruntusan',
    storytellingAngle: 'contrarian' as const,
    platform: 'tiktok' as const,
    ctaGoal: 'Klik keranjang kuning sekarang mumpung ada flash sale 40%',
    pastedText: 'Review pengguna: "Awalnya skeptis karena kulitku sensitif parah, tapi ini satu-satunya serum yang ga bikin merah. Dipakai 5 malam bruntusan di jidat langsung kempes!"'
  },
  {
    label: '🎧 ANC Wireless Earbuds',
    category: 'Tech Gadget',
    topic: 'Earbuds Bluetooth Noise Cancelling Harga Mahasiswa',
    productName: 'AeroSound Pro Max ANC',
    keyBenefits: 'Active Noise Cancelling 42dB, baterai tahan 38 jam, latensi ultra-rendah untuk gaming & meeting',
    targetAudience: 'Mahasiswa, pekerja WFH, commuters kereta/bus yang butuh fokus tanpa bayar jutaan',
    storytellingAngle: 'secret_hack' as const,
    platform: 'reels' as const,
    ctaGoal: 'Link di bio untuk dapat gratis voucher ongkir + garansi 1 tahun',
    pastedText: 'Perbandingan: Kualitas mic setara brand 2 jutaan tapi harganya cuma sepertiga. Tes suara di cafe berisik tetap jernih banget.'
  },
  {
    label: '⚡ AI Content Workflow SaaS',
    category: 'Software / Productivity',
    topic: 'Tool AI Pembuat 30 Video TikTok dalam 10 Menit',
    productName: 'ViralFlow AI Automator',
    keyBenefits: 'Otomatis buat hook, script, caption, dan visual prompt siap render tanpa pusing mikir ide tiap hari',
    targetAudience: 'Content creator solo, agensi marketing, affiliate marketer, dan UMKM online',
    storytellingAngle: 'data_evidence' as const,
    platform: 'tiktok' as const,
    ctaGoal: 'Coba free trial 7 hari tanpa kartu kredit di link bio',
    pastedText: 'Data: 90% kreator menyerah di bulan ke-2 karena burn-out bikin script manual tiap malam.'
  },
  {
    label: '👗 Vintage Oversized Linen Shirt',
    category: 'Fashion & OOTD',
    topic: 'Kemeja Linen Korea Anti-Kusut & Adem Seharian',
    productName: 'Komorebi Relaxed Linen Fit',
    keyBenefits: 'Bahan breathable premium, potongan dropped-shoulder bikin kelihatan ramping, tidak tembus pandang',
    targetAudience: 'Gen-Z & Millennial yang suka outfit aesthetic clean girl / minimalist casual',
    storytellingAngle: 'personal_story' as const,
    platform: 'reels' as const,
    ctaGoal: 'Koleksi limited edition! Checkout sebelum warna favorit habis',
    pastedText: 'Trik styling: Bisa jadi outer ngopi santai atau kemeja semi-formal kantor. Cuci berkali-kali ga nyusut.'
  }
];
