import { IsNumber, IsIn, Min, Max } from 'class-validator';

export class CreateRecommendationDto {
  @IsNumber()
  @Min(18)
  @Max(100)
  age: number;

  @IsNumber()
  @Min(0)
  income: number;

  @IsNumber()
  @Min(0)
  @Max(20)
  dependents: number;

  @IsIn(['low', 'medium', 'high'])
  riskTolerance: 'low' | 'medium' | 'high';
}
