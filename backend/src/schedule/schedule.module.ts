import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
// import { Schedule, ScheduleSchema } from './schemas/schedule.schema';
import { UserModule } from 'src/user/user.module';
import {
  Schedule,
  ScheduleSchema,
} from './schemas/schedule.schema/schedule.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Schedule.name,
        schema: ScheduleSchema,
      },
    ]),
    UserModule,
  ],
  providers: [ScheduleService],
  controllers: [ScheduleController],
})
export class ScheduleModule {}
