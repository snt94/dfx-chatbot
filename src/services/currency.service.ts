import axios from 'axios';
import { config } from '../config/dotenv.js';

export class CurrencyService {
  private axios = axios.create({
    baseURL: config.currencyApiUrl,
  });

  async fetchOne(from: string, to: string): Promise<number> {
    // const pairs = `${from}${to}`;
    const { data } = await this.axios.get('/fetch-one', {
      params: { from, to, api_key: config.currencyApiKey }
    });
    return data.result[to];
  }

  async fetchMulti(from: string, to: string[]): Promise<Record<string, number>> {
    // const pairs = to.map(t => `${from}${t}`).join(',');
    const { data } = await this.axios.get('/fetch-multi', {
      params: { from, to: to.join(','), api_key: config.currencyApiKey }
    });
    return data.results;
  }
}