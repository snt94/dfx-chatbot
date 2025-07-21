import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
config();
// Para trabalhar com __dirname em ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Diretório de comandos
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = (await fs.readdir(commandsPath)).filter(file => file.endsWith('.ts') || file.endsWith('.js'));
const commands = [];
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const commandModule = await import(filePath);
    if ('data' in commandModule && typeof commandModule.data.toJSON === 'function') {
        commands.push(commandModule.data.toJSON());
    }
    else {
        console.warn(`⚠️ O arquivo ${file} não exporta corretamente a propriedade "data".`);
    }
}
// ⚠️ Use variáveis reais ou .env
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID; // Pode ser omitido para registrar globalmente
const rest = new REST({ version: '10' }).setToken(token);
(async () => {
    try {
        console.log('🔁 Iniciando registro de comandos...');
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
        console.log('✅ Comandos registrados com sucesso!');
    }
    catch (error) {
        console.error('❌ Erro ao registrar comandos:', error);
    }
})();
