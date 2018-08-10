
var searchBarActivated;
var buttonRetrieved;
/**
 * Handle a submit from the searchbar form
 * @param {details} - chrome api to get current tab
 */

let handleClick = function(details){
  // chrome.runtime.sendMessage(
  //   {
  //     type: "testing",
  //     url: window.location.href
  //   },
  //   function (response) {
  //     console.log(response);
  //   }
  // );
  chrome.tabs.executeScript(
    {code: 'window.location.host'},
    sendUrl);
}

function sendUrl(resultsArray){
  chrome.runtime.sendMessage({
    type: "testing",
    url: resultsArray[0]
  }, function(response){
    console.log(response);
  });
}

/**
 * Handle a submit from the searchbar form
 * @param {event} - to prevent the form from doing default actions
 */

let handleSubmit = function(e){
  e.preventDefault();
  console.log($('body'));
  console.log('hello');
}

let handleInput = function(){
  chrome.storage.sync.get('defaultSchool', function(data){
    console.log(data.defaultSchool);
  });
  searchBarActivated = false;
  if($.trim($('#searchBox').val()) == ""){
    console.log('blank');
  } else {
    searchBarActivated = true;
    console.log('something entered');
  }
  if(searchBarActivated){
    if($('#searchBarSubmit').length == 0){
      $('#searchbar').append("<button id='searchBarSubmit' type='button' class='btn btn-primary btn-block'>Search</button>");
    }
  } else {
    if($('#searchBarSubmit').length != 0){
      $('#searchBarSubmit').remove();
    }
  }
  console.log('input detected');
}

let herro = function(){
  console.log('testing');
}


/**
 * Initiate listeners to active elements
 */

window.onload = function() {
  document.getElementById('ratings').addEventListener('click',handleClick);
  document.getElementById('searchForProf').addEventListener('submit', handleSubmit);
  document.getElementById('searchForProf').addEventListener('input', handleInput);
  document.getElementById('options').addEventListener('click', openOptions);
  $('#searchbar').on('click', 'button', herro);
  console.log(document.getElementById('searchForProf'));
}

/*
$('body').on('click', '#ratings', function () {
     console.log("yeahhhh!!! but this doesn't work for me :(");
});*/
