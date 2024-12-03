import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../src/Application/services/customer.service';
import { CustomersRepository } from '../src/Domain/Repositories/customersRepository';
import { BadRequestError, NotFoundError } from '../src/Domain/Errors';
import { CreateCustomerDto } from '../src/Presentation/Customers/dtos/create-customer.dto';
import { CustomerDto } from '../src/Presentation/Customers/dtos/customers.dto';

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customersRepository: CustomersRepository;

  beforeEach(async () => {
    const customersRepositoryMock = {
      getCustomerByCpf: jest.fn(),
      createCustomer: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomersRepository,
          useValue: customersRepositoryMock,
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    customersRepository = module.get<CustomersRepository>(CustomersRepository);
  });

  it('should be defined', () => {
    expect(customerService).toBeDefined();
  });

  describe('createCustomer', () => {
    it('should create a customer', async () => {
      const createCustomerDto: CreateCustomerDto = {
        cpf: '12345678900',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };

      // Mock do repositório para retornar um cliente criado
      customersRepository.getCustomerByCpf.mockResolvedValue(null);  // Nenhum cliente com o CPF
      customersRepository.createCustomer.mockResolvedValue(createCustomerDto as any);  // Simula a criação do cliente

      const result: CustomerDto = await customerService.createCustomer(createCustomerDto);

      expect(result).toEqual({
        cpf: '12345678900',
        name: 'John Doe',
        email: 'johndoe@example.com',
      });
    });

    it('should throw BadRequestError if the customer already exists', async () => {
      const createCustomerDto: CreateCustomerDto = {
        cpf: '12345678900',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };

      // Mock do repositório para retornar um cliente já existente
      customersRepository.getCustomerByCpf.mockResolvedValue(createCustomerDto as any);

      await expect(customerService.createCustomer(createCustomerDto)).rejects.toThrowError(
        new BadRequestError('Customer already exists'),
      );
    });
  });
});
