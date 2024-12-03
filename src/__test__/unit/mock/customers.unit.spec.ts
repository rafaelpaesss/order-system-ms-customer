import { DynamoDBService } from '@Apis/dynamodb.service';
import { CustomersService } from '@Services/customer.service';
import { DynamoDBHealthIndicator } from '@Health/DynamoDBHealthIndicator.service';
import { unmarshall, marshall } from '@aws-sdk/util-dynamodb';

describe('CustomersService', () => {
  let dynamoDBService: DynamoDBService;
  let customersService: CustomersService;
  let dynamoDBHealthIndicator: DynamoDBHealthIndicator;

  beforeEach(() => {
    dynamoDBService = new DynamoDBService();
    customersService = new CustomersService(dynamoDBService);
    dynamoDBHealthIndicator = new DynamoDBHealthIndicator();
  });

  it('should fetch customer by id', async () => {
    const id = '123';
    const expectedCustomer = { id, name: 'John Doe', cpf: '123456789' };

    // Mocking the DynamoDB Service to simulate fetching a customer
    const customerData = marshall(expectedCustomer);
    jest.spyOn(dynamoDBService, 'get').mockResolvedValueOnce(customerData);

    const customer = await customersService.getById(id);

    expect(customer).toEqual(expectedCustomer);
  });

  it('should save a new customer', async () => {
    const newCustomer = { id: '124', name: 'Jane Doe', cpf: '987654321' };

    const customerData = marshall(newCustomer);

    jest.spyOn(dynamoDBService, 'put').mockResolvedValueOnce(customerData);

    const savedCustomer = await customersService.save(newCustomer);

    expect(savedCustomer).toEqual(newCustomer);
  });

  it('should update an existing customer', async () => {
    const id = '123';
    const updatedCustomer = { id, name: 'John Doe Updated', cpf: '123456789' };

    const customerData = marshall(updatedCustomer);

    jest.spyOn(dynamoDBService, 'update').mockResolvedValueOnce(customerData);

    const updated = await customersService.update(id, updatedCustomer);

    expect(updated).toEqual(updatedCustomer);
  });

  it('should delete a customer', async () => {
    const id = '123';

    jest.spyOn(dynamoDBService, 'delete').mockResolvedValueOnce(null);

    await expect(customersService.delete(id)).resolves.toBeUndefined();
  });

  it('should handle errors while fetching customer', async () => {
    const id = '123';

    jest.spyOn(dynamoDBService, 'get').mockRejectedValueOnce(new Error('Error fetching customer'));

    try {
      await customersService.getById(id);
    } catch (error: any) {
      expect(error.message).toBe('Error fetching customer with ID 123: Error fetching customer');
    }
  });

  it('should handle errors while saving customer', async () => {
    const newCustomer = { id: '125', name: 'New User', cpf: '456789123' };

    jest.spyOn(dynamoDBService, 'put').mockRejectedValueOnce(new Error('Error saving customer'));

    try {
      await customersService.save(newCustomer);
    } catch (error: any) {
      expect(error.message).toBe('Error saving customer: Error saving customer');
    }
  });

  it('should handle errors while updating customer', async () => {
    const id = '123';
    const updatedCustomer = { id, name: 'Updated User', cpf: '987654321' };

    jest.spyOn(dynamoDBService, 'update').mockRejectedValueOnce(new Error('Error updating customer'));

    try {
      await customersService.update(id, updatedCustomer);
    } catch (error: any) {
      expect(error.message).toBe('Error updating customer with ID 123: Error updating customer');
    }
  });

  it('should handle errors while deleting customer', async () => {
    const id = '123';

    jest.spyOn(dynamoDBService, 'delete').mockRejectedValueOnce(new Error('Error deleting customer'));

    try {
      await customersService.delete(id);
    } catch (error: any) {
      expect(error.message).toBe('Error deleting customer with ID 123: Error deleting customer');
    }
  });

  it('should handle DynamoDB health check', async () => {
    jest.spyOn(dynamoDBHealthIndicator, 'checkHealth').mockResolvedValueOnce({ status: 'ok' });

    const healthStatus = await dynamoDBHealthIndicator.checkHealth();

    expect(healthStatus).toEqual({ status: 'ok' });
  });
});
