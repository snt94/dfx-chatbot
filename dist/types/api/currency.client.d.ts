export declare class FastForexClient {
    private baseUrl;
    private apiKey;
    fetchOne(from: string, to: string): Promise<number>;
    fetchMulti(from: string, to: string[]): Promise<Record<string, number>>;
}
