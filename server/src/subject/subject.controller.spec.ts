import { Test, TestingModule } from '@nestjs/testing';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';

describe('SubjectController', () => {
  let controller: SubjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectController],
      providers: [SubjectService],
    }).compile();

    controller = module.get<SubjectController>(SubjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
