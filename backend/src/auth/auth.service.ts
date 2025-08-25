/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/schemas/user.schema/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userData: Partial<User>) {
    const hashedPassword = await bcrypt.hash(userData.password!, 10);
    return this.userService.create({ ...userData, password: hashedPassword });
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      sub: user._id,
      role: user.role,
      department: user.department,
      level: user.level,
    };
    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }
}
