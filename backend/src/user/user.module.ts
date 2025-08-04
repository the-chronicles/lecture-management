import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
