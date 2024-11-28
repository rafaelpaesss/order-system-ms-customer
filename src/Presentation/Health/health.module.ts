// src/Presentation/Health/health.module.ts

import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';  // Importando o HealthController

@Module({
  imports: [],  // Não há dependências externas para este módulo
  controllers: [HealthController],  // Registrando o controlador de saúde
  providers: [],  // Não há serviços específicos para este módulo, mas pode ser adicionado no futuro
})
export class HealthModule {}
