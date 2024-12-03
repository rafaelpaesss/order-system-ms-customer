import { defineFeature, loadFeature } from 'jest-cucumber';
import { CustomersService } from '../../src/Application/services/customer.service'; // Ajuste o caminho conforme necessário
import { Customer } from '../../src/Domain/Interfaces/customer';
import { CustomersRepository } from '../../src/Domain/Repositories/customersRepository'; // Ajuste o caminho conforme necessário
import { mock } from 'jest-mock-extended';

const feature = loadFeature('./features/customer.feature');

defineFeature(feature, (test) => {
  let customersService: CustomersService;
  let customersRepositoryMock = mock<CustomersRepository>(); // Mock da repository
  let retrievedCustomer: Customer | null = null;

  test('Retrieve a customer by CPF', ({ given, when, then }) => {
    let existingCustomer: Customer;

    given('a customer exists with CPF "12345678901"', async () => {
      customersService = new CustomersService(customersRepositoryMock); // Passa o mock aqui
      existingCustomer = {
        cpf: '12345678901',
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      // Configura o comportamento do mock
      customersRepositoryMock.getCustomerByCpf.mockResolvedValue(existingCustomer);
    });

    when('I retrieve the customer by CPF "12345678901"', async () => {
      retrievedCustomer = await customersService.getCustomerByCpf('12345678901');
    });

    then("I should receive the customer's details", () => {
      expect(retrievedCustomer).not.toBeNull();
      expect(retrievedCustomer?.cpf).toBe('12345678901');
      expect(retrievedCustomer?.name).toBe('John Doe');
      expect(retrievedCustomer?.email).toBe('john.doe@example.com');
    });
  });
});
