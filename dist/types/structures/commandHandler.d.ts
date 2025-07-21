import { Collection } from 'discord.js';
import type { Command } from '../types/command';
export declare const commands: Collection<string, Command>;
export declare function loadCommands(): Promise<void>;
