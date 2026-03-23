# Access Layer Server

This repository contains the backend API for Access Layer.

The server is the off-chain layer for the product. It handles the parts of the marketplace that do not need to live inside Stellar smart contracts, while coordinating with the client and contracts as the product grows.

## Purpose

The server is responsible for:

- creator and user profile management
- auth and session-related flows
- creator metadata and perk definitions
- indexing contract activity for faster reads
- notifications, analytics, and moderation workflows
- access checks for gated off-chain content

## Tech

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL

## Current state

- Express app bootstrap exists in [src/app.ts](./src/app.ts)
- common backend middleware is already scaffolded
- reusable starter utilities are kept in generic Access Layer-safe form

## Local setup

```bash
pnpm install
cp .env.example .env
pnpm exec prisma generate
pnpm dev
```

The database layer is expected to run through Docker or your own local container setup.

## Verification

```bash
pnpm lint
pnpm build
```

## Open source workflow

- Read [CONTRIBUTING.md](./CONTRIBUTING.md) before starting work.
- Browse the maintainer issue inventory in [docs/open-source/issue-backlog.md](./docs/open-source/issue-backlog.md).
- Review [SECURITY.md](./SECURITY.md) before reporting vulnerabilities.
- Use the issue templates in [`.github/ISSUE_TEMPLATE`](./.github/ISSUE_TEMPLATE) for new scoped work.
