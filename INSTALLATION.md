# 📦 Requirements & Installation

- Discord desktop app required.
- The plug-in only works with Vencord, make sure **Vencord is properly installed and active.**
- Node.js (v18+) ; The script bunpro-rpc.js needs **Node.js** to work properly.
    Download : https://nodejs.org/
- A Bunpro API Key (You can find yours in the settings of your Bunpro account.)
- And an Internet connection.

## 1. Install the Vencord plugin  
Place the plugin file (bunpro-rpc.plugin.js) in your Vencord plugins folder:

```
Vencord/plugins/
```

Restart Discord or reload Vencord.

---

## 2. Install & Run the RPC script  
This script enables Discord Rich Presence.

### a) Install dependencies  
Open a terminal in the folder where `bunpro-rpc.js` is located, then run:

```
npm install discord-rpc ws node-fetch (It should work if you have node.js installed)
```

### b) Start the RPC script

```
node bunpro-rpc.js
```

If everything works fine, you should see:

```
RPC connected to Discord as: <your username>
WebSocket server listening on ws://localhost:8765
```

---

## 3. Configure your API key  
In Discord → **Vencord Settings** → **Plugins** → **Bunpro RPC**:

- Enter your **Bunpro API key**
- (Optional) Enter your **referral link**

The plugin will automatically detect your Bunpro activity and send it to the RPC script.

---

## 4. Open Bunpro and enjoy the Rich Presence  
The RPC will update automatically when you:

- browse the dashboard  
- do reviews  
- study grammar  
- open grammar points  
- explore decks  
