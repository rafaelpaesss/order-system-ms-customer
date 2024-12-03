import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../src/Presentation/Customers/customers.controller';
import { CustomerService } from '../src/Application/services/customer.service';
import { DynamoDBService } from '../src/Infrastructure/Apis/dynamodb.service';
import { CustomersRepository } from '../src/Domain/Repositories/customersRepository';
import { CreateCustomerDto } from '../src/Presentation/Customers/dtos/create-customer.dto';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomerService;

  const mockCustomersRepository = {
    createCustomer: jest.fn(),
    getCustomerByCpf: jest.fn(),
    updateCustomer: jest.fn(),
  };

  const mockDynamoDBService = {
    putItem: jest.fn(),
    getItem: jest.fn(),
    updateItem: jest.fn(),
  };

  beforeEach(async () => {
    // Configura a instância do NestJS para o controlador e o serviço
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        CustomerService,
        {
          provide: DynamoDBService,
          useValue: mockDynamoDBService, // Mock do DynamoDBService
        },
        {
          provide: CustomersRepository,
          useValue: mockCustomersRepository, // Mock do CustomersRepository
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCustomer', () => {
    it('should create a customer', async () => {
      const createCustomerDto: CreateCustomerDto = {
        cpf: '12345678900',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };

      // Mock do serviço para retornar o cliente criado
      jest.spyOn(service, 'createCustomer').mockResolvedValue(createCustomerDto);

      const response = await controller.createCustomer(createCustomerDto);

      // Verifica se a resposta do controlador é a esperada
      expect(response).toEqual({
        cpf: '12345678900',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      });

      // Verifica se o serviço foi chamado com os parâmetros corretos
      expect(service.createCustomer).toHaveBeenCalledWith(createCustomerDto);
    });
  });
});
