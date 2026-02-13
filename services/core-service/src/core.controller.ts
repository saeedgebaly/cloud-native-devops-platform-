import { Controller, Get } from '@nestjs/common';
import axios from 'axios';

@Controller('core')
export class CoreController {

    private async callAuthWithRetry(retries = 2) {
        const baseUrl = process.env.AUTH_SERVICE_URL;
        if (!baseUrl) throw new Error('AUTH_SERVICE_URL not defined');

        const url = `${baseUrl}/auth/ping`;

        let lastError: any;

        for (let i = 0; i <= retries; i++) {
            try {
                return await axios.get(url, { timeout: 2000 });
            } catch (error) {
                lastError = error;

                if (i < retries) {
                    await new Promise(res => setTimeout(res, 500 * (i + 1)));
                }
            }
        }

        throw lastError;
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
