import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

class DynamoDBClientSingleton {
  private static instance: DynamoDBClient | null = null;

  private constructor() {
    // Construtor privado para impedir instâncias externas
  }

  public static getInstance(): DynamoDBClient {
    if (!DynamoDBClientSingleton.instance) {
      DynamoDBClientSingleton.instance = new DynamoDBClient({
        region: process.env.AWS_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
      });
    }

    return DynamoDBClientSingleton.instance;
  }
}

export default DynamoDBClientSingleton;
