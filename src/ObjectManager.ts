/// <reference path="./Transformation"/>
/// <reference path="./Vector"/>
/// <reference path="./LSystem/Plant"/>
///<reference path="TurtlePen.ts"/>
///<reference path="RenderSystem.ts"/>
///<reference path="./LSystem/RuleSet.ts"/>


class LSystemSpike1
{
    private _startingTime = new Date().getTime();
    private _selectedPlant : number;
    private _iterator : number;
    private _allGrown : boolean;
    private _plants: Entity[];

    constructor(renderSystem : RenderSystem)
    {
        this._selectedPlant = 0;
        this._iterator = 1;
        this._plants = new Array();
        this._allGrown = false;

        let system1Rules : { [id: string]: LSystemRule[] } =
        {
            "F": [ new LSystemRule("F[+F]F[-F]F", 1) ]
        };
        let system1RuleSet = new RuleSet(system1Rules);
        let system1 = new LSystem(renderSystem, "F", system1RuleSet,  25.7 * Math.PI / 180, -5);
        this._plants[0] = new Plant(system1, new Transformation(new Vector(canvas.width / 2, canvas.height - 20)));

        let system2Rules : { [id: string]: LSystemRule[] } =
        {
            "F": [ new LSystemRule("F[+F]F[-F][F]", 1) ]
        };
        let system2RuleSet = new RuleSet(system2Rules);
        let system2 = new LSystem(renderSystem, "F", system2RuleSet, 20 * Math.PI / 180, -5);
        this._plants[1] = new Plant(system2, new Transformation(new Vector(canvas.width / 2, canvas.height - 20)));

        let system3Rules : { [id: string]: LSystemRule[] } =
        {
            "F": [ new LSystemRule("FF-[-F+F+F]+[+F-F-F]", 1) ]
        };
        let system3RuleSet = new RuleSet(system3Rules);
        let system3 = new LSystem(renderSystem, "F", system3RuleSet, 22.5 * Math.PI / 180, -4);
        this._plants[2] = new Plant(system3, new Transformation(new Vector(canvas.width / 2, canvas.height - 20)));

        let system4Rules : { [id: string]: LSystemRule[] } =
        {
            "X": [ new LSystemRule("F[+X]F[-X]+X", 1) ],
            "F": [ new LSystemRule("FF", 1) ]
        };
        let system4RuleSet = new RuleSet(system4Rules);
        let system4 = new LSystem(renderSystem, "X", system4RuleSet, 20 * Math.PI / 180, -7);
        this._plants[3] = new Plant(system4, new Transformation(new Vector(canvas.width / 2, canvas.height - 20)));

        let system5Rules : { [id: string]: LSystemRule[] } =
        {
            "X": [ new LSystemRule("F[+X][-X]FX", 1) ],
            "F": [ new LSystemRule("FF", 1) ]
        };
        let system5RuleSet = new RuleSet(system5Rules);
        let system5 = new LSystem(renderSystem, "X", system5RuleSet, 25.7 * Math.PI / 180, -7);
        this._plants[4] = new Plant(system5, new Transformation(new Vector(canvas.width / 2, canvas.height - 20)));

        let system6Rules : { [id: string]: LSystemRule[] } =
        {
            "X": [ new LSystemRule("F-[[X]+X]+F[+FX]-X", 1) ],
            "F": [ new LSystemRule("FF", 1) ]
        };
        let system6RuleSet = new RuleSet(system6Rules);
        let system6 = new LSystem(renderSystem, "X", system6RuleSet, 22.5 * Math.PI / 180, -5);
        this._plants[5] = new Plant(system6, new Transformation(new Vector(canvas.width / 2, canvas.height - 20)));
    }

    Update(delta: number)
    {
        let currentTime = new Date().getTime();
        if ((currentTime - this._startingTime) / 1000 > 2)
        {
            this._startingTime = currentTime;

            if(this._allGrown)
            {
                if (this._selectedPlant == this._plants.length - 1)
                    this._selectedPlant = 0;
                else
                    ++this._selectedPlant;

                return;
            }

            if (this._iterator == 5 && this._selectedPlant == this._plants.length - 1)
                this._allGrown = true;

            if (this._iterator < 5)
            {
                this._plants[this._selectedPlant].Update(delta);
                ++this._iterator;
            }
            else
            {
                this._iterator = 1;

                if (this._selectedPlant == this._plants.length - 1)
                    this._selectedPlant = 0;
                else
                    ++this._selectedPlant;
            }
        }
    }

    Draw()
    {
        this._plants[this._selectedPlant].Draw();
    }
}