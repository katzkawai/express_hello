# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm install` - Install dependencies (only Express.js)
- `npm start` - Start the Express server on port 3010
- `node index.js` - Alternative way to start the server

## Architecture

This is a minimal Express.js application that serves a time-based greeting app in Japanese.

### Server Structure
- `index.js` - Express server that:
  - Serves static files from `/static` directory
  - Routes `/` to serve `pages/index.html`
  - Listens on port 3010

### Client Application
- `pages/index.html` - Japanese greeting app that displays time-based greetings
- `static/script.js` - Client-side logic for time updates and greeting selection
- `static/style.css` - Styling with animations and responsive design

### Key Features
- No build process required - vanilla JavaScript and CSS
- Single dependency (Express.js)
- Time-based greeting logic with Japanese text
- Auto-updates every minute