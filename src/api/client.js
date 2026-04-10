const { safeFetch } = require("../utils/safeFetch");

const BASE = "https://api.bunpro.jp/api/frontend";

/**
 * Generic API wrapper for Bunpro frontend endpoints.
 * Uses the frontend cookie token stored in BUNPRO_FRONTEND_TOKEN.
 */
async function api(path, options = {}) {
  const token = process.env.BUNPRO_FRONTEND_TOKEN;

  if (!token) {
    throw new Error("Missing BUNPRO_FRONTEND_TOKEN in environment variables.");
  }

  return safeFetch(`${BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
}

module.exports = { api };
