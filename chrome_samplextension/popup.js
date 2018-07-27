//let getRatings = document.getElementById('ratings');

window.onload = function(){
  document.getElementById('ratings').addEventListener('click', function() {
    chrome.tabs.executeScript(
      {file: 'contentScript.js'},
      function(result){
        console.log('uh duh herro');
      }
    );
  });
}
