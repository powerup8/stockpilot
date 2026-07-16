StockPilot — Case Study

The Problem

Small teams and solo operators often manage inventory in spreadsheets. There's no alert when stock runs low, no real search, no structure — just rows and columns that grow messier over time. By the time someone notices an item is out of stock, it's often too late to reorder in time. StockPilot exists to fix that: one place to track what you have, get flagged automatically when something's running low, and find anything in seconds instead of scrolling through a spreadsheet.

Why This Idea

I chose StockPilot from a list of over 60 possible projects specifically because inventory tracking is a problem I could picture concretely — a real business owner checking their stock before placing a supplier order, a warehouse worker double-checking a SKU. That concreteness mattered: it's much easier to design good UX for a problem you can picture clearly than for something abstract.

Scoping the Build

The original brief described StockPilot as multi-warehouse inventory management with geo-distributed stock levels. Early on, I made a deliberate decision to narrow that scope to single-location tracking instead. This wasn't a shortcut — it was a judgment call: a fully working, well-tested, polished single-location tracker is worth more than a half-finished multi-warehouse system with untested edge cases. Depth over breadth.

The same reasoning applied to password reset via email — implementing it properly would require standing up transactional email infrastructure (a provider like Resend, token generation, expiry logic) that would pull time away from getting the core experience right. I documented both decisions openly in the README's "Known Limitations" section rather than leaving them as silent gaps.

Technical Decisions


Next.js (App Router) + TypeScript in strict mode — a modern, type-safe foundation. This was my first real project in TypeScript, so I leaned on generated types from Prisma wherever possible rather than hand-writing complex type definitions.
MySQL + Prisma ORM, hosted on Railway in production — I started with local MySQL via XAMPP, then migrated to a hosted database once I moved toward deployment, keeping local and production environments consistent.
NextAuth (Credentials provider) for authentication — passwords hashed with bcrypt, sessions managed via JWT, with the authenticated user's database ID injected into the session token via a custom callback so every server action could query only that user's own data.
Row-level authorization on every mutation — not just checking "is someone logged in," but explicitly verifying that the logged-in user owns the specific product they're trying to edit or delete, enforced server-side, not just hidden in the UI.
Server actions instead of separate API routes for form submissions — a more direct pattern that kept the codebase smaller and easier to reason about.
Tailwind CSS with a defined design system — a consistent charcoal-and-electric-blue palette, one border radius, one type scale, applied identically across the landing page, auth screens, dashboard, and product forms.


What Actually Went Wrong (and What I Learned Fixing It)

The real learning in this project came from debugging, not from writing new features. A few of the harder problems:

The "works locally, breaks in production" bug. My database connection code had a hardcoded host: 'localhost' value, left over from early local testing against XAMPP. It worked perfectly on my machine — because localhost correctly pointed at my own laptop's MySQL server. But once deployed to Vercel, localhost pointed at Vercel's own servers, which obviously have no database running on them. The fix was small (read the connection string from an environment variable instead of hardcoding it), but finding it required actually reading server logs rather than guessing, and it taught me that "it works on my machine" is never proof that it'll work in production.

A case-sensitivity bug that only appeared on the hosted database. A migration file had a table name in lowercase in one line and capitalized in another. On my local Windows machine, MySQL doesn't care — it treated both as the same table. On Railway's Linux-based MySQL, table names are case-sensitive, so the same exact code failed there but not locally. This was a good early lesson that "it passed on my machine" doesn't account for differences in the actual infrastructure your code runs on.

Prisma's driver adapter and connection pooling in development. Next.js's hot-reload would sometimes create new database client instances without properly closing old ones, eventually exhausting the connection pool during active development. The fix was caching the adapter itself (not just the client) across hot reloads — a subtle but important distinction once I understood what was actually happening under the hood.

A missing logout button. Late in the build, while doing a routine mobile responsiveness check, I realized the app had no way to log out — a functional gap that had been sitting there the whole time because it's easy to forget the "obvious" pieces once you're deep in feature work. It's a reminder that testing the full user journey, not just the features you're actively building, catches gaps that isolated feature testing misses.

Result

A live, deployed, tested product with:


Full authentication (signup, login, hashed passwords, protected routes, logout)
Complete CRUD on inventory products, correctly scoped per user
Automatic low-stock flagging based on a per-product threshold
Search and filter by name, SKU, or category, reflected in the URL so results are shareable
A consistent, deliberately restrained design system across every screen
A CI pipeline running lint and typecheck automatically on every push
SEO basics — metadata, Open Graph tags, sitemap, robots.txt
Deployed on Vercel, backed by a hosted MySQL database on Railway


What I'd Build Next


Email-based password reset, now that the core experience is solid
Multi-warehouse support, splitting inventory by location
CSV export for reporting
Basic analytics — stock trends over time, not just a point-in-time snapshot


Final Reflection

This was my first project working with TypeScript, Prisma, and Next.js's App Router together. Most of what I actually learned didn't come from a tutorial — it came from hitting a real error, reading the actual stack trace instead of guessing, and understanding why something broke before fixing it. That process — diagnose before patching — is the habit I'm taking away from this project more than any specific syntax or library.


Live demo: https://stockpilot-jade.vercel.app
Repo: https://github.com/powerup8/stockpilot