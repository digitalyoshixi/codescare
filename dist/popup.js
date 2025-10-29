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
    enabledCheckbox.checked = result.enabled;
    updateStatus(result.enabled);
    enabledCheckbox.addEventListener("change", async (e) => {
      const enabled = e.target.checked;
      await chrome.storage.sync.set({ enabled });
      updateStatus(enabled);
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
  });
})();
