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

export interface QuizOption {
  id: string;
  label: string;
  weight: Partial<Record<ResultProfile, number>>;
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

export interface AffiliateRecommendation {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

export interface QuizResult {
  profile: ResultProfile;
  headline: string;
  diagnosis: string;
  recommendations: AffiliateRecommendation[];
}
