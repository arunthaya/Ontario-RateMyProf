var script = document.createElement('script');

script.src = '//code.jquery.com/jquery-1.11.0.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

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

$('.pagebodydiv table').filter(
  function(index){
    return index == 1;
  })
  .find('table').each(function() {
    counter++;
  });

alert(counter);

//alert(counter2);
