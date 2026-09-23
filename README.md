# Pegasus Portfolio

A Next.js portfolio for Pegasus, a designer and developer focused on thoughtful interfaces and high-performance web experiences.

## Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS and custom CSS
- Framer Motion
- Lenis smooth scrolling
- Clash Grotesk via Fontshare

## Project structure

```text
src/
  app/                 Next.js route entry, layout, and global styles
  components/
    sections/          Hero, About, Works, Services, and Skill Stack
    effects/            Pixel-art effects
    site/               Project cards and navigation interactions
    ui/                 Cursor and reusable UI components
  lib/                 Shared utilities
public/
  images/hero/         Hero imagery
  images/decorative/   Pixel-art and cursor assets
```

Next.js and tooling configuration files remain at the repository root because the framework discovers them there.

## Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open <http://localhost:3000> in your browser.

Useful checks:

```bash
npm run lint
npm run build
```

## Figma MCP setup

Copy `.vscode/mcp.json.example` to `.vscode/mcp.json`. VS Code will prompt for the Figma API key when the MCP server starts.

For Cline, set `FIGMA_API_KEY` in the environment before starting the editor. The local MCP configuration files are ignored by Git and must not be committed.

Never place an API key in a tracked file. If a key has been committed previously, revoke it and create a replacement before publishing the repository.
