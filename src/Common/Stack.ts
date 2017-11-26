class Stack<T>
{
    private _data : T[];

    constructor()
    {
        this._data = [];
    }

    public push(value : T)
    {
        this._data.push(value);
    }

    public pop() : T
    {
        return this._data.pop();
    }

    public count() : number
    {
        return this._data.length;
    }
}