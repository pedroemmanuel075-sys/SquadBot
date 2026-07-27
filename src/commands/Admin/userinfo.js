import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('userinfo')
  .setDescription('📋 Ver informações de um usuário')
  .addUserOption((option) =>
    option.setName('usuario').setDescription('Usuário para verificar').setRequired(false)
  )
  .setNameLocalizations({
    'pt-BR': 'userinfo',
  })
  .setDescriptionLocalizations({
    'pt-BR': '📋 Ver informações de um usuário',
  });

async function execute(interaction) {
  try {
    const targetUser = interaction.options.getUser('usuario') || interaction.user;
    const member = await interaction.guild.members.fetch(targetUser.id);

    const roles = member.roles.cache
      .filter((role) => role.id !== interaction.guild.id)
      .map((role) => role.toString())
      .join(', ') || 'Nenhum cargo';

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle(`📋 Informações de ${targetUser.username}`)
      .setThumbnail(targetUser.displayAvatarURL())
      .addFields(
        {
          name: '🆔 ID',
          value: targetUser.id,
          inline: true,
        },
        {
          name: '📅 Conta criada em',
          value: `<t:${Math.floor(targetUser.createdTimestamp / 1000)}:f>`,
          inline: true,
        },
        {
          name: '🔗 Entrou em',
          value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:f>`,
          inline: true,
        },
        {
          name: '🔓 Bot',
          value: targetUser.bot ? 'Sim' : 'Não',
          inline: true,
        },
        {
          name: '📛 Cargos',
          value: roles,
          inline: false,
        }
      )
      .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL(),
      });

    await interaction.reply({ embeds: [embed] });
    logger.info(`UserInfo: ${interaction.user.username} verificou info de ${targetUser.username}`);
  } catch (error) {
    logger.error('Erro no comando userinfo:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao buscar informações`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
