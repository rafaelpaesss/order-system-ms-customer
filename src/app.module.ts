import { Module } from '@nestjs/common';
import { CustomersModule } from '../src/Presentation/Customers/customers.module'; // Importando CustomerModule

@Module({
  imports: [CustomersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
