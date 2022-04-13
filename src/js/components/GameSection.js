import ComponentHandler from '../ComponentHandler.js';
import { CONTROLL_KEY } from '../constants.js';
import { pipeline } from '../factory/index.js';
import { $element } from '../helpers/index.js';

const template = /*html*/ `
<section class="d-flex justify-center mt-5 hidden"></section>`;

// prettier-ignore
const panel = cars => /*html*/ `
<div class="mt-4 d-flex">${cars.map(car => `
  <div class="mr-2" id="${car.name}">
    <div class="car-player">${car.name}</div>
    ${spinner}
  </div>`).join('')}
</div>`;

const spinner = /*html*/ `
<div class="d-flex justify-center mt-3">
  <div class="relative spinner-container">
    <span class="material spinner"></span>
  </div>
</div>`;

export default class GameSection extends ComponentHandler {
  #cars;

  constructor() {
    super();
    this.insertAdjacentElement('afterbegin', $element(template));
  }

  start() {
    const tryCount = this.getAttribute('try-count');
    const cars = this.#cars;

    pipeline(CONTROLL_KEY.GAME, { tryCount, cars });
  }

  static get observedAttributes() {
    return ['try-count'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue) return this.firstElementChild.classList.add('hidden');

    this.#cars = pipeline(CONTROLL_KEY.GAME_BEFORE, this.getAttribute('car-names'));

    this.firstElementChild.classList.remove('hidden');
    this.firstElementChild.insertAdjacentElement('afterbegin', $element(panel(this.#cars)));

    this.start();
  }
}

customElements.define('game-section', GameSection);
