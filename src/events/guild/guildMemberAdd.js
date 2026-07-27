import { Events } from 'discord.js';
import logger from '../../utils/logger.js';

const name = Events.GuildMemberAdd;
const once = false;

async function execute(member, client) {
  try {
    const guildId = member.guild.id;

    // Enviar mensagem de boas-vindas em DM
    try {
      await member.send({
        content: `🎉 Bem-vindo ao Squadrife, ${member.user.username}!\n\nAqui a gente joga Roblox, faz lives, ri de tudo e cria boas lembranças.\n\nLeia as regras, pegue seus cargos e bora fazer parte da bagunça! 😂`,
      });
    } catch (error) {
      logger.warn(`Não foi possível enviar DM para ${member.user.username}`);
    }

    logger.info(`${member.user.username} entrou no servidor`);
  } catch (error) {
    logger.error('Erro no evento guildMemberAdd:', error);
  }
}

export default { name, once, execute };
