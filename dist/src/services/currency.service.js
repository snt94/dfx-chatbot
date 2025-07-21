import axios from 'axios';
import { config } from '../config/dotenv';
export class CurrencyService {
    axios = axios.create({
        baseURL: config.currencyApiUrl,
        headers: { Authorization: `Bearer ${config.currencyApiKey}` },
    });
    async fetchOne(from, to) {
        const pairs = `${from}${to}`;
        const { data } = await this.axios.get('/fetch-one', { params: { pairs } });
        return data.result[to];
    }
    async fetchMulti(from, to) {
        const pairs = to.map(t => `${from}${t}`).join(',');
        const { data } = await this.axios.get('/fetch-multi', { params: { pairs } });
        // data.results contém os valores :contentReference[oaicite:4]{index=4}
        return data.results;
    }
}
