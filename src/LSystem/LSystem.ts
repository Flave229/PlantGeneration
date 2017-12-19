///<reference path="../RenderSystem.ts"/>
///<reference path="../TurtlePen.ts"/>
///<reference path="./RuleSet.ts"/>

class LSystem
{
    private _currentString : string;
    private _rules : RuleSet;
    private _turtlePen: TurtlePen;

    constructor(renderSystem : RenderSystem, axiom : string, rules : RuleSet, angleStep : number, movementStep : number)
    {
        this._currentString = axiom;
        this._rules = rules;
        this._turtlePen = new TurtlePen(renderSystem, angleStep, movementStep);
    }

    Iterate()
    {
        let newString : string = "";

        for(let i = 0, length = this._currentString.length; i < length; ++i)
        {
            let rule = this._rules.GetRule(this._currentString[i]);

            if (rule == undefined)
                newString += this._currentString[i];

            newString += rule;
        }

        this._currentString = newString;
    }

    Draw(startingPosition : Vector)
    {
        this._turtlePen.Draw(startingPosition, this._currentString);
    }
}
