import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module'; // Importando CustomerModule

@Module({
  imports: [CustomerModule],  // Certifique-se de que CustomerModule foi importado
  controllers: [],
  providers: [],
})
export class AppModule {}
