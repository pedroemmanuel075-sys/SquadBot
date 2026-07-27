import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const desafios = [
  'Tente ficar 30 minutos sem falar no chat',
  'Faça um meme engraçado do Discord',
  'Convide 5 pessoas para o servidor',
  'Mude seu status do Discord para algo engraçado',
  'Mande uma mensagem estranha no chat',
  'Dance pelo webcam (se tiver)',
  'Faça uma live no Discord',
  'Crie um nome criativo para si mesmo',
  'Faça um desenho e poste no chat',
  'Grite "O Squadrife é top" bem alto',
  'Toque uma música no seu mic',
  'Faça uma imitação engraçada',
  'Conte uma piada ruim',
  'Mude sua foto de perfil',
  'Mande um áudio engraçado',
];

const data = new SlashCommandBuilder()
  .setName('desafio')
  .setDescription('🎯 Receba um desafio aleatório')
  .addUserOption((option) =>
    option.setName('usuario').setDescription('Usuário para desafiar').setRequired(false)
  )
  .setNameLocalizations({
    'pt-BR': 'desafio',
  })
  .setDescriptionLocalizations({
    'pt-BR': '🎯 Receba um desafio aleatório',
  });

async function execute(interaction) {
  try {
    const targetUser = interaction.options.getUser('usuario') || interaction.user;
    const desafio = desafios[Math.floor(Math.random() * desafios.length)];

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle('🎯 Desafio Squadrife')
      .setDescription(`**${desafio}**`)
      .setThumbnail(targetUser.displayAvatarURL())
      .setFooter({
        text: targetUser.username,
        iconURL: targetUser.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed] });
    logger.info(`Desafio: ${interaction.user.username} pediu um desafio`);
  } catch (error) {
    logger.error('Erro no comando desafio:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao gerar desafio`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
