import { EmbedBuilder } from 'discord.js';
import { COLORS, EMOJIS } from '../config/constants.js';

/**
 * Criar embed de sucesso
 */
export const successEmbed = (title, description) => {
  return new EmbedBuilder()
    .setColor(COLORS.SUCCESS)
    .setTitle(`${EMOJIS.SUCCESS} ${title}`)
    .setDescription(description)
    .setTimestamp();
};

/**
 * Criar embed de erro
 */
export const errorEmbed = (title, description) => {
  return new EmbedBuilder()
    .setColor(COLORS.ERROR)
    .setTitle(`${EMOJIS.ERROR} ${title}`)
    .setDescription(description)
    .setTimestamp();
};

/**
 * Criar embed de informação
 */
export const infoEmbed = (title, description) => {
  return new EmbedBuilder()
    .setColor(COLORS.INFO)
    .setTitle(`${EMOJIS.INFO} ${title}`)
    .setDescription(description)
    .setTimestamp();
};

/**
 * Criar embed de aviso
 */
export const warningEmbed = (title, description) => {
  return new EmbedBuilder()
    .setColor(COLORS.WARNING)
    .setTitle(`${EMOJIS.WARNING} ${title}`)
    .setDescription(description)
    .setTimestamp();
};

/**
 * Criar embed customizado
 */
export const createEmbed = (config) => {
  const embed = new EmbedBuilder();
  
  if (config.title) embed.setTitle(config.title);
  if (config.description) embed.setDescription(config.description);
  if (config.color) embed.setColor(config.color);
  if (config.thumbnail) embed.setThumbnail(config.thumbnail);
  if (config.image) embed.setImage(config.image);
  if (config.author) embed.setAuthor(config.author);
  if (config.footer) embed.setFooter(config.footer);
  if (config.fields) {
    for (const field of config.fields) {
      embed.addFields({
        name: field.name,
        value: field.value,
        inline: field.inline || false,
      });
    }
  }
  
  embed.setTimestamp();
  return embed;
};

export default {
  successEmbed,
  errorEmbed,
  infoEmbed,
  warningEmbed,
  createEmbed,
};
