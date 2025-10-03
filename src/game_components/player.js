import { Gameboard } from "./gameboard.js";

class Player{
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard;
        this.cpu = false;
    }
}

export { Player };