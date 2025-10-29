// popup.js - Popup script for LeetScare

import { get_gemini_key, voice_tts_message } from "./geminihandler";

document.addEventListener('DOMContentLoaded', async () => {
  // Load settings
  const result = await chrome.storage.sync.get({
    enabled: true,
    durationSeconds: 2,
    volume: 0.8,
    theme: 'spooky'
  });

  // Update UI
  const enabledCheckbox = document.getElementById('enabled');
  const statusDiv = document.getElementById('status');
  const statusText = document.getElementById('statusText');
  const playBtn = document.getElementById('playMusicBtn');

  enabledCheckbox.checked = result.enabled;
  updateStatus(result.enabled);
  // music settings
  const musicTrack = result.musicTrack || 'assets/Come-Out-And-Play-Remixed-Royalty-Free(chosic.com).mp3';
  const musicEnabled = typeof result.musicEnabled === 'boolean' ? result.musicEnabled : true;
  let musicPlaying = false;

  // helper: play/stop audio directly in each LeetCode tab via scripting.executeScript
  async function playInTabs(track, volume) {
    try {
      const trackUrl = chrome.runtime.getURL(track);
      chrome.tabs.query({ url: 'https://leetcode.com/*' }, (tabs) => {
        if (!tabs || tabs.length === 0) return;
        for (const t of tabs) {
          try {
            chrome.scripting.executeScript({
              target: { tabId: t.id },
              func: (url, vol) => {
                try {
                  // create or update audio element in page
                  let audio = document.getElementById('leetscare-music');
                  if (audio) {
                    // update src/volume if changed
                    if (audio.querySelector('source')?.src !== url) {
                      audio.pause();
                      audio.currentTime = 0;
                      audio.querySelector('source').src = url;
                      audio.load();
                    }
                    audio.volume = Math.max(0, Math.min(1, vol || 0.8));
                    audio.play().catch(() => {});
                    return;
                  }
                  audio = document.createElement('audio');
                  audio.id = 'leetscare-music';
                  audio.loop = true;
                  audio.preload = 'auto';
                  audio.style.display = 'none';
                  const src = document.createElement('source');
                  src.src = url;
                  src.type = 'audio/mpeg';
                  audio.appendChild(src);
                  document.body.appendChild(audio);
                  audio.volume = Math.max(0, Math.min(1, vol || 0.8));
                  audio.play().catch(() => {});
                } catch (e) {}
              },
              args: [trackUrl, volume]
            }).catch(() => {
              // fallback to message if executeScript fails
              try { chrome.tabs.sendMessage(t.id, { action: 'play_music', track, volume }, () => {}); } catch (e) {}
            });
          } catch (e) {}
        }
      });
    } catch (e) {
      console.warn('[LeetScare] playInTabs error', e);
    }
  }

  async function stopInTabs() {
    try {
      chrome.tabs.query({ url: 'https://leetcode.com/*' }, (tabs) => {
        if (!tabs || tabs.length === 0) return;
        for (const t of tabs) {
          try {
            chrome.scripting.executeScript({
              target: { tabId: t.id },
              func: () => {
                try {
                  const audio = document.getElementById('leetscare-music');
                  if (audio) {
                    audio.pause();
                    audio.remove();
                  }
                } catch (e) {}
              }
            }).catch(() => {
              try { chrome.tabs.sendMessage(t.id, { action: 'stop_music' }, () => {}); } catch (e) {}
            });
          } catch (e) {}
        }
      });
    } catch (e) {
      console.warn('[LeetScare] stopInTabs error', e);
    }
  }

  function requestPlayMusic() {
    (async () => {
      const res = await chrome.storage.sync.get({ musicTrack: musicTrack, volume: result.volume || 0.8 });
      const track = res.musicTrack || musicTrack;
      const volume = parseFloat(res.volume || 0.8);
      playInTabs(track, volume);
    })();
    musicPlaying = true;
    if (playBtn) playBtn.textContent = 'Stop Music';
  }

  function requestStopMusic() {
    stopInTabs();
    musicPlaying = false;
    if (playBtn) playBtn.textContent = 'Play Music';
  }

  // Toggle handler
  enabledCheckbox.addEventListener('change', async (e) => {
    const enabled = e.target.checked;
    await chrome.storage.sync.set({ enabled });
    updateStatus(enabled);
    // when extension is enabled/disabled, start/stop music in LeetCode tabs
    if (enabled) requestPlayMusic(); else requestStopMusic();
  });

  function updateStatus(enabled) {
    if (enabled) {
      statusDiv.className = 'status enabled';
      statusText.textContent = '✅ Extension is ON';
    } else {
      statusDiv.className = 'status disabled';
      statusText.textContent = '❌ Extension is OFF';
    }
  }
  // Options button
  document.getElementById('optionsBtn').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
  
  
  const feedback_header = document.getElementById('gemini_feedback_msg')
  document.getElementById('submit_key').addEventListener('click', gemini_key_handler);
  
  async function gemini_key_handler(){
    const forminput = document.getElementById("forminput");
    const res = await get_gemini_key(forminput.value);
    if (res == true) feedback_header.textContent = "Key is valid :)";
    else feedback_header.textContent = "Key is invalid :(";
  }
  
  // Load saved API key
  chrome.storage.sync.get(["gemini_api_key"], (result) => {
    if (result.gemini_api_key) {
      document.getElementById("forminput").value = result.gemini_api_key;
    }
  });


  // Play button handler (user gesture ensures autoplay)
  if (playBtn) {
    playBtn.addEventListener('click', async () => {
      // refresh musicTrack and volume from storage and use scripting-based play/stop
      const res = await chrome.storage.sync.get({ musicTrack: musicTrack, volume: result.volume || 0.8 });
      const track = res.musicTrack || musicTrack;
      const vol = parseFloat(res.volume || 0.8);
      if (!musicPlaying) {
        await playInTabs(track, vol);
        musicPlaying = true;
        playBtn.textContent = 'Stop Music';
        chrome.storage.sync.set({ musicEnabled: true });
      } else {
        await stopInTabs();
        musicPlaying = false;
        playBtn.textContent = 'Play Music';
        chrome.storage.sync.set({ musicEnabled: false });
      }
    });
  }
});
