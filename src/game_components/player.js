import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

class Player{
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard();
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
            { length: 2},
            { length: 3},
            { length: 3},
            { length: 4},
            { length: 5}
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
                    const coord = `${String.fromCharCode(65 + newY)}${newX + 1}`
                    coords.push(coord);
                }

                if (coords.length === ship.length && this.#canPlace(coords)) {
                    this.gameboard.placeShip(new Ship(ship.length), coords);
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
            coord = `${String.fromCharCode(65 + row)}${col + 1}`;
        } while (this.targetedCoords.has(coord)); // retries if already targeted a coord

        this.targetedCoords.add(coord);
        return opp.gameboard.receiveAttack(coord);
    }

    #canPlace(coords) {
        // flatten shipSquares to create a single flat array
        // (everything gets put in one array)
        const occupied = this.gameboard.shipSquares.flatMap(s => s.coords);

        for (let coord of coords) {
            if (occupied.includes(coord)) return false;
        }
        return true;
    }
}

export { Player };