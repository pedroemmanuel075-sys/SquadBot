import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('🏓 Verificar latência do bot')
  .setNameLocalizations({
    'pt-BR': 'ping',
  })
  .setDescriptionLocalizations({
    'pt-BR': '🏓 Verificar latência do bot',
  });

async function execute(interaction) {
  try {
    const sent = await interaction.reply({
      content: 'Calculando ping...',
      fetchReply: true,
    });

    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const wsLatency = interaction.client.ws.ping;

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle(`${EMOJIS.INFO} Squadrife Ping`)
      .addFields(
        {
          name: '🔄 Latência do Bot',
          value: `${latency}ms`,
          inline: true,
        },
        {
          name: '🌐 Latência WebSocket',
          value: `${wsLatency}ms`,
          inline: true,
        },
        {
          name: '📊 Status',
          value: wsLatency < 100 ? '🟢 Excelente' : wsLatency < 200 ? '🟡 Bom' : '🔴 Ruim',
          inline: false,
        }
      )
      .setThumbnail(interaction.client.user.displayAvatarURL());

    await sent.edit({ content: '', embeds: [embed] });
    logger.info(`Ping: ${latency}ms | WS: ${wsLatency}ms`);
  } catch (error) {
    logger.error('Erro no comando ping:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao calcular ping`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
