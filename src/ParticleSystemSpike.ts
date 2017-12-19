///<reference path="RenderSystem.ts"/>
///<reference path="ParticleSystem/Particle.ts"/>

//let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');

class ParticleSystemSpike
{
    private _particles : Particle[];
    private _renderSystem : RenderSystem;
    private _allComplete : boolean;

    constructor(renderSystem : RenderSystem)
    {
        this._particles = new Array();
        this._renderSystem = renderSystem;

        for (let i : number = 0; i < 1000; ++i)
        {
            let position : Vector = new Vector(canvas.width / 2, canvas.height - 20);
            let velocity : Vector = new Vector((Math.random() - 0.5) * 5, Math.random() * 2 + 3);
            let particle : Particle = new Particle(this, this._renderSystem, position, velocity, Math.random() * 3 + 1);
            particle.SourceRatio = 0.1;
            this._particles.push(particle);
        }
    }

    Update(delta: number)
    {
        let allComplete : boolean = true;
        for (let i : number = 0; i < this._particles.length; ++i)
        {
            if (this._allComplete)
            {
                if(this._particles[i].ReachedDestination)
                {
                    //this._particles[i].CountdownDeath(delta);
                    continue;
                }

                let nearestParticle : Particle;

                for (let nearbyParticleIndex : number = 0; nearbyParticleIndex < this._particles.length; ++nearbyParticleIndex)
                {
                    if (i == nearbyParticleIndex)
                        continue;

                    if (this._particles[nearbyParticleIndex].ReachedDestination)
                        continue;

                    if (nearestParticle == null)
                        nearestParticle = this._particles[nearbyParticleIndex];

                    let currentParticleDistance : Vector = new Vector(this._particles[i].Position.x - this._particles[nearbyParticleIndex].Position.x, this._particles[i].Position.y - this._particles[nearbyParticleIndex].Position.y);
                    let nearestParticleDistance : Vector = new Vector(this._particles[i].Position.x - nearestParticle.Position.x, this._particles[i].Position.y - nearestParticle.Position.y);

                    let currentParticleMagnitude : number = Math.sqrt(currentParticleDistance.x * currentParticleDistance.x + currentParticleDistance.y * currentParticleDistance.y);
                    let nearestParticleMagnitude : number = Math.sqrt(nearestParticleDistance.x * nearestParticleDistance.x + nearestParticleDistance.y * nearestParticleDistance.y);

                    if (currentParticleMagnitude < nearestParticleMagnitude)
                        nearestParticle = this._particles[nearbyParticleIndex];
                }

                this._particles[i].MoveBackToSource(delta, nearestParticle);
            }
            else
                this._particles[i].Update(delta);

            if (allComplete && this._particles[i].Complete == false)
                allComplete = false;
        }

        if (allComplete)
            this._allComplete = true;
    }

    Draw()
    {
        for (let i : number = 0; i < this._particles.length; ++i)
        {
            this._particles[i].DrawLeaves();
        }

        for (let i : number = 0; i < this._particles.length; ++i)
        {
            this._particles[i].DrawStem();
        }
    }

    AddNewParticle(particle : Particle)
    {
        this._particles.push(particle);
    }
}