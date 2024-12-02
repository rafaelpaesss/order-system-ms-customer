import axios from 'axios';

describe('API Client Tests', () => {
  const apiUrl = 'http://localhost:3000'; // URL do seu servidor local ou de integração

  it('should create a new customer', async () => {
    const newCustomer = {
      cpf: '12345678900',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    try {
      const response = await axios.post(`${apiUrl}/customers`, newCustomer);
      expect(response.status).toBe(201);
      expect(response.data).toEqual({
        cpf: '12345678900',
        name: 'John Doe',
        email: 'johndoe@example.com',
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to create customer: ${error.message}`);
      } else {
        throw new Error('An unknown error occurred while creating customer');
      }
    }
  });

  it('should get an existing customer', async () => {
    const existingCustomer = {
      cpf: '12345678900',
      password: 'password123',
    };

    try {
      const response = await axios.post(`${apiUrl}/customers/login`, existingCustomer);
      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        cpf: '12345678900',
        name: 'John Doe',
        email: 'johndoe@example.com',
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to retrieve customer: ${error.message}`);
      } else {
        throw new Error('An unknown error occurred while retrieving customer');
      }
    }
  });
});
