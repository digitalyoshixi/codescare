
(() => {
  const overlay = document.createElement("div");
  overlay.id = "blood-overlay";
  document.body.appendChild(overlay);

  const bloodImages = [
    chrome.runtime.getURL("assets/blood1.png"),
    chrome.runtime.getURL("assets/blood2.png"),
    chrome.runtime.getURL("assets/blood3.png"),
  chrome.runtime.getURL("assets/scary1.jpg"),
  chrome.runtime.getURL("assets/scary2.jpg")
  ];

  // Generate a blood every second
  setInterval(() => {
    const img = document.createElement("img");
    img.src = bloodImages[Math.floor(Math.random() * bloodImages.length)];
    img.className = "blood";
    img.style.left = Math.random() * 100 + "vw";
    img.style.animationDuration = 5 + Math.random() * 4 + "s";
    img.style.transform = `scale(${0.5 + Math.random() * 1.5})`;
    overlay.appendChild(img);
    setTimeout(() => img.remove(), 8000);
  }, 1000);
})();