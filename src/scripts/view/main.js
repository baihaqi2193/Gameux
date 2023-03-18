import { renderLayout } from './renderer';
import DataHandler from '../data/data-handler';

const main = () => {
  renderLayout();
  const searchBar = document.querySelector('search-bar');
  const resultList = document.querySelector('result-list');
  const onButtonSearchClicked = async () => {
    try {
      const responseData = await DataHandler.searchGames(searchBar.value);
      resultList.results = responseData;
    }
    catch (err) {
      resultList.renderError(err.message);
    }
  };
  searchBar.clickEvent = onButtonSearchClicked;
}

export default main;