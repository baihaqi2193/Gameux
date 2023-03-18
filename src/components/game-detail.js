class GameDetail extends HTMLElement {
  connectedCallback() {
    this.render()
  }

  set gameData(data) {
    this.gameName = data.name;
    this.gameDate = new Date(data.first_release_date * 1000).toDateString() || 'Unknown Date';
    this.gameCover = data.cover.image_id;
    this.gamePlatforms = data.platforms.map((e) => {
      return e.abbreviation;
    }).join(', ');
    this.gameGenres = data.genres.map((e) => {
      return e.name;
    }).join(', ');
    this.gameSummary = data.summary;
    this.gameUrl = data.url;
    this.gameRating = isNaN(data.aggregated_rating) ? '😓 Rating Not Available' : `🔥 ${Math.round(data.aggregated_rating)}`;
  }

  render() {
    this.innerHTML = `
    <style>
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    
    .modal {
      background-color: white;
      width: 80%;
      min-width: 300px;
      z-index: 999;
      border-radius: 1em;
      padding: 2em 4em;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      max-height: 90%;
      overflow: auto;
    }
    
    .modal-content {
      margin-top: 2em;
      display: flex;
      gap: 4em;
    }
    
    .game-image img {
      border-radius: 8px;
    }
    
    .game-info {
      width: 60%;
    }
    
    .game-info section {
      margin-bottom: 1em;
      text-overflow: ellipsis;
    }
    
    .game-info h3 {
      margin-bottom: .5em;
    }
    
    .modal-close span {
      font-size: 28px;
      cursor: pointer;
      transition: .1s all ease-in;
    }
    
    .modal-close span:hover {
      color: #5f6161;
    }
    
    .modal-close {
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      left: 100%;
      width: 25px;
      height: 25px;
    }
    
    .game-rating {
      padding: 2em;
      border: 2px solid #2C3333;
      width: 24px;
      height: 24px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 999px;
    }

    @media (max-width: 1000px) {
      .modal-content {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .modal-header h1 {
        text-align: center;
      }
    }
    </style>

    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-close">
          <span id="modalCloseBtn"><b>x</b></span>
        </div>
        <div class="modal-header">
          <h1>${this.gameName}</h1>
        </div>
        <div class="modal-content">
          <div class="game-image">
          <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/${this.gameCover}.jpg">
          </div>
          <div class="game-info">
            <section>
              <h3>Summary</h3>
              <p>${this.gameSummary}</p>
            </section>
            <section>
              <h3>Genre</h3>
              <p>${this.gameGenres}</p>
            </section>
            <section>
              <h3>Release Date</h3>
              <p>${this.gameDate}</p>
            </section>
            <section>
              <h3>Platform</h3>
              <p>${this.gamePlatforms}</p>
            </section>
            <section>
              <h3>Rating</h3>
              <p>${this.gameRating}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
    `

    document.querySelector('#modalCloseBtn').addEventListener('click', () => {
      document.querySelector('game-detail').remove()
    });
  }
}

customElements.define('game-detail', GameDetail);
export default GameDetail;