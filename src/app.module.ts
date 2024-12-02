import { Module } from '@nestjs/common';
import { CustomersController } from './Presentation/Customers/customers.controller';
import { CustomerService } from './Application/services/customer.service';
import { DynamoDBService } from './Infrastructure/Apis/dynamodb.service';

@Module({
  imports: [],
  controllers: [CustomersController],
  providers: [CustomerService, DynamoDBService],
})
export class AppModule {}
