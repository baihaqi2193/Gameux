class AppBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .app-bar {
          font-family: 'Syne', sans-serif;
          display: flex;
          padding: 16px 32px;
          width: 100%;
          background-color: white;
          color: #2C3333;
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        }
      </style>
    
      <div id="appBar" class="app-bar">
        <h2>GUX</h2>
      </div>
    `
  }

}


customElements.define('app-bar', AppBar);
export default AppBar;