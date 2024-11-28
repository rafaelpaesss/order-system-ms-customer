import { DynamoDBService } from '@Infrastructure/dynamodb.service';
import { Customer } from '@Domain/Entities/customer.entity';

export class CustomerRepository {
  private dbService: DynamoDBService;
  private tableName = 'Customers';

  constructor(dbService: DynamoDBService) {
    this.dbService = dbService;
  }

  async findByCpf(cpf: string): Promise<Customer | null> {
    const result = await this.dbService.getItem(this.tableName, { cpf });
    return result as Customer | null;
  }

  async create(customerData: Partial<Customer>): Promise<Customer> {
    await this.dbService.putItem(this.tableName, customerData);
    return customerData as Customer;
  }
}
