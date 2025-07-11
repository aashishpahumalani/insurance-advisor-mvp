import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationService } from './recommendation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserSubmission } from '../entities/user-submission.entity';
import { Repository } from 'typeorm';

describe('RecommendationService', () => {
  let service: RecommendationService;
  let mockRepository: Partial<Repository<UserSubmission>>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecommendationService,
        {
          provide: getRepositoryToken(UserSubmission),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RecommendationService>(RecommendationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate term life insurance recommendation for young high-risk person', async () => {
    const mockData = {
      age: 25,
      income: 60000,
      dependents: 1,
      riskTolerance: 'high' as const,
    };

    mockRepository.create = jest.fn().mockReturnValue(mockData);
    mockRepository.save = jest.fn().mockResolvedValue(mockData);

    const result = await service.createRecommendation(mockData);

    expect(result.primaryRecommendation).toBe('Term Life Insurance');
    expect(result.riskAssessment).toBe('Low Risk');
    expect(result.estimatedPremium).toBeGreaterThan(0);
    expect(result.coverageAmount).toBeGreaterThan(0);
  });

  it('should generate whole life insurance recommendation for young conservative person', async () => {
    const mockData = {
      age: 28,
      income: 75000,
      dependents: 2,
      riskTolerance: 'low' as const,
    };

    mockRepository.create = jest.fn().mockReturnValue(mockData);
    mockRepository.save = jest.fn().mockResolvedValue(mockData);

    const result = await service.createRecommendation(mockData);

    expect(result.primaryRecommendation).toBe('Whole Life Insurance');
    expect(result.riskAssessment).toBe('Low Risk');
  });

  it('should generate universal life insurance recommendation for middle-aged medium risk person', async () => {
    const mockData = {
      age: 35,
      income: 80000,
      dependents: 3,
      riskTolerance: 'medium' as const,
    };

    mockRepository.create = jest.fn().mockReturnValue(mockData);
    mockRepository.save = jest.fn().mockResolvedValue(mockData);

    const result = await service.createRecommendation(mockData);

    expect(result.primaryRecommendation).toBe('Universal Life Insurance');
    expect(result.riskAssessment).toBe('Low Risk');
    expect(result.estimatedPremium).toBeGreaterThan(0);
    expect(result.coverageAmount).toBeGreaterThan(0);
  });

  it('should generate final expense insurance for senior', async () => {
    const mockData = {
      age: 65,
      income: 45000,
      dependents: 0,
      riskTolerance: 'low' as const,
    };

    mockRepository.create = jest.fn().mockReturnValue(mockData);
    mockRepository.save = jest.fn().mockResolvedValue(mockData);

    const result = await service.createRecommendation(mockData);

    expect(result.primaryRecommendation).toBe('Final Expense Insurance');
    expect(result.riskAssessment).toBe('Low Risk');
    expect(result.coverageAmount).toBeGreaterThanOrEqual(100000);
  });
});
