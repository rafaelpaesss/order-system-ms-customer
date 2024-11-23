import { PrismaHealthIndicator } from './PrismaHealthIndicator.service';
export declare class HealthController {
    private health;
    constructor(health: PrismaHealthIndicator);
    check(): Promise<import("@nestjs/terminus").HealthIndicatorResult>;
}
