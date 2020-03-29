// Popup event listener
document.addEventListener("DOMContentLoaded", function() {

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {

      const re = new RegExp(".*.internshala.com/*");

      if (tabs[0].url.match(re)) {
        console.log("Popup DOM fully loaded and parsed");
      	// button.onclick listener, injects the Content-Script
        document
          .getElementById("sorter-btn")
          .addEventListener("click", function(message, callback) {
            chrome.tabs.executeScript({
              file: "sorter.js"
            });
          });
	  } 
	  else {
        document.getElementById("modal-content").innerHTML = "<h4 style='margin: 5px 10px;'>Not Internshala.com<h4>";
      }
    }
  );
});

// callback

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.success) {
    document.getElementById("status").innerHTML =
      '<i class="fa fa-check-circle"></i>';
  } else {
    document.getElementById("status").innerHTML =
      '<i class="fa fa-times-circle"></i>';
  }
});
