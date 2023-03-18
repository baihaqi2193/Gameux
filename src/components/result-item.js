import DataHandler from "../scripts/data/data-handler";
import { renderModal } from "../scripts/view/renderer";

class ResultItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  set gameData(data) {
    this.gameName = data.name;
    this.gameId = data.id;
    this.gameDate = new Date(data.first_release_date * 1000).getFullYear() || 'Unknown Date';
    this.gameCover = data.cover.image_id;
    this.gamePlatforms = data.platforms.map((e) => {
      return e.abbreviation;
    }).join(', ');
  }

  async getGameDetails(gameId) {
    const req = await DataHandler.getGameDetails(gameId);
    const res = req[0];
    renderModal(res);
  }

  render() {
    this._shadowRoot.innerHTML = `
    <style>
      .item-container img {
        cursor: pointer;
        background-color: #2C3333;
        border-radius: 4px;
        transition: all .2s ease-in-out;
        width: 264px;
        height: 352px;
      }
      
      .item-container img:hover {
        transform: scale(1.08);
        opacity: 75%;
      }
      
      .item-container {
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding:  1.5em .3em;
        border-radius: 8px;
        width: 300px;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
      }
      
      .item-info {
        margin-top: .8em;
        max-width: 80%;
      }

      .item-info > * {
        margin-block: .4em;
      }

      .item-container button {
        padding: .5em .8em;
        margin-top: 12px;
        border-radius: 4px;
        border: none;
        background-color: rgb(63, 13, 92);
        color: white;
        cursor: pointer;
        transition: .2s all ease;
      }

      .item-container button:hover {
        background-color: rgb(104, 22, 151);
      }
    </style>

    <div class="item-container">
    <img class="item-image" src="https://images.igdb.com/igdb/image/upload/t_cover_big/${this.gameCover}.jpg" alt="" srcset="">
    <div class="item-info">
      <p><b>${this.gameName}</b></p>
      <p>${this.gameDate}</p>
      <p>${this.gamePlatforms}</p>
    </div>
    <button class="btn-details">Show Details</button>
    </div>
    `

    this._shadowRoot.querySelector('.btn-details').addEventListener('click', () => {
      this.getGameDetails(this.gameId);
    });

  }
}

customElements.define('result-item', ResultItem);
export default ResultItem;