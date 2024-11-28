import { Injectable } from '@nestjs/common';
import { Customer } from '@Domain/Entities/customer.entity';
import { CustomerRepository } from '@Domain/Repositories/customersRepository';
import { ApiResponse } from './api.response';  // Definindo uma resposta padrão (opcional)

@Injectable()
export class ApiService {
  constructor(private readonly customerService: CustomerService) {}

  // Método para validar um usuário via CPF e senha
  async validateUser(cpf: string, password: string): Promise<ApiResponse> {
    try {
      const isValid = await this.customerService.validateUser(cpf, password);
      if (isValid) {
        return new ApiResponse('User validated successfully', 200);
      } else {
        return new ApiResponse('Invalid CPF or password', 400);
      }
    } catch (error) {
      console.error('Error validating user:', error);
      return new ApiResponse('Error validating user', 500);
    }
  }

  // Método para cadastrar um novo usuário
  async registerCustomer(customer: Customer): Promise<ApiResponse> {
    try {
      const newCustomer = await this.customerService.registerCustomer(customer);
      return new ApiResponse('Customer registered successfully', 201, newCustomer);
    } catch (error) {
      console.error('Error registering customer:', error);
      return new ApiResponse('Error registering customer', 500);
    }
  }
}
