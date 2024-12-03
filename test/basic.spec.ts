import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../Application/services/customer.service';
import { CustomersRepository } from '../Domain/Repositories/customersRepository';
import { BadRequestError, NotFoundError } from '../Domain/Errors';
import { CreateCustomerDto } from '../Presentation/Customers/dtos/create-customer.dto';
import { CustomerDto } from '../Presentation/Customers/dtos/customers.dto';

// Mocka o CustomersRepository
jest.mock('../src/Domain/Repositories/customersRepository');

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customersRepository: jest.Mocked<CustomersRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomersRepository,
          useValue: new CustomersRepository(),  // Mocka a classe diretamente
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    customersRepository = module.get<CustomersRepository>(CustomersRepository);  // Aqui estamos pegando a instância do mock
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

      // Mock para retornar um objeto do tipo Customer
      customersRepository.getCustomerByCpf.mockResolvedValue(null);  // Nenhum cliente com o CPF
      customersRepository.createCustomer.mockResolvedValue({
        cpf: '12345678900',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',  // O password não será retornado no DTO
      } as any);  // Aqui fazemos o mock de um retorno de tipo `Customer`

      const result: CustomerDto = await customerService.createCustomer(createCustomerDto);

      // Verifica se o retorno está correto
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
