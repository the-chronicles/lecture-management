import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationService } from 'src/notification/notification.service';
import {
  Headcount,
  HeadcountDocument,
} from './schemas/headcount.schema/headcount.schema';

@Injectable()
export class HeadcountService {
  constructor(
    @InjectModel(Headcount.name)
    private headcountModel: Model<HeadcountDocument>,
    private notificationService: NotificationService,
  ) {}

  async recordHeadcount(hall: string, count: number, capturedBy?: string) {
    const entry = await this.headcountModel.create({ hall, count, capturedBy });

    // Broadcast to frontend
    this.notificationService.sendHeadcountUpdate(count);

    return entry;
  }
}
