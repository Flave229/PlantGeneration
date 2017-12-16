///<reference path="RenderSystem.ts"/>
///<reference path="ParticleSystem/Particle.ts"/>

//let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');

class ParticleSystemSpike
{
    private _startingTime = new Date().getTime();
    private _particles : Particle[];
    private _renderSystem : RenderSystem;
    private _allComplete : boolean;

    constructor(renderSystem : RenderSystem)
    {
        this._particles = new Array();
        this._renderSystem = renderSystem;

        for (let i : number = 0; i < 30; ++i)
        {
            let position : Vector = new Vector(canvas.width / 2, canvas.height - 20);
            let velocity : Vector = new Vector((Math.random() - 0.5) * 5, Math.random() * 2 + 3);
            let particle : Particle = new Particle(this._renderSystem, position, velocity, Math.random() * 3 + 1);
            this._particles.push(particle);
        }
    }

    Update(delta: number)
    {
        let allComplete : boolean = true;
        for (let i : number = 0; i < this._particles.length; ++i)
        {
            if (this._allComplete)
                this._particles[i].MoveBackToSource(delta);
            else
                this._particles[i].Update(delta);

            if (allComplete && this._particles[i].IsComplete() == false)
                allComplete = false;
        }

        if (allComplete)
            this._allComplete = true;
    }

    Draw()
    {
        for (let i : number = 0; i < this._particles.length; ++i)
        {
            this._particles[i].Draw();
        }
    }
}