import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module'; // Importando CustomerModule

@Module({
  imports: [CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
