# Bunpro Discord Rich Presence

A clean and dynamic Discord Rich Presence integration for Bunpro.  
This project displays your current activity on Bunpro directly on your Discord profile:

- Current grammar point (extracted automatically)
- JLPT progress
- Reviews remaining
- Learning / Decks activity
- Personalized “Learn with {your Discord name}” button
- Optional referral link (default: author's link)

This project is fully open‑source and non‑commercial.

---

## ✨ Features

- 🔍 Automatic page detection (dashboard, reviews, learn, grammar points, decks)
- 🧩 Grammar point extraction from URL
- 📊 JLPT level and review count
- 👤 Personalized button using your Discord display name
- 🔗 Optional referral link support
- 🛠 Easy configuration through Vencord plugin settings
- 🎨 Bunpro logo displayed in the Rich Presence

---

## 📦 Requirements & Installation

- Discord desktop app required.
- The plug-in only works with Vencord, make sure **Vencord is properly installed and active.**
- Node.js (v18+) ; The script bunpro-rpc.js needs **Node.js** to work properly.
    Download : https://nodejs.org/
- A Bunpro API Key (You can find yours in the settings of your Bunpro account.)
- And an Internet connection.

### 1. Install the Vencord plugin  
Place the plugin file in your Vencord plugins folder.

### 2. Run the RPC script  
Start the Node.js script to enable Discord Rich Presence.

### 3. Configure your API key  
In Discord → Vencord → Plugins → Bunpro RPC:

- Enter your **Bunpro API key**
- (Optional) Enter your **referral link**

---

## 🔑 Bunpro API Key

You can find your API key on Bunpro: **Settings -> Bunpro API**

This key stays **local** on your machine and is never sent anywhere except to Bunpro’s official API.

---

## 🎨 Logo & Branding

This project uses the **Bunpro logo** as the large image in the Discord Rich Presence.

- The Bunpro logo is the property of Bunpro, Inc.
- This project is **not affiliated**, **endorsed**, or **sponsored** by Bunpro.
- The logo is used **nominatively**, for identification purposes only.
- If the Bunpro team requests removal or modification, it will be done immediately.
- The Bunpro logo is used with permission from the Bunpro team.

---

## 📜 Terms of Service & Privacy Policy

By using this project, you agree to Bunpro’s official policies:

- **Terms of Service:** https://bunpro.jp/terms  
- **Privacy Policy:** https://bunpro.jp/privacy  

This project does not store, log, or transmit any user data outside of your local machine.

---

## ⚠️ Disclaimer

This is a **community-made**, **unofficial** project.  
It is not affiliated with Bunpro, Inc.  
All trademarks and logos belong to their respective owners.

---

## ❤️ Credits

Created by Naïm.  
Inspired by the desire to make Bunpro study sessions more visible and fun.

