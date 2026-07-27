import { Events } from 'discord.js';
import { runQuery, getQuery } from '../../database/init.js';
import logger from '../../utils/logger.js';
import { XP_CONFIG } from '../../config/constants.js';

const name = Events.MessageCreate;
const once = false;
const userCooldowns = new Map();

async function execute(message, client) {
  try {
    if (message.author.bot || !message.guild) return;

    const userId = message.author.id;
    const guildId = message.guildId;
    const now = Date.now();
    const cooldownKey = `${userId}_${guildId}`;

    // Verificar cooldown de XP
    const lastXp = userCooldowns.get(cooldownKey);
    if (lastXp && now - lastXp < XP_CONFIG.COOLDOWN_MS) {
      return;
    }

    userCooldowns.set(cooldownKey, now);

    // Gerar XP aleatório
    const xpGain = Math.floor(Math.random() * XP_CONFIG.MAX_XP_PER_MESSAGE) + XP_CONFIG.PER_MESSAGE;

    // Buscar ou criar XP do usuário
    let xpData = await getQuery(
      'SELECT * FROM xp WHERE user_id = ? AND guild_id = ?',
      [userId, guildId]
    );

    if (!xpData) {
      await runQuery(
        `INSERT INTO xp (id, user_id, guild_id, xp, level, total_xp)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [`${userId}_${guildId}`, userId, guildId, xpGain, 1, xpGain]
      );
      xpData = { xp: xpGain, level: 1, total_xp: xpGain };
    } else {
      const newXp = xpData.xp + xpGain;
      const nextLevelXp = xpData.level * XP_CONFIG.LEVEL_MULTIPLIER;

      if (newXp >= nextLevelXp) {
        const newLevel = xpData.level + 1;
        await runQuery(
          `UPDATE xp SET xp = ?, level = ?, total_xp = total_xp + ? WHERE user_id = ? AND guild_id = ?`,
          [0, newLevel, xpGain, userId, guildId]
        );

        // Enviar mensagem de level up
        try {
          await message.reply(`🎉 Parabéns ${message.author.username}! Você atingiu o nível **${newLevel}**! ⬆️`);
        } catch (e) {
          logger.warn('Não foi possível enviar mensagem de level up');
        }
      } else {
        await runQuery(
          `UPDATE xp SET xp = xp + ?, total_xp = total_xp + ? WHERE user_id = ? AND guild_id = ?`,
          [xpGain, xpGain, userId, guildId]
        );
      }
    }

    logger.debug(`XP: ${message.author.username} ganhou ${xpGain} XP`);
  } catch (error) {
    logger.error('Erro ao processar XP:', error);
  }
}

export default { name, once, execute };
