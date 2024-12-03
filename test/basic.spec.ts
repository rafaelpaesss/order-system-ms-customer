import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../src/Application/services/customer.service';
import { CustomersRepository } from '../src/Domain/Repositories/customersRepository';  
import { CreateCustomerDto } from '../src/Presentation/Customers/dtos/create-customer.dto';  

jest.mock('../Domain/Repositories/customersRepository');  // Mocka o repositório

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customersRepository: jest.Mocked<CustomersRepository>;  // Assegure-se de que o Jest entenda que é um mock

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomersRepository,
          useValue: {
            createCustomer: jest.fn(),
            getCustomerByCpf: jest.fn(),
          },
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    customersRepository = module.get<CustomersRepository>(CustomersRepository);  // Mockado
  });

  it('should create a customer', async () => {
    // Mock de resposta para o método 'createCustomer'
    const mockCustomer = {
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    // Configura o mock para o método 'createCustomer' retornar o mockCustomer
    customersRepository.createCustomer.mockResolvedValue(mockCustomer);

    // Criação do DTO para passar ao método
    const createCustomerDto: CreateCustomerDto = {
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    // Chamada do método de criação de cliente
    const response = await customerService.createCustomer(createCustomerDto);

    // Verifica se a resposta está correta (sem a senha)
    expect(response).toEqual({
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
    });
  });
});
