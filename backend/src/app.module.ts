import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AttendanceModule } from './attendance/attendance.module';
import { ScheduleModule } from './schedule/schedule.module';
import { NotificationModule } from './notification/notification.module';
import { HeadcountModule } from './headcount/headcount.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AuthModule,
    UserModule,
    AttendanceModule,
    ScheduleModule,
    NotificationModule,
    HeadcountModule,
  ],
})
export class AppModule {}
