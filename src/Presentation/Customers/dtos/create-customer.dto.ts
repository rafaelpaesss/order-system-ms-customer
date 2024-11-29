// src/Application/dtos/create-customer.dto.ts
import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  cpf: string; // CPF do cliente

  @IsNotEmpty()
  @IsString()
  name: string; // Nome do cliente

  @IsNotEmpty()
  @IsString()
  password: string; // Senha do cliente

  @IsOptional()
  @IsEmail()
  email?: string; // Email do cliente (opcional)
}
