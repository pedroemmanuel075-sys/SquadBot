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

if (!fs.existsSync(backupDir)) {
  logger.error('Diretório de backups não encontrado!');
  process.exit(1);
}

const backups = fs.readdirSync(backupDir).sort().reverse();

if (backups.length === 0) {
  logger.error('Nenhum backup encontrado!');
  process.exit(1);
}

const latestBackup = path.join(backupDir, backups[0]);

try {
  const source = fs.createReadStream(latestBackup);
  const dest = fs.createWriteStream(dbPath);

  source.pipe(dest);

  source.on('end', () => {
    logger.info(`✅ Banco restaurado com sucesso de: ${backups[0]}`);
    process.exit(0);
  });

  source.on('error', (error) => {
    logger.error('Erro ao restaurar backup:', error);
    process.exit(1);
  });
} catch (error) {
  logger.error('Erro ao restaurar banco de dados:', error);
  process.exit(1);
}
