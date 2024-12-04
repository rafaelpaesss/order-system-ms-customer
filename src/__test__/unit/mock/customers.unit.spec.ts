import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from '../../Application/services/customer.service';
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';
import { Customer } from '../../Domain/Interfaces/customer';

class MockCustomersRepository {
  getCustomerByCpf(cpf: string): Promise<Customer | null> {
    // Mock: Retorna um cliente simulado quando o CPF corresponde
    if (cpf === '12345678900') {
      return Promise.resolve({ cpf: '12345678900', name: 'John Doe', email: 'john@example.com', password: 'securepassword' });
    }
    return Promise.resolve(null);  // Caso contrário, retorna null
  }

  saveCustomer(customer: Customer): Promise<Customer> {
    return Promise.resolve(customer);  // Mock: Retorna o cliente salvo
  }

  updateCustomer(customer: Customer): Promise<Customer> {
    return Promise.resolve(customer);  // Mock: Retorna o cliente atualizado
  }

  deleteCustomer(cpf: string): Promise<Customer> {
    return Promise.resolve({ cpf, name: 'John Doe', email: 'john@example.com', password: 'securepassword' });  // Mock: Retorna o cliente deletado
  }
}

describe('CustomersService', () => {
  let service: CustomersService;
  let customersRepository: MockCustomersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        { provide: CustomersRepository, useClass: MockCustomersRepository },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    customersRepository = module.get<CustomersRepository>(CustomersRepository);
  });

  it('should return a customer when CPF exists', async () => {
    const customer: Customer = { cpf: '12345678900', name: 'John Doe', email: 'john@example.com', password: 'securepassword' };

    // Mocking the repository method
    jest.spyOn(customersRepository, 'getCustomerByCpf').mockResolvedValue(customer);

    const result = await service.getByCpf('12345678900');
    expect(result).toEqual(customer); // Verifica se o retorno é o esperado
  });

  it('should update and return the updated customer', async () => {
    const customer: Customer = { cpf: '12345678900', name: 'John Updated', email: 'johnupdated@example.com', password: 'newpassword' };

    // Mocking the repository method
    jest.spyOn(customersRepository, 'updateCustomer').mockResolvedValue(customer);

    const result = await service.updateCustomer(customer);
    expect(result).toEqual(customer); // Verifica se o retorno é o esperado
  });

  it('should delete and return the deleted customer', async () => {
    const customer: Customer = { cpf: '12345678900', name: 'John Doe', email: 'john@example.com', password: 'securepassword' };

    // Mocking the repository method
    jest.spyOn(customersRepository, 'deleteCustomer').mockResolvedValue(customer);

    const result = await service.deleteCustomer('12345678900');
    expect(result).toEqual(customer); // Verifica se o retorno é o esperado
  });
});
