import AbstractView from '../framework/view/abstract-view.js';

const createNoAddInfoTemplate = () => (
  `<p class="trip-events__msg">
  Sorry, there was an error loading the data
  </p>`);

export default class NoAddInfoView extends AbstractView {
  get template() {
    return createNoAddInfoTemplate();
  }
}
