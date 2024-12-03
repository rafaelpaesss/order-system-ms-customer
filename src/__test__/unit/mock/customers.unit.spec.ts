import { Customers } from '../../Domain/Interfaces/customers';
import { prismaMock } from '../singleton';
import {
  deleteCustomerById,
  getCustomerById,
  saveCustomer,
  updateCustomer,
} from './mock/functionsCustomers';

describe('Unit Test Customers', () => {
  it('should Create new customer', async () => {
    const dto: Customers = { name: 'John Doe', email: 'johndoe@example.com' };

    const results = {
      id: 1,
      createdAt: new Date('2024-10-29T14:01:25.029Z'),
      updatedAt: new Date('2024-10-29T14:01:25.029Z'),
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    prismaMock.customers.create.mockResolvedValue(results);

    await expect(saveCustomer(dto)).resolves.toEqual(results);
  });

  it('should Update customer', async () => {
    const dto: Customers = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    const results = {
      id: 1,
      createdAt: new Date('2024-10-29T14:01:25.029Z'),
      updatedAt: new Date('2024-10-29T14:01:25.029Z'),
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    prismaMock.customers.update.mockResolvedValue(results);

    await expect(updateCustomer(dto)).resolves.toEqual(results);
  });

  it('should Get customer by ID', async () => {
    const id = 1;
    const results = {
      id: 1,
      createdAt: new Date('2024-10-29T14:01:25.029Z'),
      updatedAt: new Date('2024-10-29T14:01:25.029Z'),
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    prismaMock.customers.findUnique.mockResolvedValue(results);

    await expect(getCustomerById(id)).resolves.toEqual(results);
  });

  it('should Delete customer by ID', async () => {
    const id = 1;
    const results = {
      id: 1,
      createdAt: new Date('2024-10-29T14:01:25.029Z'),
      updatedAt: new Date('2024-10-29T14:01:25.029Z'),
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    prismaMock.customers.delete.mockResolvedValue(results);

    await expect(deleteCustomerById(id)).resolves.toEqual(results);
  });
});
