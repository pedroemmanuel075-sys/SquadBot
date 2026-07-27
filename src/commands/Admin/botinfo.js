import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('botinfo')
  .setDescription('🤖 Ver informações do bot')
  .setNameLocalizations({
    'pt-BR': 'botinfo',
  })
  .setDescriptionLocalizations({
    'pt-BR': '🤖 Ver informações do bot',
  });

async function execute(interaction) {
  try {
    const client = interaction.client;
    const uptime = Math.floor(client.uptime / 1000);
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle('🤖 Squadrife Bot Info')
      .setThumbnail(client.user.displayAvatarURL())
      .addFields(
        {
          name: '🎮 Nome',
          value: client.user.username,
          inline: true,
        },
        {
          name: '🆔 ID',
          value: client.user.id,
          inline: true,
        },
        {
          name: '📦 Versão',
          value: '1.0.0',
          inline: true,
        },
        {
          name: '⏱️ Uptime',
          value: `${days}d ${hours}h ${minutes}m`,
          inline: true,
        },
        {
          name: '🖥️ Servidores',
          value: `${client.guilds.cache.size}`,
          inline: true,
        },
        {
          name: '👥 Usuários',
          value: `${client.users.cache.size}`,
          inline: true,
        },
        {
          name: '💬 Comandos',
          value: `${client.commands.size}`,
          inline: true,
        },
        {
          name: '📚 Ping',
          value: `${client.ws.ping}ms`,
          inline: true,
        },
        {
          name: '💾 Memory',
          value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
          inline: true,
        }
      )
      .setFooter({
        text: 'O Squadrife Bot está online e funcionando! 🎮',
      });

    await interaction.reply({ embeds: [embed] });
    logger.info(`BotInfo: ${interaction.user.username} viu info do bot`);
  } catch (error) {
    logger.error('Erro no comando botinfo:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao buscar informações`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
