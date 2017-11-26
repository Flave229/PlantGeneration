/// <reference path="../Transformation"/>
/// <reference path="../RenderSystem"/>
///<reference path="LSystem.ts"/>

class Plant implements Entity
{
    private _lSystem : LSystem;
    public Transformation: Transformation;

    constructor(lSystem : LSystem, transformation : Transformation)
    {
        this.Transformation = transformation;
        this._lSystem = lSystem;
    }

    Update(delta:number):void
    {
        this._lSystem.Iterate();
    }

    Draw():void
    {
        this._lSystem.Draw(this.Transformation.position);
    }
}