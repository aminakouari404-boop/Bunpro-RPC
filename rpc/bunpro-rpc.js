// =====================================================
//  BUNPRO RPC — SCRIPT NODE.JS
//  Discord Connection + Bunpro API + Rich Presence
// =====================================================

const RPC = require("discord-rpc");
const WebSocket = require("ws");
const fetch = require("node-fetch");

const client = new RPC.Client({ transport: "ipc" });

const CLIENT_ID = "1455915691738923079"; // <-- My Discord App ID

let BUNPRO_API_KEY = "";
let REFERRAL_LINK = "";
let pageState = "browsing";
let DISCORD_NAME = "User"; // will be replaced automatically

// ------------------------------
// 1. Bunpro API — Retrieving stats
// ------------------------------
async function fetchBunproData() {
    if (!BUNPRO_API_KEY) return null;

    try {
        const res = await fetch("https://bunpro.jp/api/v1/user", {
            headers: { "Authorization": `Token ${BUNPRO_API_KEY}` }
        });

        const json = await res.json();
        return json.data;
    } catch (err) {
        console.error("Bunpro API Error :", err);
        return null;
    }
}

// ------------------------------
// 2. Rich Presence Updates
// ------------------------------
async function updatePresence() {
    const bunpro = await fetchBunproData();
    if (!bunpro) return;

    const reviews = bunpro.reviews_available;
    const jlpt = bunpro.jlpt_level;

    let details = "";
    let state = "";

    switch (true) {

        case pageState === "dashboard":
            details = `JLPT Grammar Progress: N${jlpt}`;
            state = `${reviews} reviews left`;
            break;

        case pageState === "reviews":
            details = "Doing reviews..";
            state = `${reviews} left`;
            break;

        case pageState === "learn":
            details = "Studying grammar/vocab";
            state = "Learning new points";
            break;

        case pageState.startsWith("grammar_points:"):
            const grammar = pageState.split(":")[1];
            details = `Viewing ${grammar}`;
            state = "Checking examples";
            break;

        case pageState === "decks":
            details = "Exploring decks..";
            state = `${reviews} reviews today`;
            break;

        default:
            details = "Browsing Bunpro";
            state = `${reviews} reviews`;
    }

    client.setActivity({
        details,
        state,
        largeImageKey: "bunpro_logo",
        largeImageText: "Bunpro",
        instance: false,
        buttons: REFERRAL_LINK
            ? [
                {
                    label: `Learn with ${DISCORD_NAME}`,
                    url: REFERRAL_LINK
                }
            ]
            : undefined
    });
}

// ------------------------------
// 3. Discord RPC Connection
// ------------------------------
client.on("ready", () => {
    DISCORD_NAME = client.user.global_name;
    console.log("RPC connected to Discord as :", DISCORD_NAME);

    setInterval(updatePresence, 15000);
});

client.login({ clientId: CLIENT_ID });

// ------------------------------
// 4. Receiving data from the Vencord plugin
// ------------------------------
const ws = new WebSocket("ws://localhost:8765");

ws.on("message", (msg) => {
    const data = JSON.parse(msg);

    if (data.apiKey) {
        BUNPRO_API_KEY = data.apiKey;
    }

    if (data.referral) {
        REFERRAL_LINK = data.referral;
    }

    if (data.page) {
        pageState = data.page;
    }
});
// =====================================================