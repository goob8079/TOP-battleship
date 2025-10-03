import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";
import { Ship } from "./ship.js";

function gameController() {
    const CPUPlayer = new Player('CPU');
    CPUPlayer.cpu = true;

    const realPlayer = new Player('Real');
}

export { gameController }