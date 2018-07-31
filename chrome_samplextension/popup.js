
var searchBarActivated;
var buttonRetrieved;
/**
 * Handle a submit from the searchbar form
 * @param {details} - chrome api to get current tab
 */

let handleClick = function(details){
  chrome.tabs.executeScript(
    details.tabId,
    {file: "contentScript.js"}
  ), _=>{
    let e = chrome.runtime.lastError;
    if( e !== undefined){
      console.log(e);
    }
  }
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
  $('#searchbar').on('click', 'button', herro);
  console.log(document.getElementById('searchForProf'));
}

$('body').on('click', '#ratings', function () {
     console.log("yeahhhh!!! but this doesn't work for me :(");
     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
       chrome.tabs.executeScript(
         {file: "contentScript.js"},
         function(result){
           console.log('uh duh herro');
         }
       );
     });
});
