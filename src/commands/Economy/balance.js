import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import { getQuery } from '../../database/init.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('balance')
  .setDescription('💰 Ver seu saldo ou de outro usuário')
  .addUserOption((option) =>
    option.setName('usuario').setDescription('Usuário para verificar').setRequired(false)
  )
  .setNameLocalizations({
    'pt-BR': 'balance',
  })
  .setDescriptionLocalizations({
    'pt-BR': '💰 Ver seu saldo ou de outro usuário',
  });

async function execute(interaction) {
  try {
    const targetUser = interaction.options.getUser('usuario') || interaction.user;
    const guildId = interaction.guildId;

    const economy = await getQuery(
      'SELECT * FROM economy WHERE user_id = ? AND guild_id = ?',
      [targetUser.id, guildId]
    );

    const balance = economy?.balance || 0;
    const bank = economy?.bank || 0;
    const total = balance + bank;

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle(`${EMOJIS.COIN} Cartão Bancario`)
      .setThumbnail(targetUser.displayAvatarURL())
      .addFields(
        {
          name: '💵 Bolso',
          value: `**${balance}** ${EMOJIS.COIN}`,
          inline: true,
        },
        {
          name: '📛 Banco',
          value: `**${bank}** ${EMOJIS.COIN}`,
          inline: true,
        },
        {
          name: '💸 Total',
          value: `**${total}** ${EMOJIS.COIN}`,
          inline: false,
        }
      )
      .setFooter({
        text: targetUser.username,
        iconURL: targetUser.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed] });
    logger.info(`Balance: ${interaction.user.username} verificou saldo`);
  } catch (error) {
    logger.error('Erro no comando balance:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao verificar saldo`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
