import API from './api-service.js';
import refs from './refs.js';
import cardTpl from '../templates/card.hbs';
// import '@pnotify/core/dist/Material.css';
// import { error } from '@pnotify/core';

refs.form.addEventListener('submit', fetchImagesOnSearch);
refs.btnMore.addEventListener('click', onClickBtnMore);
refs.input.addEventListener('focus', activateBtnSearch);

// console.log(refs.input);
let numberPage = null;
let query = null;

refs.btnSearch.disabled = true;
refs.btnMore.disabled = true;

function fetchImagesOnSearch(evt) {
  evt.preventDefault();
  numberPage = 1;
  refs.listCards.innerHTML = '';
  const searchQuery = evt.currentTarget.elements.query.value
    .toLowerCase()
    .trim();
  // console.log(evt.currentTarget.elements.query.value);
  if (!searchQuery) return;
  refs.btnMore.disabled = false;
  API.fetchImages(searchQuery, numberPage)
    .then(data => {
      if (data.hits.length === 0) return errorData();
      // console.log(data);
      createMarkup(data);
    })
    .catch(errorFetch);
  query = searchQuery;
  refs.btnSearch.disabled = true;
  refs.form.reset();
}

function createMarkup(arr) {
  refs.listCards.insertAdjacentHTML(
    'beforeend',
    arr.hits.map(cardTpl).join(''),
  );
  numberPage += 1;
  console.log(numberPage);
}

function onClickBtnMore() {
  console.log(query);
  API.fetchImages(query, numberPage)
    .then(data => {
      createMarkup(data);
    })
    .catch(errorFetch);
  // const element = document.querySelector('.my-element-selector');
  // element.scrollIntoView({
  //   behavior: 'smooth',
  //   block: 'end',
  // });
}

function errorFetch() {
  alert('Error! Service is crashed!');
}

function errorData() {
  alert('Uncorrect name! Please, write an other word!');
}

function activateBtnSearch(evt) {
  if (evt.isTrusted) {
    refs.btnSearch.disabled = false;
  }
}
