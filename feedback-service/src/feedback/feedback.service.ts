import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback, FeedbackDocument } from './schemas/feedback.schema';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<FeedbackDocument>,
  ) {}

  async create(feedback: Partial<Feedback>): Promise<Feedback> {
    return this.feedbackModel.create(feedback);
  }

  async findByRequestId(requestId: string): Promise<Feedback[]> {
    return this.feedbackModel.find({ requestId }).exec();
  }

  async findByStaffId(staffId: string): Promise<Feedback[]> {
    return this.feedbackModel.find({ staffId }).exec();
  }
}
