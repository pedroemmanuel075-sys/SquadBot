import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('dado')
  .setDescription('🎲 Lance um dado')
  .addIntegerOption((option) =>
    option
      .setName('lados')
      .setDescription('Número de lados do dado')
      .setRequired(false)
      .setMinValue(2)
      .setMaxValue(100)
  )
  .setNameLocalizations({
    'pt-BR': 'dado',
  })
  .setDescriptionLocalizations({
    'pt-BR': '🎲 Lance um dado',
  });

async function execute(interaction) {
  try {
    const lados = interaction.options.getInteger('lados') || 6;
    const resultado = Math.floor(Math.random() * lados) + 1;

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle('🎲 Resultado do Dado')
      .addFields(
        {
          name: 'Lados',
          value: `${lados}`,
          inline: true,
        },
        {
          name: 'Resultado',
          value: `🎯 **${resultado}**`,
          inline: true,
        }
      );

    await interaction.reply({ embeds: [embed] });
    logger.info(`Dado: ${interaction.user.username} lançou um dado`);
  } catch (error) {
    logger.error('Erro no comando dado:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao lançar dado`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
