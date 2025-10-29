// service_worker.js - Background service worker for LeetScare (Manifest V3)
import { GoogleGenAI } from "@google/genai";

let gemini_ai = null;

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
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'getSettings') {
    chrome.storage.sync.get({
      enabled: true,
      durationSeconds: 2,
      volume: 0.8,
      theme: 'spooky'
    }).then(sendResponse);
    return true; // Will respond asynchronously
  }
  else if (request.action === 'validate_gemini_key') {
    const apiKey = request.apiKey;
    try {
      // Test the API key by making a dummy call
      const data = {"contents": [{"parts": [{"text": "This is a test query to see if API key works"}]}]};
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
        method: "POST",
        headers: {
          "x-goog-api-key" : apiKey,
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
          throw new Error("API key validation failed.");
      }
      // If valid, store the key in local storage and initialize gemini_ai
      await chrome.storage.local.set({ geminiApiKey: apiKey });
      gemini_ai = new GoogleGenAI({apiKey: apiKey});
      sendResponse({ ok: true });
    } catch (error) {
      console.error("[LeetScare] Gemini API key validation error:", error);
      sendResponse({ ok: false, error: error.message });
    }
    return true;
  }
  else if (request.action === 'generate_content') {
    const content = request.content;
    if (!gemini_ai) {
      // Try to load key from storage if not initialized
      const result = await chrome.storage.local.get(['geminiApiKey']);
      if (result.geminiApiKey) {
        gemini_ai = new GoogleGenAI({apiKey: result.geminiApiKey});
      } else {
        sendResponse({ ok: false, error: "Gemini AI not initialized. No API key found." });
        return true;
      }
    }
    try {
      const response = await gemini_ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: content,
        config: {
          systemInstruction: "Please explain the logic/syntax errors in this code succintly:",
        },
      });
      sendResponse({ ok: true, text: response.text });
    } catch (error) {
      console.error("[LeetScare] Gemini AI content generation error:", error);
      sendResponse({ ok: false, error: error.message });
    }
    return true;
  }
});

// Optional: Listen for tab updates to LeetCode
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('leetcode.com')) {
    console.log('[LeetScare] LeetCode page loaded:', tab.url);
  }
});
