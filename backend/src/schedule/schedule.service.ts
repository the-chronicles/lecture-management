import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { Schedule, ScheduleDocument } from './schemas/schedule.schema';
import { Model } from 'mongoose';
import {
  Schedule,
  ScheduleDocument,
} from './schemas/schedule.schema/schedule.schema';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name)
    private scheduleModel: Model<ScheduleDocument>,
  ) {}

  async bookLecture(data: Partial<Schedule>) {
    // Check for conflicting schedule in same hall
    const conflict = await this.scheduleModel.findOne({
      hall: data.hall,
      isCancelled: false,
      $or: [
        {
          startTime: { $lt: data.endTime },
          endTime: { $gt: data.startTime },
        },
      ],
    });

    if (conflict) {
      // eslint-disable-next-line prettier/prettier
      throw new ConflictException('Lecture hall is already booked at this time.');
    }

    return this.scheduleModel.create(data);
  }

  async getLecturesForUser(userId: string) {
    // eslint-disable-next-line prettier/prettier
    return this.scheduleModel
      .find({ lecturer: userId })
      .sort({ startTime: 1 });
  }

  async cancelLecture(id: string, remarks?: string) {
    return this.scheduleModel.findByIdAndUpdate(
      id,
      {
        isCancelled: true,
        remarks,
      },
      { new: true },
    );
  }
}
