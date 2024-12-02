// src/Presentation/Customers/customers.module.ts

import { Module } from '@nestjs/common';
import { CustomerController } from './customers.controller';  // Controller
import { CustomerService } from '../../Application/services/customer.service';  // Serviço de lógica de negócios
import { CustomerRepository } from '../../Domain/Repositories/customersRepository';  // Repositório
import { DynamoDBService } from '../../Infrastructure/Apis/dynamodb.service';  // Serviço de integração com DynamoDB
import { ApiService } from '../../Infrastructure/Apis/api.service';  // Serviço da API

@Module({
  imports: [],
  controllers: [CustomersController],  // Controller para mapear as rotas
  providers: [
    ApiService,  // Serviço que coordena as operações da API
    CustomersService,  // Serviço de lógica de clientes
    CustomersRepository,  // Repositório de dados
    DynamoDBService,  // Serviço de integração com o DynamoDB
  ],
})
export class CustomersModule {}
