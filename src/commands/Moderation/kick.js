import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('kick')
  .setDescription('👢 Expulsar um usuário do servidor')
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
  .addUserOption((option) =>
    option
      .setName('usuario')
      .setDescription('Usuário para expulsar')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName('motivo')
      .setDescription('Motivo do kick')
      .setRequired(false)
  )
  .setNameLocalizations({
    'pt-BR': 'kick',
  })
  .setDescriptionLocalizations({
    'pt-BR': '👢 Expulsar um usuário do servidor',
  });

async function execute(interaction) {
  try {
    const targetUser = interaction.options.getUser('usuario');
    const reason = interaction.options.getString('motivo') || 'Sem motivo especificado';

    if (targetUser.id === interaction.user.id) {
      return await interaction.reply({
        content: `${EMOJIS.ERROR} Você não pode expulsar a si mesmo!`,
        ephemeral: true,
      });
    }

    if (targetUser.bot) {
      return await interaction.reply({
        content: `${EMOJIS.ERROR} Você não pode expulsar bots!`,
        ephemeral: true,
      });
    }

    const member = await interaction.guild.members.fetch(targetUser.id).catch(() => null);
    if (!member) {
      return await interaction.reply({
        content: `${EMOJIS.ERROR} Usuário não encontrado no servidor!`,
        ephemeral: true,
      });
    }

    try {
      await member.kick(reason);
    } catch (error) {
      return await interaction.reply({
        content: `${EMOJIS.ERROR} Não tenho permissão para expulsar esse usuário!`,
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setColor(COLORS.SUCCESS)
      .setTitle(`${EMOJIS.SUCCESS} Usuário Expulso`)
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
        text: `Expulso por ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed] });
    logger.info(`Kick: ${targetUser.username} foi expulso por ${interaction.user.username}`);
  } catch (error) {
    logger.error('Erro no comando kick:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao expulsar usuário`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
