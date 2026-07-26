import { logger } from '../utils/logger.js';

export const botConfig = {
  // =========================
  // PRESENÇA DO BOT (o status que os cria da live veem)
  // =========================
  // Opções de `status`:
  // - "online"    = bolinha verde da esperança
  // - "idle"      = luazinha amarela de quem foi buscar café
  // - "dnd"       = bolinha vermelha do "não enche o saco, tô em clutch"
  // - "invisible" = modo fantasma pra stalkear o chat
  presence: {
    // Como o bot tá aparecendo no Discord agora.
    status: "online",

    // As mentiras que o bot conta embaixo do nome dele.
    // Mapeamento numérico da API do Discord:
    // 0 = Jogando
    // 1 = Transmitindo (Mandando aquele streamzão)
    // 2 = Ouvindo
    // 3 = Assistindo
    // 4 = Personalizado
    // 5 = Competindo
    activities: [
      {
        name: "Status Maroto", // Requisitado pela API, mas ninguém liga
        state: "Stalkeando o Squadrife na live 👀", // O que a galera realmente vê
        type: 4, // Personalizado
      },
    ],
  },

  // =========================
  // COMPORTAMENTO DOS COMANDOS
  // =========================
  commands: {
    // IDs dos ADMs / Donos do bot (puxados da variável de ambiente OWNER_IDS).
    // Só a elite do Squadrife segura a caneta pesada aqui.
    owners: process.env.OWNER_IDS?.split(",").map((id) => id.trim()).filter(Boolean) || [],

    // Tempo de descanso padrão pros esbarradores de botão (em segundos).
    defaultCooldown: 3,

    // Se mandar `true`, apaga os comandos antigos antes de recarregar (limpeza de primavera).
    deleteCommands: false,

    // ID do servidor de testes (só pra não quebrar a live principal).
    testGuildId: process.env.TEST_GUILD_ID,

    // Quando tá ativo (ou MAINTENANCE_MODE=true), só os chefões usam o bot. Modo "Gabi, deu ruim".
    maintenanceMode: process.env.MAINTENANCE_MODE === "true",

    // Prefixo pra chamar o bot no chat (ex: "!" pra "!ping").
    prefix: process.env.PREFIX || "!",
  },

  // =========================
  // SISTEMA DE FORMULÁRIOS / RECRUTAMENTO
  // =========================
  applications: {
    // Perguntas padrão quando o emocionado quer entrar pro grupo.
    defaultQuestions: [
      { question: "Qual o seu vulgo?", required: true },
      { question: "Quantos anos tu tem nessa carcaça?", required: true },
      { question: "Por que tu quer se juntar a essa baderna do Squadrife?", required: true },
    ],

    // Cores do formulário dependendo do desfecho.
    statusColors: {
      pending: "#FFA500", // Na moita (Pendente)
      approved: "#00FF00", // Passou de ano! (Aprovado)
      denied: "#FF0000", // Tchau e benção (Negado)
    },

    // Quantas horas o comédia tem que esperar pra mandar outro formulário.
    applicationCooldown: 24,

    // Deleta os formulários reprovados depois de x dias (faxina).
    deleteDeniedAfter: 7,

    // Deleta os aprovados depois de x dias.
    deleteApprovedAfter: 30,

    // Cargos autorizados a dar o carimbo de aprovado ou reprovado.
    managerRoles: [], // Vai puxar do banco ou do .env
  },

  // =========================
  // CORES E VISUAL DOS EMBEDS
  // =========================
  // IMPORTANTE: Aqui é o SANTO GRAAL das cores do bot do Squadrife!
  embeds: {
    colors: {
      // Cores da firma.
      primary: "#336699",
      secondary: "#2F3136",

      // Cores pros momentos de paz e de caos.
      success: "#57F287", // GGWP
      error: "#ED4245", // Deu ruim total
      warning: "#FEE75C", // Calma lá, patrão
      info: "#3498DB", // Papo reto

      // Utilitários neutros.
      light: "#FFFFFF",
      dark: "#202225",
      gray: "#99AAB5",

      // Paleta clássica do Discord.
      blurple: "#5865F2",
      green: "#57F287",
      yellow: "#FEE75C",
      fuchsia: "#EB459E",
      red: "#ED4245",
      black: "#000000",

      // Cores por funcionalidade.
      giveaway: {
        active: "#57F287",
        ended: "#ED4245",
      },
      ticket: {
        open: "#57F287",
        claimed: "#FAA61A",
        closed: "#ED4245",
        pending: "#99AAB5",
      },
      economy: "#F1C40F", // Cor de dinheirama
      birthday: "#E91E63", // Dia de bolo
      moderation: "#9B59B6", // Martelo do Ban

      // Mapeamento de cor por urgência do ticket.
      priority: {
        none: "#95A5A6",
        low: "#3498db",   // Tranquilo
        medium: "#2ecc71", // Suave
        high: "#f1c40f",   // Esquentou
        urgent: "#e74c3c", // FOGO NO PARQUINHO
      },
    },
    footer: {
      // Texto de rodapé oficial.
      text: "Bot Oficial do Squadrife 🔥 | Curte e compartilha!",
      // Ícone do rodapé (null = sem imagem).
      icon: null,
    },
    // Miniatura padrão (null = sem imagem).
    thumbnail: null,
    author: {
      // Bloco do autor padrão.
      name: null,
      icon: null,
      url: null,
    },
  },

  // =========================
  // ECONOMIA (O CASSINO DO SQUADRIFE)
  // =========================
  economy: {
    currency: {
      // Nome da moeda da live.
      name: "moeda",
      // Nome no plural.
      namePlural: "moedas",
      // Símbolo pro saldo.
      symbol: "🪙",
    },

    // Quanto o coitado começa na conta.
    startingBalance: 0,

    // Capa de grana no banco antes dos upgrades.
    baseBankCapacity: 100000,

    // Esmola diária no /daily.
    dailyAmount: 100,

    // Quanto rende o trampo aleatório no /work.
    workMin: 10,
    workMax: 100,

    // Quanto rende pedir esmola no /beg.
    begMin: 5,
    begMax: 50,

    // Cooldowns da economia (em milissegundos).
    cooldowns: {
      daily: 24 * 60 * 60 * 1000,
      work: 60 * 60 * 1000,
      crime: 2 * 60 * 60 * 1000,
      rob: 4 * 60 * 60 * 1000,
    },

    // Chance de dar bom no assalto (0.4 = 40% de chance de virar o Robin Hood).
    robSuccessRate: 0.4,

    // Tempo de xadrez se se der mal no roubo (em milissegundos).
    // 3600000 = 1 hora de molho.
    robFailJailTime: 3600000,
  },

  // =========================
  // LOJINHA DA LIVE
  // =========================
  shop: {
    // Adicione os itens da lojinha do Squadrife aqui depois
  },

  // =========================
  // SISTEMA DE TICKETS (MAMÃE SOCORRO)
  // =========================
  tickets: {
    // Categoria do Discord onde caem os tickets novos.
    defaultCategory: null,

    // Cargos da moderação que têm a chave do barraco.
    supportRoles: [],

    // Níveis de desespero do usuário.
    priorities: {
      none: {
        emoji: "⚪",
        color: "#95A5A6",
        label: "Sem pressa",
      },
      low: {
        emoji: "🟢",
        color: "#2ECC71",
        label: "Suave na nave",
      },
      medium: {
        emoji: "🟡",
        color: "#F1C40F",
        label: "Aperta aí",
      },
      high: {
        emoji: "🔴",
        color: "#E74C3C",
        label: "Deu xabu",
      },
      urgent: {
        emoji: "🚨",
        color: "#E91E63",
        label: "SOCORRO SQUADRIFE",
      },
    },

    // Nível de urgência padrão.
    defaultPriority: "none",

    // Categoria onde os tickets mortos vão descansar em paz.
    archiveCategory: null,

    // Canal onde a moderação vê os rastros de tudo.
    logChannel: null,
  },

  // =========================
  // SORTEIOS (MOMENTO PIX/GIFT CARD)
  // =========================
  giveaways: {
    // Duração padrão do sorteio.
    // 86400000 = 24 horinhas.
    defaultDuration: 86400000,

    // Quantos sortudos ganham por vez.
    minimumWinners: 1,
    maximumWinners: 10,

    // Limites de tempo (5 min a 30 dias).
    minimumDuration: 300000,
    maximumDuration: 2592000000,

    // Cargo de quem pode fazer a boa pros inscritos.
    allowedRoles: [],

    // Cargos dos imunes às regras do sorteio.
    bypassRoles: [],
  },

  // =========================
  // ANIVERSÁRIOS DA GALERA
  // =========================
  birthday: {
    // Cargo do aniversariante do dia (pra ganhar parabéns no chat).
    defaultRole: null,

    // Canal pra mandar aquele "Parabéns, parabéns, hoje é seu dia...".
    announcementChannel: null,

    // Fuso horário pra não dar parabéns adiantado ou atrasado.
    timezone: "UTC",
  },

  // =========================
  // VERIFICAÇÃO (SISTEMA ANTI-FLAMMER)
  // =========================
  verification: {
    // Mensagem de boas-vindas na porta do servidor.
    defaultMessage: "Clica no botão aí infra pra provar que tu não é um robô de spam e liberar o chat!",

    // Texto do botão.
    defaultButtonText: "Sou Humano, Prometo! 🤖❌",

    // Regras pra liberar o cabra automaticamente.
    autoVerify: {
      // Modos:
      // - "none"        = entra todo mundo de uma vez
      // - "account_age" = conta tem que ter uns dias de vida
      // - "server_size" = só auto-verifica se o servidor for pequeno
      defaultCriteria: "none",

      // Dias mínimos se o critério for idade da conta.
      defaultAccountAgeDays: 7,

      // Limite de membros pro modo `server_size`.
      serverSizeThreshold: 1000,

      // Trava de segurança pra idade da conta (1 dia a 1 ano).
      minAccountAge: 1,
      maxAccountAge: 365,

      // Se avisa no PV depois que passa na verificação.
      sendDMNotification: true,

      // Explicação de cada modo pra não dar nós na cabeça.
      criteria: {
        account_age: "Conta precisa ter uns dias de estrada",
        server_size: "Auto-aprova se a live/servidor tiver menos de 1000 membros",
        none: "Libera geral sem frescura"
      }
    },

    // Cooldown entre tentativas de verificação (5 segundos).
    verificationCooldown: 5000,

    // Quantas vezes o cara pode errar antes de levar um 'péra lá'.
    maxVerificationAttempts: 3,

    // Janela de tempo pra contar as pisadas na bola (1 minuto).
    attemptWindow: 60000,

    // Travas pra memória do servidor não explodir.
    maxCooldownEntries: 10000,
    maxAttemptEntries: 10000,
    cooldownCleanupInterval: 300000,
    maxAuditMetadataBytes: 4096,
    maxInMemoryAuditEntries: 1000,
    logAllVerifications: true,
    keepAuditTrail: true,
  },

  // =========================
  // MENSAGENS DE ENTRADA E SAÍDA
  // =========================
  welcome: {
    // Mensagem quando entra mais um pro bando.
    // Variáveis: {user}, {server}, {memberCount}
    defaultWelcomeMessage:
      "Salve, {user}! Seja bem-vindo ao servidor do {server}! Já somos {memberCount} doidos por aqui!",
    // Mensagem quando o cara mete o pé.
    // Variáveis: {user}, {memberCount}
    defaultGoodbyeMessage:
      "Ih, {user} meteu o pé... Sobraram {memberCount} sobreviventes.",
    
    defaultWelcomeChannel: null,
    defaultGoodbyeChannel: null,
  },

  // =========================
  // CANAIS DE CONTADOR (ESTATÍSTICAS DA LIVE)
  // =========================
  counters: {
    defaults: {
      name: "Contador {name}",
      description: "Estatísticas do Squadrife: {name}",
      type: "voice",
      channelName: "{name}: {count}",
    },
    permissions: {
      deny: ["VIEW_CHANNEL"],
      allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK"],
    },
    messages: {
      created: "✅ Contador **{name}** tá no ar!",
      deleted: "🗑️ Mandou o contador **{name}** pro saco!",
      updated: "🔄 Contador **{name}** atualizado!",
    },
    types: {
      members: {
        name: "👥 Galera Toda",
        description: "Todo mundo que tá no servidor",
        getCount: (guild) => guild.memberCount.toString(),
      },
      bots: {
        name: "🤖 Robozada",
        description: "Apenas a inteligência artificial",
        getCount: (guild) =>
          guild.members.cache.filter((m) => m.user.bot).size.toString(),
      },
      members_only: {
        name: "👤 Seres Humanos",
        description: "Apenas a rapaziada (sem bots)",
        getCount: (guild) =>
          guild.members.cache.filter((m) => !m.user.bot).size.toString(),
      },
    },
  },

  // =========================
  // MENSAGENS PADRÃO DO BOT (AS PATADAS)
  // =========================
  messages: {
    noPermission: "Sai fora! Tu não tem moral/permissão pra usar esse comando não.",
    cooldownActive: "Calma aí, apressado! Espera {time} pra mandar outro comando.",
    errorOccurred: "Eita! Deu zica interna aqui pra rodar esse comando. Chama a moderação!",
    missingPermissions: "Tô sem os poderes (permissões) necessários pra fazer essa boa.",
    commandDisabled: "Esse comando tá desativado no momento, meu chapa.",
    maintenanceMode: "O bot tá em manutenção! O Squadrife tá mexendo nos cabos aqui.",
  },

  // =========================
  // CHAVINHAS DE LIGA/DESLIGA (SISTEMAS)
  // =========================
  // Bota `false` se quiser desligar algo globalmente na live.
  features: {
    // Núcleo do Bot.
    economy: true,
    leveling: true,
    moderation: true,
    logging: true,
    welcome: true,

    // Modos de engajamento do chat.
    tickets: true,
    giveaways: true,
    birthday: true,
    counter: true,

    // Segurança e organização.
    verification: true,
    reactionRoles: true,
    joinToCreate: true,

    // Farofa & Utilitários.
    voice: true,
    search: true,
    tools: true,
    utility: true,
    community: true,
    fun: true,
    music: true,
  },
};

export function validateConfig(config) {
  const errors = [];

  if (process.env.NODE_ENV !== 'production') {
    logger.debug('Checando as variáveis de ambiente pros cria:');
    logger.debug('DISCORD_TOKEN tá na área:', !!process.env.DISCORD_TOKEN);
    logger.debug('TOKEN tá na área:', !!process.env.TOKEN);
    logger.debug('CLIENT_ID tá na área:', !!process.env.CLIENT_ID);
    logger.debug('GUILD_ID tá na área:', !!process.env.GUILD_ID);
    logger.debug('POSTGRES_HOST tá na área:', !!process.env.POSTGRES_HOST);
    logger.debug('NODE_ENV:', process.env.NODE_ENV);
  }

  if (!process.env.DISCORD_TOKEN && !process.env.TOKEN) {
    errors.push("Faltou o Token do Bot, meu nobre! (DISCORD_TOKEN ou TOKEN no .env)");
  }

  if (!process.env.CLIENT_ID) {
    errors.push("Faltou o ID do Cliente! (CLIENT_ID no .env)");
  }

  if (process.env.NODE_ENV === 'production') {
    const hasConnectionUrl = Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL);

    if (!hasConnectionUrl) {
      if (!process.env.POSTGRES_HOST) {
        errors.push("Cadê o Host do Postgres pra rodar em produção? (DATABASE_URL/POSTGRES_URL ou POSTGRES_HOST)");
      }
      if (!process.env.POSTGRES_USER) {
        errors.push("Cadê o Usuário do Postgres? (DATABASE_URL/POSTGRES_URL ou POSTGRES_USER)");
      }
      if (!process.env.POSTGRES_PASSWORD) {
        errors.push("Cadê a Senha do Postgres? (DATABASE_URL/POSTGRES_URL ou POSTGRES_PASSWORD)");
      }
    }
  }

  return errors;
}

const configErrors = validateConfig(botConfig);
if (configErrors.length > 0) {
  logger.error("Deu ruim nas configurações do bot:", configErrors.join("\n"));
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  }
}

export const BotConfig = botConfig;

const COMMAND_CATEGORY_FEATURE_MAP = {
  birthday: "birthday",
  community: "community",
  economy: "economy",
  fun: "fun",
  giveaway: "giveaways",
  jointocreate: "joinToCreate",
  leveling: "leveling",
  logging: "logging",
  moderation: "moderation",
  music: "music",
  reaction_roles: "reactionRoles",
  search: "search",
  serverstats: "counter",
  ticket: "tickets",
  tools: "tools",
  utility: "utility",
  verification: "verification",
  welcome: "welcome",
};

function normalizeCategoryKey(category) {
  return String(category || "").trim().toLowerCase().replace(/\s+/g, "_");
}

export function getCommandPrefix() {
  return botConfig.commands?.prefix ?? "!";
}

export function getBotOwners() {
  return (botConfig.commands?.owners ?? [])
    .map((id) => String(id).trim())
    .filter(Boolean);
}

export function isBotOwner(userId) {
  if (!userId) {
    return false;
  }

  return getBotOwners().includes(String(userId));
}

export function isMaintenanceMode() {
  return botConfig.commands?.maintenanceMode === true;
}

export function getBotMessage(key, replacements = {}) {
  let message = botConfig.messages?.[key] || key;

  for (const [placeholder, value] of Object.entries(replacements)) {
    message = message.replace(new RegExp(`\\{${placeholder}\\}`, "g"), String(value));
  }

  return message;
}

export function isFeatureEnabled(featureKey) {
  if (!featureKey) {
    return true;
  }

  return botConfig.features?.[featureKey] !== false;
}

export function isCommandCategoryEnabled(category) {
  const normalized = normalizeCategoryKey(category);

  if (!normalized || normalized === "core") {
    return true;
  }

  const featureKey = COMMAND_CATEGORY_FEATURE_MAP[normalized];
  if (!featureKey) {
    return true;
  }

  return isFeatureEnabled(featureKey);
}

export function getApplicationStatusColor(status) {
  const colors = botConfig.applications?.statusColors || {};
  const hex = colors[status];
  return hex ? getColor(hex) : getColor(status === "approved" ? "success" : status === "denied" ? "error" : "warning");
}

export function getDefaultApplicationQuestions() {
  return (botConfig.applications?.defaultQuestions || []).map((entry) =>
    typeof entry === "string" ? entry : entry.question,
  ).filter(Boolean);
}

export function getColor(path, fallback = "#99AAB5") {
  if (typeof path === "number") return path;
  if (typeof path === "string" && path.startsWith("#")) {
    return parseInt(path.replace("#", ""), 16);
  }
  const result = path
    .split(".")
    .reduce(
      (obj, key) => (obj && obj[key] !== undefined ? obj[key] : fallback),
      botConfig.embeds.colors,
    );
  
  if (typeof result === "string" && result.startsWith("#")) {
    return parseInt(result.replace("#", ""), 16);
  }
  return result;
}

export function getRandomColor() {
  const colors = Object.values(botConfig.embeds.colors).flatMap((color) =>
    typeof color === "string" ? color : Object.values(color),
  );
  return colors[Math.floor(Math.random() * colors.length)];
}

export default botConfig;
