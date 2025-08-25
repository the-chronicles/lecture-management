/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { Controller, Get, Req, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { UserService } from './user.service';

// @Controller('users')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @UseGuards(JwtAuthGuard)
//   @Get('profile')
//   async getProfile(@Req() req) {
//     const userId = req.user.userId; // Comes from JwtStrategy validate()
//     return this.userService.findById(userId);
//   }
// }

import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: any) {
    const user = await this.userService.findById(req.user.userId);

    if (!user) {
      return { message: 'User not found' };
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      department: user.department,
      level: user.level,
      role: user.role,
    };
  }
  @UseGuards(JwtAuthGuard)
  @Patch('update-profile')
  async updateProfile(@Request() req, @Body() body) {
    const userId = req.user.userId;
    const { department, level } = body;

    return this.userService.updateUser(userId, { department, level });
  }
}
