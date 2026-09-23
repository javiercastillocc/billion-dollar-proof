# Billion Dollar Protocol

Public dashboard for the Billion Dollar Protocol — live, on-chain proof of collective belief accumulating in one TRON wallet.

**Protocol wallet:** [`TMEykAzpSaCbiaJWbQ3NLp5MRZC8pAvTVF`](https://tronscan.org/#/address/TMEykAzpSaCbiaJWbQ3NLp5MRZC8pAvTVF)

## What the numbers mean

| Stat | Source |
| --- | --- |
| **Total Value (USD)** | Current USDT (TRC-20 `TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t`) plus TRX balance, priced from CoinGecko, then Coinbase, then Binance |
| **Witnesses** | Confirmed TRON transactions that involve the protocol wallet (the public activity list). Subtitle: Transactions |
| **Next Milestone** | First unmet target, starting at **$100,000**, then $1M / $10M / $100M / $1B |
| **Recent Witnesses** | Latest transaction hashes, truncated, linking to [TronScan](https://tronscan.org) |

There are no simulated counters. If a request fails, the dashboard shows an error and a retry control.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed localhost URL.

## Build

```bash
npm run build
npm run preview
```

`npm run build` writes a static site to `dist/`.

## Deploy

Production must serve the Vite build in `dist/`, not the repository root. The source `index.html` loads `/src/main.jsx`, which browsers can run only with the Vite dev server. Publishing that file produces a blank page.

Netlify site `gleaming-tarsier-541e46` ([billiondollarproof.ai](https://billiondollarproof.ai)) reads [`netlify.toml`](./netlify.toml) on each deploy. File-based settings override the same fields in the Netlify UI.

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node.js | `22` (`NODE_VERSION`; Vite 7 needs 20.19+ or 22.12+) |
| Environment variables | none |

After this config is on the production branch, open the site in Netlify and use **Deploys → Trigger deploy → Clear cache and deploy site**. That drops a cached install from the previous publish of the repository root. A normal deploy also replaces the published files; clear cache if the new build still skips install or uses an old Node version.

Confirm the deploy log shows `npm run build` and publish directory `dist`. The live `index.html` must reference hashed files under `/assets/`, never `/src/main.jsx`.

The same build command and publish directory work on any other static host.

The browser talks to public APIs only:

- [TronGrid](https://api.trongrid.io) for wallet balance and transactions
- [CoinGecko](https://api.coingecko.com), [Coinbase](https://api.coinbase.com), or [Binance](https://api.binance.com) for the TRX price

No API keys are committed. If you later add a TronGrid `TRON-PRO-API-KEY` for higher rate limits, keep it out of git and document it here.

## Stack

React + Vite. Styling is plain CSS (no Tailwind).
