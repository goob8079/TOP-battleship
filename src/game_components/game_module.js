import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";
import { Ship } from "./ship.js";

const gameArea = document.querySelector('.game-area');

const game = gameController();

function gameController() {
    const CPU = new Player('CPU');
    CPU.cpu = true;
    CPU.turn = true;
    CPU.fillBoardRandomly();

    const realPlayer = new Player('Real');
    realPlayer.fillBoardRandomly();

    DOMController(realPlayer, CPU, checkWinner);

    function checkWinner(p1, p2) {
        if (p1.gameboard.checkIfAllSunk()) {
            return `${p2.name} wins!`;
        }
        
        if (p2,gameboard.checkIfAllSunk()) {
            return `${p1.name} wins!`;
        }
        
        return null;
    }

    return { CPU, realPlayer, checkWinner };
}

function DOMController(p1, p2, checkWinner) {
    const playerInput = document.createElement("input");
    playerInput.id = 'player-input';
    gameArea.appendChild(input);

    const attackBtn = document.createElement("button");
    attackBtn.id = 'attack-btn';
    gameArea.appendChild(attackBtn);

    attackBtn.addEventListener('click', () => {
        const coord = playerInput.value.trim().toUpperCase();

        try {
            const p1Attack = p1.attack(opp, coord);

            const winner = game.checkWinner(p1, p2);
            if (winner) {
                console.log(winner);
                return;
            }

            const p2Attack = p2.randomAttack(p1);

            const winner2 = checkWinner(p1, p2);
            if (winner2) {
                console.log(winner2);
            }

        } catch (err) {
            console.log(err.message);
        }
    });
}

export { gameController }