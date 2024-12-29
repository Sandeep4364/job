export type Question = {
  id: string;
  text: string;
  category: 'behavioral' | 'technical' | 'situational';
  difficulty: 'easy' | 'medium' | 'hard';
};

export type InterviewState = {
  currentQuestionIndex: number;
  isRecording: boolean;
  hasVideoPermission: boolean;
  hasAudioPermission: boolean;
  mediaStream: MediaStream | null;
  recordedChunks: Blob[];
};