const { learn } = require("./learn");
const { getDue, getQueue, getUser } = require("./user");
const { defaultDeckId } = require("../../config");
const { getVocab } = require("./vocab");
const wsState = require("../ws");

/**
 * Detects the current Bunpro activity mode.
 * Possible modes:
 * - "reviews"
 * - "learn"
 * - "grammar"
 * - "vocab"
 * - "idle"
 */
async function detectMode() {
  console.log("[DETECT] bunproOpen =", wsState.bunproOpen);

  try {
    const user = await getUser();
    if (!user) return { mode: "idle", user: null };

    // 🔥 If Bunpro is not open in the browser → idle
    if (!wsState.bunproOpen) {
      return { mode: "idle", user };
    }

    // --- API calls ---
    const due = await getDue().catch(() => null);
    const queue = await getQueue().catch(() => null);

    if (!due || !queue) return { mode: "idle", user };

    const totalReviews =
      (due.total_due_grammar || 0) +
      (due.total_due_vocab || 0);

    // --- REVIEWS ---
    if (totalReviews > 0) {
      return {
        mode: "reviews",
        user,
        reviewsLeft: totalReviews
      };
    }

    // --- LEARN ---
    const learnRes = await learn(defaultDeckId).catch(() => null);
    if (learnRes?.data?.length > 0) {
      return {
        mode: "learn",
        user,
        grammar: learnRes.data[0]
      };
    }

    // --- VOCAB / GRAMMAR (fallback based on queue) ---
    const first = queue[0];

    if (first?.reviewable_type === "Grammar") {
      return {
        mode: "grammar",
        user,
        grammarId: first.reviewable_id
      };
    }

    if (first?.reviewable_type === "Vocab") {
      const vocab = await getVocab(first.reviewable_id).catch(() => null);
      return {
        mode: "vocab",
        user,
        vocabId: first.reviewable_id,
        vocab
      };
    }

    // --- OTHERWISE: IDLE ---
    return { mode: "idle", user };

  } catch (err) {
    return { mode: "idle", user: null };
  }
}

module.exports = { detectMode };
