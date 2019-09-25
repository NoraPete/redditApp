'use strict';

let form = document.querySelector('form');

function getEndpoint() {
  let currentURL = window.location.href;
  let re = /\/posts\/\d+/;
  return currentURL.substring(currentURL.search(re));
}

function checkInput() {
  let description = form.title.value;
  let address = form.url.value;
  let message;
  if (!description && !address) {
    return message = 'Please provide a title and a URL!';
  } else if (!description) {
    return message = 'Please provide a title!';
  } else if (!address) {
    return message = 'Please provide a URL!';
  }
}

function sendPutRequest(description, address) {
  let body = { title: description, url: address };
  return fetch(`${getEndpoint()}`, { 
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
   })
   .then(response => {
    if(response.status < 200 || response.status >= 300) {
      return new Error('Something went wrong');
    }
    return response;
   })
   .then(response => {
     if(response.status === 200) {
      window.location.href = '/reddit';
     }
   })
   .catch(console.log);
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (checkInput()) {
    alert(checkInput());
  } else {
    sendPutRequest(form.title.value, form.url.value);
  }
})