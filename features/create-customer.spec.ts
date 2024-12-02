import { defineFeature, loadFeature } from 'jest-cucumber';
import request from 'supertest';
import { app } from '../src/main'; // O arquivo que contém a aplicação NestJS

const feature = loadFeature('./src/features/customers/create-customer.feature');

defineFeature(feature, (test) => {
  test('Successfully creating a new customer', ({ given, when, then }) => {
    let response;

    given('I have a valid customer data', () => {
      this.customerData = {
        cpf: '12345678900',
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123'
      };
    });

    when('I send a request to create a customer', async () => {
      response = await request(app)
        .post('/customers')
        .send(this.customerData);
    });

    then('the customer should be created successfully', () => {
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(this.customerData.name);
    });

    then('the response status code should be 201', () => {
      expect(response.status).toBe(201);
    });
  });
});
