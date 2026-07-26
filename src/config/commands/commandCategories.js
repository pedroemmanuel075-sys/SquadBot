/**
 * Ícones e metadados das categorias de comandos do SquadBot.
 */

export const CATEGORY_ICONS = {
  Aniversário: '🎂',
  Comunidade: '👥',
  Principal: 'ℹ️',
  Economia: '💰',
  Diversão: '🎮',
  Sorteios: '🎉',
  EntrarParaCriar: '🔌',
  Níveis: '📊',
  Registros: '📝',
  Moderação: '🛡️',
  Música: '🎵',
  CargosPorReação: '🎭',
  Busca: '🔍',
  EstatísticasDoServidor: '📈',
  Tickets: '🎫',
  Ferramentas: '🛠️',
  Utilidades: '🔧',
  Verificação: '✅',
  BoasVindas: '👋',
};

/** Comandos blindados que NUNCA podem ser desativados (pra os ADMs não ficarem na mão). */
export const PROTECTED_COMMANDS = new Set(['commands', 'configwizard']);

/**
 * Deixa a chave da categoria no esquema (minúsculas e com underline).
 */
export function normalizeCategoryKey(category) {
  return String(category || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_');
}

/**
 * Formata o nome da categoria pra ficar bonito na tela.
 */
export function formatCategoryName(rawCategory) {
  return String(rawCategory || '')
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Puxa o emoji/ícone da categoria ou manda a pastinha padrão se não achar.
 */
export function getCategoryIcon(category) {
  return CATEGORY_ICONS[category] || CATEGORY_ICONS[formatCategoryName(category)] || '📁';
}
