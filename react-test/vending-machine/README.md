# Vending Machine

An interview practice project. /scaffolding has the basic structure, /practice is for practicing.

**Time:** 45-60 minutes
**Stack:** React (function components + hooks). No extra libraries.

Build a vending machine UI. The machine sells a small catalog of snacks. A customer inserts coins, selects a product, and either vends it or gets their money back.

## Provided data

Each product has:

- `id`, `name`, `price` (cents), `stock`, and an optional `icon`

The customer can insert **quarters (25 cents)** and **dollars (100 cents)**.

Prices and starting inventory live in `src/data/`. Use `formatCents` from `src/utils/money.js` for display.

## Required behavior

1. **Show products** — name, price, and remaining stock. Out-of-stock items should look disabled.
2. **Insert money** — clicking a denomination increases the inserted balance.
3. **Select a product** — one product selected at a time; selection is visible.
4. **Vend**
   - No selection → status message, nothing else changes
   - Out of stock → status message
   - Not enough money → status message
   - Success → decrement that product's stock, reduce the balance by the price, show a success message, and report leftover balance as change (a cents total is enough; you do not need to break it into coins)
5. **Return coins** — refund the full inserted balance, clear selection, show how much was returned.
6. **Status display** — always show current balance and the latest message.

Fill in the `TODO`s in `src/App.jsx`. Component shells and layout are already wired; the interview is the behavior.

## Stretch (only if you finish early)

- Accept more coins by adding denominations in `src/data/denominations.js` (nickel, dime).
- Make change as a list of coins (greedy: 100, 25, 10, 5).
- Disable **Vend** until a product is selected.
- Restock a product from the UI.

## What we are looking for

State shape, derived vs stored values, immutable updates, and encoding the business rules in handlers rather than fighting the UI.

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```
