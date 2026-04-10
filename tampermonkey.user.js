// ==UserScript==
// @name         Bunpro RPC Detector
// @match        https://bunpro.jp/*
// @run-at       document-start
// ==/UserScript==

console.log("[TM] Script LOADED");

(function() {
    console.log("[TM] Creating WebSocket…");

    const ws = new WebSocket("ws://localhost:8765");

    ws.onopen = () => {
        console.log("[TM] WS OPEN → sending bunpro-open");
        ws.send("bunpro-open");
    };

    ws.onerror = (e) => {
        console.log("[TM] WS ERROR:", e);
    };

    ws.onclose = () => {
        console.log("[TM] WS CLOSED");
    };

    window.addEventListener("beforeunload", () => {
        console.log("[TM] Sending bunpro-closed");
        ws.send("bunpro-closed");
    });
})();
