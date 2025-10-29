(() => {
  // src/popup.js
  document.addEventListener("DOMContentLoaded", async () => {
    const result = await chrome.storage.sync.get({
      enabled: true,
      durationSeconds: 2,
      volume: 0.8,
      theme: "spooky"
    });
    const enabledCheckbox = document.getElementById("enabled");
    const statusDiv = document.getElementById("status");
    const statusText = document.getElementById("statusText");
    const playBtn = document.getElementById("playMusicBtn");
    enabledCheckbox.checked = result.enabled;
    updateStatus(result.enabled);
    const musicTrack = result.musicTrack || "assets/Come-Out-And-Play-Remixed-Royalty-Free(chosic.com).mp3";
    const musicEnabled = typeof result.musicEnabled === "boolean" ? result.musicEnabled : true;
    let musicPlaying = false;
    async function playInTabs(track, volume) {
      try {
        const trackUrl = chrome.runtime.getURL(track);
        chrome.tabs.query({ url: "https://leetcode.com/*" }, (tabs) => {
          if (!tabs || tabs.length === 0) return;
          for (const t of tabs) {
            try {
              chrome.scripting.executeScript({
                target: { tabId: t.id },
                func: (url, vol) => {
                  try {
                    let audio = document.getElementById("leetscare-music");
                    if (audio) {
                      if (audio.querySelector("source")?.src !== url) {
                        audio.pause();
                        audio.currentTime = 0;
                        audio.querySelector("source").src = url;
                        audio.load();
                      }
                      audio.volume = Math.max(0, Math.min(1, vol || 0.8));
                      audio.play().catch(() => {
                      });
                      return;
                    }
                    audio = document.createElement("audio");
                    audio.id = "leetscare-music";
                    audio.loop = true;
                    audio.preload = "auto";
                    audio.style.display = "none";
                    const src = document.createElement("source");
                    src.src = url;
                    src.type = "audio/mpeg";
                    audio.appendChild(src);
                    document.body.appendChild(audio);
                    audio.volume = Math.max(0, Math.min(1, vol || 0.8));
                    audio.play().catch(() => {
                    });
                  } catch (e) {
                  }
                },
                args: [trackUrl, volume]
              }).catch(() => {
                try {
                  chrome.tabs.sendMessage(t.id, { action: "play_music", track, volume }, () => {
                  });
                } catch (e) {
                }
              });
            } catch (e) {
            }
          }
        });
      } catch (e) {
        console.warn("[LeetScare] playInTabs error", e);
      }
    }
    async function stopInTabs() {
      try {
        chrome.tabs.query({ url: "https://leetcode.com/*" }, (tabs) => {
          if (!tabs || tabs.length === 0) return;
          for (const t of tabs) {
            try {
              chrome.scripting.executeScript({
                target: { tabId: t.id },
                func: () => {
                  try {
                    const audio = document.getElementById("leetscare-music");
                    if (audio) {
                      audio.pause();
                      audio.remove();
                    }
                  } catch (e) {
                  }
                }
              }).catch(() => {
                try {
                  chrome.tabs.sendMessage(t.id, { action: "stop_music" }, () => {
                  });
                } catch (e) {
                }
              });
            } catch (e) {
            }
          }
        });
      } catch (e) {
        console.warn("[LeetScare] stopInTabs error", e);
      }
    }
    function requestPlayMusic() {
      (async () => {
        const res = await chrome.storage.sync.get({ musicTrack, volume: result.volume || 0.8 });
        const track = res.musicTrack || musicTrack;
        const volume = parseFloat(res.volume || 0.8);
        playInTabs(track, volume);
      })();
      musicPlaying = true;
      if (playBtn) playBtn.textContent = "Stop Music";
    }
    function requestStopMusic() {
      stopInTabs();
      musicPlaying = false;
      if (playBtn) playBtn.textContent = "Play Music";
    }
    enabledCheckbox.addEventListener("change", async (e) => {
      const enabled = e.target.checked;
      await chrome.storage.sync.set({ enabled });
      updateStatus(enabled);
      if (enabled) requestPlayMusic();
      else requestStopMusic();
    });
    function updateStatus(enabled) {
      if (enabled) {
        statusDiv.className = "status enabled";
        statusText.textContent = "\u2705 Extension is ON";
      } else {
        statusDiv.className = "status disabled";
        statusText.textContent = "\u274C Extension is OFF";
      }
    }
    document.getElementById("optionsBtn").addEventListener("click", () => {
      chrome.runtime.openOptionsPage();
    });
    if (playBtn) {
      playBtn.addEventListener("click", async () => {
        const res = await chrome.storage.sync.get({ musicTrack, volume: result.volume || 0.8 });
        const track = res.musicTrack || musicTrack;
        const vol = parseFloat(res.volume || 0.8);
        if (!musicPlaying) {
          await playInTabs(track, vol);
          musicPlaying = true;
          playBtn.textContent = "Stop Music";
          chrome.storage.sync.set({ musicEnabled: true });
        } else {
          await stopInTabs();
          musicPlaying = false;
          playBtn.textContent = "Play Music";
          chrome.storage.sync.set({ musicEnabled: false });
        }
      });
    }
  });
})();
