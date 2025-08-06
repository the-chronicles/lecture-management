import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AttendanceCodeDocument = AttendanceCode & Document;

@Schema({ timestamps: true })
export class AttendanceCode {
  @Prop({ required: true })
  code: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  lecturer: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Schedule', required: true })
  schedule: Types.ObjectId;

  @Prop({ required: true })
  expiresAt: Date;
}

export const AttendanceCodeSchema =
  SchemaFactory.createForClass(AttendanceCode);
