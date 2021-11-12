import API from './api-service.js';
import refs from './refs.js';
import cardTpl from '../templates/card.hbs';
// import '@pnotify/core/dist/Material.css';
// import { error } from '@pnotify/core';

refs.form.addEventListener('submit', fetchImagesOnSearch);
refs.btnMore.addEventListener('click', onClickBtnMore);

let numberPage = null;
let query = null;
let numberCards = 0;

refs.btnMore.classList.add('is-hidden');

function fetchImagesOnSearch(evt) {
  refs.btnMore.classList.add('is-hidden');

  evt.preventDefault();

  refs.listCards.innerHTML = '';
  numberPage = 1;

  const searchQuery = evt.currentTarget.elements.query.value
    .toLowerCase()
    .trim();

  if (!searchQuery) return;
  refs.btnMore.classList.remove('is-hidden');

  API.fetchImages(searchQuery, numberPage)
    .then(data => {
      if (data.hits.length === 0) return errorData();
      // console.log(data);
      createMarkup(data);
    })
    .catch(errorFetch);

  query = searchQuery;

  refs.form.reset();
  numberCards = 0;
}

function createMarkup(arr) {
  if (arr.hits.length < 12) {
    refs.btnMore.classList.add('is-hidden');
  }

  refs.listCards.insertAdjacentHTML(
    'beforeend',
    arr.hits.map(cardTpl).join(''),
  );

  numberPage += 1;

  if (numberCards >= 12) {
    refs.listCards.children[numberCards].classList.add('my-element-selector');
  }
  if (numberCards > 12) {
    refs.listCards.children[numberCards - 12].classList.remove(
      'my-element-selector',
    );
  }
  numberCards += 12;
  // console.log(numberPage);
  // console.log(refs.listCards.children);
}

function onClickBtnMore() {
  // console.log(query);
  API.fetchImages(query, numberPage)
    .then(data => {
      createMarkup(data);
      const element = document.querySelector('.my-element-selector');
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    })
    .catch(errorFetch);
}

function errorFetch() {
  alert('Error! Service is crashed!');
}

function errorData() {
  alert('Uncorrect name! Please, write an other word!');
}

// function activateBtnSearch(evt) {
//   if (evt.isTrusted) {
//     refs.btnSearch.disabled = false;
//   }
// }
