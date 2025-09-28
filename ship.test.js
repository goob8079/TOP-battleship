const { Ship } = require("./ship");

describe('Ship test', () => {
    test('Ship starting stats', () => {
        const ship = new Ship(4);
        expect(ship.hits).toBe(0);
        expect(ship.isSunk()).toBe(false);
    });

    test('Ship hit and sunk', () => {
        const ship = new Ship(4);
        ship.hits = 3;
        ship.hit()
        expect(ship.hits).toBe(4);
        expect(ship.isSunk()).toBe(true);
    });

    test('hit() increments until hits === length', () => {
        const ship = new Ship(3);
        expect(ship.hits).toBe(0);

        ship.hit();
        expect(ship.hits).toBe(1);

        ship.hit();
        expect(ship.hits).toBe(2);

        ship.hit();
        expect(ship.hits).toBe(3);
        expect(ship.isSunk()).toBe(true);

        ship.hit();
        expect(ship.hits).toBe(3);
    });
});