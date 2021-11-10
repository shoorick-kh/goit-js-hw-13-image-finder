const API_KEY = '24260489-c6ae81bdca94ae3f2fdf467ab';
const BASE_URL = 'https://pixabay.com/api';

function fetchImages(searchQuery, numberPage) {
  return fetch(
    `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${numberPage}&per_page=12&key=${API_KEY}`,
  ).then(response => response.json());
}

export default { fetchImages };
