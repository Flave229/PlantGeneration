/// <reference path="./InputHandler"/>
/// <reference path="./Timer"/>
/// <reference path="./RenderSystem"/>
/// <reference path="./FramesPerSecond"/>
/// <reference path="./ObjectManager"/>
///<reference path="Helpers/Debugger.ts"/>

InputHandler.inititialise();

let debugging: Debugger = new Debugger();
let framesPerSecond: FramesPerSecond = new FramesPerSecond();
let renderSystem: RenderSystem = new RenderSystem();
let objectManager: ObjectManager = new ObjectManager(renderSystem);

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
    renderSystem.RefreshScreenBuffer();
    renderSystem.DrawText(10, 15, 'FPS: ' + framesPerSecond.getFrameCount());

    objectManager.draw();
}

