// src/Infrastructure/Apis/customers.controller.ts
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerService } from '../../Application/services/customer.service';
import { CustomersDto } from './dtos/customers.dto';
import { GetCustomerDto } from '../../Application/dtos/get-customer.dto'; // Importe o DTO

@ApiTags('Clientes')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}

  // Método para buscar o cliente pelo CPF
  @Get(':cpf')
  async getByCpf(
    @Param('cpf') cpf: string,
    @Body() body: GetCustomerDto, // Use o DTO para validar o corpo da requisição
  ) {
    try {
      const { password } = body; // Extraia o password do corpo da requisição
      const customer = await this.customerService.getByCpf(cpf, password); // Passando password
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
