import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'squadrife.db');

let db;

/**
 * Inicializar banco de dados SQLite
 */
export async function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        logger.error('Erro ao abrir banco de dados:', err);
        reject(err);
        return;
      }

      db.serialize(async () => {
        try {
          // Habilitar foreign keys
          db.run('PRAGMA foreign_keys = ON');

          // Tabela de Usuários
          db.run(`
            CREATE TABLE IF NOT EXISTS users (
              id TEXT PRIMARY KEY,
              guild_id TEXT NOT NULL,
              username TEXT NOT NULL,
              balance INTEGER DEFAULT 0,
              xp INTEGER DEFAULT 0,
              level INTEGER DEFAULT 1,
              warnings INTEGER DEFAULT 0,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              UNIQUE(id, guild_id)
            )
          `);

          // Tabela de Configuração do Servidor
          db.run(`
            CREATE TABLE IF NOT EXISTS guild_config (
              guild_id TEXT PRIMARY KEY,
              prefix TEXT DEFAULT '!',
              welcome_channel TEXT,
              goodbye_channel TEXT,
              logs_channel TEXT,
              ticket_category TEXT,
              support_role TEXT,
              mod_role TEXT,
              admin_role TEXT,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
          `);

          // Tabela de Economia
          db.run(`
            CREATE TABLE IF NOT EXISTS economy (
              id TEXT PRIMARY KEY,
              guild_id TEXT NOT NULL,
              user_id TEXT NOT NULL,
              balance INTEGER DEFAULT 0,
              bank INTEGER DEFAULT 0,
              last_daily DATETIME,
              last_weekly DATETIME,
              last_monthly DATETIME,
              last_work DATETIME,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              UNIQUE(user_id, guild_id),
              FOREIGN KEY(guild_id) REFERENCES guild_config(guild_id)
            )
          `);

          // Tabela de XP
          db.run(`
            CREATE TABLE IF NOT EXISTS xp (
              id TEXT PRIMARY KEY,
              guild_id TEXT NOT NULL,
              user_id TEXT NOT NULL,
              xp INTEGER DEFAULT 0,
              level INTEGER DEFAULT 1,
              total_xp INTEGER DEFAULT 0,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              UNIQUE(user_id, guild_id),
              FOREIGN KEY(guild_id) REFERENCES guild_config(guild_id)
            )
          `);

          // Tabela de Warns
          db.run(`
            CREATE TABLE IF NOT EXISTS warns (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              guild_id TEXT NOT NULL,
              user_id TEXT NOT NULL,
              mod_id TEXT NOT NULL,
              reason TEXT,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY(guild_id) REFERENCES guild_config(guild_id)
            )
          `);

          // Tabela de Tickets
          db.run(`
            CREATE TABLE IF NOT EXISTS tickets (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              guild_id TEXT NOT NULL,
              channel_id TEXT UNIQUE NOT NULL,
              user_id TEXT NOT NULL,
              status TEXT DEFAULT 'open',
              category TEXT,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              closed_at DATETIME,
              FOREIGN KEY(guild_id) REFERENCES guild_config(guild_id)
            )
          `);

          // Tabela de Giveaways
          db.run(`
            CREATE TABLE IF NOT EXISTS giveaways (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              guild_id TEXT NOT NULL,
              message_id TEXT UNIQUE NOT NULL,
              channel_id TEXT NOT NULL,
              host_id TEXT NOT NULL,
              prize TEXT NOT NULL,
              winners INTEGER DEFAULT 1,
              end_time DATETIME NOT NULL,
              ended BOOLEAN DEFAULT 0,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY(guild_id) REFERENCES guild_config(guild_id)
            )
          `);

          // Tabela de Inventário
          db.run(`
            CREATE TABLE IF NOT EXISTS inventory (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              guild_id TEXT NOT NULL,
              user_id TEXT NOT NULL,
              item_name TEXT NOT NULL,
              quantity INTEGER DEFAULT 1,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              UNIQUE(user_id, guild_id, item_name),
              FOREIGN KEY(guild_id) REFERENCES guild_config(guild_id)
            )
          `);

          // Tabela de Badges
          db.run(`
            CREATE TABLE IF NOT EXISTS badges (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              guild_id TEXT NOT NULL,
              user_id TEXT NOT NULL,
              badge_name TEXT NOT NULL,
              earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              UNIQUE(user_id, guild_id, badge_name),
              FOREIGN KEY(guild_id) REFERENCES guild_config(guild_id)
            )
          `);

          logger.info('✅ Tabelas do banco de dados criadas/verificadas');
          resolve(db);
        } catch (error) {
          logger.error('Erro ao criar tabelas:', error);
          reject(error);
        }
      });
    });
  });
}

/**
 * Obter banco de dados
 */
export function getDatabase() {
  return db;
}

/**
 * Executar query (Promise)
 */
export function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

/**
 * Obter um resultado
 */
export function getQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

/**
 * Obter múltiplos resultados
 */
export function allQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

/**
 * Executar múltiplas queries em transação
 */
export async function transaction(queries) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      
      for (const { query, params = [] } of queries) {
        db.run(query, params);
      }
      
      db.run('COMMIT', (err) => {
        if (err) {
          db.run('ROLLBACK');
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  });
}

export default { initializeDatabase, getDatabase, runQuery, getQuery, allQuery, transaction };
