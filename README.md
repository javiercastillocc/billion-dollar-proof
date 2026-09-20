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

Any static host works (Netlify, Vercel, GitHub Pages).

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Environment variables:** none required

The browser talks to public APIs only:

- [TronGrid](https://api.trongrid.io) for wallet balance and transactions
- [CoinGecko](https://api.coingecko.com), [Coinbase](https://api.coinbase.com), or [Binance](https://api.binance.com) for the TRX price

No API keys are committed. If you later add a TronGrid `TRON-PRO-API-KEY` for higher rate limits, keep it out of git and document it here.

## Stack

React + Vite. Styling is plain CSS (no Tailwind).
