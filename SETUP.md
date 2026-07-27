# Squadrife Bot - Instruções de Instalação e Uso

## 🎮 Bem-vindo ao Squadrife Bot!

Este é o bot oficial da comunidade **Squadrife** no Discord. Um bot completo, profissional e extremamente divertido, com personalidade de verdadeiro membro antigo da comunidade.

---

## ⚡ Instalação Rápida (5 minutos)

### 1. **Clonar o Repositório**
```bash
git clone https://github.com/pedroemmanuel075-sys/SquadBot.git
cd SquadBot
```

### 2. **Instalar Dependências**
```bash
npm install
```

### 3. **Configurar Variáveis de Ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione:
- `DISCORD_TOKEN` - Token do seu bot (Discord Developer Portal)
- `CLIENT_ID` - ID da sua aplicação
- `GUILD_ID` - ID do seu servidor (para testes)

### 4. **Iniciar o Bot**
```bash
npm start
```

✅ Pronto! Seu bot está online!

---

## 📋 Configuração do Discord Developer Portal

### Criar uma Aplicação
1. Acesse [Discord Developer Portal](https://discord.com/developers/applications)
2. Clique em "New Application"
3. Dê um nome (ex: "Squadrife Bot")
4. Acesse a aba "Bot"
5. Clique em "Add Bot"

### Configurar Intents
Em "Privileged Gateway Intents", ative:
- ✅ GUILD_MEMBERS
- ✅ MESSAGE_CONTENT
- ✅ GUILD_MODERATION

### Obter Token
1. Na aba "Bot", clique em "Copy" embaixo de "TOKEN"
2. Cole em `DISCORD_TOKEN` no arquivo `.env`

### Obter IDs
- **CLIENT_ID**: Em "Application" > "General Information"
- **GUILD_ID**: Ative modo desenvolvedor no Discord > Clique direito no servidor > "Copy Server ID"

### Convidar o Bot
1. Vá em "OAuth2" > "URL Generator"
2. Selecione scopes:
   - ✅ bot
   - ✅ applications.commands
3. Selecione permissões:
   - ✅ Send Messages
   - ✅ Embed Links
   - ✅ Manage Messages
   - ✅ Kick Members
   - ✅ Ban Members
   - ✅ Moderate Members
   - ✅ Manage Roles
4. Copie o URL gerado e abra no navegador

---

## 🎯 Comandos Principais

### 💰 Economia
```
/daily       - Ganhe 500 moedas diárias
/work        - Trabalhe e ganhe moedas
/crime       - Tente um crime (arriscado)
/beg         - Peça moedas
/balance     - Ver seu saldo
/pay @user   - Transferir moedas
/leaderboard - Ranking de moedas
```

### ⭐ XP e Níveis
```
/profile     - Ver seu perfil
/rank        - Ranking de níveis
```

### 🎮 Diversão
```
/giria       - Gíria aleatória
/roast       - Roast engraçado
/cantada     - Cantada
/8ball       - Bola mágica
/coinflip    - Cara ou coroa
/desafio     - Desafio aleatório
/quiz        - Quiz rápido
/ship        - Compatibilidade entre usuários
/abracar     - Dar um abraço
/beijar      - Dar um beijo
```

### 🛡️ Moderação
```
/ban @user   - Banir usuário
/kick @user  - Expulsar usuário
/timeout     - Silenciar usuário
/warn @user  - Avisar usuário
/clear       - Limpar mensagens
```

### 👤 Admin
```
/userinfo    - Info do usuário
/serverinfo  - Info do servidor
/botinfo     - Info do bot
/ticket      - Sistema de tickets
```

### 🎲 Utility
```
/ping        - Latência do bot
/avatar      - Ver avatar
/help        - Ver lista de comandos
/afk         - Modo AFK
/sugestao    - Enviar sugestão
```

### 🎮 Roblox
```
/roblox usuario  - Info de usuário Roblox
/roblox avatar   - Avatar Roblox
```

---

## 📁 Estrutura do Projeto

```
SquadBot/
├── src/
│   ├── app.js                 # Arquivo principal
│   ├── commands/              # Comandos slash
│   │   ├── Admin/
│   │   ├── Economy/
│   │   ├── Fun/
│   │   ├── Moderation/
│   │   ├── Roblox/
│   │   ├── Tickets/
│   │   ├── Utility/
│   │   └── XP/
│   ├── events/                # Event handlers
│   │   ├── guild/
│   │   └── message/
│   ├── database/              # Database
│   │   └── init.js
│   ├── handlers/              # Command/Event loaders
│   ├── utils/                 # Utilidades
│   └── config/                # Configurações
├── database/                  # Banco de dados SQLite
├── logs/                      # Arquivos de log
├── scripts/                   # Scripts auxiliares
├── .env.example              # Exemplo de configuração
├── package.json              # Dependências
└── README.md                 # Este arquivo
```

---

## 🗄️ Banco de Dados

O bot usa **SQLite** automaticamente. As seguintes tabelas são criadas:

- **users** - Informações dos usuários
- **guild_config** - Configurações do servidor
- **economy** - Sistema de economia
- **xp** - Sistema de XP e níveis
- **warns** - Avisos de usuários
- **tickets** - Sistema de tickets
- **giveaways** - Sorteios
- **inventory** - Inventário de usuários
- **badges** - Badges conquistados

---

## 📊 Configurações por Servidor

Cada servidor tem suas próprias configurações isoladas:

- Prefixo customizável
- Canais de log
- Roles especiais (mod, admin, support)
- Mensagens personalizadas
- Configurações de economia

---

## 🔧 Scripts Auxiliares

### Backup do Banco de Dados
```bash
npm run backup:db
```
Cria um backup automático no diretório `database/backups/`

### Restaurar Banco de Dados
```bash
npm run restore:db
```
Restora o banco de dados do backup mais recente

---

## 🐛 Troubleshooting

### O bot não está respondendo
1. Verifique se o token está correto em `.env`
2. Verifique se os intents estão ativados no Developer Portal
3. Verifique os logs em `logs/error.log`

### Mensagens de erro de permissão
1. Verifique se o bot tem as permissões necessárias no servidor
2. Verifique se o bot está acima dos roles que ele tenta gerenciar

### Banco de dados não está criando tabelas
1. Delete o arquivo `database/squadrife.db`
2. Reinicie o bot para recriá-lo

---

## 📝 Logs

Os logs são salvos em:
- `logs/all.log` - Todos os logs
- `logs/error.log` - Apenas erros

Também são exibidos no console com cores para fácil leitura.

---

## 🤝 Contribuindo

Este é um projeto de código aberto. Você pode:

1. **Fork** o repositório
2. **Criar uma branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abrir um Pull Request**

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.

---

## 💬 Suporte

Tem dúvidas ou encontrou um bug?

- Abra uma [Issue](https://github.com/pedroemmanuel075-sys/SquadBot/issues)
- Entre em contato com a comunidade no Discord

---

## 🎉 Agradecimentos

Feito com ❤️ pela comunidade Squadrife.

**O Squadrife Bot está pronto para ação!** 🎮

---

*Última atualização: Julho 2026*
*Versão: 1.0.0*
*Status: ✅ Completo e Funcional*
