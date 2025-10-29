// options.js - Options page script for LeetScare

document.addEventListener('DOMContentLoaded', async () => {
  // Load saved settings
  const result = await chrome.storage.sync.get({
    enabled: true,
    durationSeconds: 2,
    volume: 0.8,
    theme: 'spooky'
  });

  // Populate UI with saved values
  document.getElementById('enabled').checked = result.enabled;
  document.getElementById('duration').value = result.durationSeconds;
  document.getElementById('durationValue').textContent = result.durationSeconds.toFixed(1);
  document.getElementById('volume').value = result.volume;
  document.getElementById('volumeValue').textContent = Math.round(result.volume * 100);
  document.getElementById('theme').value = result.theme;

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
});
