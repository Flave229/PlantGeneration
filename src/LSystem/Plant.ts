/// <reference path="../Transformation"/>
/// <reference path="../RenderSystem"/>
///<reference path="../TurtlePen.ts"/>

class Plant implements Entity
{
    private _turtle : TurtlePen;
    public Transformation: Transformation;


    constructor(turtle : TurtlePen, transformation : Transformation)
    {
        this._turtle = turtle;
        this.Transformation = transformation;
    }

    update(delta:number):void
    {
    }

    draw():void
    {
        this._turtle.Draw(this.Transformation.position, "FFF-F--F++F+F");
    }
}