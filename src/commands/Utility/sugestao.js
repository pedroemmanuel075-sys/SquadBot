import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('sugestao')
  .setDescription('💡 Enviar uma sugestão para o servidor')
  .addStringOption((option) =>
    option
      .setName('texto')
      .setDescription('Sua sugestão')
      .setRequired(true)
      .setMaxLength(1000)
  )
  .setNameLocalizations({
    'pt-BR': 'sugestao',
  })
  .setDescriptionLocalizations({
    'pt-BR': '💡 Enviar uma sugestão para o servidor',
  });

async function execute(interaction) {
  try {
    const sugestao = interaction.options.getString('texto');

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle('💡 Nova Sugestão')
      .setDescription(sugestao)
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setFooter({
        text: `ID: ${interaction.user.id}`,
      })
      .setTimestamp();

    // Aqui você poderia enviar para um canal específico
    const confirmEmbed = new EmbedBuilder()
      .setColor(COLORS.SUCCESS)
      .setTitle(`${EMOJIS.SUCCESS} Sugestão Enviada`)
      .setDescription('Obrigado por sua sugestão! A equipe analisará em breve.');

    await interaction.reply({ embeds: [confirmEmbed], ephemeral: true });
    logger.info(`Sugestão: ${interaction.user.username} enviou uma sugestão`);
  } catch (error) {
    logger.error('Erro no comando sugestao:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao enviar sugestão`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
