import { diff } from './@helper/index.js';
import { Car, RacingGame } from './domain/index.js';
import { Setup, Game, Result } from './infrastructure/index.js';

const publisher = () => {
  const observers = {};
  const subscribe = callback => {
    Object.keys(callback).forEach(_key => {
      observers[_key] = callback[_key];
    });
  };

  const notify = () => {
    Object.keys(observers).forEach(_key => {
      observers[_key]();
    });
  };

  return {
    subscribe,
    notify,
  };
};
export default class Application {
  #racingGame;
  #publisher = publisher();

  constructor() {
    this.#racingGame = new RacingGame();
    this.#publisher.subscribe({ render: this.render.bind(this) });
    this.#publisher.notify();
  }

  render() {
    const $root = document.body;
    const $old = $root.firstChild;
    const $new = document.createElement('div');
    $new.setAttribute('id', 'app');
    $new.replaceChildren(
      Setup({ Car, RacingGame: this.#racingGame }, this.#publisher),
      Game({ RacingGame: this.#racingGame }, this.#publisher),
      Result({ RacingGame: this.#racingGame }, this.#publisher),
    );

    diff($root, $old, $new);
  }
}
