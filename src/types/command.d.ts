import type { ChatInputCommandInteraction } from 'discord.js';

export interface Command {
  data: any; // pode ser SlashCommandBuilder, ou outro tipo específico
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}