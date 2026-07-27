import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('avatar')
  .setDescription('🖼️ Ver avatar de um usuário')
  .addUserOption((option) =>
    option.setName('usuario').setDescription('Usuário para ver avatar').setRequired(false)
  )
  .setNameLocalizations({
    'pt-BR': 'avatar',
  })
  .setDescriptionLocalizations({
    'pt-BR': '🖼️ Ver avatar de um usuário',
  });

async function execute(interaction) {
  try {
    const targetUser = interaction.options.getUser('usuario') || interaction.user;
    const avatarURL = targetUser.displayAvatarURL({ size: 1024 });

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle(`🖼️ Avatar de ${targetUser.username}`)
      .setImage(avatarURL)
      .setURL(avatarURL)
      .setFooter({
        text: `Clique no título para ver em tamanho grande`,
      });

    await interaction.reply({ embeds: [embed] });
    logger.info(`Avatar: ${interaction.user.username} viu avatar`);
  } catch (error) {
    logger.error('Erro no comando avatar:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao buscar avatar`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
