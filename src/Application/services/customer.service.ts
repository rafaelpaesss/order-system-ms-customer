import { DynamoDBService } from '../../Infrastructure/Apis/dynamodb.service';
import { Customer } from '../../Domain/Interfaces/customer';

export class CustomerService {
  private dynamoDBService: DynamoDBService;

  constructor() {
    // A tabela do DynamoDB é configurada a partir de uma variável de ambiente
    this.dynamoDBService = new DynamoDBService(process.env.DYNAMODB_TABLE_NAME || "customers-table");
  }

  async createCustomer(cpf: string, name: string, email: string): Promise<Customer> {
    // Validação básica (pode ser expandida)
    if (!cpf || !name || !email) {
      throw new BadRequestError("Missing required fields");
    }

    // Verifica se o cliente já existe
    const existingCustomer = await this.dynamoDBService.getCustomerByCpf(cpf);
    if (existingCustomer) {
      throw new BadRequestError("Customer already exists");
    }

    // Criação do cliente no DynamoDB
    const customer = await this.dynamoDBService.createCustomer(cpf, name, email);
    return customer;
  }

  async getCustomer(cpf: string): Promise<Customer> {
    // Validação básica
    if (!cpf) {
      throw new BadRequestError("CPF is required");
    }

    // Busca o cliente no DynamoDB
    const customer = await this.dynamoDBService.getCustomerByCpf(cpf);
    if (!customer) {
      throw new NotFoundError("Customer not found");
    }

    return customer;
  }
}
