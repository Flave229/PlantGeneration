let pressedCharacter:string[] = [];

class InputHandler
{
    static inititialise()
    {
        document.addEventListener('keydown', InputHandler.setCharacter);
        document.addEventListener('keyup', InputHandler.resetCharacter);
    }

    static setCharacter(e:any)
    {
        if(pressedCharacter.indexOf(e.key.toLowerCase()) > -1)
            return;

        pressedCharacter.push(e.key.toLowerCase());
    }

    static resetCharacter(e:any)
    {
        if(pressedCharacter.indexOf(e.key.toLowerCase()) === -1)
            return;

        pressedCharacter.splice(pressedCharacter.indexOf(e.key.toLowerCase()), 1);
    }

    static checkKey(character:string)
    {
        return pressedCharacter.indexOf(character.toLowerCase()) !== -1;
    }
}