// popup.js - Popup script for LeetScare

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
});
