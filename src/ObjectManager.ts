/// <reference path="./Transformation"/>
/// <reference path="./Vector"/>
/// <reference path="./LSystem/Plant"/>
///<reference path="TurtlePen.ts"/>
///<reference path="RenderSystem.ts"/>

let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');

class ObjectManager
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

        let system1 = new LSystem(renderSystem, "F", {"F": "F[+F]F[-F]F"}, 25.7 * Math.PI / 180, -5);
        this._plants[0] = new Plant(system1, new Transformation(new Vector(canvas.width / 2, canvas.height - 20)));

        let system2 = new LSystem(renderSystem, "F", {"F": "F[+F]F[-F][F]"}, 20 * Math.PI / 180, -5);
        this._plants[1] = new Plant(system2, new Transformation(new Vector(canvas.width / 2, canvas.height - 20)));

        let system3 = new LSystem(renderSystem, "F", {"F": "FF-[-F+F+F]+[+F-F-F]"}, 22.5 * Math.PI / 180, -4);
        this._plants[2] = new Plant(system3, new Transformation(new Vector(canvas.width / 2, canvas.height - 20)));

        let system4 = new LSystem(renderSystem, "X", {"X": "F[+X]F[-X]+X", "F": "FF"}, 20 * Math.PI / 180, -7);
        this._plants[3] = new Plant(system4, new Transformation(new Vector(canvas.width / 2, canvas.height - 20)));

        let system5 = new LSystem(renderSystem, "X", {"X": "F[+X][-X]FX", "F": "FF"}, 25.7 * Math.PI / 180, -7);
        this._plants[4] = new Plant(system5, new Transformation(new Vector(canvas.width / 2, canvas.height - 20)));

        let system6 = new LSystem(renderSystem, "X", {"X": "F-[[X]+X]+F[+FX]-X", "F": "FF"}, 22.5 * Math.PI / 180, -5);
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