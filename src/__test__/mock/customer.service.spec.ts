// src/__tests__/customer.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';
import { DynamoDBService } from '../../Infrastructure/Apis/dynamodb.service';
import { CreateCustomerDto } from '../../Presentation/Customers/dtos/create-customer.dto';
import { BadRequestError } from '../../Domain/Errors';

// Mockando o DynamoDBService
jest.mock('../../Infrastructure/Apis/dynamodb.service');

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customersRepository: CustomersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        CustomersRepository,
        DynamoDBService,
      ],
    })
      .overrideProvider(CustomersRepository)  // Mockando o CustomersRepository
      .useValue({
        createCustomer: jest.fn(),
        getCustomerByCpf: jest.fn(),
        updateCustomer: jest.fn(),
      })
      .compile();

    customerService = module.get<CustomerService>(CustomerService);
    customersRepository = module.get<CustomersRepository>(CustomersRepository);
  });

  it('should be defined', () => {
    expect(customerService).toBeDefined();
  });

  describe('createCustomer', () => {
    it('should create a new customer successfully', async () => {
      const createCustomerDto: CreateCustomerDto = {
        cpf: '12345678900',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };

      const mockCustomer = {
        cpf: '12345678900',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',  // Incluindo a senha no mock
      };

      // Mockando o comportamento de createCustomer
      customersRepository.createCustomer.mockResolvedValue(mockCustomer);

      // Chamando o serviço com o DTO
      const response = await customerService.createCustomer(createCustomerDto);

      // Assegurando que o retorno está correto
      expect(response).toEqual({
        cpf: '12345678900',
        name: 'John Doe',
        email: 'johndoe@example.com',
      });

      // Verificando se o método createCustomer foi chamado com o DTO correto
      expect(customersRepository.createCustomer).toHaveBeenCalledWith(
        '12345678900', 'John Doe', 'johndoe@example.com', 'password123'
      );
    });

    it('should throw an error if the customer already exists', async () => {
      const createCustomerDto: CreateCustomerDto = {
        cpf: '12345678900',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };

      // Simulando que o cliente já existe
      customersRepository.getCustomerByCpf.mockResolvedValue({
        cpf: '12345678900',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      });

      // Verificando se o serviço lança o erro correto
      await expect(customerService.createCustomer(createCustomerDto))
        .rejects
        .toThrow(new BadRequestError('Customer already exists'));
    });
  });
});
