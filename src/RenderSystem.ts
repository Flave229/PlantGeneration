class RenderSystem
{
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;

    constructor()
    {
        this._canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this._context = this._canvas.getContext('2d');
    }

    DrawRect(x: number, y: number, width: number, height: number)
    {
        if (Debugger.isDebugEnabled()) {
            this.DrawDebugInfo(x, y, width, height)
        }
        this._context.fillRect(x, y, width, height);
    }

    DrawRectWithColor(x: number, y: number, width: number, height: number, color : string)
    {
        this._context.fillStyle = color;
        this.DrawRect(x, y, width, height);
        this._context.fillStyle = 'black';
    }

    DrawLine(xStart: number, yStart: number, xEnd: number, yEnd: number)
    {
        this._context.beginPath();
        this._context.moveTo(xStart, yStart);
        this._context.lineTo(xEnd, yEnd);
        this._context.stroke();
    }

    DrawText(x: number, y: number, text: string)
    {
        this._context.fillText(text, x, y);
    }

    DrawDebugInfo(x: number, y: number, width: number, height: number)
    {
        this.DrawText(x, y - 20, "X: " + Math.round(x * 100) / 100);
        this.DrawText(x, y - 10, "Y: " + Math.round(y * 100) / 100);
    }

    RefreshScreenBuffer()
    {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
}