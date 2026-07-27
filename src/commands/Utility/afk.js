import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('afk')
  .setDescription('🔇 Ativar modo AFK')
  .addStringOption((option) =>
    option
      .setName('motivo')
      .setDescription('Motivo de estar AFK')
      .setRequired(false)
  )
  .setNameLocalizations({
    'pt-BR': 'afk',
  })
  .setDescriptionLocalizations({
    'pt-BR': '🔇 Ativar modo AFK',
  });

async function execute(interaction) {
  try {
    const motivo = interaction.options.getString('motivo') || 'Sem motivo especificado';

    const embed = new EmbedBuilder()
      .setColor(COLORS.WARNING)
      .setTitle('🔇 Modo AFK Ativado')
      .setDescription(`Você está AFK.\n**Motivo:** ${motivo}`)
      .setThumbnail(interaction.user.displayAvatarURL())
      .setFooter({
        text: 'Use /afk novamente para desativar',
      });

    await interaction.reply({ embeds: [embed] });
    logger.info(`AFK: ${interaction.user.username} ativou modo AFK - ${motivo}`);
  } catch (error) {
    logger.error('Erro no comando afk:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao ativar AFK`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
