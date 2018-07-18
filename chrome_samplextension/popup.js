let changeColor = document.getElementById('changeColor');
let originalColor = document.body.style.backgroundColor;
var bool2check = true;

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

function modifyDOM() {
  //You can play with your DOM here or check URL against your regex
  console.log('Tab script:');
  console.log(document.body);
  return document.body.innerHTML;
}

var tdNodes;
changeColor.onclick = function(element) {
//  console.log(`_tdNodes is ${_tdNodes} and it's size is ${_tdNodes.length}`);
  // var xhr = new XMLHttpRequest();
  // xhr.open("GET", "https://schoolsearchengine.herokuapp.com/school_list", true);
  // xhr.onreadystatechange = function() {
  //   if (xhr.readyState == 4) {
  //     // JSON.parse does not evaluate the attacker's scripts.
  //     var resp = xhr.responseText;
  //     console.log(resp);
  //   }
  // }
  // xhr.send();

  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   chrome.tabs.executeScript(
  //       tabs[0].id,
  //       {code: 'document.body.style.backgroundColor = "' + color + '";'});
  // });
  chrome.tabs.executeScript({
          code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
      //Here we have just the innerHTML and not DOM structure
      console.log('Popup script:')
      console.log(results[0]);
  });
};
