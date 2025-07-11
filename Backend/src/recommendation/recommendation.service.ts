import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSubmission } from '../entities/user-submission.entity';
import { CreateRecommendationDto } from '../dto/create-recommendation.dto';

export interface InsuranceRecommendation {
  primaryRecommendation: string;
  secondaryRecommendations: string[];
  reasoning: string;
  estimatedPremium: number;
  coverageAmount: number;
  riskAssessment: string;
}

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(UserSubmission)
    private userSubmissionRepository: Repository<UserSubmission>,
  ) {}

  async createRecommendation(createRecommendationDto: CreateRecommendationDto): Promise<InsuranceRecommendation> {
    const recommendation = this.generateRecommendation(createRecommendationDto);
    
    const submission = this.userSubmissionRepository.create({
      ...createRecommendationDto,
      recommendation,
    });
    
    await this.userSubmissionRepository.save(submission);
    
    return recommendation;
  }

  private generateRecommendation(data: CreateRecommendationDto): InsuranceRecommendation {
    const { age, income, dependents, riskTolerance } = data;
    
    let primaryRecommendation: string;
    let secondaryRecommendations: string[] = [];
    let reasoning: string;
    let estimatedPremium: number;
    let coverageAmount: number;
    let riskAssessment: string;

    // Risk assessment based on age and risk tolerance
    const riskScore = this.calculateRiskScore(age, riskTolerance, dependents);
    
    if (riskScore <= 3) {
      riskAssessment = 'Low Risk';
    } else if (riskScore <= 6) {
      riskAssessment = 'Medium Risk';
    } else {
      riskAssessment = 'High Risk';
    }

    // Calculate base coverage amount based on income and dependents
    const baseCoverageMultiplier = dependents > 0 ? 8 + (dependents * 2) : 6;
    
    // Primary recommendation logic
    if (age < 30) {
      if (riskTolerance === 'high') {
        primaryRecommendation = 'Term Life Insurance';
        reasoning = 'Young age with high risk tolerance makes term life insurance most cost-effective for maximum coverage';
        estimatedPremium = income * 0.005; // 0.5% of income
        coverageAmount = income * (baseCoverageMultiplier + 2);
      } else if (riskTolerance === 'medium') {
        primaryRecommendation = 'Universal Life Insurance';
        reasoning = 'Young age allows for flexible premium universal life insurance with investment component';
        estimatedPremium = income * 0.008; // 0.8% of income
        coverageAmount = income * baseCoverageMultiplier;
      } else {
        primaryRecommendation = 'Whole Life Insurance';
        reasoning = 'Conservative approach with guaranteed benefits and cash value accumulation';
        estimatedPremium = income * 0.012; // 1.2% of income
        coverageAmount = income * (baseCoverageMultiplier - 1);
      }
    } else if (age < 40) {
      if (riskTolerance === 'high') {
        primaryRecommendation = 'Term Life Insurance';
        reasoning = 'High risk tolerance with family responsibilities makes term life insurance suitable for maximum coverage';
        estimatedPremium = income * 0.008; // 0.8% of income
        coverageAmount = income * baseCoverageMultiplier;
      } else if (riskTolerance === 'medium') {
        primaryRecommendation = 'Universal Life Insurance';
        reasoning = 'Flexible premium universal life provides good balance of coverage and investment growth';
        estimatedPremium = income * 0.012; // 1.2% of income
        coverageAmount = income * (baseCoverageMultiplier - 1);
      } else {
        primaryRecommendation = 'Whole Life Insurance';
        reasoning = 'Conservative approach with guaranteed benefits ideal for risk-averse individuals';
        estimatedPremium = income * 0.015; // 1.5% of income
        coverageAmount = income * (baseCoverageMultiplier - 2);
      }
    } else if (age < 55) {
      if (riskTolerance === 'high') {
        primaryRecommendation = 'Term Life Insurance';
        reasoning = 'Cost-effective coverage for remaining working years with high coverage amount';
        estimatedPremium = income * 0.012; // 1.2% of income
        coverageAmount = income * (baseCoverageMultiplier - 1);
      } else if (riskTolerance === 'medium') {
        primaryRecommendation = 'Universal Life Insurance';
        reasoning = 'Flexible premiums with investment component for middle-aged individuals';
        estimatedPremium = income * 0.015; // 1.5% of income
        coverageAmount = income * (baseCoverageMultiplier - 2);
      } else {
        primaryRecommendation = 'Whole Life Insurance';
        reasoning = 'Conservative approach with guaranteed benefits and estate planning benefits';
        estimatedPremium = income * 0.018; // 1.8% of income
        coverageAmount = income * (baseCoverageMultiplier - 3);
      }
    } else {
      primaryRecommendation = 'Final Expense Insurance';
      reasoning = 'Focused on covering final expenses and providing modest death benefit';
      estimatedPremium = income * 0.02; // 2% of income
      coverageAmount = Math.min(income * 3, 75000);
    }

    // Secondary recommendations based on dependents and income
    if (dependents > 0) {
      secondaryRecommendations.push('Disability Insurance');
      if (dependents > 2) {
        secondaryRecommendations.push('Education Savings Plan');
      }
    }

    if (income > 100000) {
      secondaryRecommendations.push('Umbrella Insurance Policy');
    }

    if (income > 50000 && dependents > 0) {
      secondaryRecommendations.push('Health Insurance Supplement');
    }

    if (riskAssessment === 'High Risk') {
      estimatedPremium *= 1.5;
    } else if (riskAssessment === 'Medium Risk') {
      estimatedPremium *= 1.2;
    }

    // Ensure minimum coverage
    coverageAmount = Math.max(coverageAmount, 100000);

    return {
      primaryRecommendation,
      secondaryRecommendations,
      reasoning,
      estimatedPremium: Math.round(estimatedPremium),
      coverageAmount: Math.round(coverageAmount),
      riskAssessment,
    };
  }

  private calculateRiskScore(age: number, riskTolerance: string, dependents: number): number {
    let score = 0;

    // Age factor
    if (age > 60) score += 3;
    else if (age > 45) score += 2;
    else if (age > 35) score += 1;

    // Risk tolerance factor
    if (riskTolerance === 'high') score += 1;
    else if (riskTolerance === 'low') score -= 1;

    // Dependents factor 
    if (dependents > 3) score += 1;

    return Math.max(0, Math.min(10, score));
  }

  async getAllSubmissions(): Promise<UserSubmission[]> {
    return this.userSubmissionRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async getSubmissionById(id: string): Promise<UserSubmission> {
    return this.userSubmissionRepository.findOne({ where: { id } });
  }
}
