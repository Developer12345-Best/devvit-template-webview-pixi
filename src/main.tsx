// Learn more at developers.reddit.com/docs
import { Devvit, useState } from '@devvit/public-api';
import { WebviewContainer } from './blocks-app/webviewContainer';
import { addMenuItem } from './blocks-app/addMenuItem';
import { SplashScreen } from './blocks-app/splashScreen';

Devvit.configure({
  redditAPI: true,
  redis: true,
});

// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: 'Webview with Pixi',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: addMenuItem,
  
});

// Add a post type definition
Devvit.addCustomPostType({
  name: 'Webview with Pixi',
  height: 'regular',
  render: (context:Devvit.Context) => {
    const [webviewVisible, setWebviewVisible] = useState(false);

    return (
      <vstack grow height="100%">
        <SplashScreen context={context} webviewVisible={webviewVisible} setWebviewVisible={setWebviewVisible} />
        <WebviewContainer context={context} webviewVisible={webviewVisible} />
      </vstack>
    );  
  }
});

export default Devvit;
