import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  Admin = 'admin',
  Lecturer = 'lecturer',
  Student = 'student',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: UserRole, default: UserRole.Student })
  role: UserRole;

  @Prop()
  department?: string;

  @Prop()
  level?: string;
  _id: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
