import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('coinflip')
  .setDescription('🪙 Cara ou Coroa?')
  .addStringOption((option) =>
    option
      .setName('escolha')
      .setDescription('Sua escolha')
      .setRequired(true)
      .addChoices(
        { name: 'Cara', value: 'cara' },
        { name: 'Coroa', value: 'coroa' }
      )
  )
  .setNameLocalizations({
    'pt-BR': 'coinflip',
  })
  .setDescriptionLocalizations({
    'pt-BR': '🪙 Cara ou Coroa?',
  });

async function execute(interaction) {
  try {
    const escolha = interaction.options.getString('escolha');
    const resultado = Math.random() < 0.5 ? 'cara' : 'coroa';
    const venceu = escolha === resultado;

    const embed = new EmbedBuilder()
      .setColor(venceu ? COLORS.SUCCESS : COLORS.ERROR)
      .setTitle('🪙 Cara ou Coroa')
      .addFields(
        {
          name: '👤 Sua Escolha',
          value: escolha.charAt(0).toUpperCase() + escolha.slice(1),
          inline: true,
        },
        {
          name: '🎲 Resultado',
          value: resultado.charAt(0).toUpperCase() + resultado.slice(1),
          inline: true,
        },
        {
          name: venceu ? '✅ Você Venceu!' : '❌ Você Perdeu!',
          value: venceu ? 'Parabéns! 🎉' : 'Tenta de novo! 😅',
          inline: false,
        }
      );

    await interaction.reply({ embeds: [embed] });
    logger.info(`Coinflip: ${interaction.user.username} jogou cara ou coroa`);
  } catch (error) {
    logger.error('Erro no comando coinflip:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao jogar cara ou coroa`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
