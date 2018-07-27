//let getRatings = document.getElementById('ratings');

window.onload = function(){
  document.getElementById('ratings').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
        {file: "contentScript.js"},
        function(result){
          console.log('uh duh herro');
        }
      );
    });
  });
}
