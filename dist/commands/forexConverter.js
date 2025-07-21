import { SlashCommandBuilder } from 'discord.js';
import { convertCurrencyController, convertMultiController } from '../controllers/currency.controller.js';
const channelId = '1289032205749846085';
export const data = new SlashCommandBuilder()
    .setName('convert')
    .setDescription('Converta moedas!')
    .addStringOption(o => o.setName('from').setRequired(true).setDescription('De (ex: USD)'))
    .addStringOption(o => o.setName('to').setRequired(true).setDescription('Para (ex: BRL ou USD,EUR,GBP)'))
    .addNumberOption(o => o.setName('amount').setRequired(true).setDescription('Quantia'));
export async function execute(interaction) {
    if (interaction.channelId !== channelId) {
        return interaction.reply({
            content: '❌ Este comando só pode ser usado em um canal específico.',
            ephemeral: true
        });
    }
    const from = interaction.options.getString('from').toUpperCase();
    const toRaw = interaction.options.getString('to');
    const amount = interaction.options.getNumber('amount');
    const tos = toRaw.includes(',') ? toRaw.toUpperCase().split(',') : [toRaw.toUpperCase()];
    const message = tos.length > 1
        ? await convertMultiController(from, tos, amount)
        : await convertCurrencyController(from, tos[0], amount);
    await interaction.reply(message);
}
export default { data, execute };
