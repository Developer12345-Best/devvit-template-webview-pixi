# Devvit Web Views + [Pixi.JS](https://pixijs.com/)

This demo provides a scaffolding for building a Reddit game with [Pixi.JS](https://pixijs.com) and [Devvit](https://developers.reddit.com/docs)

Please see the [Devvit documentation](https://developers.reddit.com/docs) or this [Youtube video](https://www.youtube.com/watch?v=BhbWn8TnXvo) (30min) to see how Web Views work inside of a Devvit app.

This demo includes:

- Pixi.JS version 8.9.2
- Example of using Typescript for both the web view app and the Blocks app, allowing them to share types
- Example of recommended workflow for web view apps on Devvit - start with a Blocks preview and launch web view from a button
- Example of saving and loading data to Redis
- Example of sharing strongly-typed messages between Blocks app and Web View app

See here a running example of this demo: [Link](https://www.reddit.com/r/axolotl_apps/comments/1h0jyi8/webview_pixi/)

The goal of this project is to provide good scaffolding for building games on Reddit using Pixi.JS

## Prerequisites

Before getting started, make sure you have the following installed:

1. **Node.js** (version 18 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **Devvit CLI**
   - Install globally: `npm install -g devvit`
   - Login to Reddit: `devvit login`
   - Verify installation: `devvit --version`

## Quick Start

### 1. Clone or Download the Template

```bash
# If using git
git clone <repository-url>
cd devvit-template-webview-pixi

# Or download and extract the ZIP file
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Customize Your App (Optional but Recommended)

Run the interactive setup script to customize the template with your game's details:

```bash
npm run setup
```

This will prompt you for:
- App name (for package.json and devvit.yaml)
- App title (displayed to users)
- Description
- Menu item label
- Post type name
- Loading text

### 4. Development

Start the development server:

```bash
npm run start
```

This will:
- Build the web view app
- Start a local server on port 1234
- Watch for changes and auto-reload
- Serve files from the `webroot` directory

### 5. Testing Your App

To test your app on Reddit:

```bash
# Set your test subreddit (replace with your subreddit)
export SUBREDDIT=your-test-subreddit

# Run playtest
npm run playtest
```

**Note**: You need to be a moderator of the test subreddit to install and test the app.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run setup` | Interactive setup to customize the template |
| `npm run start` | Start development server with hot reload |
| `npm run build:web` | Build the web view app only |
| `npm run playtest` | Build and test the app on Reddit |
| `npm run clean` | Remove build artifacts |

## Development Workflow

1. **Initial Setup**: Run `npm run setup` to customize your app
2. **Development**: Use `npm run start` for local development
3. **Testing**: Use `npm run playtest` to test on Reddit
4. **Building**: The web view is automatically built when needed

## Project Structure

### `blocks-app/` folder

Contains all the code for the Devvit app, built with Devvit blocks

### `web-view-app/` folder

Contains all the typescript source code for the app that runs in the embedded Web View. All code here will be bundled into `webroot/index.js` which is what the web view is actually importing

### `shared/` folder

Contains all types that are shared between the `web-view-app` and the `blocks-app`

```
devvit-template-webview-pixi/
├── src/
│   ├── main.tsx                    # Main Devvit app entry point
│   ├── blocks-app/                 # Devvit blocks components
│   │   ├── addMenuItem.tsx         # Menu item handler
│   │   ├── redisService.ts         # Redis data service
│   │   ├── splashScreen.tsx        # Game splash screen
│   │   └── webviewContainer.tsx    # Web view container
│   ├── web-view-app/              # Pixi.js game code
│   │   ├── index.ts               # Web view entry point
│   │   ├── BrickBreaker.ts        # Game logic
│   │   └── types.ts               # Web view types
│   └── shared/                    # Shared types and messages
│       ├── messages.ts            # Message types for communication
│       └── types.ts               # Shared data types
├── webroot/                       # Static web assets
│   ├── game.html                  # Game HTML template
│   ├── style.css                  # Game styles
│   └── index.js                   # Built game bundle (generated)
├── assets/                        # Static assets
│   ├── logo.png
│   └── splash-background.png
├── devvit.yaml                    # Devvit app configuration
├── package.json                   # Node.js dependencies and scripts
├── setup.mjs                      # Interactive setup script
└── README.md                      # This file
```

## How It Works

### 1. Devvit App Flow
- User sees a splash screen with game stats
- Clicking "Launch App" opens the web view
- The web view loads the Pixi.js game
- Game data is saved to Redis for persistence

### 2. Communication Between Components
- **Blocks → Web View**: Messages sent via `context.ui.webView.postMessage()`
- **Web View → Blocks**: Messages sent via `window.parent.postMessage()`
- **Data Storage**: Redis is used to persist game statistics

### 3. Build Process
- TypeScript is compiled for both blocks and web view
- Web view code is bundled into `webroot/index.js`
- Shared types ensure type safety across components

## Environment Variables

When running `npm run playtest`, you can set these environment variables:

```bash
# Required: Your test subreddit (you must be a moderator)
export SUBREDDIT=your-test-subreddit

# Optional: Enable runtime logging
export LOG_RUNTIME=true
```

## Troubleshooting

### Common Issues

1. **"Command not found: devvit"**
   - Install Devvit CLI: `npm install -g devvit`
   - Make sure npm global bin is in your PATH

2. **"Not authorized" error during playtest**
   - Run `devvit login` and authenticate with Reddit
   - Ensure you're a moderator of the test subreddit

3. **Web view not loading**
   - Check that `npm run build:web` completes without errors
   - Verify `webroot/index.js` exists and is not empty

4. **TypeScript errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check that TypeScript version matches `package.json`

### Debugging

- Use browser developer tools to debug the web view
- Check Reddit's developer console for Devvit-specific errors
- Use `console.log()` in your game code for debugging

## Publishing Your App

Once your game is ready:

1. **Test thoroughly** using `npm run playtest`
2. **Upload to Reddit**:
   ```bash
   devvit upload
   ```
3. **Install on subreddits** through the Developer Platform

## Resources

- [Devvit Documentation](https://developers.reddit.com/docs)
- [Pixi.js Documentation](https://pixijs.com/guides)
- [Reddit Developer Platform](https://developers.reddit.com/)
- [Devvit Examples](https://github.com/reddit/devvit-examples)

## Contributing

Feel free to submit issues and enhancement requests!
