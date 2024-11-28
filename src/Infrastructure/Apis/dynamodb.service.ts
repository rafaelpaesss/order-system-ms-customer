import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class DynamoDBService {
  private dynamoDbClient: DynamoDB.DocumentClient;

  constructor() {
    this.dynamoDbClient = new DynamoDB.DocumentClient();
  }

  /**
   * Obtém um item do DynamoDB por chave primária.
   * @param tableName O nome da tabela.
   * @param key A chave primária do item.
   * @returns O item encontrado ou null.
   */
  async getItem<T>(tableName: string, key: Record<string, any>): Promise<T | null> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: tableName,
      Key: key,
    };

    try {
      const result = await this.dynamoDbClient.get(params).promise();
      return result.Item as T || null;
    } catch (error) {
      console.error('Erro ao buscar item no DynamoDB:', error);
      throw error;
    }
  }

  /**
   * Salva um item no DynamoDB.
   * @param tableName O nome da tabela.
   * @param item O item a ser salvo.
   */
  async putItem<T>(tableName: string, item: T): Promise<void> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: tableName,
      Item: item,
    };

    try {
      await this.dynamoDbClient.put(params).promise();
    } catch (error) {
      console.error('Erro ao salvar item no DynamoDB:', error);
      throw error;
    }
  }

  /**
   * Deleta um item do DynamoDB por chave primária.
   * @param tableName O nome da tabela.
   * @param key A chave primária do item.
   */
  async deleteItem(tableName: string, key: Record<string, any>): Promise<void> {
    const params: DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: tableName,
      Key: key,
    };

    try {
      await this.dynamoDbClient.delete(params).promise();
    } catch (error) {
      console.error('Erro ao deletar item no DynamoDB:', error);
      throw error;
    }
  }

  /**
   * Atualiza um item no DynamoDB.
   * @param tableName O nome da tabela.
   * @param key A chave primária do item.
   * @param updates Os valores a serem atualizados.
   */
  async updateItem(
    tableName: string,
    key: Record<string, any>,
    updates: Record<string, any>
  ): Promise<void> {
    const updateExpressions = Object.keys(updates).map(
      (attr) => `#${attr} = :${attr}`
    );

    const expressionAttributeNames = Object.keys(updates).reduce(
      (acc, attr) => ({ ...acc, [`#${attr}`]: attr }),
      {}
    );

    const expressionAttributeValues = Object.keys(updates).reduce(
      (acc, attr) => ({ ...acc, [`:${attr}`]: updates[attr] }),
      {}
    );

    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: tableName,
      Key: key,
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    };

    try {
      await this.dynamoDbClient.update(params).promise();
    } catch (error) {
      console.error('Erro ao atualizar item no DynamoDB:', error);
      throw error;
    }
  }
}

export { DynamoDBService }; 
