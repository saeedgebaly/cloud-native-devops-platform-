import { Controller, Get } from '@nestjs/common';

@Controller('metrics')
export class MetricsController {
    @Get()
    metrics() {
        return `
# HELP auth_service_up Auth service is up
# TYPE auth_service_up gauge
auth_service_up 1
`;
    }
}
