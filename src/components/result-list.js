// eslint-disable-next-line no-unused-vars
import ResultItem from "./result-item";

class ResultList extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  set results(data) {
    this._results = data;
    if (this._results.length != 0) {
      this.render();
    } else {
      this.renderError('No games found');
    }
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-flow: row wrap;
          gap: 2em;
          align-items: center;
          justify-content: center;
        }
      </style>
    `;
    this._results.forEach(result => {
      const resultItem = document.createElement('result-item');
      resultItem.gameData = result;
      this._shadowRoot.appendChild(resultItem);
    });
  }

  renderError(message) {
    this._shadowRoot.innerHTML = `Sorry, ${message}`;
  }
}

customElements.define('result-list', ResultList);
export default ResultList;