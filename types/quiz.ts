import { Course } from "@/lib/courses";

export type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type ResultProfile =
  | "MARKETPLACE_INICIANTE"
  | "LOJISTA_MIGRANDO"
  | "AMAZON_FOCO"
  | "SHOPEE_FOCO"
  | "MULTICANAL"
  | "DIGITAL_SEM_ROI"
  | "INICIANTE_SEM_CAPITAL"
  | "PRECISA_ORIENTACAO";

export interface AffiliateRecommendation {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

export interface QuizOption {
  id: string;
  label: string;
  // Weight maps course ID to scoring points
  weight: Record<string, number>;
}

export interface QuizQuestion {
  id: StepId;
  question: string;
  subtitle?: string;
  options: QuizOption[];
}

export interface QuizAnswers {
  [step: number]: string;
}

export interface QuizResult {
  profile?: string;
  headline: string;
  diagnosis: string;
  recommendedCourse: Course;
  secondaryCourses: Course[];
}
