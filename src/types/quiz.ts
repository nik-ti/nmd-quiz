export interface QuizState {
  currentStep: number;
  path: 'work' | 'business' | null;
  answers: Record<string, string>;
  contactInfo: {
    phone: string;
    email: string;
    name: string;
  };
  score: number;
  visas: string[];
  completed: boolean;
}

export interface Question {
  id: string;
  text: string;
  options: Array<{
    value: string;
    text: string;
    points: number;
  }>;
  condition?: (answers: Record<string, string>) => boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}