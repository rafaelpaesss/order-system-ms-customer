import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../src/Application/services/customer.service';
import { CustomersRepository } from '../src/Domain/Repositories/customersRepository';
import { CreateCustomerDto } from '../src/Presentation/Customers/dtos/create-customer.dto';
import { CustomerDto } from '../src/Presentation/Customers/dtos/customers.dto';
import request from 'supertest';  // Correção da importação do supertest
import { bootstrap } from '../src/main';  // Certifique-se de que o bootstrap esteja correto

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customersRepository: jest.Mocked<CustomersRepository>; // Alteração para Mocked
  let customerData: CreateCustomerDto;
  let app: any;

  beforeAll(async () => {
    app = await bootstrap();  // Inicializando o app
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
            getCustomerByCpf: jest.fn(),  // Mock da função getCustomerByCpf
            createCustomer: jest.fn(),    // Mock da função createCustomer
          },
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    customersRepository = module.get<CustomersRepository>(CustomersRepository);

    // Garantir que customersRepository seja tratado como um mock
    customersRepository = customersRepository as jest.Mocked<CustomersRepository>;
  });

  it('should create a customer', async () => {
    // Mockando o retorno de getCustomerByCpf e createCustomer
    customersRepository.getCustomerByCpf.mockResolvedValue(null);
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
    customersRepository.getCustomerByCpf.mockResolvedValue(null);
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
