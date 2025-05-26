import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Feedback } from './schemas/feedback.schema';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async create(@Body() feedback: Partial<Feedback>) {
    return this.feedbackService.create(feedback);
  }

  @Get('request/:requestId')
  async getByRequest(@Param('requestId') requestId: string) {
    return this.feedbackService.findByRequestId(requestId);
  }

  @Get('staff/:staffId')
  async getByStaff(@Param('staffId') staffId: string) {
    return this.feedbackService.findByStaffId(staffId);
  }
}
