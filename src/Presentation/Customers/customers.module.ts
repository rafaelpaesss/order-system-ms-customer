import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from '../../Application/services/customer.service';
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';
import { CustomersAdapter } from '../../Domain/Adapters/customers.adapter'; // Certifique-se de usar o adapter correto
import { DynamoDBService } from '../../Infrastructure/Apis/dynamodb.service';
import { ApiService } from '../../Infrastructure/Apis/api.service';

@Module({
  imports: [],
  controllers: [CustomersController],
  providers: [
    ApiService,
    CustomersService,
    DynamoDBService,
    {
      provide: CustomersRepository, // Abstração
      useClass: CustomersAdapter, // Implementação concreta
    },
  ],
})
export class CustomersModule {}
