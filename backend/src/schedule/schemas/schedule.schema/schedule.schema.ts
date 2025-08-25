import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ScheduleDocument = Schedule & Document;

@Schema({ timestamps: true })
export class Schedule {
  @Prop({ required: true })
  courseTitle: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  lecturer: Types.ObjectId;

  @Prop({ required: true })
  hall: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ default: false })
  isCancelled: boolean;

  @Prop()
  remarks?: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
