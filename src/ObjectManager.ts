/// <reference path="./Transformation"/>
/// <reference path="./Vector"/>
/// <reference path="./LSystem/Plant"/>

let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');

class ObjectManager
{
    private plant: Entity;

    constructor(renderSystem : RenderSystem)
    {
        this.plant = new Plant(renderSystem, new Transformation(new Vector(canvas.width / 2, canvas.height - 20)));
    }

    update(delta: number)
    {
        this.plant.update(delta);
    }

    draw()
    {
        this.plant.draw();
    }
}