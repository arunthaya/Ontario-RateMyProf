chrome.runtime.onInstalled.addListener(function (details) {
  if(details.reason == "install"){
    console.log('just installed');
    chrome.storage.sync.set(
      {"defaultSchool": 'Carleton University'},
      function() {
        //TODO send message to the front end
        if(chrome.runtime.error){
          console.log('Runtime error.');
        }
        console.log('The default school is Carleton');
    });
    runSettingApp();
  } else {
    console.log('not just installed');
    chrome.storage.sync.get('defaultSchool', function(result){
      if(chrome.runtime.error){
        console.log('Runtime error retrieving data saved');
      }
      console.log(result.defaultSchool);
    });
  }
});

function runSettingApp(){
  chrome.tabs.create({
    url: 'options.html'
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    if(request.type == "testing"){
      console.log(`incoming request is: ${request.url}`);
      chrome.tabs.executeScript(
        {file: "./js/jquery-3.3.1.min.js"},
        function(){
          chrome.tabs.executeScript(
            {file: "./js/jquery.qtip.min.js"},
            function(){
              chrome.tabs.insertCSS(
                {file: "./css/jquery.qtip.min.css"},
                function(){
                  chrome.tabs.executeScript(
                    {file: "./js/contentScript.js"}
                  );
                }
              )
            }
          )}
      );
      sendResponse({navURL: 'hello you~'});
    }
});
