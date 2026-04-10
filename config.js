require("dotenv").config();

// Build referral URL from .env
const referralUrl = process.env.BUNPRO_REFERRAL
  ? process.env.BUNPRO_REFERRAL.startsWith("http")
    ? process.env.BUNPRO_REFERRAL
    : `https://bunpro.jp/referral/${process.env.BUNPRO_REFERRAL}`
  : "https://bunpro.jp";

// Export global config
module.exports = {
  clientId: "1455915691738923079",
  defaultDeckId: 19,
  referralUrl
};
