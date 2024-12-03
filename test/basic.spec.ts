import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../src/Application/services/customer.service';
import { CustomersRepository } from '../src/Domain/Repositories/customersRepository';

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
    customersRepository.createCustomer.mockResolvedValue({ cpf: '12345678900', name: 'John Doe' });
    const response = await customerService.createCustomer('12345678900', 'John Doe', 'johndoe@example.com', 'password123');
    expect(response).toEqual({ cpf: '12345678900', name: 'John Doe' });
  });
});
