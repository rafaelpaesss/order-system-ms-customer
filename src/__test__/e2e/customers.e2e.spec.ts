import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../../Presentation/Customers/customers.controller';
import { CustomersService } from '../../Application/services/customer.service';
import { DynamoDBService } from '../../Infrastructure/Apis/dynamodb.service';
import { DynamoDBHealthIndicator } from '../../Presentation/health/DynamoDbHealthIndicator.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('CustomersController (e2e)', () => {
  let app: INestApplication;
  let customersService: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService, DynamoDBService, DynamoDBHealthIndicator],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    customersService = module.get<CustomersService>(CustomersService);
  });

  it('/customers (GET) - should return a customer by CPF', async () => {
    const customer = { cpf: '12345678900', name: 'John Doe' };

    jest.spyOn(customersService, 'getByCpf').mockResolvedValue(customer);

    const response = await request(app.getHttpServer())
      .get('/customers')
      .query({ cpf: customer.cpf })
      .expect(200);

    expect(response.body).toEqual(customer);
  });

  it('/customers (POST) - should create a new customer', async () => {
    const customer = { cpf: '12345678901', name: 'Jane Doe' };

    jest.spyOn(customersService, 'create').mockResolvedValue(customer);

    const response = await request(app.getHttpServer())
      .post('/customers')
      .send(customer)
      .expect(201);

    expect(response.body).toEqual(customer);
  });

  it('/customers (PUT) - should update an existing customer', async () => {
    const customer = { cpf: '12345678900', name: 'John Doe Updated' };

    jest.spyOn(customersService, 'update').mockResolvedValue(customer);

    const response = await request(app.getHttpServer())
      .put('/customers')
      .send(customer)
      .expect(200);

    expect(response.body).toEqual(customer);
  });

  it('/customers (DELETE) - should delete a customer by CPF', async () => {
    const cpf = '12345678900';
    const customer = { cpf, name: 'John Doe' };

    jest.spyOn(customersService, 'delete').mockResolvedValue(customer);

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
