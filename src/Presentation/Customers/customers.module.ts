import { Module } from '@nestjs/common';

import { AwsCognitoService } from 'src/Infrastructure/Apis/cognito.service';
import { CustomerService } from '../../Application/services/customer.service';
import { CustomersAdapter } from '../../Domain/Adapters/customers.adapter';
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';
import { PrismaService } from '../../Infrastructure/Apis/prisma.service';
import { CustomersController } from './customers.controller';

@Module({
  imports: [],
  controllers: [CustomersController],
  providers: [
    { provide: CustomersRepository, useClass: CustomersAdapter },
    PrismaService,
    AwsCognitoService,
    CustomerService,
  ],
  exports: [CustomerService],
})
export class CustomersModule {}
