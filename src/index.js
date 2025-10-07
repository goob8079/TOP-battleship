import { gameController } from "./game_components/game_module";
import './style.css';

const start = document.querySelector('#start');

start.addEventListener('click', () => gameController(), { once: true });