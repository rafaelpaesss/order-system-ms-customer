import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';  // Ajuste o caminho conforme seu projeto
import { Customer } from '../src/Domain/Interfaces/customer';

describe('CustomersController (e2e)', () => {
  let app;
  
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/customers (GET) - should return a customer by CPF', async () => {
    const customer: Customer = { cpf: '12345678900', name: 'John Doe', email: 'john.doe@example.com', password: 'password123' };

    // Mocka o serviço getCustomerByCpf para retornar o cliente
    jest.spyOn(customersService, 'getCustomerByCpf').mockResolvedValue(customer);

    const response = await request(app.getHttpServer())
      .get(`/customers/${customer.cpf}`) // Alterado para usar o CPF na URL
      .expect(200);

    expect(response.body).toEqual(customer);
  });

  it('/customers (POST) - should create a new customer', async () => {
    const customer: Customer = { cpf: '12345678901', name: 'Jane Doe', email: 'jane.doe@example.com', password: 'password123' };

    // Mocka os serviços getCustomerByCpf e saveCustomer
    jest.spyOn(customersService, 'getCustomerByCpf').mockResolvedValue(null); // Simula que o cliente não existe
    jest.spyOn(customersService, 'saveCustomer').mockResolvedValue(customer);

    const response = await request(app.getHttpServer())
      .post('/customers')
      .send(customer)
      .expect(201);  // Espera status 201 de criação

    expect(response.body).toEqual(customer);
  });

  it('/customers (PUT) - should update an existing customer', async () => {
    const customer: Customer = { cpf: '12345678900', name: 'John Doe Updated', email: 'john.doe.updated@example.com', password: 'newpassword123' };

    // Mocka os serviços
    jest.spyOn(customersService, 'getCustomerByCpf').mockResolvedValue(customer); // Simula que o cliente existe
    jest.spyOn(customersService, 'updateCustomer').mockResolvedValue(customer);

    const response = await request(app.getHttpServer())
      .put(`/customers/${customer.cpf}`)  // Alterado para usar o CPF na URL
      .send(customer)
      .expect(200);

    expect(response.body).toEqual(customer);
  });

  it('/customers (DELETE) - should delete a customer by CPF', async () => {
    const cpf = '12345678900';
    const customer: Customer = { cpf, name: 'John Doe', email: 'john.doe@example.com', password: 'password123' };

    // Mocka os serviços
    jest.spyOn(customersService, 'getCustomerByCpf').mockResolvedValue(customer); // Simula que o cliente existe
    jest.spyOn(customersService, 'deleteCustomer').mockResolvedValue(customer);

    const response = await request(app.getHttpServer())
      .delete(`/customers/${cpf}`)  // Alterado para usar o CPF na URL
      .expect(200);

    expect(response.body).toEqual(customer);
  });

  afterAll(async () => {
    await app.close();
  });
});
