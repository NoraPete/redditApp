'use strict';

let mainContent = document.querySelector('main');

function checkResponseStatus(res) {
  if (res.status < 200 || res.status >= 300) {
    return new Error('Something went wrong');
  }
  return res;
}

function getId(event) {
  let div = event.target.parentNode;
  return div.parentNode.getAttribute('id').slice(1);
}

function getUpOrDown(event) {
  return event.target.getAttribute('alt');
}

function updateScore(id, score) {
  let displayedScore = document.querySelector(`#p${id} > div > p`);
  displayedScore.innerText = score;
}

function removePost(id) {
    let postToDelete = document.querySelector(`#p${id}`);
    mainContent.removeChild(postToDelete);
}

// TODO: refact

function sendRequestToVote(upOrDown, id) {
  return fetch(`/posts/${id}/${upOrDown}`, {
    method: 'PUT',
    headers: { 'Accept': 'application/json' }
  })
    .then(checkResponseStatus)
    .then(response => response.json())
    .then(json => updateScore(id, json.score))
    .catch(console.log)
}

function sendDeleteRequest(id) {
  return fetch(`/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(checkResponseStatus)
  .then(response => {
    if(response.status === 200) {
      removePost(id);
    }
  })
  .catch(console.log);
}

fetch('/posts')
  .then(res => res.text())
  .then(content => mainContent.innerHTML = content)
  .then(() => {
    let voteBlock = document.querySelectorAll('.vote');
    voteBlock.forEach((block) => {
      block.addEventListener('click', (e) => {
        if(getUpOrDown(e) === 'upvote') {
          e.target.setAttribute('src', 'images/upvoted.png');
        } else {
          e.target.setAttribute('src', 'images/downvoted.png');
        }
        sendRequestToVote(getUpOrDown(e), getId(e));
      });
    });
  })
  .then(() => {
    let deleteBtns = document.querySelectorAll('.info > button');
    deleteBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        console.log('click', getId(e));
        sendDeleteRequest(getId(e));
      });
    });
  })
  .catch(console.log);
