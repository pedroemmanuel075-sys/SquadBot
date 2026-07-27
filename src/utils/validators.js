/**
 * Validadores de entrada
 */

export const isValidUserID = (id) => {
  return /^\d+$/.test(id) && id.length >= 17 && id.length <= 20;
};

export const isValidRoleID = (id) => {
  return /^\d+$/.test(id) && id.length >= 17 && id.length <= 20;
};

export const isValidChannelID = (id) => {
  return /^\d+$/.test(id) && id.length >= 17 && id.length <= 20;
};

export const isValidAmount = (amount) => {
  const num = parseInt(amount);
  return !isNaN(num) && num > 0 && num <= 2147483647; // Max 32-bit int
};

export const isValidUsername = (username) => {
  return typeof username === 'string' && username.length >= 2 && username.length <= 32;
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>@#&`]/g, '')
    .trim()
    .substring(0, 100);
};

export const isValidHexColor = (color) => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

export const isValidDecimalColor = (color) => {
  const num = parseInt(color);
  return !isNaN(num) && num >= 0 && num <= 16777215;
};

export default {
  isValidUserID,
  isValidRoleID,
  isValidChannelID,
  isValidAmount,
  isValidUsername,
  isValidEmail,
  isValidURL,
  sanitizeString,
  isValidHexColor,
  isValidDecimalColor,
};
