export declare class CurrencyService {
    private axios;
    fetchOne(from: string, to: string): Promise<number>;
    fetchMulti(from: string, to: string[]): Promise<Record<string, number>>;
}
