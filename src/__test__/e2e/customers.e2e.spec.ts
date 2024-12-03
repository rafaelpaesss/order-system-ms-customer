import { HttpModule } from '@nestjs/axios';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../../Application/services/customer.service';
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';  // Ajuste conforme necessário
import { CustomersController } from '../../Presentation/Customers/customers.controller';  // Ajuste conforme necessário
import { HealthController } from '../../Presentation/Health/health.controller';
import { DynamoDbHealthIndicator } from '../../Presentation/Health/DynamoDbHealthIndicator.service';  // Novo serviço para o DynamoDB

describe('E2E Test Customers', () => {
  let controller: CustomersController;
  let healthController: HealthController;
  let service: CustomerService;
  let healthService: DynamoDbHealthIndicator;  // Usando o novo serviço de verificação do DynamoDB
  let app: INestApplication;

  const mockCustomerService = {
    getById: jest.fn(),
    createCustomer: jest.fn(),
    updateCustomer: jest.fn(),
    getCustomerByCpf: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [CustomersController, HealthController],
      providers: [
        DynamoDbHealthIndicator,  // Alterado para o DynamoDbHealthIndicator
        CustomerService,
        ConfigService,
        { provide: CustomersRepository, useValue: mockCustomerService },  // Mocka diretamente o repositório
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    healthController = module.get<HealthController>(HealthController);
    service = module.get<CustomerService>(CustomerService);
    healthService = module.get<DynamoDbHealthIndicator>(DynamoDbHealthIndicator);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(healthController).toBeDefined();
    expect(healthService).toBeDefined();
  });

  it('should create a customer', async () => {
    const mockCustomer = {
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    mockCustomerService.createCustomer.mockResolvedValue(mockCustomer);

    const createCustomerDto = {
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    const response = await service.createCustomer(createCustomerDto);

    expect(mockCustomerService.createCustomer).toHaveBeenCalledWith(
      createCustomerDto.cpf,
      createCustomerDto.name,
      createCustomerDto.email,
      createCustomerDto.password,
    );
    expect(response).toEqual(mockCustomer);
  });
});
