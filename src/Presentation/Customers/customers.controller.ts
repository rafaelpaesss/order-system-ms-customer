import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  Param, 
  NotFoundException, 
  BadRequestException 
} from '@nestjs/common'; // Certifique-se de que o NestJS está configurado corretamente
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';
import { Customer } from '../../Domain/Interfaces/customer';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersRepository: CustomersRepository) {}

  @Post()
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      const { cpf, name, email, password } = createCustomerDto;
  
      // Chamada para o repositório que realiza a criação do cliente
      const customer: Customer = await this.customersRepository.createCustomer(
        cpf,
        name,
        email,
        password,
      );
  
      // Retorno do cliente criado
      return {
        message: 'Customer created successfully',
        data: customer,
      };
    } catch (error) {
      // Tratamento específico para erros conhecidos
      if (error instanceof SomeSpecificErrorType) {
        throw new BadRequestException('Specific error message related to the issue');
      }
  
      // Lançamento de exceção genérica para outros casos
      throw new InternalServerErrorException('Failed to create customer');
    }
}

  @Get(':cpf')
  async getCustomer(@Param('cpf') cpf: string) {
    const customer = await this.customersRepository.getCustomerByCpf(cpf);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }
}
