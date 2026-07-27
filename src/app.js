import { Client, Collection, GatewayIntentBits, ActivityType } from 'discord.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase } from './database/init.js';
import { loadCommands } from './handlers/commandHandler.js';
import { loadEvents } from './handlers/eventHandler.js';
import logger from './utils/logger.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validar variáveis de ambiente
const requiredEnvVars = ['DISCORD_TOKEN', 'CLIENT_ID', 'GUILD_ID'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    logger.error(`Variável de ambiente ${envVar} não está definida`);
    process.exit(1);
  }
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildModeration,
  ],
});

// Coleções para armazenar comandos e cooldowns
client.commands = new Collection();
client.cooldowns = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.db = null;

// Mensagens de presença
const presences = [
  { name: '🎮 Jogando Roblox', type: ActivityType.Playing },
  { name: '😂 Julgando o português do chat', type: ActivityType.Watching },
  { name: '👀 Procurando quem caiu do obby', type: ActivityType.Watching },
  { name: '🟢 Lives do Squadrife', type: ActivityType.Streaming },
  { name: '☕ Esperando alguém fazer besteira', type: ActivityType.Watching },
  { name: '🎲 Fazendo sorteios', type: ActivityType.Playing },
  { name: '🏆 Subindo de nível', type: ActivityType.Competing },
  { name: '💸 Distribuindo moedas', type: ActivityType.Playing },
];

let presenceIndex = 0;

client.on('ready', async () => {
  logger.info(`✅ Bot conectado como ${client.user.username}#${client.user.discriminator}`);
  logger.info(`🆔 ID do Bot: ${client.user.id}`);
  logger.info(`📡 Conectado em ${client.guilds.cache.size} servidor(s)`);

  // Inicializar banco de dados
  try {
    client.db = await initializeDatabase();
    logger.info('✅ Banco de dados inicializado');
  } catch (error) {
    logger.error('Erro ao inicializar banco de dados:', error);
    process.exit(1);
  }

  // Carregar comandos
  await loadCommands(client, __dirname);
  logger.info(`✅ ${client.commands.size} comandos carregados`);

  // Carregar eventos
  await loadEvents(client, __dirname);
  logger.info('✅ Event handlers carregados');

  // Definir presença inicial
  client.user.setActivity(presences[0].name, {
    type: presences[0].type,
  });

  // Rotar presença a cada 10 segundos
  setInterval(() => {
    presenceIndex = (presenceIndex + 1) % presences.length;
    client.user.setActivity(presences[presenceIndex].name, {
      type: presences[presenceIndex].type,
    });
  }, 10000);

  logger.info('🎮 Squadrife Bot está pronto para a ação!');
});

client.on('error', (error) => {
  logger.error('Erro do cliente Discord:', error);
});

process.on('unhandledRejection', (error) => {
  logger.error('Promise rejection não tratada:', error);
});

client.login(process.env.DISCORD_TOKEN);

export default client;
