import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post('check-in')
  async checkIn(@Body() body: { studentId: string; code: string }) {
    return this.attendanceService.checkIn(body.studentId, body.code);
  }

  @Get('student/:id')
  async getAttendance(@Param('id') studentId: string) {
    return this.attendanceService.getStudentAttendance(studentId);
  }
}
