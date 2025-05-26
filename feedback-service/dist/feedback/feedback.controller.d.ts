import { FeedbackService } from './feedback.service';
import { Feedback } from './schemas/feedback.schema';
export declare class FeedbackController {
    private readonly feedbackService;
    constructor(feedbackService: FeedbackService);
    create(feedback: Partial<Feedback>): Promise<Feedback>;
    getByRequest(requestId: string): Promise<Feedback[]>;
    getByStaff(staffId: string): Promise<Feedback[]>;
}
