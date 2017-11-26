class Renderer
{
    private static canvas: HTMLCanvasElement;
    private static context: CanvasRenderingContext2D;

    static inititialise()
    {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
    }

    static drawRect(x: number, y: number, width: number, height: number)
    {
        if (Debugger.isDebugEnabled()) {
            this.drawDebugInfo(x, y, width, height)
        }
        this.context.fillRect(x, y, width, height);
    }

    static DrawLine(xStart: number, yStart: number, xEnd: number, yEnd: number)
    {
        this.context.beginPath();
        this.context.moveTo(xStart, yStart);
        this.context.lineTo(xEnd, yEnd);
        this.context.stroke();
    }

    static drawText(x: number, y: number, text: string)
    {
        this.context.fillText(text, x, y);
    }

    static drawDebugInfo(x: number, y: number, width: number, height: number)
    {
        this.drawText(x, y - 20, "X: " + Math.round(x * 100) / 100);
        this.drawText(x, y - 10, "Y: " + Math.round(y * 100) / 100);
    }

    static refreshScreenBuffer()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}