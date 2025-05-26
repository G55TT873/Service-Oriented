import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { Request } from './schemas/request.schema';

@Controller('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  create(@Body() data: Partial<Request>) {
    return this.requestService.create(data);
  }

  @Get('user/:userId')
  getByUser(@Param('userId') userId: string) {
    return this.requestService.getByUserId(userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Request>) {
    return this.requestService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.requestService.delete(id);
  }
}
