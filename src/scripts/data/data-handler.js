import axios from "axios";

class DataHandler {
  static baseUrl = 'https://api.igdb.com/v4/games';

  static config = {
    headers: {
      'Content-Type': 'text/plain',
      // eslint-disable-next-line no-undef
      'Authorization': process.env.AUTH,
      // eslint-disable-next-line no-undef
      'Client-ID': process.env.CLIENT_ID
    }
  }

  static async makeRequest(url, query, config) {
    return await axios.post(url, query, config);
  }

  static async searchGames(keyword) {
    const query = `
      search "${keyword}";
      fields name, first_release_date, platforms.abbreviation, cover.image_id;
      where platforms !=n & cover.image_id !=n & rating != n;
      limit 20;
    `;
    const req = await this.makeRequest(this.baseUrl, query, this.config);
    return req.data;
  }

  static async getPopularGames() {
    const query = `
      fields name, first_release_date, platforms.abbreviation, cover.image_id;
      where platforms !=n & cover.image_id !=n & hypes > 100 & rating > 75 & platforms.id = 6;
      sort first_release_date desc;
      limit 3;
    `;

    const req = await this.makeRequest(this.baseUrl, query, this.config);
    return req.data;
  }

  static async getGameDetails(gameId) {
    const query = `
    fields name, first_release_date, platforms.abbreviation, cover.image_id, summary, url, genres.name, aggregated_rating, involved_companies.company.name;
      where id = ${gameId};
    `;

    const req = await this.makeRequest(this.baseUrl, query, this.config);
    return req.data;
  }
}

export default DataHandler;