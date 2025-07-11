import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';
import { UserSubmission } from '../entities/user-submission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSubmission])],
  controllers: [RecommendationController],
  providers: [RecommendationService],
})
export class RecommendationModule {}
