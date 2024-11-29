import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  BadRequestException, // Adiciona BadRequestException para erros de validação de entrada
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerService } from '../../Application/services/customer.service';
import { CustomersDto } from './dtos/customers.dto'; // DTO para a criação de cliente

@ApiTags('Clientes')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}

  // Método para buscar o cliente pelo CPF
  @Get(':cpf')
  async getByCpf(@Param('cpf') cpf: string, @Body('password') password: string) {
    try {
      const customer = await this.customerService.getByCpf(cpf, password); // Passando a senha como argumento
      if (!customer) {
        // Se não encontrar o cliente, lançar um erro de não encontrado
        throw new NotFoundException('Customer could not be found');
      }
      return customer;
    } catch (err: unknown) {
      // Verifica se o erro é uma instância de Error
      if (err instanceof Error) {
        throw new NotFoundException(err.message ?? 'Customer could not be found');
      }
      // Em caso de erro desconhecido, lançar uma exceção genérica
      throw new NotFoundException('Customer could not be found');
    }
  }

  // Método para criar um cliente
  @Post()
  async save(@Body() dto: CustomersDto) {
    try {
      // Validação de entrada se necessário, podemos adicionar aqui caso precise de algo específico
      const customer = await this.customerService.create(dto);
      return customer;
    } catch (err: unknown) {
      // Verifica se o erro é uma instância de Error
      if (err instanceof Error) {
        throw new NotFoundException(err.message ?? 'Customer could not be created');
      }
      // Lançar uma exceção de BadRequest se os dados enviados estiverem errados ou incompletos
      throw new BadRequestException('Invalid data provided for customer creation');
    }
  }
}
