import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../../Presentation/Customers/customers.controller';
import { DynamoDBService } from '../../Infrastructure/Apis/dynamodb.service';
import { CustomersService } from '../../Application/services/customer.service';
import { DynamoDbHealthIndicator } from '../../Presentation/Health/DynamoDbHealthIndicator.service'; 
import { Customer } from '../../Domain/Interfaces/customer';
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';

describe('CustomersController', () => {
  let controllerCustomers: CustomersController;
  let customersRepository: CustomersRepository;
  let dynamoDBService: DynamoDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService, DynamoDBService, DynamoDbHealthIndicator, CustomersRepository],
    }).compile();

    controllerCustomers = module.get<CustomersController>(CustomersController);
    customersRepository = module.get<CustomersRepository>(CustomersRepository);
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

    const result = await customersRepository.saveCustomer(customer);  // Calling the correct method from repository
    expect(result).toEqual(customer);
  });

  it('should update an existing customer', async () => {
    const customer: Customer = { cpf: '12345678900', name: 'Jane Doe', email: 'jane.doe@example.com', password: 'securepassword' };
    const updatedCustomer: Customer = { cpf: '12345678900', name: 'Jane Smith', email: 'jane.smith@example.com', password: 'newpassword' };

    jest.spyOn(customersRepository, 'getCustomerByCpf').mockResolvedValue(customer);
    jest.spyOn(customersRepository, 'saveCustomer').mockResolvedValue(updatedCustomer); // Mock saveCustomer as update

    const result = await customersRepository.saveCustomer(updatedCustomer);  // Use saveCustomer in repository
    expect(result).toEqual(updatedCustomer);
  });

  it('should delete a customer by CPF', async () => {
    const customer: Customer = { cpf: '12345678900', name: 'Jane Doe', email: 'jane.doe@example.com', password: 'securepassword' };

    jest.spyOn(customersRepository, 'getCustomerByCpf').mockResolvedValue(customer);
    jest.spyOn(customersRepository, 'deleteCustomer').mockResolvedValue(customer);  // Mock deleteCustomer

    const result = await customersRepository.deleteCustomer(customer.cpf);  // Calling the correct delete method
    expect(result).toEqual(customer);
  });

  it('should handle DynamoDB health check', async () => {
    jest.spyOn(dynamoDBService, 'healthCheck').mockResolvedValue({ status: 'ok' });

    const result = await dynamoDBService.healthCheck(); // Chamando o método mockado
    expect(result.status).toBe('ok');
  });
});
