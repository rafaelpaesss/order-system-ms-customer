import { DynamoDBService } from '../../Infrastructure/dynamodb.service';
import { Customer } from '../Interfaces/customer';

export class CustomersRepository {
  private dynamoDBService: DynamoDBService;

  constructor() {
    this.dynamoDBService = new DynamoDBService(process.env.DYNAMODB_TABLE_NAME || "customers-table");
  }

  async createCustomer(cpf: string, name: string, email: string, password: string): Promise<Customer> {
    // Converte os dados para o formato esperado pelo DynamoDB e faz a inserção
    const customer = {
      cpf,
      name,
      email,
      password,  // Senha em texto simples
    };

    // Insere o cliente no DynamoDB e retorna os dados
    await this.dynamoDBService.putItem(customer);
    return customer;
  }

  async getCustomerByCpf(cpf: string): Promise<Customer | null> {
    // Realiza a busca do cliente pelo CPF no DynamoDB
    const result = await this.dynamoDBService.getItem(cpf);

    // Retorna null caso não encontre o cliente
    if (!result) return null;

    return {
      cpf: result.cpf,
      name: result.name,
      email: result.email,
      password: result.password,  // Senha em texto simples
    };
  }

  async updateCustomer(customer: Customer): Promise<Customer> {
    // Atualiza o cliente no DynamoDB
    await this.dynamoDBService.updateItem(customer.cpf, customer);
    return customer;
  }
}
