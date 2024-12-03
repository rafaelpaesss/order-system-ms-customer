import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../src/Application/services/customer.service';  // Ajuste o caminho conforme necessário
import { CustomersRepository } from '../src/Domain/Repositories/customersRepository';  // Ajuste o caminho conforme necessário
import { CreateCustomerDto } from '../src/Presentation/Customers/dtos/create-customer.dto';  // Ajuste o caminho conforme necessário
import { CustomerDto } from '../src/Presentation/Customers/dtos/customer.dto';  // Ajuste o caminho conforme necessário

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customersRepository: Partial<CustomersRepository>;  // Ajuste o tipo para Partial

  beforeEach(async () => {
    // Mocka os métodos da classe CustomersRepository
    const customersRepositoryMock = {
      createCustomer: jest.fn(),  // Mocka createCustomer
      getCustomerByCpf: jest.fn(),  // Mocka getCustomerByCpf
      updateCustomer: jest.fn(),  // Mocka updateCustomer, caso exista
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomersRepository,
          useValue: customersRepositoryMock,  // Passa o mock para o Jest
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    customersRepository = module.get<CustomersRepository>(CustomersRepository);  // Agora com mock
  });

  it('should create a customer', async () => {
    const mockCustomer: CustomerDto = {
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',  // Inclui a senha no mock
    };

    // Garantir que createCustomer está definido e mocka seu valor
    (customersRepository.createCustomer as jest.Mock).mockResolvedValue(mockCustomer);

    const createCustomerDto: CreateCustomerDto = {
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    const response = await customerService.createCustomer(createCustomerDto);

    // Verifica se o método foi chamado corretamente e se o retorno está correto
    expect(customersRepository.createCustomer).toHaveBeenCalledWith(
      createCustomerDto.cpf,
      createCustomerDto.name,
      createCustomerDto.email,
      createCustomerDto.password,
    );

    // Compara os objetos ignorando a senha
    const { password, ...mockCustomerWithoutPassword } = mockCustomer;
    const { password: responsePassword, ...responseWithoutPassword } = response;

    expect(responseWithoutPassword).toEqual(mockCustomerWithoutPassword);
  });
});
