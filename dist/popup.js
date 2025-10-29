(() => {
  // src/popup.js
  console.log("Hello");
  document.getElementById("myButton").addEventListener("click", button_click);
  function button_click() {
    console.log("hello");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, files: ["content.js"] });
    });
  }
})();
