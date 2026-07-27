import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('ship')
  .setDescription('💕 Veja a compatibilidade entre dois usuários')
  .addUserOption((option) =>
    option
      .setName('usuario1')
      .setDescription('Primeiro usuário')
      .setRequired(true)
  )
  .addUserOption((option) =>
    option
      .setName('usuario2')
      .setDescription('Segundo usuário')
      .setRequired(true)
  )
  .setNameLocalizations({
    'pt-BR': 'ship',
  })
  .setDescriptionLocalizations({
    'pt-BR': '💕 Veja a compatibilidade entre dois usuários',
  });

async function execute(interaction) {
  try {
    const user1 = interaction.options.getUser('usuario1');
    const user2 = interaction.options.getUser('usuario2');

    if (user1.id === user2.id) {
      return await interaction.reply({
        content: `${EMOJIS.THINKING} Narciso? 😏`,
        ephemeral: true,
      });
    }

    // Gerar compatibilidade determinística baseada nos IDs
    const combined = (parseInt(user1.id) + parseInt(user2.id)).toString();
    const percentage = parseInt(combined.slice(-2)) % 101;

    let coracao = '';
    let descricao = '';

    if (percentage < 20) {
      coracao = '❌';
      descricao = 'Sem chance';
    } else if (percentage < 40) {
      coracao = '💔';
      descricao = 'Amigos talvez';
    } else if (percentage < 60) {
      coracao = '💛';
      descricao = 'Pode ser';
    } else if (percentage < 80) {
      coracao = '🧡';
      descricao = 'Bem possível';
    } else {
      coracao = '❤️';
      descricao = 'Ship aprovado!';
    }

    const bar = '█'.repeat(Math.floor(percentage / 10)) + '░'.repeat(10 - Math.floor(percentage / 10));

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle('💕 Ship Squadrife')
      .setDescription(`${user1.username} ${coracao} ${user2.username}`)
      .addFields(
        {
          name: 'Compatibilidade',
          value: `${percentage}%\n${bar}`,
          inline: false,
        },
        {
          name: 'Resultado',
          value: descricao,
          inline: false,
        }
      );

    await interaction.reply({ embeds: [embed] });
    logger.info(`Ship: ${interaction.user.username} fez um ship`);
  } catch (error) {
    logger.error('Erro no comando ship:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao gerar ship`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
