import { safeExecutor } from './util.js';
import { isDOMElement, isNil } from './valid.js';

export const $ = (selector, target) => {
  if (isNil(target)) return document.querySelector(selector);
  return target.querySelector(selector);
};

export const $addEvent = safeExecutor(([$element, eventType, listenser]) => {
  if (!isDOMElement($element)) throw new Error('첫 번째 인자로 DOM 요소를 선언해주세요.');
  $element.addEventListener(eventType, listenser);
});

export const $elements = stringHTML => {
  const root = document.createElement('div');
  root.innerHTML = stringHTML;
  return root.firstElementChild;
};

export const $eventBindedComponent = getElement => args => {
  try {
    const [$element, $events = []] = getElement(args);
    if (!isDOMElement($element)) throw new Error('첫 번째 인자로 DOM 요소를 선언해주세요.');
    $events.forEach(({ type, callback }) => $addEvent($element, type, callback));
    return $element;
  } catch (error) {
    alert(error.message);
    return null;
  }
};
