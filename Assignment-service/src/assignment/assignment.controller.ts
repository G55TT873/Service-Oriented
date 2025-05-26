// src/assignment/assignment.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { AssignmentService } from './assignment.service';

@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  async create(@Body() body: any) {
    return await this.assignmentService.create(body);
  }

  @Get('staff/:staffId')
  async getByStaff(@Param('staffId') staffId: string) {
    return await this.assignmentService.findByStaffId(staffId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return await this.assignmentService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.assignmentService.delete(id);
  }
}
