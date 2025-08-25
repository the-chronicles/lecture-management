/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  // ✅ Only lecturers and admins can book lectures
  @Post('book')
  @Roles('lecturer', 'admin')
  async book(@Body() body: any) {
    return this.scheduleService.bookLecture(body);
  }

  // ✅ Only lecturers can view their own schedules
  @Get('lecturer/:id')
  @Roles('lecturer')
  async getForLecturer(@Param('id') userId: string) {
    return this.scheduleService.getLecturesForUser(userId);
  }

  // ✅ Only lecturers and admins can cancel lectures
  @Put('cancel/:id')
  @Roles('lecturer', 'admin')
  async cancel(@Param('id') id: string, @Body() body: { remarks?: string }) {
    return this.scheduleService.cancelLecture(id, body.remarks);
  }

  // ✅ Check which halls are free during a time range
  @Post('halls/available')
  @Roles('lecturer', 'admin')
  async getAvailableHalls(
    @Body() body: { startTime: string; endTime: string },
  ) {
    const { startTime, endTime } = body;
    const availableHalls = await this.scheduleService.getAvailableHalls(
      new Date(startTime),
      new Date(endTime),
    );
    return { availableHalls };
  }

  // ✅ For students to view their schedule by department and level
  @Get('student')
  @Roles('student')
  async getForStudent(
    @Query('department') department: string,
    @Query('level') level: string,
  ) {
    return this.scheduleService.getLecturesForStudent(department, level);
  }
}
