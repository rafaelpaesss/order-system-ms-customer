import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../../src/Application/services/customer.service';
import { CustomersRepository } from '../../src/Domain/Repositories/customersRepository';
import { CreateCustomerDto } from '../../src/Presentation/Customers/dtos/create-customer.dto';
import { CustomerDto } from '../../src/Presentation/Customers/dtos/customers.dto';
import * as request from 'supertest';  // Adicionando supertest para requisições de teste
import { app } from '../../src/main';  // Assumindo que você tenha a instância do app em main.ts

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customersRepository: jest.Mocked<CustomersRepository>;
  let customerData: CreateCustomerDto;

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

    // Garantindo que o tipo de customersRepository seja mockado corretamente
    customersRepository = customersRepository as jest.Mocked<CustomersRepository>;
  });

  it('should create a customer', async () => {
    // Mock para o método 'getCustomerByCpf' retornar null (cliente não encontrado)
    customersRepository.getCustomerByCpf.mockResolvedValue(null);

    // Mock para o método 'createCustomer' retornar os dados do cliente criado
    customersRepository.createCustomer.mockResolvedValue({
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });

    // Testando a criação de cliente usando o método do serviço
    const response: CustomerDto = await customerService.createCustomer(customerData);

    // Verifica se a resposta está correta, sem a senha
    expect(response).toEqual({
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
    });
  });

  it('should create a customer via HTTP request', async () => {
    // Certifique-se de que this.customerData está corretamente inicializado
    expect(customerData).toBeDefined();

    // Mock para o método 'getCustomerByCpf' retornar null (cliente não encontrado)
    customersRepository.getCustomerByCpf.mockResolvedValue(null);

    // Mock para o método 'createCustomer' retornar os dados do cliente criado
    customersRepository.createCustomer.mockResolvedValue({
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });

    // Testando a criação de cliente via HTTP request
    const response = await request(app)  // A instância do app deve ser corretamente importada de main.ts
      .post('/customers')
      .send(customerData);

    // Verificando se a resposta contém os dados do cliente
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(customerData.name);
    expect(response.body.email).toBe(customerData.email);
  });
});
