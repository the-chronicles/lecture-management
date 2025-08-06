import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
// import { Attendance, AttendanceSchema } from './schemas/attendance.schema';
import { UserModule } from 'src/user/user.module';
import {
  Attendance,
  AttendanceSchema,
} from './schemas/attendance.schema/attendance.schema';
import {
  AttendanceCode,
  AttendanceCodeSchema,
} from './schemas/code.schema/code.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Attendance.name, schema: AttendanceSchema },
      { name: AttendanceCode.name, schema: AttendanceCodeSchema },
    ]),
    UserModule,
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
