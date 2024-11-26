import  * as PIXI from 'pixi.js';
import type { Renderer } from 'pixi.js';
import { BrickBreaker } from './BrickBreaker';

const getGameWidth = (): number => {
    const width = window.innerWidth;
    if (width >= 756) return 756;
    if (width >= 400) return 400;
    if (width >= 343) return 343;
    return 288;
};

const app = new PIXI.Application<Renderer<HTMLCanvasElement>>();

(async() => {
    await app.init({
        width: getGameWidth(),
        height: 324,
        backgroundColor: 0x000000,
        antialias: true,
    });

    console.log(app);
    console.log(app.canvas);
    document.body.appendChild(app.canvas);


    let game: BrickBreaker;
    window.addEventListener('resize', () => {
        const newWidth = getGameWidth();
        if (app.screen.width !== newWidth) {
            app.renderer.resize(newWidth, 324);
            app.stage.removeChildren();
            game = new BrickBreaker(app);
        }
    });

    game = new BrickBreaker(app);

})();



