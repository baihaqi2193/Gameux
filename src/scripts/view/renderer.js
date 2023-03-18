/* eslint-disable no-unused-vars */
import AppBar from "../../components/app-bar.js";
import SearchBar from "../../components/search-bar.js";
import ResultList from "../../components/result-list.js";
import GameDetail from "../../components/game-detail.js";
import DataHandler from "../data/data-handler.js";

const renderLayout = async () => {
  const header = document.querySelector('header');
  const content = document.querySelector('.content');
  const browse = document.querySelector('#search');
  const popular = document.querySelector('#popular');

  const appBar = document.createElement('app-bar');
  header.appendChild(appBar);

  const searchBar = document.createElement('search-bar');
  browse.appendChild(searchBar);

  const resultList = document.createElement('result-list');
  content.appendChild(resultList);

  const featuredList = document.createElement('result-list');
  try {
    featuredList.results = await DataHandler.getPopularGames();
  } catch (err) {
    featuredList.renderError(err.message);
  }
  popular.after(featuredList);
};

const renderModal = (data) => {
  const modal = document.createElement('game-detail');
  modal.gameData = data;
  document.querySelector('main').appendChild(modal);
};


export { renderLayout, renderModal };