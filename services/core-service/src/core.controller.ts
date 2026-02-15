import { Controller, Get } from '@nestjs/common';
import axios from 'axios';
import { Client } from 'pg';


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

    @Get('db-check')
    async dbCheck() {
        const client = new Client({
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        });

        await client.connect();

        const result = await client.query('SELECT NOW()');

        await client.end();

        return {
            dbTime: result.rows[0],
        };
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
