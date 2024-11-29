import { IsString, IsNotEmpty } from 'class-validator';

export class CustomersDto {
  @IsString()
  @IsNotEmpty()
  password: string; // Validação para o password
}
