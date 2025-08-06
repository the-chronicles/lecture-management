import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeadcountService } from './headcount.service';
import { HeadcountController } from './headcount.controller';
import { NotificationModule } from 'src/notification/notification.module';
import {
  Headcount,
  HeadcountSchema,
} from './schemas/headcount.schema/headcount.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Headcount.name, schema: HeadcountSchema },
    ]),
    NotificationModule,
  ],
  providers: [HeadcountService],
  controllers: [HeadcountController],
})
export class HeadcountModule {}
