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

  enabledCheckbox.checked = result.enabled;
  updateStatus(result.enabled);

  // Toggle handler
  enabledCheckbox.addEventListener('change', async (e) => {
    const enabled = e.target.checked;
    await chrome.storage.sync.set({ enabled });
    updateStatus(enabled);
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

});
