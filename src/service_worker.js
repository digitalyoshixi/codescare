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
  // On install, if music should be enabled, attempt to start in open LeetCode tabs
  chrome.storage.sync.get({ musicEnabled: true, musicTrack: 'assets/spooky.mp3', volume: 0.8 }).then(res => {
    if (res.musicEnabled) {
      try {
        chrome.tabs.query({ url: 'https://leetcode.com/*' }, (tabs) => {
          if (!tabs || tabs.length === 0) return;
          for (const t of tabs) {
            try {
              chrome.scripting.executeScript({
                target: { tabId: t.id },
                func: (trackUrl, vol) => {
                  try {
                    const url = trackUrl;
                    let audio = document.getElementById('leetscare-music');
                    if (!audio) {
                      audio = document.createElement('audio');
                      audio.id = 'leetscare-music';
                      audio.loop = true;
                      audio.preload = 'auto';
                      audio.style.display = 'none';
                      const s = document.createElement('source');
                      s.src = url;
                      s.type = 'audio/mpeg';
                      audio.appendChild(s);
                      document.body.appendChild(audio);
                    }
                    audio.volume = Math.max(0, Math.min(1, vol || 0.8));
                    audio.play().catch(() => {});
                  } catch (e) {}
                },
                args: [chrome.runtime.getURL(res.musicTrack), res.volume]
              }).catch(() => {});
            } catch (e) {}
          }
        });
      } catch (e) {}
    }
  }).catch(() => {});
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
