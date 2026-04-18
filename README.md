# GRAMO — Blockchain-Based Loyalty & Rewards Platform

A full-stack loyalty platform built on [Algorand](https://algorand.co), connecting physical retail purchases to on-chain token rewards.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Website](https://img.shields.io/badge/web-gramo.io-blue)](https://gramo.io)
[![App](https://img.shields.io/badge/app-app.gramo.io-green)](https://app.gramo.io)
[![ASA](https://img.shields.io/badge/ASA-393498731-purple)](https://allo.info/asset/393498731/token)

---

## What is GRAMO?

GRAMO is a blockchain loyalty platform on Algorand that connects physical retail purchases to on-chain token rewards. Customers earn GRAMO tokens (ASA 393498731) when they shop at partner stores, and can withdraw, transfer, or redeem those tokens — all without needing to understand crypto wallets.

- Built with **Django REST Framework** (backend) + **React** (frontend), connected to Algorand via **py-algorand-sdk**
- Production system since 2022 with ~2,000 registered users and 159 unique customer wallets
- Custodial wallet system that lets Web2 users interact with Web3 seamlessly

## Architecture

```
┌─────────────────┐     ┌──────────────────────┐     ┌─────────────────┐
│   React SPA     │────▶│  Django REST API      │────▶│  Algorand Node  │
│   (frontend/)   │     │  (api/)               │     │  (algod)        │
│                 │     │                       │     │                 │
│  React Router   │     │  JWT Auth (djoser)    │     │  ASA 393498731  │
│  Axios          │     │  Wallet Management    │     │  GRAMO Token    │
│  Context API    │     │  Claim Pipeline       │     │                 │
└─────────────────┘     └──────────┬───────────┘     └─────────────────┘
                                   │
                              ┌────▼────┐
                              │  MySQL  │
                              │   DB    │
                              └─────────┘
```

- **Django REST Framework API** — JWT authentication via djoser/simplejwt, MySQL database
- **React SPA** — React Router v6, Axios HTTP client, context-based state management
- **Algorand integration** — py-algorand-sdk, algod connection, ASA transfers, wallet generation
- **Custodial wallet system** — auto-generated wallets, pre-funded with ALGO, pre-opted-in to GRAMO ASA

## Key Features (Reusable Modules)

- **Algorand-Django bridge** — wallet generation, ASA transfers, balance tracking, opt-in management
- **Custodial wallet system** — Web2-to-Web3 user onboarding without requiring users to manage crypto wallets
- **Claim/validation pipeline** — proof submission (receipt upload) → admin validation → token distribution via email notification
- **React frontend** — auth flows (registration, activation, password reset), wallet management, claim/redemption UI

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3.x, Django 3.2, Django REST Framework, djoser, simplejwt, py-algorand-sdk, django-environ |
| Frontend | React 18, React Router v6, Axios, Webpack |
| Database | MySQL |
| Blockchain | Algorand (ASA 393498731) |
| Deployment | Gunicorn, Nginx, Supervisor |

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- MySQL server
- Algorand node access (or use a public API like [Nodely](https://nodely.io))

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/CryptoGRAMO/gramo_dashboard.git
cd gramo_dashboard

# 2. Set up environment variables
cp .env.example dashboard_gramo_project/.env
# Edit .env with your actual values (database, email, Algorand credentials)

# 3. Create a Python virtual environment
python3 -m venv env
source env/bin/activate

# 4. Install Python dependencies
pip install -r requirements.txt

# 5. Run database migrations
python manage.py migrate

# 6. Install frontend dependencies
cd frontend
npm install

# 7. Build the frontend (production) or watch (development)
npm run build    # production
# npm run dev    # development (watch mode)

# 8. Run the Django server
cd ..
python manage.py runserver
```

> **Note:** You need an Algorand node (or a public API like Nodely) and must fund the distribution wallet with ALGO + your ASA for the token distribution features to work.

## Adapting for Your Own Use Case

1. **Change the ASA ID** — update `gramo_id` in `api/config_testnet.py` and the ASA references in settings
2. **Configure partner stores** — use the Django admin panel to manage stores and reward tiers
3. **Customize reward tiers** — adjust token amounts in the claim/validation logic
4. **Replace branding** — update the React frontend in `frontend/src/` and static assets in `frontend/static/`
5. **Set up your distribution wallet** — create an Algorand wallet, fund it with ALGO, opt-in to your ASA, and add credentials to `.env`

## Project Structure

```
gramo_dashboard/
├── api/                          # Django app — REST API & Algorand integration
│   ├── config_testnet.py         # Algorand network configuration
│   ├── gramoScripts/             # Standalone Algorand utility scripts
│   ├── models.py                 # UserAccount, Wallets, Settings models
│   ├── serializers.py            # DRF serializers
│   ├── views.py                  # API endpoints (wallet, withdraw, claim, etc.)
│   └── urls.py                   # API URL routing
├── dashboard_gramo_project/      # Django project settings
│   ├── settings.py               # Django configuration
│   ├── urls.py                   # Root URL routing
│   └── wsgi.py                   # WSGI entry point
├── frontend/                     # React SPA
│   ├── src/
│   │   ├── components/           # Navbar, Footer, App
│   │   ├── containers/           # Page-level components (Login, Claim, Withdraw, etc.)
│   │   ├── context/              # React context (Auth, Global state)
│   │   ├── hocs/                 # Layout higher-order component
│   │   └── middleware/           # Auth middleware
│   ├── static/                   # CSS, images, vendor libraries
│   ├── templates/                # Django template (index.html entry point)
│   ├── package.json              # Node.js dependencies
│   └── webpack.config.js         # Webpack bundler configuration
├── infra/                        # Infrastructure / deployment scripts
├── media/                        # User-uploaded files (gitignored)
├── .env.example                  # Environment variable template
├── requirements.txt              # Python dependencies
├── manage.py                     # Django management script
└── LICENSE                       # MIT License
```

## Project Wallets

See: [GRAMO Wallets (April 2026)](https://github.com/CryptoGRAMO/GRAMO/blob/main/GRAMO_wallets_01042026.txt)

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Links

- **Website:** https://gramo.io
- **App:** https://app.gramo.io
- **Token:** https://allo.info/asset/393498731/token
- **Whitepaper:** https://gramo.io/the-token/whitepaper/
- **xGov Proposal:** https://xgov.algorand.co/proposal/3500632412
- **Forum Discussion:** https://forum.algorand.co/t/open-sourcing-the-gramo-loyalty-platform-xgov-proposal-3500632412/15245
