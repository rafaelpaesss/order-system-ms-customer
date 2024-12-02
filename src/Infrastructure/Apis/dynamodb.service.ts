import { DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";

export class DynamoDBService {
  private client: DynamoDBClient;
  private tableName: string;

  constructor(tableName: string) {
    this.client = new DynamoDBClient({ region: process.env.AWS_REGION || "us-east-1" });
    this.tableName = tableName;
  }

  async getCustomerByCpf(cpf: string) {
    const params = {
      TableName: this.tableName,
      Key: {
        cpf: { S: cpf },
      },
    };

    try {
      const data = await this.client.send(new GetItemCommand(params));
      return data.Item ? DynamoDBService.convertToCustomer(data.Item) : null;
    } catch (error) {
      console.error("Error getting customer:", error);
      throw new Error("Unable to retrieve customer.");
    }
  }

  async createCustomer(cpf: string, name: string, email: string) {
    const params = {
      TableName: this.tableName,
      Item: {
        cpf: { S: cpf },
        name: { S: name },
        email: { S: email },
      },
    };

    try {
      await this.client.send(new PutItemCommand(params));
      return { cpf, name, email };
    } catch (error) {
      console.error("Error creating customer:", error);
      throw new Error("Unable to create customer.");
    }
  }

  private static convertToCustomer(item: any) {
    return {
      cpf: item.cpf.S,
      name: item.name.S,
      email: item.email.S,
    };
  }
}
