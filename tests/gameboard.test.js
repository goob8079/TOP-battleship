const { Gameboard } = require('../src/game_components/gameboard');
const { Ship } = require('../src/game_components/ship');

describe('Gameboard tests', () => {
    describe('placeShip tests', () => {
        test('Limit to ships on gameboard', () => {
            const gameboard = new Gameboard();
            const ship1 = new Ship(2);
            const ship2 = new Ship(3);
            const ship3 = new Ship(3);
            const ship4 = new Ship(4);
            const ship5 = new Ship(5);
            const extraShip = new Ship(2);

            gameboard.placeShip(ship1, ['A1', 'A2']);
            gameboard.placeShip(ship2, ['B1', 'B2', 'B3']);
            gameboard.placeShip(ship3, ['A10', 'B10', 'C10']);
            gameboard.placeShip(ship4, ['G2', 'H2', 'I2', 'J2']);
            gameboard.placeShip(ship5, ['F5', 'F6', 'F7', 'F8', 'F9']);

            expect(
                () => gameboard.placeShip(extraShip, ['A8', 'B8'])
            ).toThrow('There can only be 5 ships on the board!');
        });

        test('Ship length check', () => {
            const gameboard = new Gameboard();
            const ship1 = new Ship(6);
            
            expect(
                () => gameboard.placeShip(ship1, ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'])
            ).toThrow('Ship must be within the lengths 2-5');
        });

        test('Coords must correspond to ship length', () => {
            const gameboard = new Gameboard();
            const ship1 = new Ship(3);

            expect(
                () => gameboard.placeShip(ship1, ['A1', 'A2'])
            ).toThrow('Coordinates must correspond to ship length!');
        });

        test('Prevents coords from being off the board', () => {
            const gameboard = new Gameboard();
            const ship1 = new Ship(2);

            expect(
                () => gameboard.placeShip(ship1, ['Z1', 'Z2'])
            ).toThrow('Please enter a coordinate on the board!')
        });

        // this test also checks the automatic capitilization feature for coords
        test('Preoccupied coords/squares', () => {
            const gameboard = new Gameboard();
            const ship1 = new Ship(2);
            const ship2 = new Ship(3);
            gameboard.placeShip(ship1, ['a1', 'a2']);

            expect(
                () => gameboard.placeShip(ship2, ['a2', 'a3', 'a4'])
            ).toThrow(/is already occupied!/);
        });

        test('Placing a ship diagonally', () => {
            const gameboard = new Gameboard();
            const ship1 = new Ship(2);
        
            expect(
                () => gameboard.placeShip(ship1, ['A1', 'b2'])
            ).toThrow(/is not placed correctly!/);
        });

        test('Ship is pushed to shipSquares correctly', () => {
            const gameboard = new Gameboard();
            const ship1 = new Ship(2);
            gameboard.placeShip(ship1, ['a1', 'a2']);

            
            expect(gameboard.shipSquares[0].ship).toBeInstanceOf(Ship);
            expect(gameboard.shipSquares[0].ship).toEqual({hits: 0, length: 2, sunk: false});
            expect(gameboard.shipSquares[0].coords).toEqual(['A1', 'A2']);
        });
    });
    
    describe('receiveAttack tests', () => {
        test('Attack hits ship', () => {
            const gameboard = new Gameboard();
            const ship1 = new Ship(2);
            gameboard.placeShip(ship1, ['A1', 'A2']);

            expect(gameboard.receiveAttack('A1')).toBe(true);
        });

        test('Attack misses ship', () => {
            const gameboard = new Gameboard();
            const ship1 = new Ship(2);
            gameboard.placeShip(ship1, ['A1', 'A2']);

            expect(gameboard.receiveAttack('A3')).toBe(false);
        });

        test('All ships sunk', () => {
            const gameboard = new Gameboard();
            const ship1 = new Ship(2);
            const ship2 = new Ship(3);

            gameboard.placeShip(ship1, ['A1', 'A2']);
            gameboard.placeShip(ship2, ['b1', 'b2', 'b3']);
            gameboard.receiveAttack('A1');
            gameboard.receiveAttack('A2');
            gameboard.receiveAttack('B1');
            gameboard.receiveAttack('B2');

            expect(gameboard.receiveAttack('B3')).toMatch(/All sunk/);
        });
    });
});