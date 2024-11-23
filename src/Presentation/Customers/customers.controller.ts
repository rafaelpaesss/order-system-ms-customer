import {
  Body,
  Controller,
  Get,  // Adicionei a importação do @Get
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerService } from '../../Application/services/customer.service';
import { CustomersDto } from './dtos/customers.dto';

@ApiTags('Clientes')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}

  // Método para buscar o cliente pelo CPF
  @Get(':cpf')
  async getByCpf(@Param('cpf') cpf: string, @Body('password') password: string) {
    try {
      const customer = await this.customerService.getByCpf(cpf, password); // Passando a senha como argumento
      return customer;
    } catch (err) {
      throw new NotFoundException(err?.message ?? 'Customer could not be found');
    }
  }

  // Método para criar um cliente
  @Post()
  async save(@Body() dto: CustomersDto) {
    try {
      const customer = await this.customerService.create(dto);
      return customer;
    } catch (err) {
      throw new NotFoundException(
        err?.message ?? 'Customer could not be created',
      );
    }
  }
}
