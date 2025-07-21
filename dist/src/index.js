import { Client, GatewayIntentBits } from 'discord.js';
import { commands, loadCommands } from '../structures/commandHandler';
import * as dotenv from 'dotenv';
dotenv.config();
loadCommands();
// Crie o client com intents básicos para comandos de slash
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages],
});
// Registre comandos localmente para controle
// Quando o bot estiver pronto
client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}`);
});
// Escutando interações (slash commands)
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    const command = commands.get(interaction.commandName);
    if (!command)
        return;
    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Erro ao executar o comando!', ephemeral: true });
    }
});
// Login com token do .env
client.login(process.env.DISCORD_TOKEN);
