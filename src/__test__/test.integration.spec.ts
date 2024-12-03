import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DynamoDBModule } from 'nestjs-dynamo';
import { CustomersService } from '../../Application/services/customers.service';
import { CustomersController } from '../../Presentation/Customers/customers.controller';
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';
import { CustomersAdapter } from '../../Domain/Adapters/customers.adapter';
import { Customer } from '../../Domain/Interfaces/customers.interface';
import { ConfigService } from '@nestjs/config';
import request from 'supertest';
import { DynamoDBService } from '../../Infrastructure/Dynamo/dynamodb.service'; // exemplo de serviço DynamoDB

let app: INestApplication;
let controllerCustomers: CustomersController;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [DynamoDBModule],  // Certifique-se de importar seu módulo do DynamoDB
    controllers: [CustomersController],
    providers: [
      CustomersService,
      { provide: CustomersRepository, useClass: CustomersAdapter },
      DynamoDBService,
      ConfigService,
    ],
  }).compile();

  controllerCustomers = module.get<CustomersController>(CustomersController);
  app = module.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await app.close();
});

beforeEach(async () => {
  // Resetando o banco de dados DynamoDB antes de cada teste
  await DynamoDBService.resetTable('Customers'); // Supondo que você tenha um método para limpar dados da tabela
});

describe('Integration Test Customers', () => {
  it('should create customer', async () => {
    const dto: Customer = {
      id: '1', // Considerando que o ID seja uma string no DynamoDB
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    await request(app.getHttpServer()).post('/customers').send(dto).expect(201);

    const customerDb = await controllerCustomers.getByID('1');

    expect(customerDb).toBeTruthy();
    expect(customerDb?.name).toBe(dto.name);
    expect(customerDb?.email).toBe(dto.email);
  });

  it('should update customer', async () => {
    const dto: Customer = {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    await request(app.getHttpServer()).post('/customers').send(dto).expect(201);

    const updatedCustomer: Customer = {
      id: '1',
      name: 'John Smith',
      email: 'johnsmith@example.com',
    };

    await request(app.getHttpServer())
      .patch('/customers')
      .send(updatedCustomer)
      .expect(200);

    const customerDb = await controllerCustomers.getByID('1');

    expect(customerDb).toBeTruthy();
    expect(customerDb?.name).toBe(updatedCustomer.name);
    expect(customerDb?.email).toBe(updatedCustomer.email);
  });

  it('should get customer by id', async () => {
    const dto: Customer = {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    await request(app.getHttpServer()).post('/customers').send(dto).expect(201);

    const customerDb = await controllerCustomers.getByID('1');

    expect(customerDb).toBeTruthy();
    expect(customerDb?.name).toBe(dto.name);
  });

  it('should delete customer by ID', async () => {
    const dto: Customer = {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    await request(app.getHttpServer()).post('/customers').send(dto).expect(201);

    await request(app.getHttpServer()).delete('/customers/1').expect(200);

    const customerDb = await controllerCustomers.getByID('1');

    expect(customerDb).toBeNull();
  });
});
