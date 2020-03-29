// Colorful icon when on Internshala.com
chrome.webNavigation.onCompleted.addListener(function() {
  chrome.browserAction.setIcon({
    path: "icons/icon32.png"
  });
}, {url: [{urlMatches : 'internshala.com'}]})


// grey-out icon when not Internshala.com
chrome.webNavigation.onReferenceFragmentUpdated.addListener(function() {
  chrome.browserAction.setIcon({
    path: "icons/icon32-grey.png"
  });
}, {});
