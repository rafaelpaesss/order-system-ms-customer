import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { PrismaService } from '../../Infrastructure/Apis/prisma.service';
export declare class PrismaHealthIndicator extends HealthIndicator {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    isHealthy(key: string): Promise<HealthIndicatorResult>;
}
