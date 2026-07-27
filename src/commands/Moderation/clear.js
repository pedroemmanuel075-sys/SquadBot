import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('clear')
  .setDescription('🗑️ Deletar mensagens do canal')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
  .addIntegerOption((option) =>
    option
      .setName('quantidade')
      .setDescription('Quantidade de mensagens')
      .setRequired(true)
  )
  .setNameLocalizations({
    'pt-BR': 'clear',
  })
  .setDescriptionLocalizations({
    'pt-BR': '🗑️ Deletar mensagens do canal',
  });

async function execute(interaction) {
  try {
    const amount = interaction.options.getInteger('quantidade');

    if (amount < 1 || amount > 100) {
      return await interaction.reply({
        content: `${EMOJIS.ERROR} A quantidade deve ser entre 1 e 100!`,
        ephemeral: true,
      });
    }

    const deleted = await interaction.channel.bulkDelete(amount, true);

    const embed = new EmbedBuilder()
      .setColor(COLORS.SUCCESS)
      .setTitle(`${EMOJIS.SUCCESS} Mensagens Limpas`)
      .setDescription(`**${deleted.size}** mensagens foram deletadas`)
      .setFooter({
        text: `Limpeza feita por ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    const msg = await interaction.reply({ embeds: [embed] });
    setTimeout(() => msg.delete().catch(() => {}), 5000);

    logger.info(`Clear: ${interaction.user.username} limpou ${deleted.size} mensagens`);
  } catch (error) {
    logger.error('Erro no comando clear:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao limpar mensagens`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
