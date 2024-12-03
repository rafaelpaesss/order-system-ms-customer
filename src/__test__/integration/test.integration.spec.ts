import { HttpModule } from '@nestjs/axios';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DynamoDBService } from '../../Infrastructure/Apis/dynamoDB.service';
import { CustomersService } from '../../Application/services/customers.service';
import { CustomersAdapter } from '../../Domain/Adapters/customers.adapter';
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';
import { CustomersController } from '../../Presentation/Customers/customers.controller';
import { HealthController } from '../../Presentation/Health/health.controller';
import { DynamoDBHealthIndicator } from '../../Presentation/Health/DynamoDBHealthIndicator.service';
import request from 'supertest';

let app: INestApplication;
let controllerCustomers: CustomersController;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [HttpModule],
    controllers: [CustomersController, HealthController],
    providers: [
      DynamoDBHealthIndicator,
      CustomersService,
      DynamoDBService,
      ConfigService,
      { provide: CustomersRepository, useClass: CustomersAdapter },
    ],
  }).compile();

  controllerCustomers = module.get<CustomersController>(CustomersController);
  app = module.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await app.close();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Integration Test Customers', () => {
  it('should create a customer', async () => {
    const customer = {
      cpf: '12345678900',
      name: 'John Doe',
      password: 'password123',
    };

    await request(app.getHttpServer())
      .post('/customers')
      .send(customer)
      .expect(201);

    const customerDb = await controllerCustomers.getByCpf(customer.cpf);

    expect(customerDb).toBeTruthy();
    expect(customerDb?.cpf).toBe(customer.cpf);
    expect(customerDb?.name).toBe(customer.name);
  });

  it('should get a customer by CPF', async () => {
    const customer = {
      cpf: '12345678900',
      name: 'John Doe',
      password: 'password123',
    };

    await request(app.getHttpServer())
      .post('/customers')
      .send(customer)
      .expect(201);

    await request(app.getHttpServer())
      .get(`/customers/${customer.cpf}`)
      .expect(200);

    const customerDb = await controllerCustomers.getByCpf(customer.cpf);

    expect(customerDb).toBeTruthy();
    expect(customerDb?.cpf).toBe(customer.cpf);
  });

  it('should update a customer', async () => {
    const customer = {
      cpf: '12345678900',
      name: 'John Doe',
      password: 'password123',
    };

    await request(app.getHttpServer())
      .post('/customers')
      .send(customer)
      .expect(201);

    const updatedCustomer = {
      cpf: '12345678900',
      name: 'John Smith',
      password: 'newpassword123',
    };

    await request(app.getHttpServer())
      .patch(`/customers/${customer.cpf}`)
      .send(updatedCustomer)
      .expect(200);

    const customerDb = await controllerCustomers.getByCpf(customer.cpf);

    expect(customerDb).toBeTruthy();
    expect(customerDb?.name).toBe(updatedCustomer.name);
  });

  it('should delete a customer by CPF', async () => {
    const customer = {
      cpf: '12345678900',
      name: 'John Doe',
      password: 'password123',
    };

    await request(app.getHttpServer())
      .post('/customers')
      .send(customer)
      .expect(201);

    await request(app.getHttpServer())
      .delete(`/customers/${customer.cpf}`)
      .expect(200);

    const customerDb = await controllerCustomers.getByCpf(customer.cpf);

    expect(customerDb).toBeNull();
  });
});
