///<reference path="RenderSystem.ts"/>
///<reference path="Vector.ts"/>

class TurtlePen
{
    private _renderSystem : RenderSystem;
    private _currentRotation : number;
    private _currentPosition : Vector;
    private _forwardStep : number;
    private _rotationStep : number;

    constructor(renderSystem : RenderSystem)
    {
        this._renderSystem = renderSystem;
        this._forwardStep = -40;
        this._rotationStep = Math.PI / 6;
    }

    Draw(startingPosition : Vector, commandString : string)
    {
        this._currentPosition = startingPosition;
        this._currentRotation = 0;
        for (let i = 0, len = commandString.length; i < len; ++i)
        {
            let command : string = commandString[i];
            if (command == "F")
                this.MoveForward();
            else if (command == "-")
                this.RotateLeft();
            else if (command == "+")
                this.RotateRight();
        }
    }

    private MoveForward()
    {
        var lastPosition = this._currentPosition;
        var rotatedX = this._forwardStep * Math.sin(this._currentRotation);
        var rotatedY = this._forwardStep * Math.cos(this._currentRotation);
        this._currentPosition = new Vector(lastPosition.x + rotatedX, lastPosition.y + rotatedY);
        this._renderSystem.DrawLine(lastPosition.x, lastPosition.y, this._currentPosition.x, this._currentPosition.y);
    }

    private RotateLeft()
    {
        this._currentRotation += this._rotationStep;
    }

    private RotateRight()
    {
        this._currentRotation -= this._rotationStep;
    }
}