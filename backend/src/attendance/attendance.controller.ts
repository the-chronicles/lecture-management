import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  // ✅ Route for lecturers to generate attendance codes
  @Post('generate-code')
  @Roles('lecturer')
  async generateCode(
    @Body()
    body: {
      lecturerId: string;
      scheduleId: string;
      durationMinutes?: number;
    },
  ) {
    return this.attendanceService.generateCode(
      body.lecturerId,
      body.scheduleId,
      body.durationMinutes ?? 10,
    );
  }

  // ✅ Route for students to check in
  @Post('check-in')
  @Roles('student')
  async checkIn(@Body() body: { studentId: string; code: string }) {
    return this.attendanceService.checkIn(body.studentId, body.code);
  }

  // ✅ Route to get a student's attendance logs
  @Get('student/:id')
  async getAttendance(@Param('id') studentId: string) {
    return this.attendanceService.getStudentAttendance(studentId);
  }
}
