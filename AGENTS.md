# flaschenbot

Express.js/TypeScript service that monitors product sales at flaschenpost.de. It checks favorites stored in Notion against current offers, tracks changes, and posts updates to Mastodon.

## Core Commands

- Lint TypeScript: `npm run lint`
- Build for production: `npm run build`
- Run production build: `npm run start:dist`
- Run from source: `npm start`
- Dev mode with hot-reload: `npm run dev`

The application does not have tests configured—rely on linting and manual verification.

## Project Layout

```
├─ api/           → [Purpose unknown, appears empty]
├─ bruno/         → API request collection
├─ public/        → Static assets
├─ src/
│  ├─ client/     → External service integrations (flaschenpost, Notion, Mastodon)
│  ├─ routes/     → Express endpoints orchestrating business logic
│  ├─ rules/      → Business logic transformations and data processing
│  ├─ functions/  → Utility functions (e.g., ID comparison)
│  ├─ models/     → TypeScript interfaces (Favorite, Offer)
│  ├─ utils/      → Middleware (authentication)
│  ├─ app.ts      → Express app setup and route registration
│  └─ index.ts    → Entry point, starts server on port 3000
```

## Architecture Overview

**Flow**: HTTP request → Route → Client (fetches data) → Rules (transforms) → Client (writes back) → Response

- **Routes** (`src/routes/`) orchestrate the workflow:

  - `/combined` - Main endpoint: fetch favorites from Notion, check flaschenpost offers, compare with saved offers, update Notion, post to Mastodon
  - `/articles` - Fetch article details from flaschenpost API
  - `/favorites` - Manage Notion favorites database
  - `/status` - Post status updates to Mastodon

- **Clients** (`src/client/`) handle external API calls:

  - `flaschenpost.client.ts` - Fetches product data (warehouse ID: 28)
  - `notion.client.ts` - Manages two databases: favorites and saved offers
  - `mastodon.client.ts` - Posts status updates

- **Rules** (`src/rules/`) contain pure transformation logic:
  - Extract and filter data from API responses
  - Compose Mastodon status messages
  - Calculate savings and clean descriptions

## Development Patterns & Constraints

### Coding Style

- TypeScript strict mode enabled
- CommonJS modules (`module: commonjs`)
- Target: ES2016
- Use ESLint for code quality (`npm run lint`)
- Minimal comments—code should be self-documenting
- All clients export default objects with methods
- Routes use Express Router pattern
- Error handling with `http-status-codes` for consistent responses

### Key Conventions

- **Authentication**: All protected routes use `auth` middleware from `src/utils/auth.ts`

  - Expects `x-api-key` header matching `API_KEY` environment variable
  - Returns 401 Unauthorized on failure

- **Response Format**: All endpoints return consistent structure:

  ```typescript
  {
    code: number,
    text: string,
    message: string | undefined,
    data: any | undefined
  }
  ```

- **Notion Integration**:

  - Two databases: `FAVORITES_DATABASE_ID` and `SAVED_OFFERS_DATABASE_ID`
  - Favorites have: `id`, `active`, `article_name`, `flaschenpost_id`
  - Archive old pages before creating new ones

- **Sale Detection**: `offerPrice < price` identifies discounted items
- **Savings Calculation**: `price - offerPrice` for amount and percentage
- **Description Cleaning**: Remove packaging indicators like "(Glas)" using regex

### Dependencies

- `express` - Web framework
- `@notionhq/client` - Notion API SDK
- `axios` - HTTP client for flaschenpost API
- `dotenv` - Environment variable management
- `http-status-codes` - Standard HTTP status constants
- TypeScript with strict mode and ESLint

## Environment Variables Required

- `NOTION_API_TOKEN` - Notion API authentication
- `FAVORITES_DATABASE_ID` - Notion database storing user favorites
- `SAVED_OFFERS_DATABASE_ID` - Notion database tracking current offers
- `MASTODON_TOKEN` - Mastodon API authentication
- `API_KEY` - Bearer token for protecting API endpoints (x-api-key header)
- `PORT` - Server port (defaults to 3000)

## Deployment

- Hosted on Vercel
- Build script: `vercel-build` (currently just echoes, no-op)
- TypeScript compiled to `dist/` directory
- Run production: `npm run start:dist`

## Gotchas

- No test suite exists—verify changes manually or via curl/Bruno
- The `api/` directory is in tsconfig include but appears unused
- flaschenpost warehouse ID is hardcoded to 28
- Authentication uses `x-api-key` header (not Bearer token despite CLAUDE.md mentioning it)
- Notion page creation happens in forEach without await—potentially race conditions
- Empty `src/` directory when using LS tool—use Glob to find TypeScript files
