// src/assignment/assignment.schema.ts
import { Schema } from 'mongoose';

export const AssignmentSchema = new Schema({
  requestId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Request',
  },
  staffId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Assigned', 'In Progress', 'Completed'],
    default: 'Assigned',
  },
});
