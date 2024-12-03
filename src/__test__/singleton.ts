import { DynamoDB } from 'aws-sdk';

class DynamoSingleton {
  private static instance: DynamoDB.DocumentClient;

  // Garante que a instância seja única
  private constructor() {}

  public static getInstance(): DynamoDB.DocumentClient {
    if (!DynamoSingleton.instance) {
      DynamoSingleton.instance = new DynamoDB.DocumentClient();
    }
    return DynamoSingleton.instance;
  }
}

export default DynamoSingleton;
