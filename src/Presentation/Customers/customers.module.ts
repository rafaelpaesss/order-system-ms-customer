// src/Presentation/Customers/customers.module.ts

import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';  // Controller
import { CustomersService } from '../../Application/services/customer.service';  // Corrigido: Serviço de lógica de clientes
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';  // Repositório de dados
import { DynamoDBService } from '../../Infrastructure/Apis/dynamodb.service';  // Serviço de integração com DynamoDB
import { ApiService } from '../../Infrastructure/Apis/api.service';  // Serviço da API

@Module({
  imports: [],
  controllers: [CustomersController],  // Controller para mapear as rotas
  providers: [
    ApiService,  // Serviço que coordena as operações da API
    CustomersService,  // Corrigido: Serviço de lógica de clientes (verifique o nome do arquivo e da classe)
    CustomersRepository,  // Repositório de dados
    DynamoDBService,  // Serviço de integração com o DynamoDB
  ],
})
export class CustomersModule {}
