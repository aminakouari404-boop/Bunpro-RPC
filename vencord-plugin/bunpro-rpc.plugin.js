// =====================================================
//  BUNPRO RPC — PLUGIN VENCORD
//  Pages' Detection + Settings + WebSocket
// =====================================================

import { definePluginSettings, registerPluginSettings } from "@api/settings";

// ------------------------------
// 1. Plugin settings
// ------------------------------
const settings = definePluginSettings({
    bunproApiKey: {
        type: "string",
        default: "",
        description: "Your Bunpro API Key"
    },
    referralLink: {
        type: "string",
        default: "https://bunpro.jp/referrals/user/nkgq3fec",
        description: "Your Bunpro referral link (optional)"
    }
});

registerPluginSettings("bunpro-rpc", settings);

// ------------------------------
// 2. WebSocket to the RPC script
// ------------------------------
const ws = new WebSocket("ws://localhost:8765");

// ------------------------------
// 3. Bunpro page detection
// ------------------------------
function detectPage() {
    const url = window.location.pathname + window.location.search;
    let pageState = "browsing";

    // Dashboard
    if (url.includes("/dashboard")) {
        pageState = "dashboard";
    }

    // Reviews
    else if (url.includes("/reviews")) {
        pageState = "reviews";
    }

    // Learn / Study
    else if (url.includes("/learn")) {
        pageState = "learn";
    }

    // Grammar point (ex: /grammar_points/てから)
    else if (url.includes("/grammar_points/")) {
        const raw = url.split("/grammar_points/")[1];
        const grammar = raw.split(/[?\/]/)[0];
        pageState = `grammar_points:${decodeURIComponent(grammar)}`;
    }

    // Decks
    else if (url.includes("/decks")) {
        pageState = "decks";
    }

    // Sending to the RPC
    ws.send(JSON.stringify({
        page: pageState,
        apiKey: settings.bunproApiKey,
        referral: settings.referralLink
    }));
}

// Initial detection
detectPage();

// URL changes' detection
let lastUrl = location.href;
setInterval(() => {
    if (location.href !== lastUrl) {
        lastUrl = location.href;
        detectPage();
    }
}, 500);