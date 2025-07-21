import axios from 'axios';
import { config } from '../config/dotenv';
export class FastForexClient {
    baseUrl = config.currencyApiUrl;
    apiKey = config.currencyApiKey;
    async fetchOne(from, to) {
        const { data } = await axios.get(`${this.baseUrl}/fetch-one`, {
            params: { pairs: `${from}${to}` },
            headers: { Authorization: `Bearer ${this.apiKey}` },
        });
        return data.result[to];
    }
    async fetchMulti(from, to) {
        const { data } = await axios.get(`${this.baseUrl}/fetch-multi`, {
            params: { pairs: to.map(t => `${from}${t}`).join(',') },
            headers: { Authorization: `Bearer ${this.apiKey}` },
        });
        return data.results;
    }
}
