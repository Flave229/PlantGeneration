/// <reference path="./InputHandler"/>
/// <reference path="./Timer"/>
/// <reference path="./RenderSystem"/>
/// <reference path="./FramesPerSecond"/>
/// <reference path="./ObjectManager"/>
/// <reference path="./LSystemSpike2"/>
/// <reference path="./ParticleSystemSpike.ts"/>
///<reference path="Helpers/Debugger.ts"/>

InputHandler.inititialise();

let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');

let debugging: Debugger = new Debugger();
let framesPerSecond: FramesPerSecond = new FramesPerSecond();
let renderSystem: RenderSystem = new RenderSystem();
//let lSystemSpike1: LSystemSpike1 = new LSystemSpike1(renderSystem);
//let particleSystemSpike : ParticleSystemSpike = new ParticleSystemSpike(renderSystem);
let lSystemSpike2: LSystemSpike2 = new LSystemSpike2(renderSystem);

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
    //lSystemSpike1.Update(delta);
    //particleSystemSpike.Update(delta);
    lSystemSpike2.Update(delta);
}

function draw()
{
    renderSystem.RefreshScreenBuffer();
    renderSystem.DrawText(10, 15, 'FPS: ' + framesPerSecond.getFrameCount());

    //lSystemSpike1.Draw();
    //particleSystemSpike.Draw();
    lSystemSpike2.Draw();
}

