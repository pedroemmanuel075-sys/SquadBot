import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('ban')
  .setDescription('🔨 Banir um usuário do servidor')
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
  .addUserOption((option) =>
    option
      .setName('usuario')
      .setDescription('Usuário para banir')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName('motivo')
      .setDescription('Motivo do ban')
      .setRequired(false)
  )
  .setNameLocalizations({
    'pt-BR': 'ban',
  })
  .setDescriptionLocalizations({
    'pt-BR': '🔨 Banir um usuário do servidor',
  });

async function execute(interaction) {
  try {
    const targetUser = interaction.options.getUser('usuario');
    const reason = interaction.options.getString('motivo') || 'Sem motivo especificado';

    if (targetUser.id === interaction.user.id) {
      return await interaction.reply({
        content: `${EMOJIS.ERROR} Você não pode banir a si mesmo!`,
        ephemeral: true,
      });
    }

    if (targetUser.bot) {
      return await interaction.reply({
        content: `${EMOJIS.ERROR} Você não pode banir bots!`,
        ephemeral: true,
      });
    }

    try {
      await interaction.guild.members.ban(targetUser, { reason });
    } catch (error) {
      return await interaction.reply({
        content: `${EMOJIS.ERROR} Não tenho permissão para banir esse usuário!`,
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setColor(COLORS.SUCCESS)
      .setTitle(`${EMOJIS.SUCCESS} Usuário Banido`)
      .setThumbnail(targetUser.displayAvatarURL())
      .addFields(
        {
          name: '👤 Usuário',
          value: targetUser.username,
          inline: true,
        },
        {
          name: '📋 Motivo',
          value: reason,
          inline: false,
        }
      )
      .setFooter({
        text: `Banido por ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed] });
    logger.info(`Ban: ${targetUser.username} foi banido por ${interaction.user.username}`);
  } catch (error) {
    logger.error('Erro no comando ban:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao banir usuário`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
