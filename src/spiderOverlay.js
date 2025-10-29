(() => {
  // Crea el contenedor invisible
  const overlay = document.createElement("div");
  overlay.id = "spider-overlay";
  document.body.appendChild(overlay);

  const spiderImgs = [
    chrome.runtime.getURL("assets/spider1.png"),
    chrome.runtime.getURL("assets/spider2.png"), 
    chrome.runtime.getURL("assets/spider2.png")
  ];

  // corner
  const positions = [
    { top: "0px", left: "0px", rotate: "0deg" },
    { top: "0px", right: "0px", rotate: "90deg" },
    { bottom: "0px", left: "0px", rotate: "-90deg" },
    { bottom: "0px", right: "0px", rotate: "180deg" }
  ];

  // random cgoose webs
  const numWebs = 2 + Math.floor(Math.random() * 3);

  for (let i = 0; i < numWebs; i++) {
    const img = document.createElement("img");
    img.src = spiderImgs[Math.floor(Math.random() * spiderImgs.length)];
    img.className = "spider-web";

    const pos = positions[Math.floor(Math.random() * positions.length)];

    // random positioning
    for (const [key, val] of Object.entries(pos)) {
      img.style[key] = val;
    }
    img.style.transform = `rotate(${pos.rotate}) scale(${0.8 + Math.random() * 0.6})`;

    overlay.appendChild(img);
  }
})();
