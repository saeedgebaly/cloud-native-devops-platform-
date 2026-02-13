import { Controller, Get } from '@nestjs/common';
import axios from 'axios';

@Controller('core')
export class CoreController {

    @Get('check-auth')
    async checkAuth() {
        try {
            const authUrl = process.env.AUTH_SERVICE_URL;

            const response = await axios.get(`${authUrl}/auth/ping`);

            return {
                message: 'Core service successfully contacted auth-service',
                authResponse: response.data,
            };

        } catch (error: any) {
            return {
                error: 'Failed to contact auth-service',
                details: error.message,
            };
        }
    }
}
