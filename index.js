'use strict';

//const token = '6170bd5b02b489b5ea462613e0bebd5d54e9d6b3';

const searchURL = 'https://api.github.com/users/';


function displayResults(responseJson) {
  // if there are previous results, remove them
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.length; i++){
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<li>
        <h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
    console.log(responseJson);

};

function getRepos(userHandle) {

  const url = searchURL + userHandle + '/repos';

  console.log(url);

  // const options = {
  //   headers: new Headers({
  //     "Authorization": token})
  // };

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userHandle = $('#user-handle').val();
    getRepos(userHandle);
  });
}

$(watchForm);