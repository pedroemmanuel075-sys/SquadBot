import { Events } from 'discord.js';
import logger from '../../utils/logger.js';

const name = Events.GuildMemberRemove;
const once = false;

async function execute(member, client) {
  try {
    logger.info(`${member.user.username} saiu do servidor`);
  } catch (error) {
    logger.error('Erro no evento guildMemberRemove:', error);
  }
}

export default { name, once, execute };
