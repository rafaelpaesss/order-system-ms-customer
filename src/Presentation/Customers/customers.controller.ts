import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query, // Importando @Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerService } from '../../Application/services/customer.service';
import { CustomersDto } from './dtos/get-customer.dto';

@ApiTags('Clientes')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}

  // Método para buscar o cliente pelo CPF
  @Get(':cpf')
  async getByCpf(
    @Param('cpf') cpf: string,
    @Query('password') password: string, // Usando @Query para pegar o password
  ) {
    try {
      const customer = await this.customerService.getByCpf(cpf, password); // Passando password via query
      return customer;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new NotFoundException(err.message ?? 'Customer could not be found');
      }
      throw new NotFoundException('Customer could not be found');
    }
  }

  // Método para criar um cliente
  @Post()
  async save(@Body() dto: CustomersDto) {
    try {
      const customer = await this.customerService.create(dto);
      return customer;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new NotFoundException(err.message ?? 'Customer could not be created');
      }
      throw new NotFoundException('Customer could not be created');
    }
  }
}
