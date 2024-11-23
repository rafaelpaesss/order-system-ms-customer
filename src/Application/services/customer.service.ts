import { Injectable } from '@nestjs/common';
import { CustomersRepository } from 'src/Domain/Repositories/customersRepository'; // Certifique-se de que o caminho esteja correto
import { Customers } from 'src/Domain/Interfaces/customer';
import { CustomersDto } from 'src/Presentation/Customers/dtos/customers.dto'; // Importe o DTO

@Injectable()
export class CustomerService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  // Método para obter o cliente pelo CPF (agora com senha)
  async getByCpf(cpf: string, password: string): Promise<Customers | null> {
    return this.customersRepository.getCustomerByCpf(cpf, password);
  }

  // Método para criar um cliente
  async create(dto: CustomersDto): Promise<Customers> {
    // Mapeia o DTO para a estrutura do tipo Customers
    const customerData: Customers = {
      id: 0, // O Prisma gerencia o ID automaticamente
      name: dto.name,
      email: dto.email,
      cpf: dto.cpf, 
      isAdmin: dto.isAdmin || false, // Pode ser false por padrão se não for fornecido
      password: dto.password, // Não esqueça de incluir a senha
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.customersRepository.saveCustomer(customerData);
  }

}
