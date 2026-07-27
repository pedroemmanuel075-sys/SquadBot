import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS, ECONOMY } from '../../config/constants.js';
import { getQuery, runQuery } from '../../database/init.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('daily')
  .setDescription('🎁 Receba suas moedas diárias')
  .setNameLocalizations({
    'pt-BR': 'daily',
  })
  .setDescriptionLocalizations({
    'pt-BR': '🎁 Receba suas moedas diárias',
  });

async function execute(interaction) {
  try {
    const userId = interaction.user.id;
    const guildId = interaction.guildId;
    const amount = ECONOMY.DAILY_AMOUNT;

    // Verificar se já pegou daily hoje
    const economy = await getQuery(
      'SELECT * FROM economy WHERE user_id = ? AND guild_id = ?',
      [userId, guildId]
    );

    const now = new Date();
    const lastDaily = economy?.last_daily ? new Date(economy.last_daily) : null;
    const canClaim = !lastDaily || (now - lastDaily) > 24 * 60 * 60 * 1000;

    if (!canClaim) {
      const nextDaily = new Date(lastDaily.getTime() + 24 * 60 * 60 * 1000);
      const hoursLeft = Math.ceil((nextDaily - now) / (60 * 60 * 1000));

      const embed = new EmbedBuilder()
        .setColor(COLORS.WARNING)
        .setTitle(`${EMOJIS.WARNING} Já pegou hoje!`)
        .setDescription(`Volte em ${hoursLeft}h para pegar de novo`);

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    // Buscar ou criar economia do usuário
    if (!economy) {
      await runQuery(
        `INSERT INTO economy (id, user_id, guild_id, balance, last_daily)
         VALUES (?, ?, ?, ?, ?)`,
        [`${userId}_${guildId}`, userId, guildId, amount, now.toISOString()]
      );
    } else {
      await runQuery(
        `UPDATE economy SET balance = balance + ?, last_daily = ? WHERE user_id = ? AND guild_id = ?`,
        [amount, now.toISOString(), userId, guildId]
      );
    }

    const embed = new EmbedBuilder()
      .setColor(COLORS.SUCCESS)
      .setTitle(`${EMOJIS.SUCCESS} Daily Recebido!`)
      .setDescription(`Você ganhou **${amount}** ${EMOJIS.COIN}`)
      .setThumbnail(interaction.user.displayAvatarURL())
      .addFields({
        name: '🌟 Próximo daily',
        value: `em 24 horas`,
      });

    await interaction.reply({ embeds: [embed] });
    logger.info(`Daily: ${interaction.user.username} pegou daily`);
  } catch (error) {
    logger.error('Erro no comando daily:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao processar seu daily`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
