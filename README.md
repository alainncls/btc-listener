# BTC Listener

This project aims to show a basic implementation of a Bitcoin transactions listener and emitter.

## Libraries used

- `zeromq` to stream transactions from a node
- `bitcoinjs-lib` to decode those transactions
- `bitcoin-core` to interact with a node over RPC

## Launch instructions

1.  Start the local environment (node + CLI)

        docker compose up
