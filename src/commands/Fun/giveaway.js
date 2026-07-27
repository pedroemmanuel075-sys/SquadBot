import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('giveaway')
  .setDescription('🎁 Sistema de Giveaways')
  .addSubcommand((subcommand) =>
    subcommand
      .setName('criar')
      .setDescription('Criar um novo giveaway')
      .addStringOption((option) =>
        option.setName('premio').setDescription('Prêmio do sorteio').setRequired(true)
      )
      .addIntegerOption((option) =>
        option.setName('minutos').setDescription('Duração em minutos').setRequired(true)
      )
      .addIntegerOption((option) =>
        option.setName('vencedores').setDescription('Número de vencedores').setRequired(false)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('listar')
      .setDescription('Listar giveaways ativos')
  )
  .setNameLocalizations({
    'pt-BR': 'giveaway',
  })
  .setDescriptionLocalizations({
    'pt-BR': '🎁 Sistema de Giveaways',
  });

async function execute(interaction) {
  try {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'criar') {
      const premio = interaction.options.getString('premio');
      const minutos = interaction.options.getInteger('minutos');
      const vencedores = interaction.options.getInteger('vencedores') || 1;

      if (minutos < 1 || minutos > 10080) {
        return await interaction.reply({
          content: `${EMOJIS.ERROR} A duração deve ser entre 1 e 10080 minutos (7 dias)!`,
          ephemeral: true,
        });
      }

      const embed = new EmbedBuilder()
        .setColor(COLORS.PRIMARY)
        .setTitle('🎁 Novo Giveaway!')
        .setDescription(`**Prêmio:** ${premio}\n**Vencedores:** ${vencedores}\n**Duração:** ${minutos} minutos`)
        .setFooter({
          text: `Giveaway criado por ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });

      await interaction.reply({ embeds: [embed] });
      logger.info(`Giveaway: ${interaction.user.username} criou um giveaway - ${premio}`);
    } else if (subcommand === 'listar') {
      const embed = new EmbedBuilder()
        .setColor(COLORS.PRIMARY)
        .setTitle('🎁 Giveaways Ativos')
        .setDescription('Nenhum giveaway ativo no momento');

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  } catch (error) {
    logger.error('Erro no comando giveaway:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao processar giveaway`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
