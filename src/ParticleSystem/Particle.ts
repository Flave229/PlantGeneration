/// <reference path="../Vector"/>
/// <reference path="../ParticleSystemSpike"/>

class Particle
{
    public Position : Vector;
    public ReachedDestination : boolean;
    public Complete : boolean;
    public FinalPosition : Vector;
    public Immunity : number;

    private _renderSystem : RenderSystem;
    private _startingEnergy : number;
    private _energy : number;
    private _startingPosition : Vector;
    private _velocity : Vector;
    private _particleSystem : ParticleSystemSpike;
    private _deathTimer : number;
    private _deathLocation : Vector;

    constructor(particleSystem : ParticleSystemSpike, renderSystem : RenderSystem, startingPosition : Vector, velocity : Vector, energy : number)
    {
        this._renderSystem = renderSystem;
        this._startingEnergy = energy;
        this._energy = energy;
        this._velocity = velocity;
        this._startingPosition = startingPosition;
        this.Position = new Vector(startingPosition.x, startingPosition.y);
        this.Complete = false;
        this.ReachedDestination = false;
        this._particleSystem = particleSystem;
        this.Immunity = 0;
        this._deathTimer = 3;
        this._deathLocation = new Vector(0, 0);
    }

    Update(delta : number)
    {
        if (this.Complete)
            return;

        this._energy -= delta;

        if (this._energy <= 0)
        {
            this.Complete = true;
            this.FinalPosition = new Vector(this.Position.x, this.Position.y);
            return;
        }
        let energyRatio = this._energy / this._startingEnergy;
        this.Position.x += energyRatio * this._velocity.x;
        this.Position.y -= energyRatio * this._velocity.y;
    }

    Draw()
    {
        if (this._deathTimer > 0)
        {
            if (this.ReachedDestination)
                this._renderSystem.DrawRectWithColor(this.Position.x, this.Position.y, 10, 10, 'red');
            else if (this.Immunity > 0)
                this._renderSystem.DrawRectWithColor(this.Position.x, this.Position.y, 10, 10, 'blue');
            else
                this._renderSystem.DrawRect(this.Position.x, this.Position.y, 10, 10);
        }

        if (this.ReachedDestination)
            this._renderSystem.DrawLine(this.FinalPosition.x + 5, this.FinalPosition.y + 5, this._deathLocation.x + 5, this._deathLocation.y + 5);
        else if (this.Complete)
            this._renderSystem.DrawLine(this.FinalPosition.x + 5, this.FinalPosition.y + 5, this.Position.x + 5, this.Position.y + 5);
    }

    CountdownDeath(delta : number)
    {
        if (this._deathTimer > 0)
            this._deathTimer -= delta;
    }

    MoveBackToSource(delta : number, nearestParticle : Particle)
    {
        if (this.ReachedDestination)
            return;

        this.Immunity -= delta;

        if (this._startingPosition.x == this.Position.x && this._startingPosition.y == this.Position.y)
            this.ReachedDestination = true;

        if (nearestParticle == null)
        {
            let vectorToSource : Vector = new Vector(this._startingPosition.x - this.Position.x, this._startingPosition.y - this.Position.y);
            let vectorToSourceMagnitude : number = Math.sqrt(vectorToSource.x * vectorToSource.x + vectorToSource.y * vectorToSource.y);
            vectorToSource = new Vector(vectorToSource.x / vectorToSourceMagnitude, vectorToSource.y / vectorToSourceMagnitude);
            this.Position.x += vectorToSource.x * delta * 20;
            this.Position.y += vectorToSource.y * delta * 20;
            return;
        }

        if (this.Immunity <= 0 && this.Position.x + 5 > nearestParticle.Position.x - 5 && this.Position.x - 5 < nearestParticle.Position.x + 5
            && this.Position.y + 5 > nearestParticle.Position.y - 5 && this.Position.y -5 < nearestParticle.Position.y + 5)
        {
            this.ReachedDestination = true;
            this._deathLocation = new Vector(this.Position.x, this.Position.y);
            nearestParticle.ReachedDestination = true;
            nearestParticle._deathLocation = new Vector(this.Position.x, this.Position.y);

            let childParticle : Particle = new Particle(this._particleSystem, this._renderSystem, new Vector(this._startingPosition.x, this._startingPosition.y), new Vector(this._velocity.x, this._velocity.y), 0);
            childParticle.Complete = true;
            childParticle.Position = new Vector(this.Position.x, this.Position.y);
            childParticle.FinalPosition = new Vector(this.Position.x, this.Position.y);
            childParticle.Immunity = 1;

            this._particleSystem.AddNewParticle(childParticle);
        }

        let vectorToSource : Vector = new Vector(this._startingPosition.x - this.Position.x, this._startingPosition.y - this.Position.y);
        let vectorToSourceMagnitude : number = Math.sqrt(vectorToSource.x * vectorToSource.x + vectorToSource.y * vectorToSource.y);
        let vectorToNearestParticle : Vector = new Vector(nearestParticle.Position.x - this.Position.x, nearestParticle.Position.y - this.Position.y);
        let vectorToNearestParticleMagnitude : number = Math.sqrt(vectorToNearestParticle.x * vectorToNearestParticle.x + vectorToNearestParticle.y * vectorToNearestParticle.y);

        vectorToSource = new Vector(vectorToSource.x / vectorToSourceMagnitude, vectorToSource.y / vectorToSourceMagnitude);
        vectorToNearestParticle = new Vector(vectorToNearestParticle.x / vectorToNearestParticleMagnitude, vectorToNearestParticle.y / vectorToNearestParticleMagnitude);

        let sourceRatio : number = 0.1;
        let neighbourRatio : number = 1.0 - sourceRatio;

        let movementVector = new Vector((sourceRatio * vectorToSource.x) + (neighbourRatio * vectorToNearestParticle.x), (sourceRatio * vectorToSource.y) + (neighbourRatio * vectorToNearestParticle.y));
        let movementVectorMagnitude : number = Math.sqrt(movementVector.x * movementVector.x + movementVector.y * movementVector.y);
        let normalisedMovementVector : Vector = new Vector(movementVector.x / movementVectorMagnitude, movementVector.y / movementVectorMagnitude);

        this.Position.x += normalisedMovementVector.x * delta * 20;
        this.Position.y += normalisedMovementVector.y * delta * 20;
    }
}