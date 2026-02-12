import { Controller, Get } from '@nestjs/common';
import axios from 'axios';

@Controller('core')
export class CoreController {

    @Get('check-auth')
    async checkAuth() {
        try {
            const response = await axios.get(
                'http://auth-service:3000/auth/ping'
            );

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
