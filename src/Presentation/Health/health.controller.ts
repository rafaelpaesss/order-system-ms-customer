// src/Presentation/Health/health.controller.ts

import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  // Rota GET para o endpoint /health
  @Get()
  checkHealth(): string {
    // Aqui você pode adicionar verificações mais complexas, como conectividade com bancos de dados, etc.
    return 'OK';  // Retorna um status simples de "OK"
  }
}
