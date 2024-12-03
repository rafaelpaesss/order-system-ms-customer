import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../../src/Application/services/customer.service';
import { CustomersRepository } from '../../src/Domain/Repositories/customersRepository';
import { CreateCustomerDto } from '../../src/Presentation/Customers/dtos/create-customer.dto';
import { CustomerDto } from '../../src/Presentation/Customers/dtos/customers.dto';

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customersRepository: jest.Mocked<CustomersRepository>; // Usando mock para o CustomersRepository
  let customerData: CreateCustomerDto; // Definindo a variável customerData corretamente

  beforeEach(() => {
    // Inicializa corretamente customerData antes de usá-la
    customerData = {
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomersRepository,
          useValue: {
            getCustomerByCpf: jest.fn(),
            createCustomer: jest.fn(),
          }, // Mocka a classe diretamente para testes
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    customersRepository = module.get<CustomersRepository>(CustomersRepository); // Pegando a instância do mock
  });

  it('should create a customer', async () => {
    // Mock para o método 'getCustomerByCpf' retornar null, ou seja, não há cliente com o CPF
    customersRepository.getCustomerByCpf.mockResolvedValue(null);

    // Mock para o método 'createCustomer' retornar um cliente criado com os dados do DTO
    customersRepository.createCustomer.mockResolvedValue({
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });

    // Chama o método 'createCustomer' do serviço, passando os dados
    const response: CustomerDto = await customerService.createCustomer(customerData);

    // Verifica se o retorno está correto, sem a senha
    expect(response).toEqual({
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
    });
  });
});
