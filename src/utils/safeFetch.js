const fetch = require("node-fetch");
const wsState = require("../ws"); // mutable shared object

/**
 * safeFetch
 * - Automatic timeout (5s)
 * - Clean HTTP error handling
 * - Prevents crashes inside detectMode()
 */
async function safeFetch(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    // It reads the shared state at the moment of the call, so if Bunpro was closed → skip the API call
    if (!wsState.bunproOpen) {
      console.log("WS closed → skipping API call:", url);
      clearTimeout(timeout);
      return null;
    }

    console.log("\n=== API CALL ===");
    console.log("URL:", url);
    console.log("Options:", options);

    const res = await fetch(url, {
      ...options,
      signal: controller.signal
    });

    clearTimeout(timeout);

    console.log("HTTP Status:", res.status);

    if (!res.ok) {
      let body = "";
      try {
        body = await res.text();
      } catch {}

      console.log("Raw error response:", body);

      const error = new Error(`HTTP ${res.status} – ${body || res.statusText}`);
      error.status = res.status;
      throw error;
    }

    const json = await res.json();
    console.log("JSON response:", json);
    return json;

  } catch (err) {
    clearTimeout(timeout);

    console.log("FETCH ERROR:", err);

    if (err.name === "AbortError") {
      const timeoutError = new Error("Request timed out");
      timeoutError.status = 408;
      throw timeoutError;
    }

    throw err;
  }
}

module.exports = { safeFetch };
