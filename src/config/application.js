import { fileURLToPath } from "url";
import path from "path";
import botConfig, { validateConfig } from "./bot.js";
import { shopConfig as shop } from "./shop/index.js";
import { pgConfig } from "./database/postgres.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appConfig = {
  // Caminhos das pastas do projeto
  paths: {
    root: path.join(__dirname, "../.."),
    commands: path.join(__dirname, "../commands"),
    events: path.join(__dirname, "../events"),
    config: __dirname,
    utils: path.join(__dirname, "../utils"),
    services: path.join(__dirname, "../services"),
    handlers: path.join(__dirname, "../handlers"),
    interactions: path.join(__dirname, "../interactions"),
  },

  // Configurações principais do Bot do Squadrife
  bot: {
    ...botConfig,
    token: process.env.DISCORD_TOKEN || process.env.TOKEN,
    clientId: process.env.CLIENT_ID,
    // Mantido por compatibilidade de tutorial/setup; não usado para registrar comandos.
    guildId: process.env.GUILD_ID,

    shop: {
      ...botConfig.shop,
      ...shop,
    },
  },

  // Configuração do PostgreSQL - Banco de dados principal de produção
  postgresql: {
    ...pgConfig,
  },

  // Sistema de Logs (Registros de erros e avisos no console)
  logging: {
    level: process.env.LOG_LEVEL || "info",
    file: {
      enabled: process.env.LOG_TO_FILE === "true",
      path: path.join(__dirname, "../../logs"),
      maxSize: "20m",
      maxFiles: "14d",
      zippedArchive: true,
    },
    console: {
      enabled: true,
      colorize: true,
      timestamp: true,
    },
    sentry: {
      enabled: process.env.SENTRY_DSN ? true : false,
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || "development",
    },
  },

  // Configuração da API do Bot
  api: {
    port: process.env.PORT || 3000,
    cors: {
      origin: process.env.CORS_ORIGIN?.split(",") || "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100,
    },
  },

  shop,

  // Recursos ativos
  features: {
    ...botConfig.features,
    music: botConfig.features?.music ?? true,
  },

  // Ambiente de execução
  env: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV !== "production",
};

Object.freeze(appConfig);

export default appConfig;
