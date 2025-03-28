# 🏦 Smart Bank - Decentralized Banking DApp

**Smart Bank** is a **full-stack blockchain** solution that brings traditional finance operations to Web3, combining a **Solidity smart contract** with an interactive **React frontend**. Users can securely **deposit, withdraw, and track ETH balances** directly through an intuitive interface, while accessing **real-time on-chain contract data**, all deployed on the Arbitrum Sepolia testnet for seamless testing.

## ✨ Key Features

- 💰 Deposit and withdraw ETH securely
- 🔄 Reactive user balance tracking
- 🔍 Query any Smart Bank user balance
- 📜 Transparent on-chain contract details
- 👤 Adjustable max contract balance (admin-only function)
- 🔗 Web3-Native Login via MetaMask integration
- 🌐 Immutable transactions logs recorded on Arbitrum Sepolia blockchain
- 🎨 Clean and intuitive UI with responsive design

## 🔥 Live Demo

👉 [https://smart-bank-one.vercel.app/](https://smart-bank-one.vercel.app/)

<div style="text-align:center">
  <a href="https://smart-bank-one.vercel.app/" target="_blank">
    <img src="./smart-bank-front/public/demo.gif" width="400" style="border:1px solid #808080; border-radius:8px"/>
  </a>
</div>

## 🛠️ Tech Stack

- **Smart Contract**: Solidity (v0.8.24)
- **Blockchain**: Arbitrum Sepolia Testnet (via Infura RPC endpoint)
- **Frontend**: React + Vite
- **UI Libraries**: Material-UI + TailwindCSS
- **Web3 Stack**:
  - Ethers.js (Frontend integration)
  - Infura (Reliable blockchain node access)
- **Deployment**:
  - Smart Contract: Remix IDE → [Arbiscan Sepolia](https://sepolia.arbiscan.io/address/0xc08ba5c29763cc58c4edd6cce99be1b401d5390a)
  - Frontend: Vercel

## 🚀 How to Use

### Prerequisites

1. Install [MetaMask](https://metamask.io/) wallet extension
2. Add **Arbitrum Sepolia** Testnet:

   - Network Name: Arbitrum Sepolia
   - RPC URL: `https://sepolia-rollup.arbitrum.io/rpc`
   - Chain ID: 421614
   - Currency: ETH

   _(Developed using [Infura](https://www.infura.io/) infrastructure)_

3. Get test ETH from [Alchemy Faucet](https://www.alchemy.com/faucets)

### Quick Start

1. Open [https://smart-bank-one.vercel.app/](https://smart-bank-one.vercel.app/)
2. Click "**Conecta tu billetera**" (MetaMask will prompt)
3. Test core functions:
   - Deposit/Withdraw test ETH
   - Track live balance changes
4. Query any Smart Bank Balance (try admin: `0xde4...9FA9`)
5. View contract on-chain details
6. Observe admin-restricted functions like "Modify Max Balance"

> **Note**: Uses testnet environment only - No real funds involved

## ⚡ Next-Level Enhancements

- TypeScript integration for type-safe development
- Comprehensive testing suite
- Light&Dark mode toggle
- Multi-chain support
- Instant balance updates via web3 subscriptions

## 📜 License

This project is licensed under LGPL-3.0-only.
