import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  student: Types.ObjectId;

  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: Date, default: Date.now })
  checkedInAt: Date;

  @Prop({ type: String })
  lectureTopic?: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
