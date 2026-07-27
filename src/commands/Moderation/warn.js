import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import { getQuery, runQuery } from '../../database/init.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('warn')
  .setDescription('⚠️ Avisar um usuário')
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
  .addUserOption((option) =>
    option
      .setName('usuario')
      .setDescription('Usuário para avisar')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName('motivo')
      .setDescription('Motivo do aviso')
      .setRequired(false)
  )
  .setNameLocalizations({
    'pt-BR': 'warn',
  })
  .setDescriptionLocalizations({
    'pt-BR': '⚠️ Avisar um usuário',
  });

async function execute(interaction) {
  try {
    const targetUser = interaction.options.getUser('usuario');
    const reason = interaction.options.getString('motivo') || 'Sem motivo especificado';
    const guildId = interaction.guildId;

    if (targetUser.id === interaction.user.id) {
      return await interaction.reply({
        content: `${EMOJIS.ERROR} Você não pode avisar a si mesmo!`,
        ephemeral: true,
      });
    }

    if (targetUser.bot) {
      return await interaction.reply({
        content: `${EMOJIS.ERROR} Você não pode avisar bots!`,
        ephemeral: true,
      });
    }

    // Buscar avisos anteriores
    const warns = await new Promise((resolve, reject) => {
      interaction.client.db.all(
        'SELECT * FROM warns WHERE user_id = ? AND guild_id = ?',
        [targetUser.id, guildId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows || []);
        }
      );
    });

    const newWarnCount = warns.length + 1;

    // Adicionar novo warn
    await runQuery(
      `INSERT INTO warns (guild_id, user_id, mod_id, reason)
       VALUES (?, ?, ?, ?)`,
      [guildId, targetUser.id, interaction.user.id, reason]
    );

    const embed = new EmbedBuilder()
      .setColor(COLORS.WARNING)
      .setTitle(`${EMOJIS.WARNING} Usuário Avisado`)
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
        },
        {
          name: '📊 Total de Avisos',
          value: `${newWarnCount}`,
          inline: true,
        }
      )
      .setFooter({
        text: `Avisado por ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    // Ações automáticas
    if (newWarnCount === 3) {
      try {
        await targetUser.send({
          embeds: [
            new EmbedBuilder()
              .setColor(COLORS.ERROR)
              .setTitle('⚠️ Último Aviso')
              .setDescription(
                'Você recebeu seu terceiro aviso no servidor. Na próxima violáção será banido!'
              ),
          ],
        });
      } catch (e) {
        logger.warn('Não foi possível enviar DM para o usuário');
      }
    } else if (newWarnCount >= 4) {
      try {
        const member = await interaction.guild.members.fetch(targetUser.id);
        await member.ban({ reason: 'Excedeu limite de avisos' });
        embed.setTitle(`${EMOJIS.SUCCESS} Usuário Banido`)
          .setDescription('Usuário foi automaticamente banido por exceder limite de avisos')
          .setColor(COLORS.SUCCESS);
      } catch (e) {
        logger.error('Erro ao banir usuário automaticamente:', e);
      }
    }

    await interaction.reply({ embeds: [embed] });
    logger.info(`Warn: ${targetUser.username} foi avisado por ${interaction.user.username}`);
  } catch (error) {
    logger.error('Erro no comando warn:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao avisar usuário`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
