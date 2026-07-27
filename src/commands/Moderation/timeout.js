import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('timeout')
  .setDescription('⏱️ Silenciar um usuário temporariamente')
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
  .addUserOption((option) =>
    option
      .setName('usuario')
      .setDescription('Usuário para silenciar')
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option
      .setName('tempo')
      .setDescription('Tempo em minutos')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName('motivo')
      .setDescription('Motivo do timeout')
      .setRequired(false)
  )
  .setNameLocalizations({
    'pt-BR': 'timeout',
  })
  .setDescriptionLocalizations({
    'pt-BR': '⏱️ Silenciar um usuário temporariamente',
  });

async function execute(interaction) {
  try {
    const targetUser = interaction.options.getUser('usuario');
    const minutes = interaction.options.getInteger('tempo');
    const reason = interaction.options.getString('motivo') || 'Sem motivo especificado';

    if (minutes < 1 || minutes > 40320) {
      return await interaction.reply({
        content: `${EMOJIS.ERROR} O tempo deve ser entre 1 e 40320 minutos (28 dias)!`,
        ephemeral: true,
      });
    }

    if (targetUser.id === interaction.user.id) {
      return await interaction.reply({
        content: `${EMOJIS.ERROR} Você não pode silenciar a si mesmo!`,
        ephemeral: true,
      });
    }

    if (targetUser.bot) {
      return await interaction.reply({
        content: `${EMOJIS.ERROR} Você não pode silenciar bots!`,
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
      await member.timeout(minutes * 60 * 1000, reason);
    } catch (error) {
      return await interaction.reply({
        content: `${EMOJIS.ERROR} Não tenho permissão para silenciar esse usuário!`,
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setColor(COLORS.SUCCESS)
      .setTitle(`${EMOJIS.SUCCESS} Usuário Silenciado`)
      .setThumbnail(targetUser.displayAvatarURL())
      .addFields(
        {
          name: '👤 Usuário',
          value: targetUser.username,
          inline: true,
        },
        {
          name: '⏰ Duração',
          value: `${minutes} minutos`,
          inline: true,
        },
        {
          name: '📋 Motivo',
          value: reason,
          inline: false,
        }
      )
      .setFooter({
        text: `Silenciado por ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed] });
    logger.info(`Timeout: ${targetUser.username} foi silenciado por ${minutes}min`);
  } catch (error) {
    logger.error('Erro no comando timeout:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao silenciar usuário`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
