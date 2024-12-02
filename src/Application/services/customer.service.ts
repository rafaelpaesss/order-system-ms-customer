import { DynamoDBService } from '../../Infrastructure/Apis/dynamodb.service';
import { Customer } from '../../Domain/Interfaces/customer';
import { BadRequestError, NotFoundError } from '../../Domain/Errors';

export class CustomerService {
  private dynamoDBService: DynamoDBService;

  constructor() {
    this.dynamoDBService = new DynamoDBService(process.env.DYNAMODB_TABLE_NAME || "customers-table");
  }

  async createCustomer(cpf: string, name: string, email: string, password: string): Promise<Customer> {
    if (!cpf || !name || !email || !password) {
      throw new BadRequestError("Missing required fields");
    }

    // Verifica se o cliente já existe
    const existingCustomer = await this.dynamoDBService.getCustomerByCpf(cpf);
    if (existingCustomer) {
      throw new BadRequestError("Customer already exists");
    }

    // Criação do cliente no DynamoDB com a senha em texto simples
    const customer = await this.dynamoDBService.createCustomer(cpf, name, email, password);
    return customer;
  }

  async getCustomer(cpf: string, password: string): Promise<Customer> {
    if (!cpf || !password) {
      throw new BadRequestError("CPF and password are required");
    }

    // Busca o cliente no DynamoDB
    const customer = await this.dynamoDBService.getCustomerByCpf(cpf);
    if (!customer) {
      throw new NotFoundError("Customer not found");
    }

    // Verifica a senha
    if (customer.password !== password) {
      throw new BadRequestError("Invalid password");
    }

    return customer;
  }
}
