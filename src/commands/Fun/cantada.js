import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const cantadas = [
  'Você deve ser um Robux, porque você me faz gastar meu tempo',
  'Será que você é do obby? Porque você caiu do meu coração',
  'Você é um meme? Porque você não sai da minha cabeça',
  'Se você fosse um Roblox game, seria viciante',
  'Seus olhos são mais brilhantes que um ouro no Roblox',
  'Você é tipo um pet, porque quero te levar para casa',
  'Se beleza fosse crime, você seria condenado à prisão perpétua',
  'Você é tão incrível que faz o Roblox parecer um jogo de criança',
  'Posso ser seu Robux? Porque quero fazer seus desejos realidade',
  'Você é a razão pela qual acredito em vida extraterrestre... extraterrena lindura!',
  'Se você fosse um item, seria raro e exclusivo',
  'Você brilha mais que qualquer gamepass',
  'Vocês duas juntas fariam o melhor casal do Squadrife',
  'Qual é o seu nome? Porque quero poder escrever em minhas orações',
  'Você é tipo um Easter egg, rara de encontrar mas incrível',
];

const data = new SlashCommandBuilder()
  .setName('cantada')
  .setDescription('😘 Receba uma cantada engraçada')
  .addUserOption((option) =>
    option.setName('usuario').setDescription('Usuário para dar cantada').setRequired(false)
  )
  .setNameLocalizations({
    'pt-BR': 'cantada',
  })
  .setDescriptionLocalizations({
    'pt-BR': '😘 Receba uma cantada engraçada',
  });

async function execute(interaction) {
  try {
    const targetUser = interaction.options.getUser('usuario') || interaction.user;
    const cantada = cantadas[Math.floor(Math.random() * cantadas.length)];

    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle('😘 Cantada Squadrife')
      .setDescription(cantada)
      .setThumbnail(targetUser.displayAvatarURL())
      .setFooter({
        text: targetUser.username,
        iconURL: targetUser.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed] });
    logger.info(`Cantada: ${interaction.user.username} pediu uma cantada`);
  } catch (error) {
    logger.error('Erro no comando cantada:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao gerar cantada`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
