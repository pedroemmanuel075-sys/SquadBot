import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('beijar')
  .setDescription('💋 Dar um beijo em alguém')
  .addUserOption((option) =>
    option.setName('usuario').setDescription('Usuário para beijar').setRequired(true)
  )
  .setNameLocalizations({
    'pt-BR': 'beijar',
  })
  .setDescriptionLocalizations({
    'pt-BR': '💋 Dar um beijo em alguém',
  });

async function execute(interaction) {
  try {
    const targetUser = interaction.options.getUser('usuario');

    if (targetUser.id === interaction.user.id) {
      return await interaction.reply({
        content: `${EMOJIS.THINKING} Um beijo em si mesmo? Narciso... 😏`,
        ephemeral: true,
      });
    }

    if (targetUser.bot) {
      return await interaction.reply({
        content: `${EMOJIS.THINKING} Beijar um bot? Que estranho... 🤖`,
        ephemeral: true,
      });
    }

    const beijos = [
      `${interaction.user.username} deu um beijo em ${targetUser.username} 💋`,
      `Que romantismo! ${interaction.user.username} beijou ${targetUser.username} 😘`,
      `${interaction.user.username} e ${targetUser.username} se beijaram 💕`,
      `Ah que fofo! ${interaction.user.username} beijou ${targetUser.username} no rosto 😊`,
      `Um beijo carinhoso de ${interaction.user.username} para ${targetUser.username} 💋`,
    ];

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle('💋 Beijo Squadrife')
      .setDescription(beijos[Math.floor(Math.random() * beijos.length)])
      .setThumbnail(targetUser.displayAvatarURL())
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed] });
    logger.info(`Beijar: ${interaction.user.username} beijou ${targetUser.username}`);
  } catch (error) {
    logger.error('Erro no comando beijar:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao dar beijo`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
