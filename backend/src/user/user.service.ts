import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: Partial<User>): Promise<User> {
    return this.userModel.create(data);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }
}
