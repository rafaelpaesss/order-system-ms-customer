import { DynamoDB } from 'aws-sdk';

export class DynamoDbHealthIndicator {
  private dynamoDB: DynamoDB;

  constructor() {
    this.dynamoDB = new DynamoDB(); // Configuração padrão do DynamoDB, você pode customizar conforme necessário
  }

  /**
   * Verifica a saúde do DynamoDB, executando uma operação simples como um health check
   * @returns A Promise que resolve para um objeto indicando se o DynamoDB está saudável ou não
   */
  public async checkHealth(): Promise<{ status: string, message: string }> {
    try {
      // Tentamos uma operação simples para verificar se o DynamoDB está funcionando
      await this.dynamoDB.listTables().promise();

      return {
        status: 'ok',
        message: 'DynamoDB is healthy and responsive.',
      };
    } catch (error) {
      return {
        status: 'error',
        message: `DynamoDB health check failed: ${error.message}`,
      };
    }
  }
}
