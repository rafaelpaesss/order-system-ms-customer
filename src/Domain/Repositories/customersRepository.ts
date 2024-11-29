import { DynamoDBService } from '@Infrastructure/dynamodb.service';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

export class CustomerRepository {
  private dbService: DynamoDBService;
  private tableName = 'Customers';  // Nome da tabela no DynamoDB

  constructor(dbService: DynamoDBService) {
    this.dbService = dbService;
  }

  /**
   * Encontra um cliente pelo CPF.
   * @param cpf O CPF do cliente.
   * @returns O cliente, se encontrado, ou null.
   */
  async findByCpf(cpf: string): Promise<Customer | null> {
    try {
      const result = await this.dbService.getItem<Customer>(this.tableName, { cpf });
      return result || null;  // Retorna o cliente se encontrado, ou null
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar cliente no DynamoDB.'
      );
    }
  }

  /**
   * Cria um novo cliente.
   * @param customerData Dados do cliente.
   * @returns O cliente criado.
   */
  async create(customerData: Partial<Customer>): Promise<Customer> {
    try {
      // Salvando o cliente no DynamoDB
      await this.dbService.putItem(this.tableName, customerData);
      
      // Caso a criação tenha sido bem-sucedida, retornamos os dados do cliente
      return customerData as Customer;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao criar cliente no DynamoDB.'
      );
    }
  }
}
