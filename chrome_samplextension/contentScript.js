// var script = document.createElement('script');
//
// script.src = '//code.jquery.com/jquery-1.11.0.min.js';
// document.getElementsByTagName('head')[0].appendChild(script);


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

let professorFilter = [];
let professorFilterFiller = function(){
  let multiplier = 11;
  if($('h2').text() == "Registrar's Office"){
    multiplier = 10;
  }
  console.log(`multiplier is ${multiplier}`);
  for(let i=0; i<100; i++){
    let numberToPush = multiplier + i*(multiplier + 1);
    professorFilter.push(numberToPush)
  }
};

professorFilterFiller();

// let temp = $("td").each(function() {
//   if(this)
//   $(this).css({'text-decoration':'underline'});
// })
// let counter = 0;
// $('.pagebodydiv table').each(function() {
//   if(counter == 1){
//     $(this).css({'background':'blue'});
//   }
//   counter++;
// })
let counter = 0;
let counter2 = 0;
// $('.pagebodydiv table').each(function() {
//   if(counter == 1){
//     $(this).find('tr').each(function() {
//       counter2++;
//     });
//   }
//   counter++;
// });
let filter1 = function(index){
  return index == 1;
};

let conciseFilter = function(index){
  return index % 5 == 0;
}

let instructorFilter = function(index){
  return professorFilter.includes(index);
}

//asdfasdf

let jqueryFilterTest = function(){
  let boolToReturn = false;
  $(this).find('td').each(function() {
    if(SCHEDULE_TYPES.includes($(this).text())){
      boolToReturn = true;
    }
  });
  return boolToReturn;
}

//let temp = document.body.innerHTML;
//alert(temp.length);
let USUCK = "hello";
let profsToSearch = new Set();

/* $('.pagebodydiv table').filter(filter1)
  .find('tr').filter(
    function(index){
      return index == 4;
    }
  )
  .css({
    'background':'green'
  })
  .find('table').find('tr')
  .filter(jqueryFilterTest)
  .find('td').filter(instructorFilter)
  .each(function() {
    console.log($(this).text())
    if($.trim($(this).text())){
      profsToSearch.add($(this).text());
      $(this).qtip({
        content: {
          text: USUCK,
          title: "RATE MY PROF RATING"
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
      }).css({
        'text-decoration':'underline'
      });
    }
  }); */
//
let tempCounter = 0;
let preciseRobustFilter = function(){
  // console.log('--------------------------->')
  // console.log($(this).has('table'));
  // console.log(`tempCounter is ${tempCounter}`);
  if(tempCounter == 0) {
    tempCounter++;
    return false;
  }
  let boolean_RobustFilter = false;
  $(this).find('tr').each(function() {
    $(this).find('td').each(function() {
      if(SCHEDULE_TYPES.includes($(this).text())){
        boolean_RobustFilter = true;
      }
    });
  });
  tempCounter++;
  return boolean_RobustFilter;
  // console.log('---------------------------<')
}

// let tempTester = $('table')
// .filter(preciseRobustFilter)
// .find('tr')
// .filter(jqueryFilterTest)
// .css({'background':'yellow'})
// .makeArray();

//
// console.log(typeof tempTester);
// console.log(tempTester);

//console.log($('tr input:checkbox'));

let nodeArrayCheck = [];
$('input:checkbox').parent().parent()
.find('td')
.filter(instructorFilter)
.each(function() {
  nodeArrayCheck.push($(this));
  if($.trim($(this).text())){
    profsToSearch.add($(this).text());
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
              console.log(data);
              api.set('content.text', data.rating);
              api.set('content.title', profName + "'s Rating");
            },
            error: function(xhr, status, error){
              console.log(data);
              api.set('content.text', error);
              api.set('content.title', 'Error');
            }
          });
          // .then(function(content){
          //   let rating = data.rating;
          //   api.set('content.text', content);
          // }, function(xhr, status, error){
          //   api.set('content.text', status + ': ' + error);
          // });
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

console.log(nodeArrayCheck);

//
// console.log($('input:checkbox').closest());
// console.log($('input:checkbox').parent().parent());

//console.log($('table'));
let post_request = function(){
  $.ajax({
    type: "POST",
    url: "https://ratemyprofchrome.herokuapp.com/api/professors",
    data: profsToSearch,
    success: function(data){
      let responseFormatted = data.data;
      let ratingofprof = data.rating;
      console.log(`incoming data is ${responseFormatted} and ${ratingofprof}`);
      console.log(responseFormatted);
      for(let i=0; i<nodeArrayCheck.length; i++){
        nodeArrayCheck[i].qtip({
          content: {
            text: ratingofprof,
            title: nodeArrayCheck[i].text() + "'s Rating"
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
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown){
      alert("some error");
    }
  })
}


//post_request();
//console.log(profsToSearch);
console.log(location.href);

//alert(counter2);
