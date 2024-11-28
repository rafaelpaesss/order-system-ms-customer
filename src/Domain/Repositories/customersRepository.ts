import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

export class CustomersRepository {
  private readonly client = new DynamoDBClient({ region: 'us-east-1' });

  async saveCustomer(customer: Customers): Promise<Customers> {
    const params = {
      TableName: 'Customers', // Nome da tabela
      Item: {
        id: { S: customer.id },
        name: { S: customer.name },
        email: { S: customer.email },
        cpf: { S: customer.cpf },
        isAdmin: { BOOL: customer.isAdmin },
        password: { S: customer.password },
        createdAt: { S: customer.createdAt.toISOString() },
        updatedAt: { S: customer.updatedAt.toISOString() },
      },
    };

    const command = new PutItemCommand(params);
    await this.client.send(command);

    return customer;
  }
}
