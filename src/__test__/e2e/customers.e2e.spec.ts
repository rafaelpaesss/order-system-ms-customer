import { DynamoDBService } from '@Apis/dynamodb.service';
import { CustomersService } from '@Services/customers.service';
import { DynamoDBHealthIndicator } from '@Health/DynamoDBHealthIndicator.service';

describe('E2E Tests for Customers', () => {
  let customersService: CustomersService;
  let dynamoDBService: DynamoDBService;
  let dynamoDBHealthIndicator: DynamoDBHealthIndicator;

  beforeEach(() => {
    dynamoDBService = new DynamoDBService();
    customersService = new CustomersService(dynamoDBService);
    dynamoDBHealthIndicator = new DynamoDBHealthIndicator();
  });

  it('should fetch a customer by ID', async () => {
    const id = '123';
    const customer = await customersService.getById(id);
    expect(customer).toBeDefined();
    expect(customer.id).toBe(id);
  });

  it('should save a new customer', async () => {
    const newCustomer = { id: '124', name: 'Jane Doe', cpf: '987654321' };
    const savedCustomer = await customersService.save(newCustomer);
    expect(savedCustomer).toEqual(newCustomer);
  });

  it('should update an existing customer', async () => {
    const id = '123';
    const updatedCustomer = { id, name: 'John Doe Updated', cpf: '123456789' };
    const updated = await customersService.update(id, updatedCustomer);
    expect(updated).toEqual(updatedCustomer);
  });

  it('should delete a customer', async () => {
    const id = '123';
    await expect(customersService.delete(id)).resolves.toBeUndefined();
  });

  it('should check DynamoDB health status', async () => {
    const healthStatus = await dynamoDBHealthIndicator.checkHealth();
    expect(healthStatus.status).toBe('ok');
  });
});
