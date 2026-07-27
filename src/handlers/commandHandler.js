import { REST, Routes } from '@discordjs/rest';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands(client, rootDir) {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  const commandsPath = path.join(rootDir, 'commands');
  const commandCategories = fs.readdirSync(commandsPath);

  const commands = [];
  let loadedCount = 0;

  for (const category of commandCategories) {
    const categoryPath = path.join(commandsPath, category);
    const categoryStats = fs.statSync(categoryPath);

    if (!categoryStats.isDirectory()) continue;

    const commandFiles = fs.readdirSync(categoryPath).filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
      try {
        const filePath = path.join(categoryPath, file);
        const command = await import(`file://${filePath}`);
        const commandData = command.default || command.data;

        if (!commandData) {
          logger.warn(`Comando ${file} não possui export padrão`);
          continue;
        }

        client.commands.set(commandData.name, command.default || command);
        commands.push(commandData.toJSON ? commandData.toJSON() : commandData);
        loadedCount++;
      } catch (error) {
        logger.error(`Erro ao carregar comando ${file}:`, error);
      }
    }
  }

  // Registrar comandos globalmente
  try {
    logger.info(`Registrando ${loadedCount} comandos globalmente...`);
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    logger.info('✅ Comandos registrados com sucesso');
  } catch (error) {
    logger.error('Erro ao registrar comandos:', error);
  }
}

export default { loadCommands };
