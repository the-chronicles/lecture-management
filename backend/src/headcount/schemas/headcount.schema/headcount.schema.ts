// headcount.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HeadcountDocument = Headcount & Document;

@Schema({ timestamps: true })
export class Headcount {
  @Prop({ required: true })
  hall: string;

  @Prop({ required: true })
  count: number;

  @Prop()
  capturedBy?: string;

  @Prop({ type: Types.ObjectId, ref: 'Schedule' })
  lectureId?: Types.ObjectId;

  @Prop()
  courseTitle?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  lecturerId?: Types.ObjectId;

  @Prop({ required: true, default: Date.now })
  timestamp: Date;
}

export const HeadcountSchema = SchemaFactory.createForClass(Headcount);
