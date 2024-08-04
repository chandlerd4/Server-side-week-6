const resultTextEl = document.querySelector('#result-text');
const resultContentEl = document.querySelector('#result-content');
const searchFormEl = document.querySelector('#search-form');

function getParams() {
  
  console.log(document.location.search)
  const searchParamsArr = new URLSearchParams(document.location.search);
  let cityName = searchParamsArr.get('city');

 

  searchApi(cityName);
}




function printResults(resultObj) {
  console.log(resultObj);

  // set up `<div>` to hold result content
  const resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  const resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  const titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.title;

  const bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML =
    `<strong>Date:</strong>${resultObj.date}<br/>`;

  if (resultObj.subject) {
    bodyContentEl.innerHTML +=
      `<strong>Subjects:</strong>${resultObj.subject.join(', ')}<br/>`;
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> No subject for this entry.';
  }

  if (resultObj.description) {
    bodyContentEl.innerHTML +=
      `<strong>Description:</strong>${resultObj.description[0]}`;
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong>  No description for this entry.';
  }

  const linkButtonEl = document.createElement('a');
  linkButtonEl.textContent = 'Read More';
  linkButtonEl.setAttribute('href', resultObj.url);
  linkButtonEl.classList.add('btn', 'btn-dark');

  resultBody.append(titleEl, bodyContentEl, linkButtonEl);

  resultContentEl.append(resultCard);
}

function searchApi(cityName) {
 
const url = `http://api.weatherstack.com/current?access_key=ee773169d39f3b0ced44777e1e57015a&query=${cityName}&units=f`;
const options = {
    method: "GET",
};




  fetch(url, options)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (locRes) {
      console.log (locRes)
      // write query to page so user knows what they are viewing
      resultTextEl.textContent = locRes.location.name;
      resultContentEl.innerHTML =`<h1> temperature is - ${locRes.current.temperature}</h1>`

      
    })
    .catch(function (error) {
      console.error(error);
    });
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  const searchInputVal = document.querySelector('#search-input').value;
  const formatInputVal = document.querySelector('#format-input').value;

  const queryString = `./search-results.html?q=${searchInputVal}&format=${formatInputVal}`;

  location.assign(queryString);

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  getParams();
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

getParams();
