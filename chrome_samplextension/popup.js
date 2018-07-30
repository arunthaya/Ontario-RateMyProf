//let getRatings = document.getElementById('ratings');

var buttonRetrieved;

// let buttonGetter = function(){
//   console.log('ran this function');
//   buttonRetrieved = document.getElementById('ratings');
// }
//
// window.onload = buttonGetter();

let handleClick = function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      {file: "contentScript.js"},
      function(result){
        console.log('uh duh herro');
      }
    );
  });
}

window.onload = function() {
  document.getElementById('ratings').addEventListener('click',handleClick);
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
