import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('roleinfo')
  .setDescription('👥 Ver informações de um cargo')
  .addRoleOption((option) =>
    option.setName('cargo').setDescription('Cargo para verificar').setRequired(true)
  )
  .setNameLocalizations({
    'pt-BR': 'roleinfo',
  })
  .setDescriptionLocalizations({
    'pt-BR': '👥 Ver informações de um cargo',
  });

async function execute(interaction) {
  try {
    const role = interaction.options.getRole('cargo');

    const embed = new EmbedBuilder()
      .setColor(role.color || COLORS.PRIMARY)
      .setTitle(`👥 Informações de ${role.name}`)
      .addFields(
        {
          name: '🆔 ID',
          value: role.id,
          inline: true,
        },
        {
          name: '👥 Membros',
          value: `${role.members.size}`,
          inline: true,
        },
        {
          name: '📍 Posição',
          value: `${role.position}`,
          inline: true,
        },
        {
          name: '🎨 Cor',
          value: role.color ? `#${role.color.toString(16).toUpperCase().padStart(6, '0')}` : 'Padrão',
          inline: true,
        },
        {
          name: '⭐ Mencionável',
          value: role.mentionable ? 'Sim' : 'Não',
          inline: true,
        },
        {
          name: '🔒 Gerenciado',
          value: role.managed ? 'Sim' : 'Não',
          inline: true,
        }
      );

    await interaction.reply({ embeds: [embed] });
    logger.info(`RoleInfo: ${interaction.user.username} viu info do cargo ${role.name}`);
  } catch (error) {
    logger.error('Erro no comando roleinfo:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao buscar informações do cargo`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
