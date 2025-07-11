import { Controller, Post, Get, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { RecommendationService, InsuranceRecommendation } from './recommendation.service';
import { CreateRecommendationDto } from '../dto/create-recommendation.dto';
import { UserSubmission } from '../entities/user-submission.entity';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Post()
  async createRecommendation(
    @Body() createRecommendationDto: CreateRecommendationDto,
  ): Promise<{
    success: boolean;
    data: InsuranceRecommendation;
    message: string;
  }> {
    try {
      const recommendation = await this.recommendationService.createRecommendation(
        createRecommendationDto,
      );
      
      return {
        success: true,
        data: recommendation,
        message: 'Recommendation generated successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to generate recommendation',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('submissions')
  async getAllSubmissions(): Promise<{
    success: boolean;
    data: UserSubmission[];
    message: string;
  }> {
    try {
      const submissions = await this.recommendationService.getAllSubmissions();
      
      return {
        success: true,
        data: submissions,
        message: 'Submissions retrieved successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to retrieve submissions',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('submissions/:id')
  async getSubmissionById(@Param('id') id: string): Promise<{
    success: boolean;
    data: UserSubmission;
    message: string;
  }> {
    try {
      const submission = await this.recommendationService.getSubmissionById(id);
      
      if (!submission) {
        throw new HttpException(
          {
            success: false,
            message: 'Submission not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      
      return {
        success: true,
        data: submission,
        message: 'Submission retrieved successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        {
          success: false,
          message: 'Failed to retrieve submission',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
