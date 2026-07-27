import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('lembrete')
  .setDescription('⏰ Configurar um lembrete')
  .addStringOption((option) =>
    option
      .setName('texto')
      .setDescription('Texto do lembrete')
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option
      .setName('segundos')
      .setDescription('Tempo até lembrete em segundos')
      .setRequired(true)
  )
  .setNameLocalizations({
    'pt-BR': 'lembrete',
  })
  .setDescriptionLocalizations({
    'pt-BR': '⏰ Configurar um lembrete',
  });

async function execute(interaction) {
  try {
    const texto = interaction.options.getString('texto');
    const segundos = interaction.options.getInteger('segundos');

    if (segundos < 1 || segundos > 604800) {
      return await interaction.reply({
        content: `${EMOJIS.ERROR} Tempo deve ser entre 1 segundo e 7 dias!`,
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setColor(COLORS.SUCCESS)
      .setTitle(`${EMOJIS.SUCCESS} Lembrete Configurado`)
      .setDescription(`Você receberá um lembrete em ${segundos} segundos`)
      .addFields({
        name: '📝 Texto',
        value: texto,
      });

    await interaction.reply({ embeds: [embed] });

    // Configurar lembrete
    setTimeout(() => {
      const lembreteEmbed = new EmbedBuilder()
        .setColor(COLORS.WARNING)
        .setTitle('⏰ Seu Lembrete!')
        .setDescription(texto)
        .setTimestamp();

      try {
        interaction.user.send({ embeds: [lembreteEmbed] }).catch(() => {});
      } catch (e) {
        logger.warn('Não foi possível enviar lembrete via DM');
      }
    }, segundos * 1000);

    logger.info(`Lembrete: ${interaction.user.username} configurou lembrete`);
  } catch (error) {
    logger.error('Erro no comando lembrete:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao configurar lembrete`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
