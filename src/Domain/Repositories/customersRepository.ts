// src/Domain/Repositories/customersRepository.ts
import { DynamoDBService } from '../../Infrastructure/dynamodb.service';  // Corrigido para o caminho correto
import { Customer } from '../Interfaces/customer';  // Supondo que você tenha uma interface de Customer

export class CustomersRepository {
  private dynamoDBService: DynamoDBService;

  constructor() {
    // Inicializa o DynamoDBService com o nome da tabela, que pode ser configurado por variável de ambiente
    const tableName = process.env.DYNAMODB_TABLE_NAME || 'customers-table';
    this.dynamoDBService = new DynamoDBService(tableName);
  }

  // Método para criar um novo cliente
  async createCustomer(cpf: string, name: string, email: string, password: string): Promise<Customer> {
    const customer: Customer = {
      cpf,
      name,
      email,
      password,  // Senha em texto simples (não segura para produção, lembre-se de criptografar)
    };

    // Insere o cliente no DynamoDB
    await this.dynamoDBService.putItem(customer);

    return customer;  // Retorna o cliente criado
  }

  // Método para buscar um cliente pelo CPF
  async getCustomerByCpf(cpf: string): Promise<Customer | null> {
    const result = await this.dynamoDBService.getItem(cpf);

    // Retorna null se o cliente não for encontrado
    if (!result) return null;

    // Mapeia os dados recebidos do DynamoDB para o formato do Customer
    return {
      cpf: result.cpf,
      name: result.name,
      email: result.email,
      password: result.password,  // Senha em texto simples
    };
  }

  // Método para atualizar os dados de um cliente
  async updateCustomer(customer: Customer): Promise<Customer> {
    await this.dynamoDBService.updateItem(customer.cpf, customer);
    return customer;  // Retorna o cliente atualizado
  }
}
