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

        if (!res.ok) {
            console.error("Bunpro API HTTP error:", res.status, res.statusText);
            return null;
        }

        const json = await res.json();
        return json.data;
    } catch (err) {
        console.error("Bunpro API Error:", err);
        return null;
    }
}

// ------------------------------
// 2. Rich Presence Updates
// ------------------------------
async function updatePresence() {
    // No key yet? Nothing to do.
    if (!BUNPRO_API_KEY) return;

    const bunpro = await fetchBunproData();
    if (!bunpro) return;

    const reviews = bunpro.reviews_available;
    const jlpt = bunpro.jlpt_level;

    let details = "";
    let state = "";

    if (pageState === "dashboard") {
        details = `JLPT Grammar Progress: N${jlpt}`;
        state = `${reviews} reviews left`;
    } else if (pageState === "reviews") {
        details = "Doing reviews…";
        state = `${reviews} left`;
    } else if (pageState === "learn") {
        details = "Studying grammar/vocab";
        state = "Learning new points";
    } else if (typeof pageState === "string" && pageState.startsWith("grammar_points:")) {
        const grammar = pageState.split(":")[1] || "";
        details = `Viewing ${grammar}`;
        state = "Checking examples";
    } else if (pageState === "decks") {
        details = "Exploring decks…";
        state = `${reviews} reviews today`;
    } else {
        details = "Browsing Bunpro";
        state = `${reviews} reviews`;
    }

    try {
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
                        url: REFERRAL_LINK // assure-toi que c'est bien un https://
                    }
                ]
                : undefined
        });
    } catch (err) {
        console.error("Error while setting Discord activity:", err);
    }
}

// ------------------------------
// 3. Discord RPC Connection
// ------------------------------
client.on("ready", () => {
    DISCORD_NAME = client.user.global_name || client.user.username || "User";
    console.log("RPC connected to Discord as:", DISCORD_NAME);

    setInterval(() => {
        updatePresence().catch(err => {
            console.error("updatePresence() error:", err);
        });
    }, 15000);
});

client.on("error", (err) => {
    console.error("Discord RPC error:", err);
});

client.login({ clientId: CLIENT_ID }).catch(err => {
    console.error("Discord RPC login error:", err);
});

// ------------------------------
// 4. WebSocket server — receiving data from the Vencord plugin
// ------------------------------
const wss = new WebSocket.Server({ port: 8765 });

wss.on("connection", (socket) => {
    console.log("Plugin connected via WebSocket");

    socket.on("message", (msg) => {
        try {
            const data = JSON.parse(msg);

            if (typeof data.apiKey === "string") {
                BUNPRO_API_KEY = data.apiKey.trim();
            }

            if (typeof data.referral === "string") {
                REFERRAL_LINK = data.referral.trim();
            }

            if (typeof data.page === "string") {
                pageState = data.page;
            }
        } catch (err) {
            console.error("Invalid WebSocket message:", err);
        }
    });

    socket.on("error", (err) => {
        console.error("WebSocket client error:", err);
    });

    socket.on("close", () => {
        console.log("Plugin disconnected from WebSocket");
    });
});

wss.on("listening", () => {
    console.log("WebSocket server listening on ws://localhost:8765");
});

wss.on("error", (err) => {
    console.error("WebSocket server error:", err);
});
