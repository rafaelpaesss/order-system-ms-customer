import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../../Presentation/Customers/customers.controller';
import { CustomersService } from '../../Application/services/customer.service';
import { CreateCustomerDto } from '../../Domain/Interfaces/create-customer.dto';
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';

// Mock da implementação do CustomersRepository
class MockCustomersRepository {
  getCustomerByCpf(cpf: string): Promise<Customer | null> {
    return Promise.resolve(null); // Mock: sempre retorna null para não encontrar cliente
  }

  saveCustomer(customer: CreateCustomerDto): Promise<Customer> {
    return Promise.resolve({ ...customer, cpf: customer.cpf }); // Mock: retorna o próprio cliente com o CPF
  }
}

describe('CustomersController', () => {
  let controllerCustomers: CustomersController;
  let customersRepository: MockCustomersRepository; // Agora o tipo é o mock

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        CustomersService,
        { provide: CustomersRepository, useClass: MockCustomersRepository }, // Usando o mock no lugar do real CustomersRepository
      ],
    }).compile();

    controllerCustomers = module.get<CustomersController>(CustomersController);
    customersRepository = module.get<CustomersRepository>(CustomersRepository); // Agora o mock
  });

  it('should return a customer by CPF', async () => {
    const customer: CreateCustomerDto = new CreateCustomerDto('12345678900', 'John Doe', 'john.doe@example.com', 'securepassword');
    jest.spyOn(customersRepository, 'getCustomerByCpf').mockResolvedValue(customer);

    const result = await controllerCustomers.getCustomer(customer.cpf); 
    expect(result).toEqual(customer); 
  });

  it('should save a new customer', async () => {
    const customer: CreateCustomerDto = new CreateCustomerDto('12345678900', 'Jane Doe', 'jane.doe@example.com', 'securepassword');

    jest.spyOn(customersRepository, 'getCustomerByCpf').mockResolvedValue(null);  // Mocking that the customer doesn't exist
    jest.spyOn(customersRepository, 'saveCustomer').mockResolvedValue(customer);  // Mock saveCustomer

    const result = await controllerCustomers.createCustomer(customer);  // Usando o método correto no controlador
    expect(result).toEqual(customer);
  });

  it('should update an existing customer', async () => {
    const customer: CreateCustomerDto = new CreateCustomerDto('12345678900', 'Jane Doe', 'jane.doe@example.com', 'securepassword');
    const updatedCustomer: CreateCustomerDto = new CreateCustomerDto('12345678900', 'Jane Smith', 'jane.smith@example.com', 'newpassword');

    jest.spyOn(customersRepository, 'getCustomerByCpf').mockResolvedValue(customer);
    jest.spyOn(customersRepository, 'saveCustomer').mockResolvedValue(updatedCustomer); // Mock saveCustomer as update

    const result = await controllerCustomers.createCustomer(updatedCustomer);  // Usando o método correto no controlador
    expect(result).toEqual(updatedCustomer);
  });
});
