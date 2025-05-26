import { Model } from 'mongoose';
import { Feedback, FeedbackDocument } from './schemas/feedback.schema';
export declare class FeedbackService {
    private feedbackModel;
    constructor(feedbackModel: Model<FeedbackDocument>);
    create(feedback: Partial<Feedback>): Promise<Feedback>;
    findByRequestId(requestId: string): Promise<Feedback[]>;
    findByStaffId(staffId: string): Promise<Feedback[]>;
}
