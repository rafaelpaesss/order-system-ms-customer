import { DynamoDBHealthIndicator } from '@Health/DynamoDbHealthIndicator.service'; // Corrigido o nome do import
import { CustomersService } from '@Services/customers.service';
import { DynamoDBService } from '@Apis/dynamoDB.service';
import { CustomersRepository } from '@Repositories/customers.repository';
import { Customer } from '@Entities/customer.entity';

describe('CustomersService', () => {
  let customersService: CustomersService;
  let dynamoDBService: DynamoDBService;
  let customersRepository: CustomersRepository;

  beforeEach(() => {
    dynamoDBService = new DynamoDBService();
    customersRepository = new CustomersRepository(dynamoDBService);
    customersService = new CustomersService(customersRepository);
  });

  it('should get customer by id', async () => {
    const id = 1; // ID como número
    const customer: Customer = await customersService.getById(id);
    expect(customer).toBeDefined();
  });

  it('should save a new customer', async () => {
    const newCustomer: Customer = { id: 1, name: 'John Doe', cpf: '12345678901' };
    const savedCustomer: Customer = await customersService.save(newCustomer);
    expect(savedCustomer).toEqual(newCustomer);
  });

  it('should update an existing customer', async () => {
    const id = 1; // ID como número
    const updatedCustomer: Customer = { id, name: 'John Updated', cpf: '12345678901' };
    const updated: Customer = await customersService.update(id, updatedCustomer);
    expect(updated.name).toEqual('John Updated');
  });

  it('should delete a customer', async () => {
    const id = 1; // ID como número
    await expect(customersService.delete(id)).resolves.toBeUndefined();
  });

  it('should get customer by CPF', async () => {
    const cpf = '12345678901';
    const customer = await customersService.getByCpf(cpf);
    expect(customer).toBeDefined();
  });
});
