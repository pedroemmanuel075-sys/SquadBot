import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('ticket')
  .setDescription('🎫 Sistema de Tickets')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
  .addSubcommand((subcommand) =>
    subcommand
      .setName('criar')
      .setDescription('Criar painel de tickets')
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('fechar')
      .setDescription('Fechar um ticket')
  )
  .setNameLocalizations({
    'pt-BR': 'ticket',
  })
  .setDescriptionLocalizations({
    'pt-BR': '🎫 Sistema de Tickets',
  });

async function execute(interaction) {
  try {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'criar') {
      const embed = new EmbedBuilder()
        .setColor(COLORS.PRIMARY)
        .setTitle('🎫 Sistema de Tickets')
        .setDescription('Clique no botão abaixo para abrir um ticket')
        .setFooter({
          text: 'Sistema de suporte do Squadrife',
        });

      await interaction.reply({
        embeds: [embed],
      });

      logger.info(`Ticket: ${interaction.user.username} criou painel de tickets`);
    } else if (subcommand === 'fechar') {
      const embed = new EmbedBuilder()
        .setColor(COLORS.SUCCESS)
        .setTitle('🎫 Ticket Fechado')
        .setDescription('Este ticket foi fechado');

      await interaction.reply({ embeds: [embed] });
      logger.info(`Ticket: ${interaction.user.username} fechou um ticket`);
    }
  } catch (error) {
    logger.error('Erro no comando ticket:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao processar ticket`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
