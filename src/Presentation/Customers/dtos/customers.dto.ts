import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsNotEmpty } from 'class-validator';

// src/Presentation/Customers/dto/customers.dto.ts
export class CustomersDto {
  @ApiProperty({
    description: 'Nome completo do cliente',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Endereço de email do cliente',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'CPF do cliente sem máscara',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({
    description: 'Indica se o cliente é um administrador',
    type: Boolean,
  })
  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;

  @ApiProperty({
    description: 'Senha do cliente',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
