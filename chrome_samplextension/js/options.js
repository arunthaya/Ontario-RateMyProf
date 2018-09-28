/**
 * Function to save the default school to be used for the dropdown with extension
 */

function save_options(){
  var school = parseInt(document.getElementById('school').value);
  chrome.storage.sync.set({
    defaultSchool: school
  }, function(){
    var status = document.getElementById('status');
    status.textContent = 'Options saved';
    setTimeout(function(){
      status.textContent = '';
    }, 750);
  });
}

document.getElementById('save').addEventListener('click', save_options);
