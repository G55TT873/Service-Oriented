import { Document } from 'mongoose';
export type FeedbackDocument = Feedback & Document;
export declare class Feedback {
    requestId: string;
    userId: string;
    staffId: string;
    rating: number;
    comment: string;
}
export declare const FeedbackSchema: import("mongoose").Schema<Feedback, import("mongoose").Model<Feedback, any, any, any, Document<unknown, any, Feedback, any> & Feedback & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Feedback, Document<unknown, {}, import("mongoose").FlatRecord<Feedback>, {}> & import("mongoose").FlatRecord<Feedback> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
