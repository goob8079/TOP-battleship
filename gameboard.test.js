const { Gameboard } = require('./gameboard');
const { Ship } = require('./ship');

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

        test('Coords correspond to ship length', () => {
            const gameboard = new Gameboard();
            const ship1 = new Ship(3);

            expect(
                () => gameboard.placeShip(ship1, ['A1', 'A2'])
            ).toThrow('Coordinates must correspond to ship length!');
        });
    });
    
    
});