import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('channelinfo')
  .setDescription('📢 Ver informações de um canal')
  .addChannelOption((option) =>
    option.setName('canal').setDescription('Canal para verificar').setRequired(false)
  )
  .setNameLocalizations({
    'pt-BR': 'channelinfo',
  })
  .setDescriptionLocalizations({
    'pt-BR': '📢 Ver informações de um canal',
  });

async function execute(interaction) {
  try {
    const channel = interaction.options.getChannel('canal') || interaction.channel;

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle(`📢 Informações de #${channel.name}`)
      .addFields(
        {
          name: '🆔 ID',
          value: channel.id,
          inline: true,
        },
        {
          name: '📝 Tipo',
          value: channel.type === 0 ? 'Texto' : channel.type === 2 ? 'Voz' : 'Outro',
          inline: true,
        },
        {
          name: '📍 Posição',
          value: `${channel.position}`,
          inline: true,
        },
        {
          name: '📎 Tópico',
          value: channel.topic || 'Sem tópico',
          inline: false,
        }
      );

    await interaction.reply({ embeds: [embed] });
    logger.info(`ChannelInfo: ${interaction.user.username} viu info do canal #${channel.name}`);
  } catch (error) {
    logger.error('Erro no comando channelinfo:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao buscar informações do canal`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
