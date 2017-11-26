/// <reference path="./Transformation"/>
/// <reference path="./Vector"/>
/// <reference path="./LSystem/Plant"/>

let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');

class ObjectManager
{
    private plant: Entity;

    constructor()
    {
        this.plant = new Plant(new Transformation(new Vector(canvas.width / 2, canvas.height - 20)));
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