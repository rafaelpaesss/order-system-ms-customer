import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../../Presentation/Customers/customers.controller';
import { CustomersService } from '../../Application/services/customer.service';
import { DynamoDBService } from '../../Infrastructure/Apis/dynamodb.service';
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

// Mock do CustomersRepository para os testes e2e
class MockCustomersRepository {
  async getCustomerByCpf(cpf: string) {
    return { cpf, name: 'John Doe', email: 'john.doe@example.com' };  // Mock de cliente
  }

  async saveCustomer(customer: any) {
    return customer;  // Retorna o próprio cliente
  }

  async updateCustomer(customer: any) {
    return customer;  // Retorna o cliente atualizado
  }

  async deleteCustomer(cpf: string) {
    return { cpf, name: 'John Doe', email: 'john.doe@example.com' };  // Retorna o cliente deletado
  }
}

describe('CustomersController (e2e)', () => {
  let app: INestApplication;
  let customersService: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        CustomersService,
        DynamoDBService,
        { provide: CustomersRepository, useClass: MockCustomersRepository }, // Mock do repositório
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    customersService = module.get<CustomersService>(CustomersService);
  });

  it('/customers (GET) - should return a customer by CPF', async () => {
    const customer = { cpf: '12345678900', name: 'John Doe', email: 'john.doe@example.com' };

    jest.spyOn(customersService, 'getByCpf').mockResolvedValue(customer);

    const response = await request(app.getHttpServer())
      .get('/customers')
      .query({ cpf: customer.cpf })
      .expect(200);

    expect(response.body).toEqual(customer);
  });

  it('/customers (POST) - should create a new customer', async () => {
    const customer = { cpf: '12345678901', name: 'Jane Doe', email: 'jane.doe@example.com' };

    jest.spyOn(customersService, 'saveCustomer').mockResolvedValue(customer);

    const response = await request(app.getHttpServer())
      .post('/customers')
      .send(customer)
      .expect(201);

    expect(response.body).toEqual(customer);
  });

  it('/customers (PUT) - should update an existing customer', async () => {
    const customer = { cpf: '12345678900', name: 'John Doe Updated', email: 'john.doe.updated@example.com' };

    jest.spyOn(customersService, 'updateCustomer').mockResolvedValue(customer);

    const response = await request(app.getHttpServer())
      .put('/customers')
      .send(customer)
      .expect(200);

    expect(response.body).toEqual(customer);
  });

  it('/customers (DELETE) - should delete a customer by CPF', async () => {
    const cpf = '12345678900';
    const customer = { cpf, name: 'John Doe', email: 'john.doe@example.com' };

    jest.spyOn(customersService, 'deleteCustomer').mockResolvedValue(customer);

    const response = await request(app.getHttpServer())
      .delete('/customers')
      .query({ cpf })
      .expect(200);

    expect(response.body).toEqual(customer);
  });

  afterAll(async () => {
    await app.close();
  });
});
