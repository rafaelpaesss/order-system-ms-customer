import { HttpModule } from '@nestjs/axios';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from '../../Application/services/customers.service';
import { CustomersAdapter } from '../../Domain/Adapters/customers.adapter';
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';
import { DynamoDBService } from '../../Infrastructure/Apis/dynamoDB.service';
import { CustomersController } from '../../Presentation/Customers/customers.controller';
import { HealthController } from '../../Presentation/Health/health.controller';
import { DynamoDBHealthIndicator } from '../../Presentation/Health/DynamoDBHealthIndicator.service';

describe('E2E Test Customers', () => {
  let controller: CustomersController;
  let healthController: HealthController;
  let service: CustomersService;
  let dynamoDB: DynamoDBService;
  let healthService: DynamoDBHealthIndicator;
  let app: INestApplication;

  const mockDynamoDBService = {
    get: jest.fn(),
    put: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [CustomersController, HealthController],
      providers: [
        DynamoDBHealthIndicator,
        CustomersService,
        DynamoDBService,
        ConfigService,
        { provide: CustomersRepository, useClass: CustomersAdapter },
      ],
    })
      .overrideProvider(DynamoDBService)
      .useValue(mockDynamoDBService)
      .compile();

    controller = module.get<CustomersController>(CustomersController);
    healthController = module.get<HealthController>(HealthController);
    service = module.get(CustomersService);
    healthService = module.get(DynamoDBHealthIndicator);
    dynamoDB = module.get(DynamoDBService);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(dynamoDB).toBeDefined();
    expect(healthController).toBeDefined();
    expect(healthService).toBeDefined();
  });
});
