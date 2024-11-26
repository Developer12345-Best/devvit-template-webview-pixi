# Devvit Web Views + [Pixi.JS](https://pixijs.com/)

This demo provies a scaffolding for building a Reddit game with [Pixi.JS](https://pixijs.com) and [Devvit](https://developers.reddit.com/docs)

Please see the [Devvit documentation](https://developers.reddit.com/docs) or this [Youtube video](https://www.youtube.com/watch?v=BhbWn8TnXvo) (30min) to see how Web Views work inside of a Devvit app.

This demo includes:

- Pixi.JS version 8.5.2
- Example of using Typescript for both the web view app and the Blocks app, allowing them to share types
- Example of recommended workflow for web view apps on Devvit - start with a Blocks preview and launch web view from a button
- Example of saving and loading data to Redis
- Example of sharing strongly-typed messages between Blocks app and Web View app

See here a running example of this demo: [Link](https://www.reddit.com/r/axolotl_apps/comments/1h0jyi8/webview_pixi/)

The goal of this project is to provide good scaffolding for building games on Reddit using Pixi.JS

## Project architecture

### `blocks-app/` folder

Contains all the code for the Devvit app, built with Devvit blocks

### `web-view-app/` folder

Contains all the typescript source code for the app that runs in the embedded Web View. All code here will be bundled into `webroot/index.js` which is what the web view is actually importing

### `shared/` folder

Contains all types that are shared between the `web-view-app` and the `blocks-app`
