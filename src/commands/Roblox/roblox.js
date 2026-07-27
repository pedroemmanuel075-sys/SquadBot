import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';
import axios from 'axios';

const data = new SlashCommandBuilder()
  .setName('roblox')
  .setDescription('🎮 Comandos de Roblox')
  .addSubcommand((subcommand) =>
    subcommand
      .setName('usuario')
      .setDescription('Buscar informações de um usuário Roblox')
      .addStringOption((option) =>
        option
          .setName('nome')
          .setDescription('Nome de usuário Roblox')
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('avatar')
      .setDescription('Ver avatar de um usuário Roblox')
      .addStringOption((option) =>
        option
          .setName('nome')
          .setDescription('Nome de usuário Roblox')
          .setRequired(true)
      )
  )
  .setNameLocalizations({
    'pt-BR': 'roblox',
  })
  .setDescriptionLocalizations({
    'pt-BR': '🎮 Comandos de Roblox',
  });

async function execute(interaction) {
  try {
    const subcommand = interaction.options.getSubcommand();
    const username = interaction.options.getString('nome');

    if (subcommand === 'usuario') {
      try {
        // Aqui você integraria com a API Noblox.js ou Roblox API
        const embed = new EmbedBuilder()
          .setColor(COLORS.PRIMARY)
          .setTitle(`🎮 Usuário Roblox: ${username}`)
          .setDescription('Integração com API Roblox em desenvolvimento')
          .addFields(
            {
              name: 'Nome',
              value: username,
              inline: true,
            },
            {
              name: 'Status',
              value: 'Online',
              inline: true,
            }
          );

        await interaction.reply({ embeds: [embed] });
      } catch (error) {
        return await interaction.reply({
          content: `${EMOJIS.ERROR} Usuário Roblox não encontrado!`,
          ephemeral: true,
        });
      }
    } else if (subcommand === 'avatar') {
      const embed = new EmbedBuilder()
        .setColor(COLORS.PRIMARY)
        .setTitle(`🎮 Avatar Roblox: ${username}`)
        .setDescription('Integração com API Roblox em desenvolvimento');

      await interaction.reply({ embeds: [embed] });
    }

    logger.info(`Roblox: ${interaction.user.username} usou comando Roblox`);
  } catch (error) {
    logger.error('Erro no comando roblox:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao processar comando Roblox`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
