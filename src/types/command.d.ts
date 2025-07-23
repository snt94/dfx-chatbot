import type { ChatInputCommandInteraction } from 'discord.js';

export interface Command {
  data: any;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}