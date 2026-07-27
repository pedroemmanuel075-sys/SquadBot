# 🎮 Squadrife Bot - O Bot Oficial da Comunidade

![Discord.js](https://img.shields.io/badge/Discord.js-v14-5865F2?logo=discord&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Squadrife Bot** é o bot oficial da comunidade brasileira **Squadrife** no Discord. Um bot completo, profissional e extremamente divertido, com personalidade de verdadeiro membro antigo da comunidade.

Criado pelos e para os membros que fazem lives, gravam vídeos e jogam **Roblox** e outros games.

## 📋 Índice

- [Características](#-características)
- [Instalação Rápida](#-instalação-rápida)
- [Configuração Completa](#-configuração-completa)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Sistemas Disponíveis](#-sistemas-disponíveis)
- [Comandos](#-comandos)
- [Requisitos](#-requisitos)
- [Licença](#-licença)

## ✨ Características

### 🎭 Personalidade Única
- Brasileiro de verdade
- Usa gírias e expressões da comunidade
- Faz piadas leves e engraçadas
- Responde naturalmente como um membro antigo
- Muito interativo e simpático

### 💰 Sistema de Economia
- **Daily/Weekly/Monthly** - Ganhe moedas todos os dias
- **Work** - Trabalhe e ganhe moedas
- **Crime** - Tente sua sorte (com riscos)
- **Beg** - Peça moedas (com limite)
- **Shop** - Compre e venda itens
- **Cassino** - Jogue e multiplique suas moedas
- **Transferências** - Envie moedas para amigos
- **Leaderboard** - Ranking dos mais ricos

### ⭐ Sistema de XP e Níveis
- XP automático por mensagens
- Níveis com recompensas
- Badges e conquistas
- Títulos personalizados
- Ranking global

### 🎟️ Sistema de Tickets
- Painel interativo com botões
- Abrir/Fechar tickets
- Adicionar/Remover membros
- Transcripts automáticos
- Categorias de tickets
- Logs detalhados

### 🛡️ Administração Completa
- Ban, Kick, Timeout
- Warn (avisos)
- Mute/Unmute
- Purge (limpeza em massa)
- Slowmode, Lock/Unlock
- Gerenciamento de cargos
- Snipe e Editsnipe

### 📊 Logs Automáticos
- Mensagens apagadas/editadas
- Entradas e saídas
- Bans e kicks
- Mudanças de cargo/nick
- Timeouts e warns
- Tickets e sugestões

### 🎨 Memes
- `/meme` - Gera memes brasileiros automaticamente
- 300+ frases prontas
- Templates famosos da internet

### 📚 Polícia do Português
- Detecta erros automáticamente
- Modo Educado e Modo Zoeira
- 500+ correções diferentes
- Respostas engraçadas

### 🎲 Diversão
- Coinflip
- 8ball
- Abraçar, beijar, casar
- Roasts (500+ respostas)
- Desafios (500+)
- Quiz (1000+ perguntas)
- Gírias (500+)
- Cantadas (500+)
- Ship, Hack Fake, Roleta Russa

### 🎮 Integração Roblox
- Buscar usuário
- Ver avatar
- Status do usuário
- Listar amigos
- Grupos e badges
- Jogos favoritos
- Informações públicas

### ⚙️ Utilitários
- Ping
- Avatar
- AFK automático
- Lembretes
- Enquetes
- QR Code
- Calculadora
- Tradutor
- Info de emoji, role, canal, servidor

### 🎁 Giveaways
- Criar sorteios
- Múltiplos vencedores
- Reroll automático
- Botões interativos

### 💬 Sugestões
- Painel de sugestões
- Aceitar/Negar
- Discussões
- Tracking de status

## 🚀 Instalação Rápida

### Pré-requisitos
- Node.js 18.0.0 ou superior
- npm ou yarn
- Discord Bot Token (de [Discord Developer Portal](https://discord.com/developers/applications))

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/pedroemmanuel075-sys/SquadBot.git
   cd SquadBot
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o arquivo `.env`**
   ```bash
   cp .env.example .env
   ```
   
   Edite o arquivo `.env` e adicione:
   ```env
   DISCORD_TOKEN=seu_token_aqui
   CLIENT_ID=seu_client_id_aqui
   GUILD_ID=seu_guild_id_aqui
   ```

4. **Inicie o bot**
   ```bash
   npm start
   ```

5. **Convide o bot para seu servidor**
   - Acesse [Discord Developer Portal](https://discord.com/developers/applications)
   - Selecione sua aplicação
   - Vá em OAuth2 > URL Generator
   - Selecione scopes: `bot`, `applications.commands`
   - Selecione permissions necessárias
   - Use a URL gerada

## ⚙️ Configuração Completa

### Variáveis de Ambiente

```env
# OBRIGATÓRIO
DISCORD_TOKEN=       # Token do bot (Discord Developer Portal)
CLIENT_ID=           # ID da aplicação
GUILD_ID=            # ID do servidor (para testes)

# OPCIONAL
DATABASE_URL=        # Caminho do banco SQLite (padrão: ./database/squadrife.db)
NODE_ENV=            # development ou production
PORT=                # Porta do servidor Express (padrão: 3000)
LOG_LEVEL=           # info, warn, error, debug
ROBLOX_API_KEY=      # Para comandos Roblox
LOG_WEBHOOK_URL=     # Webhook para logs
PREFIX=              # Prefixo dos comandos (padrão: !)
```

### Intents Necessários

O bot requer os seguintes Discord Intents:
- ✅ GUILDS
- ✅ GUILD_MESSAGES
- ✅ MESSAGE_CONTENT
- ✅ GUILD_MEMBERS
- ✅ GUILD_MESSAGE_REACTIONS
- ✅ GUILD_VOICE_STATES
- ✅ DIRECT_MESSAGES
- ✅ GUILD_MODERATION

Todos já estão configurados automaticamente no código.

## 📁 Estrutura do Projeto

```
SquadBot/
├── src/
│   ├── app.js                 # Arquivo principal
│   ├── commands/              # Slash commands
│   │   ├── Admin/
│   │   ├── Economy/
│   │   ├── Fun/
│   │   ├── Moderation/
│   │   ├── Roblox/
│   │   ├── Tickets/
│   │   ├── Utility/
│   │   └── XP/
│   ├── events/                # Event handlers
│   │   ├── client/
│   │   ├── guild/
│   │   └── message/
│   ├── buttons/               # Button interactions
│   ├── selectMenus/           # Select menu interactions
│   ├── modals/                # Modal interactions
│   ├── database/              # Database
│   │   ├── init.js
│   │   ├── migrations/
│   │   └── schemas/
│   ├── utils/                 # Utilitários
│   │   ├── logger.js
│   │   ├── embeds.js
│   │   ├── cooldown.js
│   │   └── validators.js
│   ├── handlers/              # Carregadores
│   │   ├── commandHandler.js
│   │   └── eventHandler.js
│   ├── config/                # Configurações
│   └── assets/                # Assets (memes, imagens)
├── database/
│   ├── squadrife.db
│   └── backups/
├── logs/
├── scripts/
│   ├── migrate.js
│   └── backup.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🎯 Sistemas Disponíveis

### 1. Sistema de Banco de Dados
- SQLite automático
- Schema pré-configurado
- Backup automático
- Migrations

### 2. Sistema de Logs
- Winston com Daily Rotate
- Logs em arquivo e console
- Webhook integration
- Diferentes níveis

### 3. Sistema de Cooldown
- Por usuário
- Por comando
- Configurável
- Feedback ao usuário

### 4. Sistema de Permissões
- Role-based
- Channel-based
- Staff roles customizáveis
- Verificação automática

### 5. Sistema de Presença
- Rotação automática
- Atualização a cada 10s
- Mensagens temáticas
- Customizável

### 6. Sistema de Configuração por Servidor
- Prefixo customizável
- Canais de logs
- Roles especiais
- Mensagens personalizadas

## 💬 Comandos

### Admin
- `/admin config` - Configurar bot no servidor
- `/admin logs` - Ver logs
- `/admin stats` - Estatísticas do servidor

### Moderação
- `/ban` - Banir usuário
- `/kick` - Expulsar usuário
- `/timeout` - Mutar temporariamente
- `/warn` - Avisar usuário
- `/clear` - Limpar mensagens
- `/snipe` - Ver última mensagem deletada

### Economia
- `/daily` - Ganhar moedas diárias
- `/work` - Trabalhar
- `/crime` - Tentar um crime
- `/shop` - Ver loja
- `/buy` - Comprar item
- `/balance` - Ver saldo
- `/leaderboard` - Ranking

### XP
- `/profile` - Ver perfil
- `/rank` - Ranking de XP
- `/badges` - Badges conquistados

### Diversão
- `/meme` - Gerar meme
- `/giria` - Gíria aleatória
- `/cantada` - Cantada
- `/roast` - Roast aleatório
- `/desafio` - Desafio
- `/quiz` - Quiz
- `/8ball` - Bola 8 mágica
- `/coinflip` - Cara ou coroa
- `/abracar` - Abraçar alguém
- `/beijar` - Beijar alguém

### Roblox
- `/roblox user` - Info do usuário
- `/roblox avatar` - Avatar do usuário
- `/roblox status` - Status do usuário

### Tickets
- `/ticket create` - Criar ticket
- `/ticket close` - Fechar ticket
- `/ticket add` - Adicionar membro
- `/ticket remove` - Remover membro

### Utilitários
- `/ping` - Latência do bot
- `/avatar` - Ver avatar
- `/userinfo` - Info do usuário
- `/serverinfo` - Info do servidor

## ✅ Requisitos

### Obrigatórios
- ✅ Node.js 18.0.0+
- ✅ npm ou yarn
- ✅ Discord Bot Token
- ✅ Intents ativados no Developer Portal

### Recomendados
- ✅ SQLite instalado (automático com npm install)
- ✅ FFmpeg (para alguns recursos)
- ✅ Git para clonar o repo

### Permissões do Bot
- ✅ Send Messages
- ✅ Embed Links
- ✅ Attach Files
- ✅ Read Message History
- ✅ Manage Messages
- ✅ Manage Channels
- ✅ Manage Roles
- ✅ Kick Members
- ✅ Ban Members
- ✅ Moderate Members (Timeout)
- ✅ Connect (Voz)
- ✅ Speak (Voz)

## 📝 Licença

Squadrife Bot é licenciado sob a [MIT License](LICENSE).

Feito com ❤️ pela comunidade Squadrife.

## 🤝 Suporte

Precisa de ajuda? Junte-se ao nosso servidor:

[![Discord Server](https://img.shields.io/discord/sua_guild_id?label=Squadrife%20Community&logo=discord&logoColor=white&color=5865F2)](https://discord.gg/squadrife)

---

**Última atualização:** Julho 2026

**Versão:** 1.0.0

**Status:** 🟢 Em Desenvolvimento Ativo
