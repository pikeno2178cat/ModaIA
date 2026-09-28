export interface ModelBaseParams {
  gender?: 'feminino' | 'masculino';
  age: number;
  hairColor: string;
  otherCharacteristics: string;
  environmentType: string;
  customEnvironment?: string;
  phoneModel: string;
  aspectRatio: string;
  platform: 'midjourney' | 'flux' | 'leonardo' | 'generic';
}

export interface TryOnParams {
  clothingDescription: string;
  category: string;
  fabricDetails: string;
  fitType: string;
  aspectRatio: string;
}

export interface VideoParams {
  movement: string;
  videoTool: 'veo' | 'kling' | 'runway' | 'luma' | 'hailuo';
  pacing: string;
  cameraMotion: string;
}

export interface SavedPrompt {
  id: string;
  title: string;
  type: 'model' | 'tryon' | 'scenario' | 'video' | 'pose';
  prompt: string;
  createdAt: number;
  tags?: string[];
}
