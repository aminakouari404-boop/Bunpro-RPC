const { api } = require("./client");

/**
 * Fetches paginated review history.
 * This is not used for detecting active reviews, but useful for stats.
 */
async function getReviews(page = 1, perPage = 20) {
  return api(`/reviews?page=${page}&per_page=${perPage}`);
}

/**
 * Updates a review with a POST request.
 */
async function updateReview(reviewId, body) {
  return api(`/reviews/${reviewId}/update`, {
    method: "POST",
    body: JSON.stringify(body)
  });
}

/**
 * Adds items to the review queue.
 */
async function addToReviews(body) {
  return api("/reviews/add_to_reviews", {
    method: "PATCH",
    body: JSON.stringify(body)
  });
}

/**
 * Updates a review using an action type (e.g. "again", "good", etc.).
 */
async function updateReviewViaActionType(reviewId, body) {
  return api(`/reviews/${reviewId}/update_via_action_type`, {
    method: "PATCH",
    body: JSON.stringify(body)
  });
}

/**
 * Fetches the last review session.
 * Useful for detecting the last grammar/vocab item reviewed.
 */
async function getLastSession() {
  return api("/review_histories/last_session");
}

/**
 * Fetches review activity for the last 24 hours.
 */
async function getLast24Hours() {
  return api("/review_histories/last_24_hours");
}

module.exports = {
  getReviews,
  updateReview,
  addToReviews,
  updateReviewViaActionType,
  getLastSession,
  getLast24Hours
};
