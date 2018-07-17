let changeColor = document.getElementById('changeColor');
let originalColor = document.body.style.backgroundColor;
var bool2check = true;

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://schoolsearchengine.herokuapp.com/school_list", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // JSON.parse does not evaluate the attacker's scripts.
      var resp = xhr.responseText;
      console.log(resp);
    }
  }
  xhr.send();
  let originalColor = document.body.style.backgroundColor;
  let color = element.target.value;
  console.log(`originalColor is: ${originalColor} and the color of button is: ${color}`);
  if(!bool2check){
    color = "";
  }
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
  bool2check = !bool2check;
  console.log(`after bitches originalColor is: ${originalColor} and the color of button is: ${color}`);
};
