//let getRatings = document.getElementById('ratings');

var buttonRetrieved;

// let buttonGetter = function(){
//   console.log('ran this function');
//   buttonRetrieved = document.getElementById('ratings');
// }
//
// window.onload = buttonGetter();

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

let handleSubmit = function(e){
  e.preventDefault();
  console.log($('body'));
  console.log('hello');
}


window.onload = function() {
  document.getElementById('ratings').addEventListener('click',handleClick);
  document.getElementById('searchForProf').addEventListener('submit', handleSubmit);
  console.log(document.getElementById('searchForProf'));
}

// $('body').on('click', '#ratings', function () {
//      console.log("yeahhhh!!! but this doesn't work for me :(");
//      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//        chrome.tabs.executeScript(
//          {file: "contentScript.js"},
//          function(result){
//            console.log('uh duh herro');
//          }
//        );
//      });
// });
