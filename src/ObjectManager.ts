/// <reference path="./Transformation"/>
/// <reference path="./Vector"/>
/// <reference path="./LSystem/Plant"/>
///<reference path="TurtlePen.ts"/>

let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');

class ObjectManager
{
    private plant: Entity;

    constructor(turtle : TurtlePen)
    {
        this.plant = new Plant(turtle, new Transformation(new Vector(canvas.width / 2, canvas.height - 20)));
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