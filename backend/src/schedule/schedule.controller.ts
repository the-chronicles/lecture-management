import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Post('book')
  async book(@Body() body: any) {
    return this.scheduleService.bookLecture(body);
  }

  @Get('lecturer/:id')
  async getForLecturer(@Param('id') userId: string) {
    return this.scheduleService.getLecturesForUser(userId);
  }

  @Put('cancel/:id')
  async cancel(@Param('id') id: string, @Body() body: { remarks?: string }) {
    return this.scheduleService.cancelLecture(id, body.remarks);
  }
}
