const searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  
  // const selectCiity = document.querySelector('#search-input').value;
  const cityVal = document.querySelector('#city-list').value;

  if (!cityVal) {
    console.error('You need a search input value!');
    return;
  }

  // const queryString = `./search-results.html?q=${cityVal}`;

  // location.assign(queryString);
  window.location = `http://127.0.0.1:5501/search-results.html?city=${cityVal}`
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
