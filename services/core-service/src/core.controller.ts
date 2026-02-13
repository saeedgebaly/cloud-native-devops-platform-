import { Controller, Get } from '@nestjs/common';
import axios from 'axios';

@Controller('core')
export class CoreController {

    private async callAuthWithRetry(retries = 2) {
        const authUrl = process.env.AUTH_SERVICE_URL;

        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                return await axios.get(`${authUrl}/auth/ping`, {
                    timeout: 2000,
                });
            } catch (error) {
                if (attempt === retries) {
                    throw error;
                }
            }
        }
    }

    @Get('check-auth')
    async checkAuth() {
        try {
            const response = await this.callAuthWithRetry();

            return {
                message: 'Core service successfully contacted auth-service',
                authResponse: response.data,
            };

        } catch (error: any) {
            return {
                message: 'Auth service unavailable',
                degradedMode: true,
            };
        }
    }
}
