class SearchBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  };

  connectedCallback() {
    this.render();
  };

  get value() {
    return this._shadowRoot.querySelector('#searchInput').value;
  };

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  };

  render() {
    this._shadowRoot.innerHTML = `
    <style>
    :host {
      display: flex;
      padding: 2em;
      border-radius: 8px;
      justify-content: center;
      gap: 1.5em;
    }
    
    :host > * {
      padding: 1em 2em;
    }
    
    :host input {
      border: 1px solid #2C3333;
      border-radius: 8px;
      width: 100%;
    }
    
    :host>input:focus {
      outline: none;
    }
    
    :host button {
      border-radius: 8px;
      border: none;
      background-color: rgb(63, 13, 92);
      color: white;
      cursor: pointer;
      transition: .2s all ease;
    }
    
    :host button:hover {
      background-color: rgb(104, 22, 151);
    }

    @media (max-width: 768px){
      :host {
        flex-direction: column;
        align-items: center;
        gap: .5em;
      }

      :host > * {
        padding: .8em 1em;
      }
    }

    </style>

    <input type="text" placeholder="Search Any Games" id="searchInput">
    <button id="searchBtn">Search</button>
    `
    this._shadowRoot.querySelector('#searchBtn').addEventListener('click', this._clickEvent);
  };
}

customElements.define('search-bar', SearchBar);
export default SearchBar;