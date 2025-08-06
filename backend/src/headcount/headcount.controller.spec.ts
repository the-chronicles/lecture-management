import { Test, TestingModule } from '@nestjs/testing';
import { HeadcountController } from './headcount.controller';

describe('HeadcountController', () => {
  let controller: HeadcountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeadcountController],
    }).compile();

    controller = module.get<HeadcountController>(HeadcountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
