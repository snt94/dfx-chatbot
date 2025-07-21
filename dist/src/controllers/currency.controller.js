import { CurrencyService } from '../services/currency.service';
const service = new CurrencyService();
export async function convertCurrencyController(from, to, amount) {
    try {
        const rate = await service.fetchOne(from, to);
        const result = rate * amount;
        return `💱 ${amount} ${from} = ${result.toFixed(4)} ${to}`;
    }
    catch (e) {
        console.error(e);
        return `❌ Erro ao converter de ${from} para ${to}.`;
    }
}
export async function convertMultiController(from, tos, amount) {
    try {
        const rates = await service.fetchMulti(from, tos);
        const lines = tos.map(t => {
            const r = rates[`${from}${t}`] ?? rates[t];
            const res = (r * amount).toFixed(4);
            return `• ${amount} ${from} = ${res} ${t}`;
        });
        return lines.join('\n');
    }
    catch (e) {
        console.error(e);
        return `❌ Erro na conversão múltipla.`;
    }
}
