import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

class Player{
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard;
        this.cpu = false;
        this.turn = false;

        // for CPU, keeps track of attacked coords
        this.targetedCoords = new Set();
    }

    attack(opp, coord) {
        return opp.gameboard.receiveAttack(coord);
    }

    fillBoardRandomly() {
        // ships and their lengths
        const ships = [
            {name: 'ship1', length: 2},
            {name: 'ship2', length: 3},
            {name: 'ship3', length: 3},
            {name: 'ship4', length: 4},
            {name: 'ship5', length: 5}
        ];
        
        for (let ship of ships) {
            let placed = false;
            while (!placed) {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);
                const hortizontal = Math.random() < 0.5;
                const coords = [];

                for (let i = 0; i < ship.length; i++) {
                    const newX = hortizontal ? x + i : x;
                    const newY = hortizontal ? y : y + i;

                    if (newX > 9 || newY > 9) break;
                    coords.push([newX, newY]);
                }

                if (coords.length === ship.length && this.#canPlace(coords)) {
                    this.gameboard.placeShip(ship, coords);
                    placed = true;
                }
            }
        }
    }
    
    randomAttack(opp) {
        let coord;
        do {
            const row = Math.floor(Math.random() * 10);
            const col = Math.floor(Math.random() * 10);
            // coord = `${String.fromCharCode(65 + row)}${col + 1}`;
        } while (this.targetedCoords.has(coord)); // retries if already targeted a coord

        this.targetedCoords.add(coord);
        return opp.gameboard.receiveAttack(coord);
    }

    #canPlace(coords) {
        for (let [x, y] of coords) {
            if (this.gameboard[y][x] !== null) return false;
        }
        return true;
    }
}

export { Player };