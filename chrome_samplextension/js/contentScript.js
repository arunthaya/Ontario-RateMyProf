//List of schedule types as determined by carleton for selection
let SCHEDULE_TYPES = [
  "lecture",
  "tutorial",
  "seminar",
  "discussion",
  "group",
  "film",
  "screening",
  "laboratory",
  "video",
  "on",
  "demand",
  "directed",
  "studies",
  "independent",
  "study",
  "research",
  "project",
  "field",
  "placement"
];

/**
 * Function to bold the prof names after checking to see if the array has the appropriate length of a professor's name
 * @param {tempTester} - array storing all prof names automatically selected on Carleton's page
 * @param {callback} - Calls the profAjaxReq function next
 */

let boldProfNames = function(tempTester, callback){
  for(let i=0; i<tempTester.length; i++){
    console.log(tempTester[i].textContent);
    let strTest = "";
    strTest = tempTester[i].textContent;
    if(strTest.split(' ').length == 2 || strTest.split(' ').length == 3){
      let tempVarToEdit = tempTester[i];
      $(tempVarToEdit).wrap("<strong></strong>");
    }
  }
  callback();
}

/**
 * Function to find prof names and store into Array
 * @param {callback} - calls boldProfNames()
 */

let grabProfNames = function(callback){
  let tempTester = [];
  tempTester = $('td').contents().filter(function(){
    return this.nodeType === 3;
  }).filter(
    function(){
      let bool_notScheduleType = true;
      let stringToCheck = $(this).text();
      if(/\d/.test(stringToCheck)){
        //console.log('contains number');
        return false;
      }
      if(stringToCheck.length >= 40){
        return false;
      }
      let stringArr = [];
      stringArr = stringToCheck.split(' ');
      for(let i=0; i<stringArr.length; i++){
        if(SCHEDULE_TYPES.includes(stringArr[i].toLowerCase())){
          return false;
        }
      }
      return bool_notScheduleType;
    }
  );
  callback(tempTester, profAjaxReq);
}

let urlReal = 'https://ratemyprofchrome.herokuapp.com/api/ratings';

/**
 * Function that will complete an ajax request along each professor name hover to the host server to retrieve ratings
 */

let profAjaxReq = function(){
  $("strong").each(function(){
    let profName = $(this).text();
    $(this).qtip({
      content: {
        text: function(event, api){
          $.ajax({
            url:urlReal,
            type: 'POST',
            dataType: 'json',
            data: {
              professorName: profName
            },
            success: function(data){
              //console.log(JSON.parse(data));
              console.log(data);
              console.log(data.length);
              console.log(data.rating);
              api.set('content.title', profName + "'s Rating");
              if(data.rating){
                api.set('content.text', data.rating);
              } else {
                api.set('content.text', "No ratings found.");
              }
            },
            error: function(xhr, status, error){
              console.log(`error connecting`);
              console.log(xhr);
              console.log('------');
              //console.log(error);
              api.set('content.text', error);
              api.set('content.title', `Error code: ${xhr.status}`);
            }
        });
      }
    },
    position: {
      my: 'center right',
      at: 'center left'
    },
    style: {
      classes: 'qtip-bootstrap qtip-shadow qtip-rounded'
    },
    hide: {
      delay: 1000
    }
    });
  });
}

grabProfNames(boldProfNames);
