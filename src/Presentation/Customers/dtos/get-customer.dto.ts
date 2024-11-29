import { IsString, IsNotEmpty } from 'class-validator';

export class CustomerDto {
  @IsString()
  @IsNotEmpty()
  password: string; // Validação para o password
}
