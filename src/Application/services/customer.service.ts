import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { CustomerRepository } from '@Domain/Repositories/customersRepository';
import { CreateCustomerDto } from '@Application/dto/create-customer.dto';
import { IsNotEmpty, IsString, IsCPF } from 'class-validator';  // Para validação de dados

@Injectable()
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
      throw new NotFoundException(`Customer with CPF ${cpf} not found.`);
    }

    // Verifica se a senha corresponde diretamente (sem hash)
    if (customer.password !== password) {
      throw new UnauthorizedException('Invalid password.');
    }

    return customer; // Retorna o cliente se tudo estiver correto
  }

  /**
   * Cria um novo cliente.
   * @param customerData - Dados do cliente.
   * @returns O cliente criado.
   */
  async create(customerData: CreateCustomerDto): Promise<Customer> {
    // Verificar se já existe um cliente com o mesmo CPF
    const existingCustomer = await this.customerRepository.findByCpf(customerData.cpf);
    if (existingCustomer) {
      throw new ConflictException(`Customer with CPF ${customerData.cpf} already exists.`);
    }

    // Criação de um novo cliente no repositório
    const newCustomer = await this.customerRepository.create({
      ...customerData,
      password: customerData.password,  // Salva a senha sem alteração (sem hash)
    });

    return newCustomer;
  }
}
