import { IsString, IsNotEmpty } from 'class-validator';

export class GetCustomerDto {
  @IsString()
  @IsNotEmpty()
  password: string; // Validação para o password
}
