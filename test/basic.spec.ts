import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../src/Application/services/customer.service';  // Ajuste o caminho conforme necessário
import { CustomersRepository } from '../src/Domain/Repositories/customersRepository';  // Ajuste o caminho conforme necessário
import { CreateCustomerDto } from '../src/Presentation/Customers/dtos/create-customer.dto';  // Ajuste o caminho conforme necessário

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customersRepository: Partial<CustomersRepository>;

  beforeEach(async () => {
    const customersRepositoryMock = {
      createCustomer: jest.fn(),
      getCustomerByCpf: jest.fn(),
      updateCustomer: jest.fn(),
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

  it('should create a customer', async () => {
    const mockCustomer: Customer = {
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',  // A senha está presente no mockCustomer
    };

    (customersRepository.createCustomer as jest.Mock).mockResolvedValue(mockCustomer);

    const createCustomerDto: CreateCustomerDto = {
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',  // A senha é parte do DTO
    };

    const response = await customerService.createCustomer(createCustomerDto);

    // Verifica se o método foi chamado corretamente
    expect(customersRepository.createCustomer).toHaveBeenCalledWith(
      createCustomerDto.cpf,
      createCustomerDto.name,
      createCustomerDto.email,
      createCustomerDto.password,
    );

    // Desestruturação para remover o campo `password` na comparação
    const { password, ...responseWithoutPassword } = response;  // Aqui, `response` deve ter o tipo `Customer`
    const { password: mockPassword, ...mockCustomerWithoutPassword } = mockCustomer;

    expect(responseWithoutPassword).toEqual(mockCustomerWithoutPassword);
  });
});
