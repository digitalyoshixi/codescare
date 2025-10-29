console.log("Hello");

document.getElementById('myButton').addEventListener('click', button_click);

function button_click() {
  // pass
  console.log("hello")
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['content.js']})
  })
}

//window.onload = window_load;
// function DOMtoString(selector) {
//   console.log("ENTERING HERE")
//     if (selector) {
//         selector = document.querySelector(selector);
//         if (!selector) return "ERROR: querySelector failed to find node"
//     } else {
//         selector = document.documentElement;
//     }
//     return selector.outerHTML;
// }

// function window_load() {
//   var message = document.querySelector("h1");
//       chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
//         var activeTab = tabs[0];
//         console.log(activeTab)
//         var activeTabId = activeTab.id;
//         console.log(activeTab.id)
// 
//         return chrome.scripting.executeScript({
//             target: { tabId: activeTabId },
//             // injectImmediately: true,  // uncomment this to make it execute straight away, other wise it will wait for document_idle
//             func: DOMtoString,
//             // args: ['body']  // you can use this to target what element to get the html for
//         });
// 
//     }).then(function (results) {
//         message.innerText = results[0].result;
//     }).catch(function (error) {
//         message.innerText = 'There was an error injecting script : \n' + error.message;
//     });
// }
