import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { HealthController } from './health/health.controller';
import { MetricsController } from './metrics/metrics.controller';

@Module({
    imports: [AuthModule],
    controllers: [HealthController, MetricsController],
})
export class AppModule { }
