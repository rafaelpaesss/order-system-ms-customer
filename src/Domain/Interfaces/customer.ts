// src/Domain/entities/customer.entity.ts

export interface Customer {
  cpf: string;  // CPF como chave única
  name: string;  // Nome do cliente
  email: string;  // Email do cliente
  password: string;  // Senha do cliente
  phone?: string;  // Telefone opcional
  address?: string;  // Endereço opcional
  createdAt: string;  // Data de criação do cadastro
  updatedAt: string;  // Data da última atualização
}
