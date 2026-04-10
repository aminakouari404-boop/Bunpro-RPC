const { api } = require("./client");

async function getBaseStats() {
  return api("/user_stats/base_stats");
}

async function getJlptProgressMixed() {
  return api("/user_stats/jlpt_progress_mixed");
}

async function getForecastDaily() {
  return api("/user_stats/forecast_daily");
}

async function getForecastHourly() {
  return api("/user_stats/forecast_hourly");
}

async function getSrsLevelOverview() {
  return api("/user_stats/srs_level_overview");
}

async function getReviewActivity() {
  return api("/user_stats/review_activity");
}

module.exports = {
  getBaseStats,
  getJlptProgressMixed,
  getForecastDaily,
  getForecastHourly,
  getSrsLevelOverview,
  getReviewActivity
};
