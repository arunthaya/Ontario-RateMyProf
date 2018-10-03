/**
 * Function to save the default school to be used for the dropdown with extension
 */

var toggledCards;

function save_options(){
  // var school = parseInt(document.getElementById('school').value);

  if(toggledCards != null){
    school = $(toggledCards).data("value");
  } else {
    school = 1420;
  }
  console.log(school);
  chrome.storage.sync.set({
    defaultSchool: school
  }, function(){
    var status = document.getElementById('status');
    status.textContent = 'Option saved';
    setTimeout(function(){
      status.textContent = '';
    }, 1500);
  });
}

//document.getElementById('save').addEventListener('click', save_options);


$('.card').click(function(arg){
  let prevToggledCard;
  // console.log("toggledCard is ");
  // console.log(toggledCards)
  // console.log($(this).val());
  //console.log("this is "+$(this));
  if(toggledCards != $(this)){
      prevToggledCard = toggledCards;
      toggledCards = $(this);
      toggledCards.toggleClass('is-checked');
      if(prevToggledCard != null){
        prevToggledCard.toggleClass('is-checked');
      }
      // console.log($(this).data("value"));
  }
  save_options();
  // console.log('card-clicked');
});
