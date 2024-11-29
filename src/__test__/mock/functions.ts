import { mockDynamoDB, mockCreateCustomer, mockGetCustomerByCpf, resetMocks } from '@test/mock/functions';
import { CustomerService } from '../Application/services/customer.service';

describe('CustomerService', () => {
  beforeEach(() => {
    resetMocks();
  });

  it('should create a new customer', async () => {
    // Simulando a criação de um cliente
    mockCreateCustomer.mockResolvedValue({
      customerId: '123',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });

    const customerService = new CustomerService(mockDynamoDB);
    const result = await customerService.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
    });

    expect(result).toEqual({
      customerId: '123',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    expect(mockCreateCustomer).toHaveBeenCalled();
  });

  it('should fetch customer by CPF', async () => {
    // Simulando a busca de um cliente
    mockGetCustomerByCpf.mockResolvedValue({
      customerId: '123',
      cpf: '12345678901',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });

    const customerService = new CustomerService(mockDynamoDB);
    const result = await customerService.getByCpf('12345678901');

    expect(result).toEqual({
      customerId: '123',
      cpf: '12345678901',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    expect(mockGetCustomerByCpf).toHaveBeenCalledWith('12345678901');
  });
});
