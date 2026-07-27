import { Events } from 'discord.js';
import logger from '../../utils/logger.js';
import { getQuery, runQuery } from '../../database/init.js';

const name = Events.MessageCreate;
const once = false;

async function execute(message, client) {
  try {
    // Ignorar mensagens de bots e DMs
    if (message.author.bot || !message.guild) return;

    const guildId = message.guildId;
    const userId = message.author.id;

    // Verificar se usuário existe na economia
    let economy = await getQuery(
      'SELECT * FROM economy WHERE user_id = ? AND guild_id = ?',
      [userId, guildId]
    );

    if (!economy) {
      await runQuery(
        `INSERT INTO economy (id, user_id, guild_id, balance)
         VALUES (?, ?, ?, 0)`,
        [`${userId}_${guildId}`, userId, guildId]
      );
    }

    // Responder a menções de Roblox
    const robloxKeywords = ['roblox', 'obby', 'robux', 'brookhaven', 'blox fruits', 'adopt me'];
    const messageContent = message.content.toLowerCase();

    for (const keyword of robloxKeywords) {
      if (messageContent.includes(keyword)) {
        const respostas = [
          'Bora jogar Roblox! 🎮',
          'Morreu no obby? 😂',
          'Foi comprar Robux? 💸',
          'Qual é o seu game favorito? 🤔',
          'Vem de voz jogar! 🎧',
        ];
        const resposta = respostas[Math.floor(Math.random() * respostas.length)];
        await message.reply(resposta).catch(() => {});
        break;
      }
    }

    logger.debug(`Mensagem recebida de ${message.author.username}`);
  } catch (error) {
    logger.error('Erro no evento messageCreate:', error);
  }
}

export default { name, once, execute };
