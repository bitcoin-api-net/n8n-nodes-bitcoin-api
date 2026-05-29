# n8n Community Node for Bitcoin API

The most comfortable (DX) Bitcoin API for developers, AI agents, and vibe coders.
This is the official community node for [Bitcoin API](https://bitcoin-api.net), allowing you to interact with real-time Bitcoin price data right inside your n8n workflows.

## Features

This node currently supports the following operations:

- **Price**
  - **Get Price:** Get the current Bitcoin price.
  - **Get Klines (Candles):** Get historical OHLCV candle data with customizable intervals (1m, 5m, 1h, 1d, etc.).
  - **Get Current Kline (Candle):** Get the latest open kline (candle) for a given interval.

## How to get started

1. Sign up and get your API key at [Bitcoin API](https://bitcoin-api.net).
2. Install this node in your n8n instance (Go to Settings -> Community Nodes -> Install -> `@bitcoin-api-net/n8n-nodes-bitcoin-api`).
3. Add the **Bitcoin API** node to your workflow.
4. Create a new credential, paste your API Key, and start building!

## Design Philosophy

Bitcoin API is designed for **Vibe Coders** and **AI Agents**. We keep the barrier to entry extremely low, focusing on simplicity, fast responses, and a great Developer Experience (DX). 

## Resources

* [Official Website & Documentation](https://bitcoin-api.net)
* [GitHub Repository](https://github.com/bitcoin-api-net/n8n-nodes-bitcoin-api)

## License

[MIT](https://github.com/bitcoin-api-net/n8n-nodes-bitcoin-api/blob/main/LICENSE)
