var searchBarActivated;
var buttonRetrieved;
var jqueryCloneElement;
var jqueryMenuCloned;
var queryEntered;

let schoolIdDict = {
  1420: 'Carleton University',
  1452: 'University of Ottawa',
  1484: 'U of T(St. George)',
  4928: 'U of T(Mississauga)',
  4919: 'U of T(Scarborough)',
  1490: 'University of Waterloo',
  1426: 'University of Guelph',
  1495: 'York University',
  1440: 'McMaster University',
  1491: 'Western University',
  1466: "Queen's University",
  1471: 'Ryerson University',
  1492: 'Wilfred Laurier University'
};

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};


/**
 * Handle a submit from the searchbar form
 * @param {details} - chrome api to get current tab
 */

let handleClick = function(details){
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
  let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  let stringEntered = $.trim($('#searchBox').val());
  if (format.test(stringEntered)){
    console.log('special character entered');
    $('#searchBox').css({'background-color' : '#e28596'});
    $('#searchBoxStatus').text('No special characters');
  } else {
    let requestObj = {};
    let professorNameString = [];
    professorNameString = stringEntered.split(' ');
    for (let i = professorNameString.length - 1; i >= 0; i--) {
      if (professorNameString[i].isEmpty()) {
          professorNameString.splice(i, 1);
      }
    }
    let finalizedProfessorString = "";
    for (let i=0; i<professorNameString.length; i++){
      finalizedProfessorString += professorNameString[i];
      if(i != professorNameString.length - 1){
        finalizedProfessorString += " ";
      }
    }
    requestObj.professorName = finalizedProfessorString;
    chrome.storage.sync.get('defaultSchool', function(data){
      if(chrome.runtime.error){
        console.log(chrome.runtime.error);
        if($('#universitySelect').length != 0){
          requestObj.school = $('#universitySelect').val();
        } else {
          requestObj.school = 1420; //defaults to Carleton if chrome error occurs and dropdown doesn't exist
        }
      }
      else {
        if($('#defaultSchool').length != 0){
          if($('#defaultSchool').is(':checked')){
            requestObj.school = data.defaultSchool;
          }
          else {
            if($('#universitySelect').length != 0){
              console.log('inside this function and university select value is ');
              console.log($('#dropdownUniversity').val());
              requestObj.school = $('#dropdownUniversity').val();
            } else {
              requestObj.school = data.defaultSchool;
            }
          }
        } else {
          requestObj.school = 1420;
        }
      }
      sendSearchRequest(requestObj);
    });
  }
}

let sendSearchRequest = function(requestObj){
  //TODO ADD ERROR RESULTS, ADD TITLE RESULTS, FIX UP OPTIONS PAGE


  jqueryCloneElement = $('#menubar').clone();
  $('#menubar').remove();
  console.log(requestObj);
  setTimeout(function(){
    $.ajax({
      url: 'http://localhost:3000/api/search',
      type: 'POST',
      dataType: 'json',
      data: requestObj,
      success: function(data){
        populateSearchResults(data, jqueryCloneElement);
        console.log(data);
      },
      error: function(xhr, status, error){
        console.log(xhr);
        populateSearchResultsError(xhr, error, jqueryCloneElement);
        console.log(`xhr is: ${xhr}, status is: ${status}, error is: `);
        console.log(error);
      }
    });
  }, 50);
  $('#content').prepend("<img id='loaderImg' class='loader' src='./images/pluginsvg/three-dots.svg'/>");
}

let populateSearchResultsError = function(xhr, error, jqueryClonedElement){
  if($('#loaderImg').length != 0){
    $('#loaderImg').remove();
  }
  $('#content').append("<div id=resultWindow></div>");
  $('#resultWindow').append("<table id='backButtonTable' class='table tblCss'><tr id='backButton'class='links'><td>"+
    "<img src='./images/pluginsvg/previous.svg'"+
     "height='16px'"+
     "width='16px' />"+
     " Back</td></tr></table>");
  if(xhr.status == 0){
    $('#resultWindow').append("<p style='margin-left: 10px;'>Empty response, server is down or being updated.</p>");
  }
  $('#resultWindow').append("<p style='margin-left: 10px;'>"+error+"</p>");
  $('#backButton').click(function(){
    console.log('removing');
    if($('#resultWindow').length != 0){
      $('#resultWindow').remove();
      $('#content').append(jqueryClonedElement);
      document.getElementById('options').addEventListener('click', openOptions);
      document.getElementById('ratings').addEventListener('click', handleClick);
      $('#searchBox').val('');
      if($('#searchBarSubmit').length != 0){
        $('#searchBarSubmit').remove();
        $('#defaultSchool').remove();
        $('#labelDrop').remove();
        if($('#universitySelect').length != 0){
          $('#universitySelect').remove();
        }
      }
    }
  });
}

let populateSearchResults = function(data, jqueryClonedElement){
  if($('#resultWindow').length != 0){
    $('#resultWindow').empty();
  }
  if($('#loaderImg').length != 0){
    $('#loaderImg').remove();
  }
  console.log(`data length is ${data.length}`);
  //TODO FIX RESULTS INCOMING AND FINISH PLUGIN TONIGHT
  let profRMPLink = 'http://www.ratemyprofessors.com/ShowRatings.jsp?tid=';
  console.log(data);
  if(data.length != 0){
    $('#content').append("<div id='resultWindow'></div>");
    $('#resultWindow').append("<table id='backButtonTable' class='table tblCss'><tr id='backButton'class='links'><td>"+
      "<img src='./images/pluginsvg/previous.svg'"+
       "height='16px'"+
       "width='16px' />"+
       " Back</td></tr></table>");
    $('#resultWindow').append("<p id='resultHeading' style='margin-left: 5px;'>Results:</p>");
    $('#resultWindow').append("<table id='resultsFromSearch' class='table tblCss'></table>");
    $('#resultsFromSearch').append("<tr><th class='centerTd'>Rating</th><th>Prof Name</th></tr>");
    console.log('real data came in');
    for(let i=0; i<data.length; i++){
      let departmentStr = "";
      if(data[i].department !== undefined){
        departmentStr = departmentStrParser(data[i].department);
      }
      $('#resultsFromSearch').append(
        "<tr class='links clickableRow' data-href='"+profRMPLink+data[i].pk_id+"'><td class='centerTd'>"+data[i].averageratingscore_rf+"</td>"+
        "<td>"+data[i].teacherlastname_t+", "+data[i].teacherfirstname_t+"<p><i>"+departmentStr+"</i></p></td></tr>");
    }
  }
  $('.clickableRow').click(function(){
    let newURL = $(this).data("href");
    chrome.tabs.create({url: newURL});
  });
  $('#backButton').click(function(){
    console.log('removing');
    if($('#resultWindow').length != 0){
      $('#resultWindow').remove();
      $('#content').append(jqueryClonedElement);
      document.getElementById('options').addEventListener('click', openOptions);
      document.getElementById('ratings').addEventListener('click', handleClick);
      $('#searchBox').val('');
      if($('#searchBarSubmit').length != 0){
        $('#searchBarSubmit').remove();
        $('#defaultSchool').remove();
        $('#labelDrop').remove();
        if($('#universitySelect').length != 0){
          $('#universitySelect').remove();
        }
      }
    }
  });
}

let handleInput = function(){
  if(jqueryMenuCloned === undefined && $('#resultWindow').length == 0){
    jqueryMenuCloned = $('#menubar').clone();
  }
  $('#searchBoxStatus').text('');
  $('#searchBox').css({'background-color': ''});
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
      "<label id='labelDrop' class='form-check-label' for='defaultSchool'></label>");
      chrome.storage.sync.get('defaultSchool', function(data){
        $('#labelDrop').text('Use: '+schoolIdDict[data.defaultSchool]);
      });
    }
  } else {
    if($('#searchBarSubmit').length != 0){
      $('#searchBarSubmit').remove();
      $('#defaultSchool').remove();
      $('#labelDrop').remove();
      if($('#universitySelect').length != 0){
        $('#universitySelect').remove();
      }
      if($('#resultWindow').length != 0){
        $('#content').empty();
        $('#content').append(jqueryMenuCloned);
        document.getElementById('options').addEventListener('click', openOptions);
        document.getElementById('ratings').addEventListener('click', handleClick);
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
        $('#searchbar').append("<div class='top-buffer' id='universitySelect'><select id='dropdownUniversity' class='form-control'>" +
          "</select></div>"
        );
        populateDropdown();
      }
    }
  });
  console.log('input detected');
}

let populateDropdown = function(){
  if($('#universitySelect').length == 0){
    return;
  } else {
    chrome.storage.sync.get('defaultSchool', function(data){
      if(chrome.runtime.lastError){
        console.log(chrome.runtime.lastError);
        for(let key in schoolIdDict){
          console.log(schoolIdDict[key]);
          let newOption = new Option(schoolIdDict[key], key);
          $('#dropdownUniversity').append($(newOption));
        }
      }
      if(data != null){
        console.log(data.defaultSchool);
        let textDropDown = schoolIdDict[data.defaultSchool];
        let defaultOption = new Option('Default: '+textDropDown, data.defaultSchool);
        $('#dropdownUniversity').append($(defaultOption));
        $('#dropdownUniversity').append("<option disabled='disabled'>-----</option>");
        for(let key in schoolIdDict){
          console.log(schoolIdDict[key]);
          let newOption = new Option(schoolIdDict[key], key);
          if(schoolIdDict.hasOwnProperty(key) && key != data.defaultSchool){
            $('#dropdownUniversity').append($(newOption));
          }
        }
      } else {
        for(let key in schoolIdDict){
          console.log(schoolIdDict[key]);
          let newOption = new Option(schoolIdDict[key], key);
          $('#dropdownUniversity').append($(newOption));
        }
      }
    });
  }
}

let openOptions = function(){
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
}

let checkUrl = function(resultsArray){
  console.log(resultsArray[0]);
  if(resultsArray[0] != 'central.carleton.ca'){
    document.getElementById('ratings').removeEventListener('click', handleClick);
    $('#ratings').css('text-decoration', 'line-through');
    $('#ratings').parent().removeClass("links");
  }
}

let departmentStrParser = function(departmentStr){
  if(departmentStr.indexOf("+") == -1){
    return decodeURI(departmentStr);
  }
  let answerStr = "";
  let tempStrArr = [];
  tempStrArr = departmentStr.replace("+", " ").split(" ");
  for(let i=0; i<tempStrArr.length; i++){
    answerStr += decodeURI(tempStrArr[i]);
    if(i != tempStrArr.length-1){
      answerStr += " ";
    }
  }
  return answerStr;
}

window.onload = function() {
  chrome.tabs.executeScript(
    {code: 'window.location.host'},
  checkUrl);
  document.getElementById('ratings').addEventListener('click',handleClick);
  document.getElementById('searchForProf').addEventListener('submit', handleSubmit);
  document.getElementById('searchForProf').addEventListener('input', handleInput);
  document.getElementById('options').addEventListener('click', openOptions);
  $('#searchbar').on('click', 'button', handleSubmit);
}
