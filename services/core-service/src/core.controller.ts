import { Controller, Get } from '@nestjs/common';
import axios from 'axios';
import { Pool } from 'pg';


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
        const pool = new Pool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: 5432,
        });

        try {
            const result = await pool.query('SELECT NOW()');
            await pool.end();

            return {
                message: 'Database connected successfully',
                time: result.rows[0].now,
            };
        } catch (error) {
            return {
                message: 'Database connection failed',
                error: error.message,
            };
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
