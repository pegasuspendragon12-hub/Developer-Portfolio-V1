# Developer Portfolio V1

A polished developer portfolio built from a Figma design and translated into a responsive, interactive Next.js experience.

The project follows a design-to-code workflow: the interface was designed in Figma first, then implemented with the help of AI-assisted development and the Framelink Figma MCP server. The MCP workflow was used to inspect the design system, layout measurements, typography, spacing, and visual details needed to reproduce the design accurately in code.

## Overview

Developer Portfolio V1 is a professional portfolio website focused on presenting design and development work through a visually precise interface. It combines a strong editorial layout with interactive motion, smooth scrolling, project previews, services, and a detailed skill stack.

The implementation is responsive and adapts the desktop Figma composition for smaller screens while preserving the original hierarchy, spacing rhythm, and visual language.

## Highlights

- Figma-first design and implementation workflow
- AI-assisted development for translating design decisions into production code
- Framelink Figma MCP used to inspect and reproduce the source design
- Responsive layout for desktop, tablet, and mobile screens
- Smooth Lenis scrolling across the page
- Scroll-based About and Services interactions
- Animated service text reveals
- Interactive project cards with hover states and cursor feedback
- Custom smooth cursor and pixel-art cursor companion
- Optimized local image handling through Next.js
- Clear separation between page sections, effects, site components, and UI components

## Technology Stack

### Core

- **Next.js 16** with the App Router for application structure, routing, metadata, image handling, and production builds
- **React 19** for component-based UI and interactive state
- **TypeScript** for typed components, props, configuration, and safer refactoring

### Styling and typography

- **Tailwind CSS** for utility-based layout and responsive styling
- **Custom CSS** for pixel-precise Figma measurements, sticky layouts, dividers, and responsive rules
- **Clash Grotesk** loaded through Fontshare for the portfolio typography

### Motion and interaction

- **Framer Motion** for animated reveals, hover interactions, transforms, opacity, and cursor motion
- **Lenis** for smooth scrolling and scroll-linked section behavior
- **requestAnimationFrame** for smooth pixel-cat movement
- **Next Image** for optimized image rendering and responsive image delivery

### Design tooling

- **Figma** as the source design tool
- **Framelink Figma MCP** for connecting the design reference to the implementation workflow
- **AI-assisted coding** for component creation, styling translation, debugging, and iteration

## Design-to-code workflow

1. Define the page composition and interaction direction in Figma.
2. Inspect the Figma design through Framelink Figma MCP.
3. Extract layout measurements, typography, colors, spacing, and component relationships.
4. Translate the design into reusable React and TypeScript components.
5. Use custom CSS and Tailwind utilities to reproduce the desktop layout precisely.
6. Add responsive behavior for smaller screens without losing the original hierarchy.
7. Add motion and interaction using Framer Motion and Lenis.
8. Validate the implementation through linting, production builds, and visual review.

The goal is not to generate a generic portfolio template. The goal is to preserve the decisions made in the source design while making the result maintainable and usable as a real website.

## Project structure

```text
src/
  app/
    page.tsx             Main page composition
    layout.tsx           Root layout and metadata
    globals.css          Global styles and precise section styling

  components/
    sections/
      hero-section.tsx
      about-section.tsx
      works-section.tsx
      services-section.tsx
      skill-stack-section.tsx
      index.ts

    effects/
      pixel-cat.tsx

    site/
      project-card.tsx
      scramble-link.tsx

    ui/
      oneko.tsx
      smooth-cursor.tsx

  lib/
    utils.ts              Shared utility helpers

public/
  images/
    hero/                 Hero imagery
    decorative/           Pixel-art and cursor assets

.vscode/
  mcp.json.example        Safe public MCP configuration template

cline_mcp_config.example.json
README.md
package.json
next.config.ts
tsconfig.json
eslint.config.mjs
postcss.config.mjs
```

Next.js configuration files remain at the repository root because they are discovered there by the framework and development tooling.

## Getting started

### Requirements

- Node.js 20 or newer
- npm
- A modern browser

### Installation

```bash
npm install
```

### Development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm run start
```

### Code quality

```bash
npm run lint
```

## Framelink Figma MCP setup

The repository includes safe MCP example files so the project can be configured without publishing credentials.

### VS Code

Copy the example configuration:

```powershell
Copy-Item .vscode/mcp.json.example .vscode/mcp.json
```

The local VS Code configuration prompts for the Figma API key when the MCP server starts.

### Cline

Set the key in the environment before starting the editor:

```powershell
$env:FIGMA_API_KEY = "your-figma-api-key"
code .
```

The local files below are ignored by Git:

```text
.vscode/mcp.json
cline_mcp_config.json
```

Never commit a real API key. The example configuration files are the files intended for the public repository. If a key has ever been committed or shared, revoke it and create a replacement before publishing.

## Open-source notes

This project is structured to be readable and extendable. The page composition is intentionally small, while each major section owns its own layout and interaction logic. This makes it easier to replace content, add project cards, introduce new sections, or adapt the design for another portfolio.

Before publishing changes:

```bash
npm run lint
npm run build
git diff --check
git status
```

Do not commit generated folders such as `node_modules`, `.next`, local environment files, or local MCP configuration files.

## License

Choose and add a license before publishing the repository as open source. For most personal portfolio projects, the MIT License is a practical default, but the final choice should reflect how you want others to use the code and design assets.
