///<reference path="RenderSystem.ts"/>
///<reference path="Vector.ts"/>
///<reference path="Common/Stack.ts"/>

class TurtlePen
{
    private _renderSystem : RenderSystem;
    private _currentRotation : number;
    private _currentPosition : Vector;
    private _forwardStep : number;
    private _rotationStep : number;
    private _positionStack : Stack<Vector>;
    private _rotationStack : Stack<number>;

    constructor(renderSystem : RenderSystem, angleStep : number, movementStep : number)
    {
        this._renderSystem = renderSystem;
        this._forwardStep = movementStep;
        this._rotationStep = angleStep;
        this._positionStack = new Stack<Vector>();
        this._rotationStack = new Stack<number>();
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
            else if (command == "[")
                this.StoreTransformation();
            else if (command == "]")
                this.RetrieveLastTransformation();
        }
    }

    private MoveForward()
    {
        var lastPosition = this._currentPosition;
        var rotatedX = this._forwardStep * Math.sin(this._currentRotation);
        var rotatedY = this._forwardStep * Math.cos(this._currentRotation);
        this._currentPosition = new Vector(lastPosition.x + rotatedX, lastPosition.y + rotatedY);
        this._renderSystem.DrawLine(lastPosition.x, lastPosition.y, this._currentPosition.x, this._currentPosition.y, 1);
    }

    private RotateLeft()
    {
        this._currentRotation -= this._rotationStep;
    }

    private RotateRight()
    {
        this._currentRotation += this._rotationStep;
    }

    private StoreTransformation()
    {
        this._positionStack.push(this._currentPosition);
        this._rotationStack.push(this._currentRotation);
    }

    private RetrieveLastTransformation()
    {
        this._currentPosition = this._positionStack.pop();
        this._currentRotation = this._rotationStack.pop();
    }
}