import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('serverinfo')
  .setDescription('🏰 Ver informações do servidor')
  .setNameLocalizations({
    'pt-BR': 'serverinfo',
  })
  .setDescriptionLocalizations({
    'pt-BR': '🏰 Ver informações do servidor',
  });

async function execute(interaction) {
  try {
    const guild = interaction.guild;
    const owner = await guild.fetchOwner();

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle(`🏰 Informações de ${guild.name}`)
      .setThumbnail(guild.iconURL())
      .addFields(
        {
          name: '🆔 ID',
          value: guild.id,
          inline: true,
        },
        {
          name: '👑 Dono',
          value: owner.user.username,
          inline: true,
        },
        {
          name: '📅 Criado em',
          value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:f>`,
          inline: true,
        },
        {
          name: '👥 Membros',
          value: `${guild.memberCount}`,
          inline: true,
        },
        {
          name: '📝 Canais',
          value: `${guild.channels.cache.size}`,
          inline: true,
        },
        {
          name: '📊 Nível de Verificação',
          value: guild.verificationLevel || 'Nenhum',
          inline: true,
        }
      )
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed] });
    logger.info(`ServerInfo: ${interaction.user.username} verificou info do servidor`);
  } catch (error) {
    logger.error('Erro no comando serverinfo:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao buscar informações do servidor`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
