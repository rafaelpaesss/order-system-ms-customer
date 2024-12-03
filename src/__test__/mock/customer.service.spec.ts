import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../../Application/services/customer.service';  // Ajuste o caminho
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';  // Ajuste o caminho
import { CreateCustomerDto } from '../../Presentation/Customers/dtos/create-customer.dto';  // Ajuste o caminho

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customersRepository: jest.Mocked<CustomersRepository>;

  beforeEach(async () => {
    // Cria o módulo de teste com os mocks corretos
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomersRepository,
          useValue: {
            createCustomer: jest.fn(),  // Mock do método createCustomer
            getCustomerByCpf: jest.fn(),  // Mock do método getCustomerByCpf
          },
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    customersRepository = module.get<CustomersRepository>(CustomersRepository);
  });

  it('should create a customer', async () => {
    // Criação do mock do cliente
    const mockCustomer = { cpf: '12345678900', name: 'John Doe', email: 'johndoe@example.com', password: 'password123' };
    
    // Configura o mock para o método 'createCustomer' retornar o mockCustomer
    customersRepository.createCustomer.mockResolvedValue(mockCustomer);

    // Criação do DTO para passar ao método
    const createCustomerDto: CreateCustomerDto = {
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    // Chama o método do service
    const response = await customerService.createCustomer(createCustomerDto);

    // Verifica se o método foi chamado corretamente e se o retorno está correto
    expect(customersRepository.createCustomer).toHaveBeenCalledWith(
      createCustomerDto.cpf,
      createCustomerDto.name,
      createCustomerDto.email,
      createCustomerDto.password,
    );
    expect(response).toEqual(mockCustomer);  // Verifica se o retorno do serviço é o esperado
  });
});
