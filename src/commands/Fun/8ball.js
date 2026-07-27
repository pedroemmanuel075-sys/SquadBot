import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const respostas = [
  'Sim, com certeza! 🎉',
  'Não, nem um pouco 😂',
  'Talvez, quem sabe? 🤷',
  'Claro que sim! ✨',
  'De jeito nenhum! 💀',
  'Provavelmente 🤔',
  'É improvável 😅',
  'Absolutamente! 🔥',
  'Nem pensar! 🚫',
  'Sei lá, depende 🎲',
  'Com certeza não! ❌',
  'Pode crer! 👍',
  'Tá doido? 🤪',
  'A resposta é yes! ✅',
  'Skill issue detectado 💀',
];

const data = new SlashCommandBuilder()
  .setName('8ball')
  .setDescription('🎱 A bola de cristal resolve suas dúvidas')
  .addStringOption((option) =>
    option
      .setName('pergunta')
      .setDescription('Sua pergunta para a bola mágica')
      .setRequired(true)
  )
  .setNameLocalizations({
    'pt-BR': '8ball',
  })
  .setDescriptionLocalizations({
    'pt-BR': '🎱 A bola de cristal resolve suas dúvidas',
  });

async function execute(interaction) {
  try {
    const pergunta = interaction.options.getString('pergunta');
    const resposta = respostas[Math.floor(Math.random() * respostas.length)];

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle('🎱 Bola de Cristal')
      .addFields(
        {
          name: '❓ Pergunta',
          value: pergunta,
          inline: false,
        },
        {
          name: '🎱 Resposta',
          value: resposta,
          inline: false,
        }
      )
      .setThumbnail(interaction.client.user.displayAvatarURL());

    await interaction.reply({ embeds: [embed] });
    logger.info(`8Ball: ${interaction.user.username} fez uma pergunta`);
  } catch (error) {
    logger.error('Erro no comando 8ball:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao consultar a bola mágica`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
