import { Body, Controller, Post } from '@nestjs/common';
import { HeadcountService } from './headcount.service';

@Controller('headcount')
export class HeadcountController {
  constructor(private headcountService: HeadcountService) {}

  @Post()
  async postHeadcount(
    @Body() body: { hall: string; count: number; capturedBy?: string },
  ) {
    return this.headcountService.recordHeadcount(
      body.hall,
      body.count,
      body.capturedBy,
    );
  }
}
