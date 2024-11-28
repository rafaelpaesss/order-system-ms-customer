import { Customer } from '@Domain/Entities/customer.entity';
import { CustomerRepository } from '@Domain/Repositories/customersRepository';

export class CustomerService {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  /**
   * Busca um cliente pelo CPF e verifica a senha.
   * @param cpf - CPF do cliente.
   * @param password - Senha do cliente.
   * @returns O cliente, se encontrado, ou null.
   */
  async getByCpf(cpf: string, password: string): Promise<Customer | null> {
    // Busca o cliente pelo CPF
    const customer = await this.customerRepository.findByCpf(cpf);
    if (!customer) {
      return null; // Retorna null se o cliente não for encontrado
    }

    // Verifica se a senha corresponde
    const isPasswordValid = customer.password === password; // Substitua por hash se necessário
    if (!isPasswordValid) {
      return null; // Retorna null se a senha estiver incorreta
    }

    return customer; // Retorna o cliente se tudo estiver correto
  }

  /**
   * Cria um novo cliente.
   * @param customerData - Dados do cliente.
   * @returns O cliente criado.
   */
  async create(customerData: Partial<Customer>): Promise<Customer> {
    // Criação de um novo cliente no repositório
    const newCustomer = await this.customerRepository.create(customerData);
    return newCustomer;
  }
}
