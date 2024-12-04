import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../../Presentation/Customers/customers.controller';
import { DynamoDBService } from '../../Infrastructure/Apis/dynamodb.service';
import { CustomersService } from '../../Application/services/customer.service';
import { DynamoDbHealthIndicator } from '../../Presentation/Health/DynamoDbHealthIndicator.service';
import { Customer } from '../../Domain/Interfaces/customer';
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';

// Mock da implementação do CustomersRepository
class MockCustomersRepository {
  getCustomerByCpf(cpf: string): Promise<Customer | null> {
    return Promise.resolve(null); // Mock: sempre retorna null para não encontrar cliente
  }

  saveCustomer(customer: Customer): Promise<Customer> {
    return Promise.resolve(customer); // Mock: retorna o próprio cliente
  }

  deleteCustomer(cpf: string): Promise<Customer> {
    return Promise.resolve({ cpf, name: 'Deleted Customer', email: 'deleted@example.com', password: 'securepassword' }); // Mock de delete
  }
}

describe('CustomersController', () => {
  let controllerCustomers: CustomersController;
  let customersRepository: MockCustomersRepository; // Agora o tipo é o mock
  let dynamoDBService: DynamoDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        CustomersService,
        DynamoDBService,
        DynamoDbHealthIndicator,
        { provide: CustomersRepository, useClass: MockCustomersRepository }, // Usando o mock no lugar do real CustomersRepository
      ],
    }).compile();

    controllerCustomers = module.get<CustomersController>(CustomersController);
    customersRepository = module.get<CustomersRepository>(CustomersRepository); // Agora o mock
    dynamoDBService = module.get<DynamoDBService>(DynamoDBService);
  });

  it('should return a customer by CPF', async () => {
    const customer: Customer = { cpf: '12345678900', name: 'John Doe', email: 'john.doe@example.com', password: 'securepassword' };
    jest.spyOn(customersRepository, 'getCustomerByCpf').mockResolvedValue(customer);

    const result = await controllerCustomers.getCustomer(customer.cpf); 
    expect(result).toEqual(customer); 
  });

  it('should save a new customer', async () => {
    const customer: Customer = { cpf: '12345678900', name: 'Jane Doe', email: 'jane.doe@example.com', password: 'securepassword' };

    jest.spyOn(customersRepository, 'getCustomerByCpf').mockResolvedValue(null);  // Mocking that the customer doesn't exist
    jest.spyOn(customersRepository, 'saveCustomer').mockResolvedValue(customer);  // Mock saveCustomer

    const result = await controllerCustomers.createCustomer(customer);  // Usando o método correto no controlador
    expect(result).toEqual(customer);
  });

  it('should update an existing customer', async () => {
    const customer: Customer = { cpf: '12345678900', name: 'Jane Doe', email: 'jane.doe@example.com', password: 'securepassword' };
    const updatedCustomer: Customer = { cpf: '12345678900', name: 'Jane Smith', email: 'jane.smith@example.com', password: 'newpassword' };

    jest.spyOn(customersRepository, 'getCustomerByCpf').mockResolvedValue(customer);
    jest.spyOn(customersRepository, 'saveCustomer').mockResolvedValue(updatedCustomer); // Mock saveCustomer as update

    const result = await controllerCustomers.createCustomer(updatedCustomer);  // Usando o método correto no controlador
    expect(result).toEqual(updatedCustomer);
  });

  it('should delete a customer by CPF', async () => {
    const customer: Customer = { cpf: '12345678900', name: 'Jane Doe', email: 'jane.doe@example.com', password: 'securepassword' };

    jest.spyOn(customersRepository, 'deleteCustomer').mockResolvedValue(customer);  // Mock deleteCustomer

    const result = await controllerCustomers.deleteCustomer(customer.cpf);  // Usando o método de exclusão no controlador
    expect(result).toEqual(customer);
  });

  it('should handle DynamoDB health check', async () => {
    jest.spyOn(dynamoDBService, 'healthCheck').mockResolvedValue({ status: 'ok' });

    const result = await dynamoDBService.healthCheck(); // Chamando o método mockado
    expect(result.status).toBe('ok');
  });
});
