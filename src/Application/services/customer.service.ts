import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from '../../../Application/services/customer.service'; 
import { DynamoDBService } from '../../../Infrastructure/dynamodb.service'; 
import { Customer } from '../../../Domain/Interfaces/customer'; 

describe('CustomersService', () => {
  let service: CustomersService;
  let dynamoDBService: DynamoDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService, DynamoDBService],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    dynamoDBService = module.get<DynamoDBService>(DynamoDBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getByCpf', () => {
    it('should return a customer when CPF exists', async () => {
      const customer: Customer = { cpf: '12345678900', name: 'John Doe', email: 'john@example.com' };
      
      // Mocking the DynamoDBService response
      jest.spyOn(dynamoDBService, 'get').mockResolvedValue({ Item: customer });

      const result = await service.getByCpf('12345678900');
      expect(result).toEqual(customer); // Verifica se o retorno é o esperado
    });

    it('should return null when CPF does not exist', async () => {
      // Mocking the DynamoDBService response
      jest.spyOn(dynamoDBService, 'get').mockResolvedValue({ Item: null });

      const result = await service.getByCpf('00000000000');
      expect(result).toBeNull(); // Verifica se o resultado é null
    });
  });

  describe('saveCustomer', () => {
    it('should save and return a customer', async () => {
      const customer: Customer = { cpf: '12345678900', name: 'Jane Doe', email: 'jane@example.com' };

      // Mocking the DynamoDBService put method
      jest.spyOn(dynamoDBService, 'put').mockResolvedValue(undefined);

      const result = await service.saveCustomer(customer);
      expect(result).toEqual(customer); // Verifica se o retorno é o esperado
    });
  });

  describe('updateCustomer', () => {
    it('should update and return the updated customer', async () => {
      const customer: Customer = { cpf: '12345678900', name: 'John Updated', email: 'johnupdated@example.com' };
      
      // Mocking the DynamoDBService update method
      jest.spyOn(dynamoDBService, 'update').mockResolvedValue({ Attributes: customer });

      const result = await service.updateCustomer(customer);
      expect(result).toEqual(customer); // Verifica se o retorno é o esperado
    });
  });

  describe('deleteCustomer', () => {
    it('should delete and return the deleted customer', async () => {
      const customer: Customer = { cpf: '12345678900', name: 'John Doe', email: 'john@example.com' };

      // Mocking the DynamoDBService delete method
      jest.spyOn(dynamoDBService, 'delete').mockResolvedValue({ Attributes: customer });

      const result = await service.deleteCustomer('12345678900');
      expect(result).toEqual(customer); // Verifica se o retorno é o esperado
    });
  });
});
