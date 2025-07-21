import { ChatInputCommandInteraction } from 'discord.js';
export declare const data: import("discord.js").SlashCommandOptionsOnlyBuilder;
export declare function execute(interaction: ChatInputCommandInteraction): Promise<import("discord.js").InteractionResponse<boolean> | undefined>;
declare const _default: {
    data: import("discord.js").SlashCommandOptionsOnlyBuilder;
    execute: typeof execute;
};
export default _default;
