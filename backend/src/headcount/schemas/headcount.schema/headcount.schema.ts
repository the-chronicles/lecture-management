import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HeadcountDocument = Headcount & Document;

@Schema({ timestamps: true })
export class Headcount {
  @Prop({ required: true })
  hall: string;

  @Prop({ required: true })
  count: number;

  @Prop()
  capturedBy?: string; // e.g., Device ID or module name
}

export const HeadcountSchema = SchemaFactory.createForClass(Headcount);
