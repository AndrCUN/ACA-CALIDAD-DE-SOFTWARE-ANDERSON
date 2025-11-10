export interface Section {
  id: string;
  title: string;
  topic: string;
  content: string | null;
}

export interface MCQQuestion {
  type: 'mcq';
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface MatchingQuestion {
  type: 'matching';
  question: string;
  prompts: string[];
  options: string[];
  correctMatches: number[];
}

export interface CheckboxQuestion {
  type: 'checkbox';
  question: string;
  options: string[];
  correctAnswerIndices: number[];
}

export type ChallengeQuestion = MCQQuestion | MatchingQuestion | CheckboxQuestion;

export type Ratings = {
  [key: string]: number;
};

export interface StoredFeedback {
  id?: number;
  userName: string;
  pageTitle: string;
  date: Date;
  pdfBlob: Blob;
}
