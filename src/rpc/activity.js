const RPC = require("discord-rpc");
const { detectMode } = require("../api/detect");
const { updateMode } = require("../utils/timer");
const { referralUrl } = require("../../config"); // 🔥 referral dynamique

const client = new RPC.Client({ transport: "ipc" });

async function buildActivity() {
  const activity = await detectMode();
  const { mode, user } = activity;

  console.log("\n=== DETECT MODE ===");
  console.log("Detected mode:", mode);
  console.log("User:", user);
  console.log("Raw activity:", activity);

  const { startTimestamp } = updateMode(mode);

  // Default values
  let details = "Bunpro";
  let state = "Idle";
  let largeImageKey = "bunpro_logo";
  let smallImageKey = undefined;

  // 🔥 Always include referral button (1 button max for Discord RPC)
  const buttons = [
    {
      label: "Study on Bunpro",
      url: referralUrl
    }
  ];

  // If user exists → show JLPT badge
  if (user) {
    const jlptLevel = user.level;
    smallImageKey = `n${jlptLevel}`;
  }

  switch (mode) {
    case "reviews":
      details = "Bunpro — Reviews";
      state = `${activity.reviewsLeft ?? 0} reviews left`;
      break;

    case "learn":
      details = `Learning — ${activity.grammar?.attributes?.title || "Grammar"}`;
      state = `JLPT N${activity.grammar?.attributes?.jlpt || "?"}`;
      break;

    case "grammar":
      details = "Grammar Point";
      state = `ID: ${activity.grammarId}`;
      break;

    case "vocab":
      details = "Vocabulary";
      state = `ID: ${activity.vocabId}`;
      break;

    case "browsing":
      details = "Bunpro";
      state = "Browsing";
      break;

    case "idle":
      details = "Bunpro";
      state = "Not studying";
      break;
  }

  const finalActivity = {
    details,
    state,
    largeImageKey,
    largeImageText: "Bunpro",
    smallImageKey,
    startTimestamp,
    buttons
  };

  console.log("\n=== ACTIVITY SENT TO DISCORD ===");
  console.log(finalActivity);

  return finalActivity;
}

function initRPC(clientId) {
  client.on("ready", () => {
    console.log("Discord RPC connected.");

    const tick = async () => {
      try {
        const activity = await buildActivity();
        client.setActivity(activity);

        if (activity.state === "Not studying") {
          console.log("RPC set to idle state.");
        } else {
          console.log("RPC updated with current activity.");
        }

      } catch (err) {
        console.error("Error while updating RPC:", err.message);
        client.setActivity({
          details: "Bunpro",
          state: "Not studying",
          largeImageKey: "bunpro_logo"
        });
      }
    };

    tick();
    setInterval(tick, 10_000);
  });

  client.login({ clientId }).catch(err => {
    console.error("RPC connection error:", err.message);
  });
}

module.exports = { initRPC };
