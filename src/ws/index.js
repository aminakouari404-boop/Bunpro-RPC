const WebSocket = require("ws");

// 🔥 Objet mutable partagé entre tous les modules
const state = { bunproOpen: false };

console.log("[WS] Starting WebSocket server…");

// 🔥 Serveur WebSocket sur le port 8765
const wss = new WebSocket.Server({ port: 8765 });

wss.on("connection", ws => {
  console.log("[WS] Client connected");

  ws.on("message", msg => {
    const text = msg.toString();
    console.log("[WS] Message received:", text);

    if (text === "bunpro-open") {
      state.bunproOpen = true;
      console.log("[WS] bunproOpen = true");
    }

    if (text === "bunpro-closed") {
      state.bunproOpen = false;
      console.log("[WS] bunproOpen = false");
    }
  });

  ws.on("close", () => {
    console.log("[WS] Client disconnected");
  });
});

module.exports = state;
