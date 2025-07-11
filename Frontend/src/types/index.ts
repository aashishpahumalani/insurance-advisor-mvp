export interface UserFormData {
  age: number;
  income: number;
  dependents: number;
  riskTolerance: 'low' | 'medium' | 'high';
}

export interface InsuranceRecommendation {
  primaryRecommendation: string;
  secondaryRecommendations: string[];
  reasoning: string;
  estimatedPremium: number;
  coverageAmount: number;
  riskAssessment: string;
}

export interface ApiResponse {
  success: boolean;
  data: InsuranceRecommendation;
  message: string;
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface RecommendationCardProps {
  recommendation: InsuranceRecommendation;
  onReset: () => void;
}
