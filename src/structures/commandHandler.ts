import { Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Command } from '../types/command';

export const commands = new Collection<string, Command>();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands() {


  const commandsPath = path.join(__dirname, '../', 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);

    const commandModule = await import(filePath);
    const command: Command = commandModule.default;
    if (command?.data?.name && command.execute!) {
      commands.set(command.data.name, command);
    }
  }
}