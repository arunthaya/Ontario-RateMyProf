
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
    if($('#searchBarSubmit').length == 0 && $('#universitySelect').length == 0){
      $('#searchbar').append("<button id='searchBarSubmit' type='button' class='btn btn-primary btn-block'>Search</button>");

      $('#searchbar').append("<input type='checkbox' class='form-check-input' id='defaultSchool' checked>" +
      "<label id='labelDrop' class='form-check-label' for='defaultSchool'>Automatically Pick School</label>");
    } else {
      console.log('critical error - popup.js (65)');
    }
  } else {
    if($('#searchBarSubmit').length != 0){
      $('#searchBarSubmit').remove();
      $('#defaultSchool').remove();
      $('#labelDrop').remove();
      if($('#universitySelect').length != 0){
        $('#universitySelect').remove();
      }
    } else {
      console.log('critical error - popup.js (72)');
    }
  }
  $('#defaultSchool').change(function() {
    if($(this).is(':checked')){
      console.log('do nothing');
      if($('#universitySelect').length != 0){
        $('#universitySelect').remove();
      }
    } else {
      if($('#universitySelect').length == 0){
        $('#searchbar').append("<div class='top-buffer' id='universitySelect'><select class='form-control'>" +
          "<option>1</option>" +
          "</select></div>"
        );
      }
    }
  })
  console.log('input detected');
}


let herro = function(){
  console.log('testing');
}

let openOptions = function(){
  chrome.tabs.create({
    url: 'options.html'
  });
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
