import * as dotenv from 'dotenv';
dotenv.config();
export const config = {
    currencyApiKey: process.env.API_KEY,
    currencyApiUrl: process.env.API_URL,
};
