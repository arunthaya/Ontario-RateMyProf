chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set(
    {defaultSchool: 'Carleton University'},
    function() {
      console.log('The default school is Carleton');
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    if(request.type == "testing"){
      console.log(`incoming request is: ${request.url}`);
      chrome.tabs.executeScript(
        {file: "jquery-3.3.1.min.js"},
        function(){
          chrome.tabs.executeScript(
            {file: "jquery.qtip.min.js"},
            function(){
              chrome.tabs.insertCSS(
                {file: "jquery.qtip.min.css"},
                function(){
                  chrome.tabs.executeScript(
                    {file: "contentScript.js"}
                  );
                }
              )
            }
          )}
      );
      sendResponse({navURL: 'hello you~'});
    }
});
