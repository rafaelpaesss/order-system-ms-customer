import { Injectable } from '@nestjs/common';
import { AwsCognitoService } from 'src/Infrastructure/Apis/cognito.service';
import { PrismaService } from '../../Infrastructure/Apis/prisma.service';
import { Customers } from '../Interfaces/customer';
import { CustomersRepository } from '../Repositories/customersRepository';

@Injectable()
export class CustomersAdapter implements CustomersRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cognito: AwsCognitoService,
  ) {}

  // Método para obter o cliente pelo CPF, agora validando a senha
  async getCustomerByCpf(cpf: string, password: string): Promise<Customers | null> {
    try {
      // Remover a máscara do CPF
      const newCpf = cpf; // Se a máscara for necessária, faça a remoção antes de passar aqui
  
      // Buscando o cliente no banco de dados
      const customer = await this.prisma.customer.findUnique({
        where: { cpf: newCpf },
        select: {
          id: true,
          name: true,
          email: true,
          cpf: true,
          isAdmin: true,
          password: true, // Explicitamente incluindo o campo password
          createdAt: true,
          updatedAt: true,
        },
      });
  
      if (!customer) {
        throw new Error('Cliente não encontrado');
      }
  
      // Verificando se a senha fornecida corresponde à senha armazenada
      if (customer.password !== password) {
        throw new Error('Senha inválida');
      }
  
      return customer;
    } catch (error) {
      const message =
        error?.message || error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }

  // src/Domain/Adapters/customers.adapter.ts
  async saveCustomer(customer: Customers): Promise<Customers> {
    try {
      // Criando um novo cliente no banco de dados
      const newCustomer = await this.prisma.customer.create({
        data: {
          name: customer.name,
          email: customer.email,
          cpf: customer.cpf, // CPF sem máscara
          isAdmin: customer.isAdmin,
          password: customer.password, // Armazenando a senha
        },
      });

      return newCustomer;
    } catch (error) {
      const message =
        error?.message || error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }
}