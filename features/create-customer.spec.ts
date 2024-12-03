import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../src/Application/services/customer.service';
import { CustomersRepository } from '../src/Domain/Repositories/customersRepository';
import { CreateCustomerDto } from '../src/Presentation/Customers/dtos/create-customer.dto';
import { CustomerDto } from '../src/Presentation/Customers/dtos/customers.dto';
import request from 'supertest';  // Correção: Importação padrão do supertest
import { bootstrap } from '../src/__test__/mock/main';  // Importe o bootstrap ou a instância do app

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customersRepository: jest.Mocked<CustomersRepository>;
  let customerData: CreateCustomerDto;
  let app: any;

  beforeAll(async () => {
    // Inicia o app antes de rodar os testes
    app = await bootstrap();  // Ou a função que inicializa a instância do app
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
            getCustomerByCpf: jest.fn(),
            createCustomer: jest.fn(),
          },
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    customersRepository = module.get<CustomersRepository>(CustomersRepository);

    customersRepository = customersRepository as jest.Mocked<CustomersRepository>;
  });

  it('should create a customer', async () => {
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

    // Certifique-se de que customerData está corretamente definido
    const response = await request(app)  // Use a instância do app
      .post('/customers')
      .send(customerData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(customerData.name);
    expect(response.body.email).toBe(customerData.email);
  });
});
