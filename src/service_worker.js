// service_worker.js - Background service worker for LeetScare (Manifest V3)

// Install event
chrome.runtime.onInstalled.addListener((details) => {
  console.log('[LeetScare] Extension installed/updated:', details.reason);
  
  // Set default settings if first install
  if (details.reason === 'install') {
    chrome.storage.sync.set({
      enabled: true,
      durationSeconds: 2,
      volume: 0.8,
      theme: 'spooky'
    });
  }
});

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSettings') {
    chrome.storage.sync.get({
      enabled: true,
      durationSeconds: 2,
      volume: 0.8,
      theme: 'spooky'
    }).then(sendResponse);
    return true; // Will respond asynchronously
  }
});

// Optional: Listen for tab updates to LeetCode
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('leetcode.com')) {
    console.log('[LeetScare] LeetCode page loaded:', tab.url);
  }
});
