# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

flaschenbot is an Express.js/TypeScript service that monitors product sales at flaschenpost.de. It checks favorites stored in Notion against current offers, tracks changes, and posts updates to Mastodon.

## Development Commands

```bash
# Development with hot-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Run built application
npm run start:dist

# Run from TypeScript directly
npm start

# Lint TypeScript files
npm run lint
```

## Architecture

### Core Flow

1. **Routes** (`src/routes/`) - Express endpoints that orchestrate the business logic

   - `/combined` - Main endpoint that checks favorites, compares offers, updates Notion, and posts to Mastodon
   - `/articles` - Fetches article details from flaschenpost API
   - `/favorites` - Manages Notion favorites database
   - `/status` - Posts status updates to Mastodon

2. **Clients** (`src/client/`) - External service integrations

   - `flaschenpost.client.ts` - Fetches product data from flaschenpost.de API (warehouse ID: 28)
   - `notion.client.ts` - Manages two Notion databases: favorites and saved offers
   - `mastodon.client.ts` - Posts status updates when offers change

3. **Rules** (`src/rules/`) - Business logic transformations

   - Process flaschenpost API responses to extract offer data
   - Filter and transform Notion database records
   - Compose Mastodon status messages with offer details

4. **Authentication** (`src/utils/auth.ts`) - Bearer token authentication middleware

### Key Environment Variables

- `NOTION_API_TOKEN` - Notion API authentication
- `FAVORITES_DATABASE_ID` - Notion database for user favorites
- `SAVED_OFFERS_DATABASE_ID` - Notion database for tracking current offers
- `MASTODON_TOKEN` - Mastodon API authentication
- `AUTH_TOKEN` - Bearer token for API authentication

### Important Implementation Details

- The service compares article IDs between current flaschenpost offers and previously saved offers in Notion
- When offers change, it archives old Notion pages and creates new ones
- Sale detection uses `offerPrice < price` comparison to identify discounted items
- Savings calculations use `price - offerPrice` for both amount and percentage
- Article descriptions are cleaned to remove packaging indicators like "(Glas)" using regex
- Deployed on Vercel with custom build configuration (`vercel-build` script)
