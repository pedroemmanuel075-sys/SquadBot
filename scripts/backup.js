#!/usr/bin/env node

import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import logger from '../src/utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../database/squadrife.db');
const backupDir = path.join(__dirname, '../database/backups');

// Criar diretório de backups se não existir
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupPath = path.join(backupDir, `squadrife-${timestamp}.db`);

try {
  const source = fs.createReadStream(dbPath);
  const dest = fs.createWriteStream(backupPath);

  source.pipe(dest);

  source.on('end', () => {
    logger.info(`✅ Backup criado com sucesso: ${backupPath}`);
    process.exit(0);
  });

  source.on('error', (error) => {
    logger.error('Erro ao criar backup:', error);
    process.exit(1);
  });
} catch (error) {
  logger.error('Erro ao fazer backup do banco de dados:', error);
  process.exit(1);
}
