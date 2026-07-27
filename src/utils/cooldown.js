/**
 * Sistema de Cooldown para Comandos
 */
export class CooldownManager {
  constructor(defaultTime = 3000) {
    this.cooldowns = new Map();
    this.defaultTime = defaultTime;
  }

  /**
   * Obter cooldown de um usuário
   */
  getCooldown(userId, commandName) {
    const key = `${userId}_${commandName}`;
    return this.cooldowns.get(key);
  }

  /**
   * Verificar se usuário está em cooldown
   */
  isOnCooldown(userId, commandName) {
    const key = `${userId}_${commandName}`;
    const cooldown = this.cooldowns.get(key);
    
    if (!cooldown) return false;
    
    const now = Date.now();
    if (now > cooldown) {
      this.cooldowns.delete(key);
      return false;
    }
    
    return true;
  }

  /**
   * Obter tempo restante do cooldown em ms
   */
  getRemainingTime(userId, commandName) {
    const key = `${userId}_${commandName}`;
    const cooldown = this.cooldowns.get(key);
    
    if (!cooldown) return 0;
    
    const remaining = cooldown - Date.now();
    return remaining > 0 ? remaining : 0;
  }

  /**
   * Definir cooldown
   */
  setCooldown(userId, commandName, duration = this.defaultTime) {
    const key = `${userId}_${commandName}`;
    const expiresAt = Date.now() + duration;
    this.cooldowns.set(key, expiresAt);
    
    // Limpar automaticamente após expiração
    setTimeout(() => this.cooldowns.delete(key), duration);
  }

  /**
   * Limpar todos os cooldowns
   */
  clearAll() {
    this.cooldowns.clear();
  }

  /**
   * Limpar cooldown específico
   */
  clearCooldown(userId, commandName) {
    const key = `${userId}_${commandName}`;
    this.cooldowns.delete(key);
  }
}

export default CooldownManager;
