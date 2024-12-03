const { When, Then } = require('@cucumber/cucumber');
const { deepStrictEqual } = require('assert');
import { CreateCustomerDto } from '../src/Presentation/Customers/dtos/create-customer.dto';
import { CustomerDto } from '../src/Presentation/Customers/dtos/customers.dto';
import * as request from 'supertest'; // Para as requisições HTTP
import { bootstrap } from '../src/main'; // Certifique-se de que o bootstrap esteja correto

let app: any;
let response: any;
let customerData: CreateCustomerDto;

const answerCustomer = {
  cpf: '12345678900',
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: 'password123',
  id: 1, // Simulando o ID do cliente retornado
};

// Função fictícia para simular o comportamento de criação de um cliente
async function createCustomerInDatabase(customerData: CreateCustomerDto): Promise<CustomerDto> {
  // Simula a criação de um cliente e a resposta da API
  return {
    ...customerData,
    id: 1, // O ID será gerado pela base de dados (simulado aqui)
  };
}

When('creating a customer', async function () {
  // Simula os dados do cliente a serem criados
  customerData = {
    cpf: '12345678900',
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password123',
  };

  // Envia a requisição para criar o cliente via Supertest
  response = await request(app)
    .post('/customers')
    .send(customerData);
});

Then('return customer made', function () {
  // Verifique se a resposta da API está correta
  deepStrictEqual(response.body, answerCustomer);
});

Then('the response status code should be 201', function () {
  // Verifica se o código de status da resposta é 201 (Created)
  if (response.status !== 201) {
    throw new Error(`Expected status 201, but got ${response.status}`);
  }
});
