import { Given, When, Then } from '@cucumber/cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest'; // Para as requisições HTTP
import { CustomerService } from '../src/Application/services/customer.service';
import { CustomersRepository } from '../src/Domain/Repositories/customersRepository';
import { CreateCustomerDto } from '../src/Presentation/Customers/dtos/create-customer.dto';
import { bootstrap } from '../src/main';  // Certifique-se de que o bootstrap esteja correto

let app: any;
let response: any;
let customerData: CreateCustomerDto;

Given('I have a valid customer data', () => {
  customerData = {
    cpf: '12345678900',
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password123',
  };
});

When('I send a request to create a customer', async () => {
  // Realiza a requisição POST com os dados do cliente
  response = await request(app)
    .post('/customers')
    .send(customerData);
});

Then('the customer should be created successfully', () => {
  // Verifique se o cliente foi criado com os dados certos
  expect(response.body).toHaveProperty('id');
  expect(response.body.name).toBe(customerData.name);
  expect(response.body.email).toBe(customerData.email);
});

Then('the response status code should be 201', () => {
  // Verifique se o status da resposta é 201 (Criado)
  expect(response.status).toBe(201);
});
