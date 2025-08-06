import { Test, TestingModule } from '@nestjs/testing';
import { HeadcountService } from './headcount.service';

describe('HeadcountService', () => {
  let service: HeadcountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeadcountService],
    }).compile();

    service = module.get<HeadcountService>(HeadcountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
