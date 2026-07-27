import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadEvents(client, rootDir) {
  const eventsPath = path.join(rootDir, 'events');
  const eventFolders = fs.readdirSync(eventsPath);

  let loadedCount = 0;

  for (const folder of eventFolders) {
    const folderPath = path.join(eventsPath, folder);
    const folderStats = fs.statSync(folderPath);

    if (!folderStats.isDirectory()) continue;

    const eventFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith('.js'));

    for (const file of eventFiles) {
      try {
        const filePath = path.join(folderPath, file);
        const event = await import(`file://${filePath}`);
        const eventData = event.default || event;

        if (eventData.once) {
          client.once(eventData.name, (...args) => eventData.execute(...args, client));
        } else {
          client.on(eventData.name, (...args) => eventData.execute(...args, client));
        }
        loadedCount++;
      } catch (error) {
        logger.error(`Erro ao carregar evento ${file}:`, error);
      }
    }
  }

  logger.info(`✅ ${loadedCount} eventos carregados`);
}

export default { loadEvents };
