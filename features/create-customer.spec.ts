import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../src/Application/services/customer.service';
import { CustomersRepository } from '../src/Domain/Repositories/customersRepository';
import { CreateCustomerDto } from '../src/Presentation/Customers/dtos/create-customer.dto';
import { CustomerDto } from '../src/Presentation/Customers/dtos/customers.dto';
import request from 'supertest';  // Correção da importação do supertest
import { bootstrap } from '../src/main';  // Certifique-se de que o bootstrap esteja correto

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customersRepository: jest.Mocked<CustomersRepository>;  // Garantir que seja um mock
  let customerData: CreateCustomerDto;
  let app: any;

  beforeAll(async () => {
    app = await bootstrap();  // Inicializa o app
  });

  beforeEach(() => {
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
            getCustomerByCpf: jest.fn(),  // Mock do método getCustomerByCpf
            createCustomer: jest.fn(),  // Mock do método createCustomer
          },
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    customersRepository = module.get<CustomersRepository>(CustomersRepository);
  });

  it('should create a customer', async () => {
    // Mockando o retorno de getCustomerByCpf e createCustomer
    customersRepository.getCustomerByCpf.mockResolvedValue(null);  // Nenhum cliente com o CPF
    customersRepository.createCustomer.mockResolvedValue({
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });

    const response: CustomerDto = await customerService.createCustomer(customerData);

    expect(response).toEqual({
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
    });
  });

  it('should create a customer via HTTP request', async () => {
    customersRepository.getCustomerByCpf.mockResolvedValue(null);  // Nenhum cliente com o CPF
    customersRepository.createCustomer.mockResolvedValue({
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });

    const response = await request(app)
      .post('/customers')
      .send(customerData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(customerData.name);
    expect(response.body.email).toBe(customerData.email);
  });
});
