/// <reference path="./Transformation"/>
/// <reference path="./Vector"/>
/// <reference path="./LSystem/Plant"/>
///<reference path="TurtlePen.ts"/>
///<reference path="RenderSystem.ts"/>
///<reference path="./Helpers/MathHelper.ts"/>
///<reference path="./LSystem/RuleSet.ts"/>

//let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');

class LSystemSpike2
{
    private _startingTime = new Date().getTime();
    private _selectedPlant : number;
    private _iterator : number;
    private _plants: Entity[];

    constructor(renderSystem : RenderSystem)
    {
        this._selectedPlant = 0;
        this._iterator = 1;
        this._plants = new Array();

        let axiom : string = "F";
        let rules : { [id: string]: LSystemRule[] } =
        {
            "F":
            [
                new LSystemRule("FF-[-F-F-F]+[+F-F-F]", 1 / 3),
                new LSystemRule("FF-[-F+F+F]+[+F-F-F]", 1 / 3),
                new LSystemRule("FF-[+F+F+F]+[+F-F+F]", 1 / 3)
            ]
        };

        let ruleSet : RuleSet = new RuleSet(rules);

        let system1 = new LSystem(renderSystem, axiom, ruleSet, MathHelper.RandomBetween(10, 30) * Math.PI / 180, MathHelper.RandomBetween(-3, -7));
        this._plants[0] = new Plant(system1, new Transformation(new Vector(canvas.width / 5 - 20, canvas.height - 40)));

        let system2 = new LSystem(renderSystem, axiom, ruleSet, MathHelper.RandomBetween(10, 30) * Math.PI / 180, MathHelper.RandomBetween(-3, -7));
        this._plants[1] = new Plant(system2, new Transformation(new Vector(canvas.width * 2 / 5 - 20, canvas.height - 40)));

        let system3 = new LSystem(renderSystem, axiom, ruleSet, MathHelper.RandomBetween(10, 30) * Math.PI / 180, MathHelper.RandomBetween(-3, -7));
        this._plants[2] = new Plant(system3, new Transformation(new Vector(canvas.width * 3 / 5 - 20, canvas.height - 40)));

        let system4 = new LSystem(renderSystem, axiom, ruleSet, MathHelper.RandomBetween(10, 30) * Math.PI / 180, MathHelper.RandomBetween(-3, -7));
        this._plants[3] = new Plant(system4, new Transformation(new Vector(canvas.width * 4 / 5 - 20, canvas.height - 40)));
    }

    Update(delta: number)
    {
        let currentTime = new Date().getTime();
        if ((currentTime - this._startingTime) / 1000 > 2)
        {
            this._startingTime = currentTime;

            if (this._iterator < 5)
            {
                this._plants[0].Update(delta);
                this._plants[1].Update(delta);
                this._plants[2].Update(delta);
                this._plants[3].Update(delta);
                ++this._iterator;
            }
        }
    }

    Draw()
    {
        this._plants[0].Draw();
        this._plants[1].Draw();
        this._plants[2].Draw();
        this._plants[3].Draw();
    }
}