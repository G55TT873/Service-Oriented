"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const feedback_schema_1 = require("./schemas/feedback.schema");
let FeedbackService = class FeedbackService {
    feedbackModel;
    constructor(feedbackModel) {
        this.feedbackModel = feedbackModel;
    }
    async create(feedback) {
        return this.feedbackModel.create(feedback);
    }
    async findByRequestId(requestId) {
        return this.feedbackModel.find({ requestId }).exec();
    }
    async findByStaffId(staffId) {
        return this.feedbackModel.find({ staffId }).exec();
    }
};
exports.FeedbackService = FeedbackService;
exports.FeedbackService = FeedbackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(feedback_schema_1.Feedback.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FeedbackService);
//# sourceMappingURL=feedback.service.js.map