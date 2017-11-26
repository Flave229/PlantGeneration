///<reference path="../InputHandler.ts"/>
let debugEnabled: boolean;

class Debugger {
    private debugCooldown: number;

    constructor() {
        debugEnabled = false;
        this.debugCooldown = 0.2;
    }

    update(delta: number) {
        if (this.debugCooldown > 0)
            this.debugCooldown -= delta;

        if (InputHandler.checkKey(InputMappings.TOGGLE_DEBUG()) && this.debugCooldown <= 0) {
            debugEnabled = !debugEnabled;
            this.debugCooldown = 0.2;
        }
    }

    static isDebugEnabled() {
        return debugEnabled;
    }
}