import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('abracar')
  .setDescription('🤗 Dar um abraço em alguém')
  .addUserOption((option) =>
    option.setName('usuario').setDescription('Usuário para abraçar').setRequired(true)
  )
  .setNameLocalizations({
    'pt-BR': 'abracar',
  })
  .setDescriptionLocalizations({
    'pt-BR': '🤗 Dar um abraço em alguém',
  });

async function execute(interaction) {
  try {
    const targetUser = interaction.options.getUser('usuario');

    if (targetUser.id === interaction.user.id) {
      return await interaction.reply({
        content: `${EMOJIS.THINKING} Abraço em si mesmo? Que saudade... 🤗`,
        ephemeral: true,
      });
    }

    const abracos = [
      `${interaction.user.username} deu um abraço quente em ${targetUser.username} 🤗`,
      `${interaction.user.username} abraçou ${targetUser.username} com carinho 💚`,
      `Que abraço gostoso! ${interaction.user.username} deu em ${targetUser.username} 🫂`,
      `${interaction.user.username} e ${targetUser.username} se abraçaram 🤗`,
      `Ah que fofo! ${interaction.user.username} abraçou ${targetUser.username}`,
    ];

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle('🤗 Abraço Squadrife')
      .setDescription(abracos[Math.floor(Math.random() * abracos.length)])
      .setThumbnail(targetUser.displayAvatarURL())
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed] });
    logger.info(`Abracar: ${interaction.user.username} abraçou ${targetUser.username}`);
  } catch (error) {
    logger.error('Erro no comando abracar:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao dar abraço`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
