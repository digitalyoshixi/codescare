// options.js - Options page script for LeetScare

document.addEventListener('DOMContentLoaded', async () => {
  // Load saved settings
  const result = await chrome.storage.sync.get({
    enabled: true,
    durationSeconds: 2,
    volume: 0.8,
    theme: 'spooky',
    musicEnabled: true,
    musicTrack: 'assets/spooky.mp3'
  });

  // Populate UI with saved values
  document.getElementById('enabled').checked = result.enabled;
  document.getElementById('duration').value = result.durationSeconds;
  document.getElementById('durationValue').textContent = result.durationSeconds.toFixed(1);
  document.getElementById('volume').value = result.volume;
  document.getElementById('volumeValue').textContent = Math.round(result.volume * 100);
  document.getElementById('theme').value = result.theme;
  // music-specific
  document.getElementById('musicEnabled').checked = result.musicEnabled;
  document.getElementById('background-music').value = result.musicTrack;

  // Update duration display in real-time
  document.getElementById('duration').addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    document.getElementById('durationValue').textContent = value.toFixed(1);
  });

  // Update volume display in real-time
  document.getElementById('volume').addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    document.getElementById('volumeValue').textContent = Math.round(value * 100);
  });

  // Save settings handler
  async function saveSettings() {
    const settings = {
      enabled: document.getElementById('enabled').checked,
      durationSeconds: parseFloat(document.getElementById('duration').value),
      volume: parseFloat(document.getElementById('volume').value),
      theme: document.getElementById('theme').value
    };

    // include music settings
    settings.musicEnabled = document.getElementById('musicEnabled').checked;
    settings.musicTrack = document.getElementById('background-music').value;

    await chrome.storage.sync.set(settings);
    
    // Show save status
    const status = document.getElementById('saveStatus');
    status.classList.add('success');
    setTimeout(() => {
      status.classList.remove('success');
    }, 2000);
  }

  // Auto-save on any change
  document.getElementById('enabled').addEventListener('change', saveSettings);
  document.getElementById('duration').addEventListener('change', saveSettings);
  document.getElementById('volume').addEventListener('change', saveSettings);
  document.getElementById('theme').addEventListener('change', saveSettings);

  // ------------ Play background music in page(s) (persist after closing options) ------------
  const playBtn = document.getElementById('playMusicBtn');
  const backgroundSelect = document.getElementById('background-music');
  const musicEnabledEl = document.getElementById('musicEnabled');
  let musicPlaying = false; // local flag to toggle play/stop

  function mapTrackToAsset(value) {
    return value || 'assets/spooky.mp3';
  }

  // Broadcast message to all LeetCode tabs
  function broadcastToLeetTabs(message) {
    try {
      chrome.tabs.query({ url: 'https://leetcode.com/*' }, (tabs) => {
        if (!tabs || tabs.length === 0) return;
        for (const t of tabs) {
          try {
            chrome.tabs.sendMessage(t.id, message, () => {});
          } catch (e) {
            // ignore individual tab errors
          }
        }
      });
    } catch (e) {
      console.warn('[LeetScare] broadcast error', e);
    }
  }

  // Play persistent music in page(s)
  function requestPlayMusic() {
    const track = mapTrackToAsset(backgroundSelect.value);
    const volume = parseFloat(document.getElementById('volume').value || 0.8);
    // set musicEnabled true in storage
    chrome.storage.sync.set({ musicEnabled: true, musicTrack: track });
    musicEnabledEl.checked = true;
    broadcastToLeetTabs({ action: 'play_music', track, volume });
    musicPlaying = true;
    playBtn.textContent = 'Stop Music';
  }

  function requestStopMusic() {
    chrome.storage.sync.set({ musicEnabled: false });
    musicEnabledEl.checked = false;
    broadcastToLeetTabs({ action: 'stop_music' });
    musicPlaying = false;
    playBtn.textContent = 'Play Music';
  }

  // Toggle play/stop — sends message to content scripts so audio is in the page
  playBtn.addEventListener('click', (e) => {
    if (musicPlaying) requestStopMusic(); else requestPlayMusic();
  });

  // If user changes selection while playing, restart with new track
  backgroundSelect.addEventListener('change', () => {
    // save selection
    chrome.storage.sync.set({ musicTrack: backgroundSelect.value });
    if (musicPlaying) {
      requestStopMusic();
      // small delay to ensure stop propagated
      setTimeout(() => requestPlayMusic(), 150);
    }
  });

  // Sync volume slider changes to playing audio in tabs
  document.getElementById('volume').addEventListener('input', (e) => {
    const v = parseFloat(e.target.value || 0.8);
    if (musicPlaying) broadcastToLeetTabs({ action: 'set_volume', volume: v });
  });

  // musicEnabled toggle in options page
  musicEnabledEl.addEventListener('change', (e) => {
    const en = e.target.checked;
    chrome.storage.sync.set({ musicEnabled: en });
    if (en) requestPlayMusic(); else requestStopMusic();
  });

  // Ensure music reflects saved state on load: if musicEnabled true, start playing in tabs
  if (document.getElementById('musicEnabled').checked) {
    // small delay to allow content scripts to be present
    setTimeout(() => {
      requestPlayMusic();
    }, 200);
  }

  // When saving settings, if enabled changed to true start music, if false stop it
  const origEnabledEl = document.getElementById('enabled');
  origEnabledEl.addEventListener('change', async (e) => {
    const enabled = e.target.checked;
    await chrome.storage.sync.set({ enabled });
    // Broadcast accordingly
    if (enabled) {
      requestPlayMusic();
    } else {
      requestStopMusic();
    }
  });
});
