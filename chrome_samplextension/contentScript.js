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
  for(let i=0; i<100; i++){
    let numberToPush = 11 + i*12;
    professorFilter.push(numberToPush)
  }
  //console.log(professorFilter);
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

$('.pagebodydiv table').filter(filter1)
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
  .qtip({
    content: {
      text: USUCK
    },
    position: {
      at: 'top left'
    },
    hide: {
      delay: 2000
    }
  })
  .css({
    'background':'yellow'
  });


console.log(counter);

//alert(counter2);
