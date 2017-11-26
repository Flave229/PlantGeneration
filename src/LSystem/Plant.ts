/// <reference path="../Transformation"/>
/// <reference path="../RenderSystem"/>

class Plant implements Entity
{
    private _renderSystem : RenderSystem;
    public Transformation: Transformation;

    constructor(renderSystem : RenderSystem, transformation : Transformation)
    {
        this._renderSystem = renderSystem;
        this.Transformation = transformation;
    }

    update(delta:number):void
    {
    }

    draw():void
    {
        let position : Vector = this.Transformation.position;
        this._renderSystem.DrawLine(position.x, position.y, position.x, position.y + 10);
    }
}