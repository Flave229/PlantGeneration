/// <reference path="../Vector"/>

class Particle
{
    private _renderSystem : RenderSystem;
    private _startingEnergy : number;
    private _energy : number;
    private _startingPosition : Vector;
    private _position : Vector;
    private _velocity : Vector;
    private _complete: boolean;

    constructor(renderSystem : RenderSystem, startingPosition : Vector, velocity : Vector, energy : number)
    {
        this._renderSystem = renderSystem;
        this._startingEnergy = energy;
        this._energy = energy;
        this._velocity = velocity;
        this._startingPosition = startingPosition;
        this._position = new Vector(startingPosition.x, startingPosition.y);
        this._complete = false;
    }

    Update(delta : number)
    {
        if (this._complete)
            return;

        this._energy -= delta;

        if (this._energy <= 0)
        {
            this._complete = true;
            return;
        }
        let energyRatio = this._energy / this._startingEnergy;
        this._position.x += energyRatio * this._velocity.x;
        this._position.y -= energyRatio * this._velocity.y;
    }

    Draw()
    {
        this._renderSystem.DrawRect(this._position.x, this._position.y, 10, 10);
    }

    IsComplete() : boolean
    {
        return this._complete;
    }

    MoveBackToSource(delta : number)
    {
        let movementVector : Vector = new Vector(this._startingPosition.x - this._position.x, this._startingPosition.y - this._position.y);
        let movementVectorMagnitude : number = Math.sqrt(movementVector.x * movementVector.x + movementVector.y * movementVector.y);
        let normalisedMovementVector : Vector = new Vector(movementVector.x / movementVectorMagnitude, movementVector.y / movementVectorMagnitude);

        this._position.x += normalisedMovementVector.x * delta * 20;
        this._position.y += normalisedMovementVector.y * delta * 20;
    }
}