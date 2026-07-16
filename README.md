# StockPilot

> Simple inventory tracking with real-time low-stock alerts — know what you have, before you run out.

**Live demo → https://stockpilot-jade.vercel.app**

## Demo Login

Try it instantly without signing up:
- **Email:** user@gmail.com
- **Password:** User@123

## Features

- Secure authentication (signup, login, hashed passwords, protected routes)
- Full CRUD for inventory products — create, edit, delete, list
- Automatic low-stock flagging based on a per-product threshold
- Search/filter by product name, SKU, or category
- Row-level authorization — users can only view/edit their own products
- Clean, consistent UI with loading states and graceful error handling

## Tech Stack

Next.js (App Router) · TypeScript (strict) · Tailwind CSS · MySQL · Prisma ORM · NextAuth (Credentials) · Railway (database hosting) · Vercel (deployment)

## Quick Start

```bash
git clone https://github.com/powerup8/stockpilot.git
cd stockpilot
npm install
cp .env.example .env   # then fill in your own DATABASE_URL and AUTH_SECRET
npx prisma migrate dev
npm run dev             # http://localhost:3000
```

## Environment Variables

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | MySQL connection string (e.g. from Railway or local MySQL) |
| `AUTH_SECRET` | Session signing secret — generate with `npx auth secret` |

## Architecture

**Data model:** Two tables — `User` (id, name, email, hashed password) and `Product` (id, name, sku, category, quantityOnHand, lowStockThreshold, userId). Each product belongs to exactly one user via a foreign key.

**Auth:** NextAuth with a Credentials provider. Passwords are hashed with bcrypt before storage. Sessions use JWT strategy, with the user's database ID injected into the token via a custom callback so server actions can query only that user's data.

**Authorization:** Every write (create/update/delete) checks that the authenticated user owns the product being modified — not just that they're logged in.

## Known Limitations

- **Password reset via email is not implemented.** This was scoped out to prioritize a fully tested core experience within the project timeline. A future iteration would add token-based reset via a transactional email provider (e.g. Resend).
- **Single-location inventory only.** The original concept included multi-warehouse support; this was narrowed to single-location tracking to ship a polished, fully working core rather than a partially built multi-warehouse system.

## What I'd Build Next

- Multi-warehouse inventory splitting
- Email-based password reset
- CSV export of inventory
- Basic analytics (stock trends over time)


## Demo Video

[Watch the 3-minute walkthrough]https://drive.google.com/file/d/1A-wDWgvzfz9WIku8duJE6zTFL-xy668C/view?usp=drivesdk


## Case Study

**Problem:** Small teams tracking inventory in spreadsheets lose track of stock levels until it's too late — no alerts, no search, no structure.

**Approach:** Built a focused, single-purpose inventory tracker rather than a sprawling multi-warehouse system — prioritizing a fully working, polished core (auth, CRUD, search, low-stock alerts) over broad but shallow feature coverage.

**Result:** A live, deployed, tested product handling real authentication, authorization, and data persistence — with a consistent design system applied across every page.

[Read the full case study](docs/case-study.md)



## License

MIT — see [LICENSE](./LICENSE)

---

*Built for the Digital Heroes Full Stack Developer Trial.*