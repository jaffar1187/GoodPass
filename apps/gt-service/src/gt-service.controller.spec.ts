import { Test, TestingModule } from '@nestjs/testing';
import { GtServiceController } from './gt-service.controller';
import { GtServiceService } from './gt-service.service';

describe('GtServiceController', () => {
  let gtServiceController: GtServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GtServiceController],
      providers: [GtServiceService],
    }).compile();

    gtServiceController = app.get<GtServiceController>(GtServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(gtServiceController.getHello()).toBe('Hello World!');
    });
  });
});
