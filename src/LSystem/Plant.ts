/// <reference path="../Transformation"/>

class Plant implements Entity
{
    public transformation: Transformation;

    constructor(transformation:Transformation)
    {
        this.transformation = transformation;
    }

    update(delta:number):void
    {
    }

    draw():void
    {
        let position : Vector = this.transformation.position;
        Renderer.DrawLine(position.x, position.y, position.x, position.y + 10);
    }
}