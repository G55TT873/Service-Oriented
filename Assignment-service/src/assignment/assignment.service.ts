// src/assignment/assignment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel('Assignment') private readonly assignmentModel: Model<any>,
  ) {}

  async create(data: any) {
    const newAssignment = new this.assignmentModel(data);
    return await newAssignment.save();
  }

  async findByStaffId(staffId: string) {
    return await this.assignmentModel.find({ staffId });
  }

  async update(id: string, updateData: any) {
    const assignment = await this.assignmentModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!assignment) throw new NotFoundException('Assignment not found');
    return assignment;
  }

  async delete(id: string) {
    const result = await this.assignmentModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Assignment not found');
    return { message: 'Assignment deleted successfully' };
  }
}
