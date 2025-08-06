import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Attendance,
  AttendanceDocument,
} from './schemas/attendance.schema/attendance.schema';
import { randomBytes } from 'crypto';
import {
  AttendanceCode,
  AttendanceCodeDocument,
} from './schemas/code.schema/code.schema';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name)
    private attendanceModel: Model<AttendanceDocument>,
    @InjectModel(AttendanceCode.name)
    private codeModel: Model<AttendanceCodeDocument>,
  ) {}

  // ✅ Generate a time-bound code
  async generateCode(
    lecturerId: string,
    scheduleId: string,
    durationMinutes = 10,
  ) {
    const code = randomBytes(3).toString('hex').toUpperCase(); // e.g. 'F1A2B3'
    const expiresAt = new Date(Date.now() + durationMinutes * 60_000);

    return this.codeModel.create({
      code,
      lecturer: lecturerId,
      schedule: scheduleId,
      expiresAt,
    });
  }

  // ✅ Student checks in with a valid, active code
  async checkIn(studentId: string, code: string) {
    const validCode = await this.codeModel.findOne({
      code,
      expiresAt: { $gt: new Date() },
    });

    if (!validCode) {
      throw new BadRequestException('Code is invalid or has expired.');
    }

    return this.attendanceModel.create({
      student: studentId,
      code,
    });
  }

  // ✅ Student attendance logs
  async getStudentAttendance(studentId: string) {
    return this.attendanceModel
      .find({ student: studentId })
      .populate('student')
      .sort({ checkedInAt: -1 });
  }
}
