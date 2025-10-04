import { Ship } from "./ship.js";

class Gameboard {
    constructor() {
        this.board = [
            ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
            ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10'],
            ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10'],
            ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10'],
            ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10'],
            ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10'],
            ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10'],
            ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10'],
            ['I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9', 'I10'],
            ['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8', 'J9', 'J10'],
        ];
        // squares the player's ships are in 
        this.shipSquares = [];
        // squares the opponent hit
        this.hitSquares = [];
        // squares the player targeted
        this.targetedSquares = [];
    }
    
    placeShip(ship, coords) {
        if (this.shipSquares.length >= 5) {
            throw new Error('There can only be 5 ships on the board!');
        }
        
        if (!(ship instanceof Ship)) {
            throw new Error('First parameter must be a ship')
        }
        
        if (ship.length > 5 || ship.length < 2) {
            throw new Error('Ship must be within the lengths 2-5');
        }
        
        if (!Array.isArray(coords)) {
            throw new Error('Parameter must be array!');
        }
        
        if (ship.length !== coords.length) {
            throw new Error('Coordinates must correspond to ship length!');
        }
        
        // makes coords automatically uppercase
        coords = coords.map(cd => cd.trim().toUpperCase());
        
        // check if coords coords exist
        for (let coord of coords) {
            const exists = this.board.some(row => row.includes(coord));
            if (!exists) {
                throw new Error('Please enter a coordinate on the board!');
            }
        }
        
        // flatten the occupied squares from every ship
        const occupiedSquares = this.shipSquares.flatMap(s => s.coords);
        for (let square of coords) {
            if (occupiedSquares.includes(square)) {
                throw new Error(`${square} is already occupied!`);
            }
        }
        
        if (!(this.#isHorizontal(coords) || this.#isVertical(coords))) {
            throw new Error(`Ship of length ${ship.length} is not placed correctly! Must be placed in consecutive rows or columns`);
        }
        
        // add new key/value pair each time
        this.shipSquares.push({ ship, coords });
    }
    
    receiveAttack(coord) {
        coord = coord.trim().toUpperCase();

        const exists = this.board.some(row => row.includes(coord));
        if (!exists) {
            throw new Error('Please enter a coordinate on the board!');
        }
        
        // check if any of the ships has the coord
        for (const { ship, coords } of this.shipSquares) {
            if (coords.includes(coord)) {
                this.hitSquares.push(coord);
                this.targetedSquares.push(coord);
                
                ship.hit();
                
                if (ship.isSunk()) {
                    console.log(`Ship of length ${ship.length} has been sunk`);
                }
                
                // destructure shipSquares to pull out the .ship property
                // since the items inside shipSquares looks like - { ship: <Ship instance>, coords: [...] }
                // then check if all ships are sunk
                if (this.checkIfAllSunk()) {
                    return 'All sunk';
                }
                
                // if hit
                return true;
            }
        }
        
        // if missed
        this.targetedSquares.push(coord);
        return false;
    }

     checkIfAllSunk(){
        return this.shipSquares.every(({ ship }) => ship.isSunk());
    };
    
    #parseCoord(coord) {
        if (typeof coord !== 'string' || coord.length < 2) {
            throw new Error('Invalid coordinate input');
        }
        
        coord = coord.trim();
        const row = coord[0].toUpperCase();
        const col = parseInt(coord.slice(1), 10);
        
        if (isNaN(col) || col < 1 || col > 10) {
            throw new Error('Column must be between 1 and 10');
        }
        
        if (row < 'A' || row > 'J') {
            throw new Error('Row must be between A and J');
        }
        
        return { row, col };
    }
    
    #isHorizontal(coords) {
        const parsed = coords.map(this.#parseCoord);
        const sameRow = parsed.every(cd => cd.row === parsed[0].row);
        if (!sameRow) return false;
        
        // checking consecutive cols
        const cols = parsed.map(cd => cd.col).sort((a, b) => a -b);
        for (let i = 1; i < cols.length; i++) {
            if (cols[i] !== cols[i - 1] + 1) return false;
        }
        
        return true;
    }
    
    #isVertical(coords) {
        const parsed = coords.map(this.#parseCoord);
        const sameCol = parsed.every(cd => cd.col === parsed[0].col);
        if (!sameCol) return false;
        
        // checking consecutive rows
        // convert row letters to ASCII numbers
        const rows = parsed.map(cd => cd.row.charCodeAt(0)).sort((a, b) => a - b);
        for (let i = 1; i < rows.length; i++) {
            if (rows[i] !== rows[i - 1] + 1) return false;
        }
        
        return true;
    }
}

export { Gameboard }