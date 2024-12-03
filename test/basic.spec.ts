import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../src/Application/services/customer.service';
import { CustomersRepository } from '../src/Domain/Repositories/customersRepository';
import { CreateCustomerDto } from '../src/Presentation/Customers/dtos/create-customer.dto';  // Importe o DTO para passar corretamente os dados

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customersRepository: jest.Mocked<CustomersRepository>;

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
    customersRepository = module.get<CustomersRepository>(CustomersRepository);
  });

  it('should create a customer', async () => {
    // Mock para criar o cliente
    const mockCustomer = {
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',  // Senha incluída para criar o mock completo
    };

    // Ajuste do mock
    customersRepository.createCustomer.mockResolvedValue(mockCustomer);

    // Criação do DTO para passar como parâmetro para a função
    const createCustomerDto: CreateCustomerDto = {
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    // Chamada do método de criação de cliente
    const response = await customerService.createCustomer(createCustomerDto);

    // Verifica se a resposta é igual ao mock
    expect(response).toEqual({
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
    });  // Não incluir senha na resposta
  });
});
