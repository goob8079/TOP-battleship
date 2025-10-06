import { gameController } from "./game_components/game_module";

const start = document.querySelector('#start');

start.addEventListener('click', () => gameController(), { once: true });