//List of schedule types as determined by carleton for selection
const SCHEDULE_TYPES = [
  "Lecture",
  "Tutorial",
  "Seminar",
  "Discussion Group",
  "Film Screening",
  "Laboratory",
  "Video on Demand",
  "Directed Studies",
  "Independent Study",
  "Research Project"
];
//Call the initial function with the real function as a callback for adding actual data
//alert('why does this line work');
//professorFilterFiller(qTipAdder);
console.log('please work');

/*
//jQuery plugin to check for deepest element testing
//professorFilter is an array of indexes that match the respective 'td' element of each prof
let professorFilter = [];
var professorFilterFiller = function(callback){
  console.log('why is it not working');
  let multiplier = 11;
  if($('h2').text() == "Registrar's Office"){
    multiplier = 10;
  }
  console.log(`multiplier is ${multiplier}`);
  for(let i=0; i<100; i++){
    let numberToPush = multiplier + i*(multiplier + 1);
    professorFilter.push(numberToPush)
  }
  callback();
};

var instructorFilter = function(index){
  return professorFilter.includes(index);
}

//Actual function to add information
function qTipAdder(){
  $('input:checkbox').parent().parent()
  .find('td')
  .filter(instructorFilter)
  .each(function() {
    if($.trim($(this).text())){
      let profName = $(this).text();
      $(this).qtip({
        content: {
          text: function(event, api){
            $.ajax({
              url:'https://ratemyprofchrome.herokuapp.com/api/ratings',
              type: 'POST',
              dataType: 'json',
              data: {
                professorName: $(this).text()
              },
              success: function(data){
                api.set('content.title', profName + "'s Rating");
                if(data.rating){
                  api.set('content.text', data.rating);
                } else {
                  api.set('content.text', "No ratings found.");
                }
              },
              error: function(xhr, status, error){
                api.set('content.text', error);
                api.set('content.title', 'No ratings found');
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
      })
      .css({
        'text-decoration':'underline'
      });
    }
  });
}

*/

let indexesToWorkWith = [];
let tempTester = [];
tempTester = $('td').contents().filter(function(){
  return this.nodeType === 3;
});

console.log(tempTester);
for(let i=0; i<tempTester.length; i++){
  let strTest = "";
  strTest = tempTester[i].textContent;
  if(strTest.split(' ').length == 2){
    let tempVarToEdit = tempTester[i];
    $(tempVarToEdit).wrap("<strong></strong>");
  }
}


$("strong").each(function(){
  $(this).qtip({
    content: {
      text: "hello",
      content: "buh bye"
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


/*
console.log(tempTester);
let ttt = $("body").contents().filter(function(){
  return this.nodeType === 3;
});

function tester2000() {
  let answerArr = [];
  let objTest = $('td');
  let arrTest = $.makeArray(objTest);
  for(let i=0; i<arrTest.length; i++){
    let arrStr = [];
    arrStr = arrTest[i].textContent.split(' ');
    if(arrStr.length == 2){
      answerArr.push(arrTest[i].textContent);
    }
  }
  console.log(answerArr);
  $("td:contains('Augustine')").css("text-decoration", "underline");
}
*/
