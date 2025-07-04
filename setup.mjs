#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configuration object to store all template values
const config = {
  appName: '',
  appTitle: '',
  appDescription: '',
  menuItemLabel: '',
  postTypeName: '',
  loadingText: '',
  version: '0.1.0'
};

// ASCII art for a nice welcome message
console.log(`
╔═══════════════════════════════════════════════╗
║                                               ║
║   Reddit Pixi Game Template Setup Assistant   ║
║                                               ║
╚═══════════════════════════════════════════════╝
`);

// Function to ask questions and save responses
function askQuestions() {
  rl.question('App Name (used in package.json and devvit.yaml - no spaces): ', (answer) => {
    config.appName = answer.trim().replace(/\s+/g, '-').toLowerCase();
    
    rl.question('App Title (displayed to users): ', (answer) => {
      config.appTitle = answer.trim();
      
      rl.question('App Description (short summary): ', (answer) => {
        config.appDescription = answer.trim();
        
        rl.question('Menu Item Label (in subreddit menu): ', (answer) => {
          config.menuItemLabel = answer.trim() || 'Add Pixi Game';
          
          rl.question('Post Type Name: ', (answer) => {
            config.postTypeName = answer.trim() || 'Pixi Game';
            
            rl.question('Loading Text: ', (answer) => {
              config.loadingText = answer.trim() || 'Loading Game...';
              
              // Close the readline interface
              rl.close();
              
              // Update files with the collected values
              updateFiles();
            });
          });
        });
      });
    });
  });
}

// Function to update files with new values
function updateFiles() {
  console.log('\nUpdating template files with your configuration...');
  
  try {
    // Update devvit.yaml
    const devvitPath = path.join(process.cwd(), 'devvit.yaml');
    let devvitContent = fs.readFileSync(devvitPath, 'utf8');
    devvitContent = devvitContent.replace(/name: .*/, `name: ${config.appName}`);
    devvitContent = devvitContent.replace(/version: .*/, `version: ${config.version}`);
    fs.writeFileSync(devvitPath, devvitContent);
    console.log('✓ Updated devvit.yaml');
    
    // Update package.json
    const packagePath = path.join(process.cwd(), 'package.json');
    let packageContent = fs.readFileSync(packagePath, 'utf8');
    const packageJson = JSON.parse(packageContent);
    packageJson.name = config.appName;
    packageJson.version = config.version;
    if (config.appDescription) {
      packageJson.description = config.appDescription;
    }
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
    console.log('✓ Updated package.json');
    
    // Update src/main.tsx
    const mainPath = path.join(process.cwd(), 'src', 'main.tsx');
    let mainContent = fs.readFileSync(mainPath, 'utf8');
    mainContent = mainContent
      .replace(/label: 'Webview with Pixi'/, `label: '${config.menuItemLabel}'`)
      .replace(/name: 'Webview with Pixi'/, `name: '${config.postTypeName}'`);
    fs.writeFileSync(mainPath, mainContent);
    console.log('✓ Updated src/main.tsx');
    
    // Update src/blocks-app/splashScreen.tsx
    const splashPath = path.join(process.cwd(), 'src', 'blocks-app', 'splashScreen.tsx');
    let splashContent = fs.readFileSync(splashPath, 'utf8');
    splashContent = splashContent
      .replace(/Devvit Breaker/, config.appTitle)
      .replace(/Launch App/, config.loadingText);
    fs.writeFileSync(splashPath, splashContent);
    console.log('✓ Updated src/blocks-app/splashScreen.tsx');
    
    // Update webroot/game.html (add title if needed)
    const gamePath = path.join(process.cwd(), 'webroot', 'game.html');
    let gameContent = fs.readFileSync(gamePath, 'utf8');
    if (!gameContent.includes('<title>')) {
      gameContent = gameContent.replace(
        '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">',
        `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${config.appTitle}</title>`
      );
    } else {
      gameContent = gameContent.replace(/<title>.*?<\/title>/, `<title>${config.appTitle}</title>`);
    }
    fs.writeFileSync(gamePath, gameContent);
    console.log('✓ Updated webroot/game.html');
    
    // Update README.md
    const readmePath = path.join(process.cwd(), 'README.md');
    let readmeContent = fs.readFileSync(readmePath, 'utf8');
    readmeContent = readmeContent
      .replace(/# Devvit Web Views \+ \[Pixi\.JS\]\(https:\/\/pixijs\.com\/\)/, `# ${config.appTitle}`)
      .replace(/This demo provies a scaffolding for building a Reddit game with \[Pixi\.JS\]\(https:\/\/pixijs\.com\) and \[Devvit\]\(https:\/\/developers\.reddit\.com\/docs\)/, config.appDescription || `A Reddit game built with Pixi.JS and Devvit`);
    fs.writeFileSync(readmePath, readmeContent);
    console.log('✓ Updated README.md');
    
    console.log('\n✨ Setup complete! Your Reddit Pixi Game is ready for development.');
    console.log(`\nTo start development, run:\n  npm run start`);
    console.log(`\nTo test your app, run:\n  npm run playtest`);
    
  } catch (error) {
    console.error('Error updating files:', error);
  }
}

// Start the setup process
askQuestions();
