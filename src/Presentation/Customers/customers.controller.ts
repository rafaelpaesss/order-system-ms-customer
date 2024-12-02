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
      const customer: Customer = await this.customersRepository.createCustomer(
        cpf,
        name,
        email,
        password,
      );
      return customer;
    } catch (error) {
      throw new BadRequestException('Failed to create customer');
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
