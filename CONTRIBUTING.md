# Contributing to StockPilot

Thanks for your interest in this project!

## Local Setup

1. Clone the repo:
   git clone https://github.com/powerup8/stockpilot.git
   cd stockpilot

2. Install dependencies:
   npm install

3. Copy the environment template and fill in your own values:
   cp .env.example .env

4. Run database migrations:
   npx prisma migrate dev

5. Start the dev server:
   npm run dev

6. Visit http://localhost:3000

## Making Changes

- Create a new branch for your change: git checkout -b feature/your-feature-name
- Write clear, conventional commit messages (feat:, fix:, docs:, style:, refactor:)
- Run lint and typecheck before committing:
  npm run lint
  npx tsc --noEmit
- Open a pull request with a clear description of what changed and why

## Code Style

- TypeScript strict mode — no any
- Tailwind CSS for styling, following the existing design tokens
- Server actions preferred over API routes for form submissions where possible