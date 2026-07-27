import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const roasts = [
  'Seu nível de Roblox é tipo seu nível na vida: iniciante 😂',
  'Você caiu do obby? Não, você NÃO desceu do obby... caiu do mapa inteiro!',
  'Seu PC é tão fraco que o Roblox roda em 2D',
  'Você joga como se tivesse os dedos com lag',
  'Tá parecendo que você tá jogando com os pés',
  'Seu Robux deve estar tão baixo que fica negativo',
  'Você é tão ruim que o jogo pediu dificuldade fácil para você',
  'Seu ping deve ser tão alto que você vê mensagens do ano que vem',
  'Você morre tanto que o jogo virou um simulador de funerais',
  'Skill issue transcendental detectado 💀',
  'Você não é ruim... você é LENDÁRIO de ruim!',
  'Seu jogo é tão fraco que a placa de vídeo pediu demissão',
  'Você joga como se tivesse 3 mãos e ainda assim perde',
  'Recomendo mudar para singleplayer... você da lag pra você mesmo',
  'Você é tão lento que a tartaruga venceu sua race',
];

const data = new SlashCommandBuilder()
  .setName('roast')
  .setDescription('🔥 Receba um roast engraçado')
  .addUserOption((option) =>
    option.setName('usuario').setDescription('Usuário para roastear').setRequired(false)
  )
  .setNameLocalizations({
    'pt-BR': 'roast',
  })
  .setDescriptionLocalizations({
    'pt-BR': '🔥 Receba um roast engraçado',
  });

async function execute(interaction) {
  try {
    const targetUser = interaction.options.getUser('usuario') || interaction.user;
    const roast = roasts[Math.floor(Math.random() * roasts.length)];

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle('🔥 Roast Squadrife')
      .setDescription(roast)
      .setThumbnail(targetUser.displayAvatarURL())
      .setFooter({
        text: targetUser.username,
        iconURL: targetUser.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed] });
    logger.info(`Roast: ${interaction.user.username} pediu um roast`);
  } catch (error) {
    logger.error('Erro no comando roast:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao gerar roast`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
