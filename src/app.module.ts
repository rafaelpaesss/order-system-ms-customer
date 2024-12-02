import { Module } from '@nestjs/common';
import { CustomerController } from './Presentation/Customers/customers.controller';
import { CustomerService } from './Application/services/customer.service';
import { DynamoDBService } from './Infrastructure/Apis/dynamodb.service';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [CustomerService, DynamoDBService],
})
export class AppModule {}
