const { api } = require("./client");

/**
 * Fetches learn items for a given deck.
 * Bunpro returns a list of grammar points available for learning.
 */
async function learn(deckId) {
  return api(`/learn?deck_id=${deckId}`);
}

/**
 * Fetches a vocabulary item by slug or ID.
 * Example: "hello" or "123".
 */
async function getVocab(vocabSlugOrId) {
  return api(`/reviewables/vocab/${vocabSlugOrId}`);
}

/**
 * Fetches the previous and next vocabulary items inside a specific deck.
 */
async function getVocabPrevNext(vocabId, deckId) {
  return api(`/reviewables/vocab/${vocabId}/prev_next_by_deck_id?deck_id=${deckId}`);
}

/**
 * Fetches notes associated with a vocabulary item.
 */
async function getVocabNotes(vocabSlugOrId) {
  return api(`/reviewables/vocab/${vocabSlugOrId}/notes`);
}

module.exports = {
  learn,
  getVocab,
  getVocabPrevNext,
  getVocabNotes
};
