import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  Param, 
  NotFoundException, 
  ConflictException 
} from '@nestjs/common'; // Certifique-se de que o NestJS está configurado corretamente
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';
import { Customer } from '../../Domain/Interfaces/customer';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersRepository: CustomersRepository) {}

  /**
   * Cria um novo cliente.
   * 
   * @param createCustomerDto Dados do cliente a ser criado.
   * @returns O cliente criado.
   */
  @Post()
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const { cpf, name, email, password } = createCustomerDto;

    // Verifica se o cliente já existe com o CPF fornecido
    const existingCustomer = await this.customersRepository.getCustomerByCpf(cpf);
    if (existingCustomer) {
      throw new ConflictException('Customer with this CPF already exists');
    }

    // Cria o cliente
    const customer: Customer = await this.customersRepository.createCustomer(
      cpf,
      name,
      email,
      password,
    );
    return customer;
  }

  /**
   * Recupera um cliente com base no CPF.
   * 
   * @param cpf CPF do cliente a ser recuperado.
   * @returns O cliente encontrado ou lança uma exceção se não encontrado.
   */
  @Get(':cpf')
  async getCustomer(@Param('cpf') cpf: string): Promise<Customer> {
    const customer = await this.customersRepository.getCustomerByCpf(cpf);
    
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    
    return customer;
  }
}
