import { DynamoDB } from 'aws-sdk';

// Cria a instância do DynamoDB DocumentClient
const dynamoDB = new DynamoDB.DocumentClient();

export default dynamoDB;
