# bunpro-rpc

A small Node.js project that displays Bunpro activity in Discord using Discord Rich Presence.

> ⚠️ This is a release, but it is still unstable. The detection system is not final and will be completely redone later.

## Overview

This project connects to Bunpro's frontend API and updates a Discord RPC status with the user's current Bunpro mode:
- `reviews`
- `learn`
- `grammar`
- `vocab`
- `idle` / browsing

It also runs a local WebSocket server (`port 8765`) to detect whether Bunpro is open in the browser.

## Features

- Displays Bunpro activity in Discord
- Refreshes the presence every 10 seconds
- Shows remaining review count or current lesson
- Adds a referral button to Bunpro (not working at the moment for some reason)
- Automatically detects the current mode using Bunpro frontend endpoints

## Requirements

- Node.js 18+ recommended
- Valid Bunpro frontend token
- Discord application configured for RPC (client ID in `config.js`)
- Tampermonkey browser extension for WebSocket event forwarding

## Installation

1. Clone the repository or download the ZIP file:

```bash
git clone https://github.com/aminakouari404-boop/bunpro-rpc2.git
cd bunpro-rpc2
```

Or download the latest release ZIP from GitHub and extract it.

2. Install dependencies if needed:

If `node_modules/` is already present, you can skip this step.
Otherwise, run:

```bash
npm install
```

3. Open the `.env` file at the project root. It should appear like that :

```env
BUNPRO_FRONTEND_TOKEN=your_bunpro_frontend_token
BUNPRO_REFERRAL=https://bunpro.jp/referral/your_code
```

- `BUNPRO_FRONTEND_TOKEN` is required.
  - This value comes from your Bunpro session cookie / frontend token, not the public API key.
  - In your browser, open the Developer Tools, go to `Application` (or `Storage`), and search for `frontend_api_token` or `BUNPRO_FRONTEND_TOKEN` in cookies/local storage.
  - Copy the token value exactly as it appears and paste it into `.env`.
- `BUNPRO_REFERRAL` is optional; if omitted, the default link is `https://bunpro.jp`.

## Browser Setup

This project requires a browser-side bridge to tell the local WebSocket server when Bunpro is open or closed.

1. Install Tampermonkey from your browser extension store.
2. Open a new Tampermonkey script and paste the contents of `tampermonkey.user.js`.
3. Save the script and open Bunpro in your browser.

The script connects to `ws://127.0.0.1:8765` and sends:

- `bunpro-open` when Bunpro is loaded
- `bunpro-closed` when the page is closed or navigated away from

If your local server uses a different host or port, update `WS_URL` inside `tampermonkey.user.js`.

## Configuration

The project also uses `config.js` for:
- Discord RPC `clientId`
- referral URL
- `defaultDeckId` used to detect new lessons

You can adjust these values in `config.js` if needed.

## Usage

Start the project:

```bash
npm start
```

This will launch:

- the local WebSocket server (`src/ws/index.js`)
- the Discord RPC client (`src/rpc/activity.js`)
- Bunpro mode detection using the frontend API

## WebSocket Integration

The WebSocket server listens on port `8765` and expects these messages:

- `bunpro-open` — Bunpro is open in the browser
- `bunpro-closed` — Bunpro is closed

This allows the app to switch to `idle` mode when Bunpro is not visible.

> Note: this project does not include a browser client except for the Tampermonkey bridge.

## Project Structure

- `src/index.js`: entry point
- `src/ws/index.js`: local WebSocket server
- `src/rpc/activity.js`: Discord RPC logic
- `src/api/`: Bunpro API wrappers
- `src/utils/safeFetch.js`: safe HTTP fetch wrapper
- `config.js`: global configuration

## Requirements

- Node.js 18+ recommended
- Valid Bunpro frontend token
- Discord application configured for RPC (client ID in `config.js`)

## Contributing

Suggestions are welcome!

## License

This project is licensed under the MIT License.
