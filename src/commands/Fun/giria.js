import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const girias = [
  'Bora jogar?',
  'Skill issue',
  'Lá ele',
  'Recebaaa',
  'Nem o Caramelo acreditou',
  'Absolute Cinema',
  'F no chat',
  'Tá de sacanagem',
  'Calma emocionado',
  'Morreu no obby?',
  'Foi comprar Robux?',
  'Tá emocionado?',
  'Só falta você cair do obby',
  'Qual é o seu game?',
  'Vem fazer challenge?',
  'Esse maluco caiu de novo',
  'Larga a vida de gamer',
  'Vem de voz',
  'Rodou o Roblox?',
  'A skin não dá skill',
  'Peguei sua skin',
  'Você é o Caramelo?',
  'Sei lá cara',
  'Manda fruta',
  'Que zoeira',
  'Vai jogar?',
  'Quer uma ajudinha?',
  'Seu Robux sumiu',
  'Morreu no tutorial?',
  'Desbloqueou novo medo',
  'Você venceu, meu parabéns',
  'Que tipo de desafio é esse?',
  'Tá de meme?',
  'Pior que imaginei',
  'Sério mesmo?',
  'Sem graça demais',
  'Que fail',
  'Que plot twist',
  'Você ouviu errado',
  'Isso é cinemática',
  'Você jogou bonito',
  'Que cena',
  'Vou fingir que não ouvi',
  'Você está em outro jogo',
  'Tecnicamente verdade',
  'Boa tentativa',
  'Melhor sorte na próxima',
];

const data = new SlashCommandBuilder()
  .setName('giria')
  .setDescription('😂 Receba uma gíria aleatória da Squadrife')
  .setNameLocalizations({
    'pt-BR': 'giria',
  })
  .setDescriptionLocalizations({
    'pt-BR': '😂 Receba uma gíria aleatória da Squadrife',
  });

async function execute(interaction) {
  try {
    const giria = girias[Math.floor(Math.random() * girias.length)];

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle('😂 Gíria Squadrife')
      .setDescription(`**${giria}**`)
      .setThumbnail(interaction.client.user.displayAvatarURL());

    await interaction.reply({ embeds: [embed] });
    logger.info(`Giria: ${interaction.user.username} pediu uma gíria`);
  } catch (error) {
    logger.error('Erro no comando giria:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao buscar gíria`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
