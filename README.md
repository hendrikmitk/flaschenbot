![flaschenbot](./img/logo-github.png?raw=true 'flaschenbot Logo')

![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=flaschenbot&style=flat-square&logo=false) ![GitHub repo size](https://img.shields.io/github/repo-size/hendrikmitk/flaschenbot?style=flat-square) ![Lines of Code](https://aschey.tech/tokei/github/hendrikmitk/flaschenbot?style=flat-square) ![GitHub last commit](https://img.shields.io/github/last-commit/hendrikmitk/flaschenbot?color=red&style=flat-square)

Service for checking products on sale at the drinks delivery service flaschenpost.de.

## General info

flaschenbot is an [Express](https://expressjs.com/)-powered Node.js application written in [TypeScript](https://www.typescriptlang.org/) using [Notion](https://www.notion.so/) as database. Posting a status on [Mastodon](https://docs.joinmastodon.org/client/intro/) also requires an authorized Mastodon account.

## Project setup and usage

### Install dependencies

```sh
npm install
```

### Compile and hot-reload for development

```sh
npm run dev
```

### Compile for production

```sh
npm run build
```

## Usage

The service exposes the following endpoints:

### `GET /`

Health check endpoint. Returns `200 OK`.

### `GET /articles?id=<article_id>`

Fetches article details from the flaschenpost API.

- `id` (required): One or more flaschenpost article IDs

Example: `/articles?id=3935&id=18438`

### `GET /favorites`

Returns all favorites stored in the Notion database, including their active status.

> [!IMPORTANT]
> Requires authentication via `x-api-key` header.

### `GET /combined`

Main endpoint that orchestrates the full workflow:

1. Fetches active favorites from Notion
2. Checks current offers at flaschenpost
3. Compares with previously saved offers
4. If offers changed: archives old entries, saves new ones, and posts to Mastodon

> [!IMPORTANT]
> Requires authentication via `x-api-key` header.

### `GET /status?id=<article_id>`

Posts a Mastodon status for the given article IDs if they are on sale.

- `id` (required): One or more flaschenpost article IDs

> [!IMPORTANT]
> Requires authentication via `x-api-key` header.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)

## Contact

If you encounter a bug, feel free to open an [issue] or shoot me an [email].

[issue]: https://github.com/hendrikmitk/flaschenbot/issues
[email]: mailto:bugs@hendrikharlichs.de

![Mastodon Follow](https://img.shields.io/mastodon/follow/113471246516778381?domain=https%3A%2F%2Fmstdn.social&style=for-the-badge&logo=mastodon&label=follow%20%40flaschenbot%20on%20mastodon&color=5d4fe6&link=https%3A%2F%2Fmstdn.social%2F%40flaschenbot)

## Disclaimer

Not associated with flaschenpost SE in any way.
