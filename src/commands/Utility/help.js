import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { EMOJIS, COLORS } from '../../config/constants.js';
import logger from '../../utils/logger.js';

const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('❓ Ver lista de comandos')
  .addStringOption((option) =>
    option
      .setName('categoria')
      .setDescription('Categoria de comandos')
      .setRequired(false)
      .addChoices(
        { name: 'Economia', value: 'economia' },
        { name: 'Diversão', value: 'diversao' },
        { name: 'Moderação', value: 'moderacao' },
        { name: 'Admin', value: 'admin' },
        { name: 'XP', value: 'xp' },
        { name: 'Utility', value: 'utility' },
        { name: 'Roblox', value: 'roblox' }
      )
  )
  .setNameLocalizations({
    'pt-BR': 'help',
  })
  .setDescriptionLocalizations({
    'pt-BR': '❓ Ver lista de comandos',
  });

async function execute(interaction) {
  try {
    const categoria = interaction.options.getString('categoria');

    const categories = {
      economia: {
        title: '💰 Comandos de Economia',
        commands: [
          '`/daily` - Ganhe moedas diárias',
          '`/work` - Trabalhe e ganhe moedas',
          '`/crime` - Tente um crime (arriscado)',
          '`/beg` - Peça moedas',
          '`/balance` - Ver seu saldo',
          '`/pay` - Transferir moedas',
          '`/leaderboard` - Ranking de moedas',
        ],
      },
      diversao: {
        title: '🎮 Comandos de Diversão',
        commands: [
          '`/giria` - Gíria aleatória',
          '`/roast` - Receba um roast',
          '`/cantada` - Cantada engra​çada',
          '`/8ball` - Bola mágica',
          '`/coinflip` - Cara ou coroa',
          '`/desafio` - Receba um desafio',
          '`/quiz` - Participe de um quiz',
          '`/ship` - Veja compatibilidade',
          '`/abracar` - Dar um abraço',
          '`/beijar` - Dar um beijo',
          '`/giveaway` - Criar sorteios',
        ],
      },
      moderacao: {
        title: '⚔️ Comandos de Moderação',
        commands: [
          '`/ban` - Banir usuário',
          '`/kick` - Expulsar usuário',
          '`/timeout` - Silenciar usuário',
          '`/warn` - Avisar usuário',
          '`/clear` - Limpar mensagens',
        ],
      },
      admin: {
        title: '👨‍💼 Comandos Admin',
        commands: [
          '`/userinfo` - Info de usuário',
          '`/serverinfo` - Info do servidor',
          '`/botinfo` - Info do bot',
          '`/ticket` - Sistema de tickets',
        ],
      },
      xp: {
        title: '⭐ Comandos de XP',
        commands: [
          '`/profile` - Ver seu perfil',
          '`/rank` - Ranking de níveis',
        ],
      },
      utility: {
        title: '🛠️ Comandos Utility',
        commands: [
          '`/ping` - Verificar latência',
          '`/avatar` - Ver avatar',
          '`/sugestao` - Enviar sugestão',
        ],
      },
      roblox: {
        title: '🎮 Comandos Roblox',
        commands: [
          '`/roblox usuario` - Info de usuário',
          '`/roblox avatar` - Ver avatar Roblox',
        ],
      },
    };

    if (categoria && categories[categoria]) {
      const cat = categories[categoria];
      const embed = new EmbedBuilder()
        .setColor(COLORS.PRIMARY)
        .setTitle(cat.title)
        .setDescription(cat.commands.join('\n'))
        .setThumbnail(interaction.client.user.displayAvatarURL())
        .setFooter({
          text: `Use /help <categoria> para mais detalhes`,
        });

      return await interaction.reply({ embeds: [embed] });
    }

    // Help geral
    const embed = new EmbedBuilder()
      .setColor(COLORS.PRIMARY)
      .setTitle('❓ Ajuda - Squadrife Bot')
      .setDescription('Escolha uma categoria para ver os comandos')
      .addFields(
        {
          name: '💰 Economia',
          value: 'Comandos de moedas e economia',
          inline: true,
        },
        {
          name: '🎮 Diversão',
          value: 'Comandos para se divertir',
          inline: true,
        },
        {
          name: '⚔️ Moderação',
          value: 'Comandos de moderação',
          inline: true,
        },
        {
          name: '👨‍💼 Admin',
          value: 'Comandos administrativos',
          inline: true,
        },
        {
          name: '⭐ XP',
          value: 'Comandos de experiência',
          inline: true,
        },
        {
          name: '🛠️ Utility',
          value: 'Comandos úteis',
          inline: true,
        }
      )
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setFooter({
        text: 'Use /help <categoria> para ver detalhes de cada categoria',
      });

    await interaction.reply({ embeds: [embed] });
    logger.info(`Help: ${interaction.user.username} usou o comando help`);
  } catch (error) {
    logger.error('Erro no comando help:', error);
    await interaction.reply({
      content: `${EMOJIS.ERROR} Erro ao buscar ajuda`,
      ephemeral: true,
    });
  }
}

export default { data, execute };
