/// <reference path="./InputHandler"/>
/// <reference path="./Timer"/>
/// <reference path="./RenderSystem"/>
/// <reference path="./FramesPerSecond"/>
/// <reference path="./ObjectManager"/>
///<reference path="Helpers/Debugger.ts"/>

InputHandler.inititialise();

let Debugging = new Debugger();
let FramesPerSecond = new FramesPerSecond();
let RenderSystem = new RenderSystem();
let ObjectManager = new ObjectManager(RenderSystem);

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
    Debugging.update(delta);
    FramesPerSecond.update(delta);
    ObjectManager.update(delta);
}

function draw()
{
    RenderSystem.RefreshScreenBuffer();
    RenderSystem.DrawText(10, 15, 'FPS: ' + FramesPerSecond.getFrameCount());

    ObjectManager.draw();
}

