class MathHelper
{
    static RandomBetween(min : number, max : number) : number
    {
        return Math.random() * (max - min) + min;
    }

    static Round(value : number, decimalPlaces : number)
    {
        return value.toFixed(decimalPlaces);
    }
}