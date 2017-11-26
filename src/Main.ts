/// <reference path="./InputHandler"/>
/// <reference path="./Timer"/>
/// <reference path="./Renderer"/>
/// <reference path="./FramesPerSecond"/>
/// <reference path="./ObjectManager"/>
///<reference path="Helpers/Debugger.ts"/>

InputHandler.inititialise();
Renderer.inititialise();

let debugging = new Debugger();
let framesPerSecond = new FramesPerSecond();
let objectManager = new ObjectManager();

function mainLoop()
{
    update();
    draw();

    requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);

function update()
{
    let delta = Timer.getDeltaTime();
    debugging.update(delta);
    framesPerSecond.update(delta);
    objectManager.update(delta);
}

function draw()
{
    Renderer.refreshScreenBuffer();
    Renderer.drawText(10, 15, 'FPS: ' + framesPerSecond.getFrameCount());

    objectManager.draw();
}

