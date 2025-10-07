import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";
import { Ship } from "./ship.js";

const gameArea = document.querySelector('.game-area');
const p1Board = document.querySelector('#p1-board');
const p2Board = document.querySelector('#p2-board');

function gameController() {
    const CPU = new Player('CPU');
    CPU.cpu = true;
    CPU.turn = true;
    CPU.fillBoardRandomly();
    console.log(CPU.gameboard);

    const realPlayer = new Player('Real');
    realPlayer.fillBoardRandomly();
    console.log(realPlayer.gameboard);

    DOMController(realPlayer, CPU, checkWinner);

    function checkWinner(p1, p2) {
        if (p1.gameboard.checkIfAllSunk()) {
            return `${p2.name} wins!`;
        }
        
        if (p2.gameboard.checkIfAllSunk()) {
            return `${p1.name} wins!`;
        }
        
        return null;
    }

    return { CPU, realPlayer, checkWinner };
}

function DOMController(p1, p2, checkWinner) {
    const playerInput = document.createElement("input");
    playerInput.id = 'player-input';
    playerInput.placeholder = 'Enter coordinate, like A1';
    gameArea.appendChild(playerInput);

    const attackBtn = document.createElement("button");
    attackBtn.id = 'attack-btn';
    attackBtn.textContent = 'Attack';
    gameArea.appendChild(attackBtn);

    attackBtn.addEventListener('click', () => {
        const coord = playerInput.value.trim().toUpperCase();

        try {
            const p1Attack = p1.attack(p2, coord);

            const winner = checkWinner(p1, p2);
            if (winner) {
                console.log(winner);
                return;
            }

            const p2Attack = p2.randomAttack(p1);

            const winner2 = checkWinner(p1, p2);
            if (winner2) {
                console.log(winner2);
            }

            playerInput.textContent = '';

        } catch (err) {
            console.log(err.message);
        }
    });
}

function renderBoard(boardElem, gameboard, hideShips = false) {
    boardElem.innerHTML = '';

    for (let i = 0; i < gameboard.board.length; i++) {
        for (let j = 0; j < gameboard.board[i].length; j++) {
            const coord = gameboard.board[i][j];
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.coord = coord;

            // ships for player's board
            if (!hideShips && gameboard.shipSquares.some(sq => sq.coords.includes(coord))) {
                cell.classList.add('ship');
            }

            // track hits and misses
            if (gameboard.hitSquares.includes(coord)) {
                cell.classList.add('hit');
            } else if (gameboard.targetedSquares.includes(coord)) {
                cell.classList.add('miss');
            }

            boardElem.appendChild(cell);
        }
    }
}

export { gameController }