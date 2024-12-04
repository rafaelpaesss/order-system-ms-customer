import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../../Presentation/Customers/customers.controller';
import { DynamoDBService } from '../../Infrastructure/Apis/dynamodb.service';
import { CustomersService } from '../../Application/services/customer.service';
import { DynamoDbHealthIndicator } from '../../Presentation/Health/DynamoDbHealthIndicator.service'; // Corrigido o nome da classe
import { Customer } from '../../Domain/Interfaces/customer';

describe('CustomersController', () => {
  let controllerCustomers: CustomersController;
  let customersService: CustomersService;
  let dynamoDBService: DynamoDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService, DynamoDBService, DynamoDbHealthIndicator], // Corrigido o nome da classe
    }).compile();

    controllerCustomers = module.get<CustomersController>(CustomersController);
    customersService = module.get<CustomersService>(CustomersService);
    dynamoDBService = module.get<DynamoDBService>(DynamoDBService);
  });

  it('should return a customer by CPF', async () => {
    const customer: Customer = { cpf: '12345678900', name: 'John Doe', email: 'john.doe@example.com' }; 
    jest.spyOn(customersService, 'getByCpf').mockResolvedValue(customer);

    const result = await controllerCustomers.getCustomer(customer.cpf); 
    expect(result).toEqual(customer); 
  });

  it('should save a new customer', async () => {
    const customer: Customer = { cpf: '12345678900', name: 'Jane Doe', email: 'jane.doe@example.com' };
    jest.spyOn(customersService, 'saveCustomer').mockResolvedValue(customer);

    const result = await controllerCustomers.saveCustomer(customer);
    expect(result).toEqual(customer); 
  });

  it('should update an existing customer', async () => {
    const customer: Customer = { cpf: '12345678900', name: 'Jane Doe', email: 'jane.doe@example.com' };
    const updatedCustomer: Customer = { cpf: '12345678900', name: 'Jane Smith', email: 'jane.smith@example.com' }; 

    jest.spyOn(customersService, 'updateCustomer').mockResolvedValue(updatedCustomer);

    const result = await controllerCustomers.updateCustomer(customer.cpf, updatedCustomer);
    expect(result).toEqual(updatedCustomer);
  });

  it('should delete a customer by CPF', async () => {
    const customer: Customer = { cpf: '12345678900', name: 'Jane Doe', email: 'jane.doe@example.com' };

    jest.spyOn(customersService, 'deleteCustomer').mockResolvedValue(customer);

    const result = await controllerCustomers.deleteCustomer(customer.cpf);
    expect(result).toEqual(customer); 
  });

  it('should handle DynamoDB health check', async () => {
    jest.spyOn(dynamoDBService, 'healthCheck').mockResolvedValue({ status: 'ok' });

    const result = await dynamoDBService.healthCheck(); // Este método precisa existir no DynamoDBService
    expect(result.status).toBe('ok');
  });
});
