const { api } = require("./client");

/**
 * Fetches the current user profile.
 * Returns only the user attributes for convenience.
 */
async function getUser() {
  const json = await api("/user");
  return json.user?.data?.attributes || null;
}

/**
 * Fetches user furigana settings.
 */
async function getUserFurigana() {
  return api("/user/user_furigana");
}

/**
 * Fetches due counts for grammar and vocab.
 * Example response:
 * { total_due_grammar: 41, total_due_vocab: 154 }
 */
async function getDue() {
  const json = await api("/user/due");
  return json || {};
}

/**
 * Fetches the active deck queue.
 * Example response:
 * { data: [ { ...deckSetting }, ... ] }
 */
async function getQueue() {
  const json = await api("/user/queue");
  return json.data || [];
}

module.exports = {
  getUser,
  getUserFurigana,
  getDue,
  getQueue
};
