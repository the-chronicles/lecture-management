import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { Attendance, AttendanceDocument } from './schemas/attendance.schema';
import { Model } from 'mongoose';
import {
  Attendance,
  AttendanceDocument,
} from './schemas/attendance.schema/attendance.schema';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name)
    private attendanceModel: Model<AttendanceDocument>,
  ) {}

  async checkIn(studentId: string, code: string) {
    // You could add code validation logic here (like expiry or matching a list)
    const attendance = new this.attendanceModel({
      student: studentId,
      code,
    });
    return attendance.save();
  }

  async getStudentAttendance(studentId: string) {
    return this.attendanceModel
      .find({ student: studentId })
      .populate('student')
      .sort({ checkedInAt: -1 });
  }
}
