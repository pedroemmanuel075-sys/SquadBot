// Constantes do Bot
export const RESPONSES = {
  // Respostas de Sucesso
  SUCCESS_TITLES: {
    ban: '🔨 Usuario Banido',
    kick: '👢 Usuario Expulso',
    timeout: '⏱️ Silenciado',
    warn: '⚠️ Advertência',
    mute: '🔇 Mutado',
    clear: '🗑️ Mensagens Limpas',
  },
  
  // Mensagens de Sucesso Brasileiras
  SUCCESS_MESSAGES: [
    'KKKKKK',
    'Lá ele 😂',
    'Recebaaa',
    'Skill issue',
    'Bora jogar?',
    'Nem o Caramelo acreditou nessa.',
    'Absolute Cinema.',
    'F no chat.',
    'Tá de sacanagem.',
    'Morreu no obby?',
    'Foi comprar Robux?',
    'Calma emocionado kkkkk.',
    'O Squadrife tá on!',
    'Quem perder hoje paga o lanche 😂',
    'Aqui a zoeira vem antes do GG.',
  ],
  
  // Erros
  ERRORS: {
    NO_PERMISSION: '❌ Você não tem permissão para usar esse comando!',
    BOT_NO_PERMISSION: '❌ Não tenho permissão para fazer isso!',
    USER_NOT_FOUND: '❌ Usuário não encontrado!',
    NO_ARGS: '❌ Argumentos inválidos!',
    COOLDOWN: '⏱️ Espere {time}s antes de usar esse comando novamente!',
    DATABASE_ERROR: '❌ Erro ao acessar o banco de dados!',
    INVALID_INPUT: '❌ Entrada inválida!',
  },

  // Welcome Messages
  WELCOME_MESSAGE: '🎉 Seja muito bem-vindo ao Squadrife!\n\nAqui a gente joga Roblox, faz live, ri de tudo e cria boas lembranças.\n\nPegue seus cargos, leia as regras e bora fazer parte da bagunça! 😂',
  
  // Goodbye Message
  GOODBYE_MESSAGE: '😔 Foi comprar Robux?\n\nValeu por fazer parte da comunidade.\n\nAs portas estarão abertas caso queira voltar.',
};

// Emojis customizados
export const EMOJIS = {
  SUCCESS: '✅',
  ERROR: '❌',
  WARNING: '⚠️',
  INFO: 'ℹ️',
  COIN: '💰',
  XP: '⭐',
  RANK: '🏆',
  BADGE: '🎖️',
  LOVE: '❤️',
  FIRE: '🔥',
  SKULL: '💀',
  THINKING: '🤔',
};

// Cores do Embed
export const COLORS = {
  PRIMARY: 0x5865F2,      // Azul Discord
  SUCCESS: 0x57F287,      // Verde
  ERROR: 0xED4245,        // Vermelho
  WARNING: 0xFAA61A,      // Laranja
  INFO: 0x00B0F4,         // Azul claro
  DARK: 0x202225,         // Cinza escuro
};

// Configuração de Economia
export const ECONOMY = {
  DAILY_AMOUNT: 500,
  WEEKLY_AMOUNT: 3000,
  MONTHLY_AMOUNT: 10000,
  WORK_REWARD: { min: 100, max: 500 },
  CRIME_REWARD: { min: 500, max: 2000 },
  CRIME_FAIL_CHANCE: 0.5,
  BEG_REWARD: { min: 50, max: 200 },
  MAX_DAILY: 1,
  MAX_WEEKLY: 1,
  MAX_MONTHLY: 1,
};

// Configuração de XP
export const XP_CONFIG = {
  PER_MESSAGE: 10,
  MAX_XP_PER_MESSAGE: 100,
  LEVEL_MULTIPLIER: 100,
  COOLDOWN_MS: 5000,
};

// Configuração de Tickets
export const TICKET_CONFIG = {
  CATEGORY_ID: 'ticket_category',
  SUPPORT_ROLE_ID: 'support_role',
  ARCHIVE_AFTER: 600000, // 10 minutos
};

export default {
  RESPONSES,
  EMOJIS,
  COLORS,
  ECONOMY,
  XP_CONFIG,
  TICKET_CONFIG,
};
