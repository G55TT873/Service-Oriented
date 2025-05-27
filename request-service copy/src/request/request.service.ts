import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request, RequestDocument } from './schemas/request.schema';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
  ) {}

  async create(requestData: Partial<Request>): Promise<Request> {
    const createdRequest = new this.requestModel(requestData);
    return createdRequest.save();
  }

  async getByUserId(userId: string): Promise<Request[]> {
    return this.requestModel.find({ userId }).exec();
  }

  async update(id: string, data: Partial<Request>): Promise<Request> {
    const updated = await this.requestModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Request not found');
    return updated;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.requestModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Request not found');
    return { message: 'Request deleted successfully' };
  }
}
