import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DynamoDBClient, GetItemCommand, PutItemCommand, UpdateItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamoDBService implements OnModuleInit, OnModuleDestroy {
  private client: DynamoDBClient;
  private docClient: DynamoDBDocumentClient;

  async onModuleInit() {
    this.client = new DynamoDBClient({});
    this.docClient = DynamoDBDocumentClient.from(this.client);
  }

  async onModuleDestroy() {
    if (this.client) {
      this.client.destroy();
    }
  }

  async get(params: GetCommand['input']) {
    return this.docClient.send(new GetCommand(params));
  }

  async put(params: PutCommand['input']) {
    return this.docClient.send(new PutCommand(params));
  }

  async update(params: UpdateCommand['input']) {
    return this.docClient.send(new UpdateCommand(params));
  }

  async delete(params: DeleteCommand['input']) {
    return this.docClient.send(new DeleteCommand(params));
  }
}
