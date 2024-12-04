import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../../Presentation/Customers/customers.controller';
import { DynamoDBService } from '../../Infrastructure/Apis/dynamodb.service';
import { CustomersService } from '../../Application/services/customer.service';
import { DynamoDBHealthIndicator } from '../../Presentation/Health/DynamoDBHealthIndicator.service';
import { Customer } from '../../Domain/Interfaces/customer';  // Certifique-se de que esse caminho está correto

describe('CustomersController', () => {
  let controllerCustomers: CustomersController;
  let customersService: CustomersService;
  let dynamoDBService: DynamoDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService, DynamoDBService, DynamoDBHealthIndicator],
    }).compile();

    controllerCustomers = module.get<CustomersController>(CustomersController);
    customersService = module.get<CustomersService>(CustomersService);
    dynamoDBService = module.get<DynamoDBService>(DynamoDBService);
  });

  it('should return a customer by CPF', async () => {
    const customer: Customer = { cpf: '12345678900', name: 'John Doe', email: 'john.doe@example.com' }; // Simulando um CPF válido
    jest.spyOn(customersService, 'getCustomerByCpf').mockResolvedValue(customer); // mock do método getCustomerByCpf

    const result = await controllerCustomers.getCustomerByCpf(customer.cpf);
    expect(result).toEqual(customer); // Verifica se o retorno é o esperado
  });

  it('should save a new customer', async () => {
    const customer: Customer = { cpf: '12345678900', name: 'Jane Doe', email: 'jane.doe@example.com' }; // Novo cliente
    jest.spyOn(customersService, 'saveCustomer').mockResolvedValue(customer); // mock do método saveCustomer

    const result = await controllerCustomers.saveCustomer(customer);
    expect(result).toEqual(customer); // Verifica se o cliente foi salvo corretamente
  });

  it('should update an existing customer', async () => {
    const customer: Customer = { cpf: '12345678900', name: 'Jane Doe', email: 'jane.doe@example.com' };
    const updatedCustomer: Customer = { cpf: '12345678900', name: 'Jane Smith', email: 'jane.smith@example.com' }; // Novo nome

    jest.spyOn(customersService, 'updateCustomer').mockResolvedValue(updatedCustomer); // mock do método updateCustomer

    const result = await controllerCustomers.updateCustomer(customer.cpf, updatedCustomer);
    expect(result).toEqual(updatedCustomer); // Verifica se o cliente foi atualizado corretamente
  });

  it('should delete a customer by CPF', async () => {
    const customer: Customer = { cpf: '12345678900', name: 'Jane Doe', email: 'jane.doe@example.com' };

    jest.spyOn(customersService, 'deleteCustomerByCpf').mockResolvedValue(customer); // mock do método deleteCustomerByCpf

    const result = await controllerCustomers.deleteCustomerByCpf(customer.cpf);
    expect(result).toEqual(customer); // Verifica se o cliente foi deletado corretamente
  });

  it('should handle DynamoDB health check', async () => {
    jest.spyOn(dynamoDBService, 'healthCheck').mockResolvedValue({ status: 'ok' }); // mock do método de health check

    const result = await dynamoDBService.healthCheck();
    expect(result.status).toBe('ok'); // Verifica se o DynamoDB está saudável
  });
});
