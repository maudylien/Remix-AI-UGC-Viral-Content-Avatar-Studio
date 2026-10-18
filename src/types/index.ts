export type AspectRatioType = '9:16' | '16:9' | '1:1' | '4:5';

export type StorytellingAngle = 
  | 'contrarian'
  | 'personal_story'
  | 'data_evidence'
  | 'dramatic_reality'
  | 'secret_hack'
  | 'skeptic_believer';

export type TargetPlatform =
  | 'tiktok'
  | 'reels'
  | 'shorts'
  | 'facebook'
  | 'twitter'
  | 'linkedin';

export interface AvatarProfile {
  id: string;
  name: string;
  tagline: string;
  avatarUrl: string;
  gender: string;
  ageRange: string;
  visualPrompt: string;
  negativePrompt: string;
  consistencySeed: number;
  aspectRatio: AspectRatioType;
  personaStyle: string;
  tone: string;
  isDefault?: boolean;
  createdAt: number;
}

export interface ReferenceFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'text';
  size: string;
  dataUrl?: string;
  textSnippet?: string;
  active: boolean;
}

export interface ViralScoreBreakdown {
  overall: number; // 1-100
  hookStrength: number;
  emotionalPull: number;
  curiosityGap: number;
  ctaClarity: number;
  retentionProbability: number;
  verdict: string;
  psychologicalTriggers: string[];
  actionableTips: string[];
}

export interface HookVariation {
  id: string;
  label: string;
  hookText: string;
  visualAction: string;
  audioCue: string;
  psychologicalWhy: string;
}

export interface UgcScene {
  sceneNumber: number;
  timeframe: string; // e.g. "00:00 - 00:03"
  phase: 'Hook' | 'Agitation' | 'Solution & Demo' | 'Social Proof' | 'CTA & Loop' | string;
  spokenDialogue: string;
  visualAction: string;
  cameraAngle: string;
  onScreenText: string;
  aiImagePrompt: string;
  soundFx: string;
}

export interface UgcCaption {
  headline: string;
  body: string;
  callToAction: string;
  pinnedComment: string;
}

export interface UgcHashtags {
  nicheTags: string[];
  broadTags: string[];
  trendingKeywords: string[];
  suggestedAudioStyle: string;
}

export interface PlatformNotes {
  platform: string;
  bestPostingTime: string;
  thumbnailAdvice: string;
  firstCommentStrategy: string;
}

export interface UgcScriptResult {
  title: string;
  oneLinerSummary: string;
  durationSeconds: number;
  viralScore: ViralScoreBreakdown;
  hookVariations: HookVariation[];
  primaryHook: string;
  scenes: UgcScene[];
  fullSpokenScript: string;
  estimatedWordCount: number;
  readingPaceWpm: number;
  caption: UgcCaption;
  hashtags: UgcHashtags;
  platformNotes: PlatformNotes;
}

export interface GenerationInput {
  topic: string;
  productName: string;
  keyBenefits: string;
  targetAudience: string;
  storytellingAngle: StorytellingAngle;
  platform: TargetPlatform;
  ctaGoal: string;
  selectedAvatarId: string;
  pastedText: string;
}
