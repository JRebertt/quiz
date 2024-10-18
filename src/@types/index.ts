export interface QuizData {
  title: string;
  description: string;
  slug: string;
  logoUrl: string;
  imageUrl: string;
  backgroundColor: string;
  buttonColor: string;
  welcomeTitle: string;
  welcomeDescription: string;
  welcomeImageUrl: string;
  welcomeButtonText: string;
  welcomeFooterText: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  text: string;
  options: QuizOption[];
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}