import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const perguntas = [
  {
    pergunta: 'Qual desses games é melhor?',
    opcoes: ['Roblox', 'Minecraft', 'Fortnite', 'Valorant'],
  },
  {
    pergunta: 'Qual é seu Roblox game favorito?',
    opcoes: ['Adopt Me', 'Blox Fruits', 'Brookhaven', 'Murder Mystery'],
  },
  {
    pergunta: 'Qual é a melhor streaming platform?',
    opcoes: ['Twitch', 'YouTube', 'Facebook Gaming', 'TikTok'],
  },
  {
    pergunta: 'Prefere qual tipo de vídeo?',
    opcoes: ['Gameplay', 'Comédia', 'Reação', 'Tutorial'],
  },
  {
    pergunta: 'Qual é seu gênero favorito?',
    opcoes: ['FPS', 'RPG', 'Survival', 'Puzzle'],
  },
];

const data = new SlashCommandBuilder()
  .setName('quiz')
  .setDescription('❓ Participe de um quiz rápido')
  .setNameLocalizations({
    'pt-BR': 'quiz',
  })
  .setDescriptionLocalizations({
    'pt-BR': '❓ Participe de um quiz rápido',
  });

async function execute(interaction) {
  try {
    const quizData = perguntas[Math.floor(Math.random() * perguntas.length)];

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle('❓ Quiz Squadrife')
      .setDescription(quizData.pergunta)
      .addFields({
        name: 'Opções',
        value: quizData.opcoes.map((op, i) => `${i + 1}. ${op}`).join('\n'),
        inline: false,
      })
      .setThumbnail(interaction.client.user.displayAvatarURL());

    await interaction.reply({ embeds: [embed] });
    logger.info(`Quiz: ${interaction.user.username} fez um quiz`);
  } catch (error) {
    logger.error('Erro no comando quiz:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao gerar quiz`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
