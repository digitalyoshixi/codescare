// contentScript.js - injected into leetcode pages
// LeetScare extension: Shows spooky jumpscare when Run/Submit is clicked

import { text_message } from "./geminihandler";


(async function() {
  'use strict';

  // Load user settings from chrome.storage
  async function getSettings() {
    return new Promise((resolve) => {
      chrome.storage.sync.get({
        enabled: true,
        durationSeconds: 2,
        volume: 0.8,
        theme: 'spooky'
      }, resolve);
    });
  }

  let settings = await getSettings();
  let overlayActive = false;

  // Listen for settings changes
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync' && changes.enabled) {
      settings.enabled = changes.enabled.newValue;
      // toggle dark layer according to enabled
      if (settings.enabled) addDarkLayer(); else removeDarkLayer();
    }
  });
  // react to music/dark setting changes
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync') {
      if (changes.musicEnabled) {
        const en = !!changes.musicEnabled.newValue;
        if (en) addDarkLayer(); else removeDarkLayer();
      }
      if (changes.musicTrack && document.getElementById('leetscare-music')) {
        const audio = document.getElementById('leetscare-music');
        const newTrack = chrome.runtime.getURL(changes.musicTrack.newValue);
        try {
          if (audio.querySelector('source')) {
            audio.pause();
            audio.currentTime = 0;
            audio.querySelector('source').src = newTrack;
            audio.load();
            audio.play().catch(() => {});
          }
        } catch (e) {}
      }
    }
  });

  // Handle runtime messages (play/stop background music)
  try {
    chrome.runtime.onMessage.addListener((msg, sender, sendResp) => {
      if (!msg || !msg.action) return;
      if (msg.action === 'play_music') {
        // start looping spooky music; accept optional track and volume
        startBackgroundMusic(msg.track, msg.volume);
        sendResp && sendResp({ ok: true });
      } else if (msg.action === 'stop_music') {
        stopBackgroundMusic();
        sendResp && sendResp({ ok: true });
      } else if (msg.action === 'set_dark') {
        // msg.enabled = true/false
        if (typeof msg.enabled === 'boolean') {
          if (msg.enabled) addDarkLayer(); else removeDarkLayer();
        }
        sendResp && sendResp({ ok: true });
      } else if (msg.action === 'set_volume') {
        // adjust volume of the background music if playing
        const v = typeof msg.volume === 'number' ? msg.volume : settings.volume;
        const audio = document.getElementById('leetscare-music');
        if (audio) audio.volume = Math.max(0, Math.min(1, v));
        sendResp && sendResp({ ok: true });
      }
    });
  } catch (e) {}

  if (!settings.enabled) {
    console.log('[LeetScare] Extension disabled');
    return;
  }

  // Conservative selectors: try to find Run/Submit buttons
  // LeetCode uses various selectors across different UI versions
  function findButtons() {
    const buttons = [];
    const buttonSelectors = [
      'button',
      '[role="button"]',
      'input[type="button"]'
    ];

    buttonSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(btn => {
        const text = (btn.innerText || btn.textContent || btn.value || '').toLowerCase().trim();
        const ariaLabel = (btn.getAttribute('aria-label') || '').toLowerCase();
        
        // Match Run or Submit buttons
        if (
          text.includes('run') || 
          text.includes('submit') || 
          text === 'run code' ||
          text === 'submit solution' ||
          ariaLabel.includes('run') ||
          ariaLabel.includes('submit')
        ) {
          // Avoid duplicates
          if (!buttons.includes(btn)) {
            buttons.push(btn);
          }
        }
      });
    });

    return buttons;
  }

  // Alternative: Listen for keyboard shortcuts (Ctrl/Cmd+Enter)
  let keyboardHandler = null;
  
  function setupKeyboardListener() {
    if (keyboardHandler) {
      document.removeEventListener('keydown', keyboardHandler);
    }
    
    keyboardHandler = (e) => {
      // Ctrl+Enter or Cmd+Enter to run/submit
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (settings.enabled && !overlayActive) {
          e.preventDefault();
          e.stopPropagation();
          showOverlay((settings.durationSeconds || 2) * 1000);
          
          // Re-trigger after delay
          setTimeout(() => {
            const event = new KeyboardEvent('keydown', {
              key: 'Enter',
              ctrlKey: e.ctrlKey,
              metaKey: e.metaKey,
              bubbles: true,
              cancelable: true
            });
            document.activeElement?.dispatchEvent(event);
          }, 250);
        }
      }
    };
    
    document.addEventListener('keydown', keyboardHandler, true);
  }

  // Available jumpscare GIFs
  const jumpscareGIFs = [
    'chica.gif',
    'fnaf_bonnie.gif',
    'golden.gif',
  ];


  // Show the spooky overlay
  function showOverlay(durationMs) {
    if (overlayActive || document.getElementById('leetscare-overlay')) {
      return;
    }

    overlayActive = true;
    const duration = Math.max(500, Math.min(10000, durationMs)); // Clamp between 0.5-10s

    // Randomly select a jumpscare GIF
    const randomGIF = jumpscareGIFs[Math.floor(Math.random() * jumpscareGIFs.length)];

    // Create overlay element with random jumpscare
    const overlay = document.createElement('div');
    overlay.id = 'leetscare-overlay';
    
    overlay.innerHTML = `
      <img src="${chrome.runtime.getURL(`assets/jumpscares/${randomGIF}`)}" class="leetscare-jumpscare-gif" alt="Jumpscare" />
      <audio id="leetscare-audio" preload="auto">
        <source src="${chrome.runtime.getURL('assets/jumpscare.mp3')}" type="audio/mpeg">
      </audio>
    `;

    document.body.appendChild(overlay);

    // Setup audio - play immediately (audio will fail silently if file doesn't exist)
    const audio = overlay.querySelector('#leetscare-audio');
    if (audio && settings.volume > 0) {
      audio.volume = Math.max(0, Math.min(1, settings.volume || 0.8));
      
      // Play audio immediately (no delay)
      audio.play().catch(err => {
        // Silently fail if audio file doesn't exist - that's okay
        console.log('[LeetScare] Audio play failed (may not exist):', err);
      });
    }

    // Dismiss handlers - Esc key
    const escHandler = (e) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        hideOverlay();
      }
    };
    window.addEventListener('keydown', escHandler);
    
    // Also dismiss on click anywhere
    overlay.addEventListener('click', hideOverlay);

    // Auto hide after duration
    const timeoutId = setTimeout(hideOverlay, duration);

    function hideOverlay() {
      clearTimeout(timeoutId);
      window.removeEventListener('keydown', escHandler);
      
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s ease-out';
      
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.remove();
        }
        overlayActive = false;
      }, 300);
    }

    // Store hideOverlay for external access
    overlay._hideOverlay = hideOverlay;
  }

  // Background music controls (looping spooky music)
  function startBackgroundMusic(track, volume) {
    try {
      // If already playing, do nothing
      if (document.getElementById('leetscare-music')) {
        // If already playing, update volume/track if provided
        const existing = document.getElementById('leetscare-music');
        if (typeof volume === 'number') existing.volume = Math.max(0, Math.min(1, volume));
        if (track) {
          const s = existing.querySelector('source');
          if (s && s.src !== chrome.runtime.getURL(track)) {
            // replace source
            existing.pause();
            existing.currentTime = 0;
            s.src = chrome.runtime.getURL(track);
            existing.load();
            existing.play().catch(() => {});
          }
        }
        return;
      }

      const audio = document.createElement('audio');
      audio.id = 'leetscare-music';
      audio.loop = true;
      audio.preload = 'auto';
      audio.style.display = 'none';

      const src = document.createElement('source');
      const asset = track ? track : 'assets/spooky.mp3';
      src.src = chrome.runtime.getURL(asset);
      src.type = 'audio/mpeg';
      audio.appendChild(src);

      document.body.appendChild(audio);
      audio.volume = Math.max(0, Math.min(1, typeof volume === 'number' ? volume : (settings.volume || 0.8)));
      audio.play().catch(err => {
        // Autoplay may fail if not initiated by user gesture; ignore silently
        console.warn('[LeetScare] background audio play failed:', err);
      });
    } catch (e) {
      console.warn('[LeetScare] startBackgroundMusic error', e);
    }
  }

  // Dark layer: adds a semi-transparent darkening layer over the page (non-interactive)
  function addDarkLayer() {
    try {
      if (document.getElementById('leetscare-dark-layer')) return;
      // style element for any animations/transitions
      const styleId = '__leetscare_dark_style';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `#leetscare-dark-layer{position:fixed;inset:0;background:rgba(0,0,0,0.45);pointer-events:none;z-index:2147483630;transition:opacity 0.3s ease;opacity:1;}#leetscare-dark-layer.hidden{opacity:0}`;
        (document.head || document.documentElement).appendChild(style);
      }

      const layer = document.createElement('div');
      layer.id = 'leetscare-dark-layer';
      // ensure it doesn't capture events
      layer.className = '';
      // insert as last child of body so it's above page content but below jumpscare overlay (which has higher z-index)
      (document.body || document.documentElement).appendChild(layer);
    } catch (e) {
      console.warn('[LeetScare] addDarkLayer error', e);
    }
  }
  
    // Dark layer: adds a semi-transparent darkening layer over the page (non-interactive)
    // It also implements a mouse-following "spotlight" using CSS variables and requestAnimationFrame.
    let __leetscare_mouse_handler = null;
    let __leetscare_mouse_pos = { x: '50%', y: '50%' };
    let __leetscare_mouse_raf = null;

    function addDarkLayer() {
      try {
        if (document.getElementById('leetscare-dark-layer')) return;
        // style element for any animations/transitions and spotlight support
        const styleId = '__leetscare_dark_style';
        if (!document.getElementById(styleId)) {
          const style = document.createElement('style');
          style.id = styleId;
          // Make the spotlight sharper by using a tight gradient stop and removing heavy backdrop blur.
          // This creates a clear circle (transparent) up to 90px and a quick hard transition to a near-opaque overlay.
          style.textContent = `
            #leetscare-dark-layer{
              position:fixed; inset:0; pointer-events:none; z-index:2147483630; transition:opacity 0.15s ease; opacity:1;
              /* sharper radial spotlight using CSS variables - narrow transition band */
              /* lighter overlay: reduce outer alpha so page is less dark outside the spotlight */
              background: radial-gradient(circle at var(--leetscare-x,50%) var(--leetscare-y,50%),
                rgba(0,0,0,0) 0px, rgba(0,0,0,0) 90px,
                rgba(0,0,0,0.55) 96px, rgba(0,0,0,0.55) 100%);
              backdrop-filter: none; /* reduce blur so the spotlight edge is crisp */
            }
            #leetscare-dark-layer.hidden{opacity:0}
          `;
          (document.head || document.documentElement).appendChild(style);
        }

        const layer = document.createElement('div');
        layer.id = 'leetscare-dark-layer';
        layer.className = '';
        (document.body || document.documentElement).appendChild(layer);

        // mouse movement handler: update CSS variables; throttle with rAF
        __leetscare_mouse_handler = (e) => {
          // client coordinates
          const x = (e.clientX || 0) + 'px';
          const y = (e.clientY || 0) + 'px';
          __leetscare_mouse_pos = { x, y };
          if (__leetscare_mouse_raf) return;
          __leetscare_mouse_raf = requestAnimationFrame(() => {
            try {
              const l = document.getElementById('leetscare-dark-layer');
              if (l) {
                l.style.setProperty('--leetscare-x', __leetscare_mouse_pos.x);
                l.style.setProperty('--leetscare-y', __leetscare_mouse_pos.y);
              }
            } catch (er) {}
            __leetscare_mouse_raf = null;
          });
        };

        // start listening
        window.addEventListener('mousemove', __leetscare_mouse_handler, { passive: true });
        // also update spotlight center on touch (for mobile)
        window.addEventListener('touchmove', (t) => {
          if (t.touches && t.touches[0]) {
            __leetscare_mouse_handler(t.touches[0]);
          }
        }, { passive: true });
      } catch (e) {
        console.warn('[LeetScare] addDarkLayer error', e);
      }
    }

  function removeDarkLayer() {
    try {
      const layer = document.getElementById('leetscare-dark-layer');
      if (layer) layer.remove();
      const style = document.getElementById('__leetscare_dark_style');
      if (style) style.remove();
    } catch (e) {
      console.warn('[LeetScare] removeDarkLayer error', e);
    }
  }
  
    function removeDarkLayer() {
      try {
        const layer = document.getElementById('leetscare-dark-layer');
        if (layer) layer.remove();
        const style = document.getElementById('__leetscare_dark_style');
        if (style) style.remove();
        if (__leetscare_mouse_handler) {
          window.removeEventListener('mousemove', __leetscare_mouse_handler);
          __leetscare_mouse_handler = null;
        }
        if (__leetscare_mouse_raf) {
          cancelAnimationFrame(__leetscare_mouse_raf);
          __leetscare_mouse_raf = null;
        }
      } catch (e) {
        console.warn('[LeetScare] removeDarkLayer error', e);
      }
    }

  function stopBackgroundMusic() {
    try {
      const audio = document.getElementById('leetscare-music');
      if (!audio) return;
      audio.pause();
      audio.remove();
    } catch (e) {
      console.warn('[LeetScare] stopBackgroundMusic error', e);
    }
  }

  // MutationObserver to detect LeetCode error messages
  let errorObserver = null;
  
  function setupErrorObserver() {
    if (errorObserver) {
      errorObserver.disconnect();
    }

    errorObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const text = (node.textContent || '').toLowerCase();
            const className = (node.className || '').toLowerCase();
            
            // Check for error indicators
            if (
              text.includes('error') ||
              text.includes('wrong answer') ||
              text.includes('runtime error') ||
              text.includes('compilation error') ||
              className.includes('error') ||
              node.querySelector('.error, [class*="error"], [class*="Error"]')
            ) {
              // Error detected - overlay should already be showing if triggered by button click
              console.log('[LeetScare] Error message detected');
            }
          }
        });
      });
    });

    // Observe the document body for changes
    errorObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Attach listeners to Run/Submit buttons
  function getAllTextChildren() {
    const textitems = document.querySelector("#editor > div.flex.flex-1.flex-col.overflow-hidden.pb-2 > div.flex-1.overflow-hidden > div > div > div.overflow-guard > div.monaco-scrollable-element.editor-scrollable.vs-dark > div.lines-content.monaco-editor-background > div.view-lines.monaco-mouse-cursor-text");
    const texts = [];
    if (textitems) {
      const spans = textitems.querySelectorAll('span');
      spans.forEach(span => {
        if (span.textContent) {
          texts.push(span.textContent);
        }
      });
    }
    return texts.join(" ");
  }
  
  function attachButtonListeners() {
    const buttons = findButtons();
    
    buttons.forEach(btn => {
      // Remove existing listener to avoid duplicates
      if (btn._leetscareListener) {
        btn.removeEventListener('click', btn._leetscareListener);
      }
      
      btn._leetscareListener = async (ev) => {
        if (!settings.enabled || overlayActive) {
          return;
        }

        // Try to prevent default and show overlay
        try {
          ev.stopPropagation();
        } catch (e) {}

        var mytext = await text_message(getAllTextChildren())
        console.log(mytext)
        showOverlay((settings.durationSeconds || 2) * 1000);
        
        // Re-trigger click after a short delay to let LeetCode process it
        // We use a synthetic click event
        setTimeout(() => {
          if (btn && btn.parentNode) {
            try {
              btn.click();
            } catch (e) {
              console.log('[LeetScare] Could not re-trigger click:', e);
            }
          }
        }, 250);
      };
      
      btn.addEventListener('click', btn._leetscareListener, true); // Use capture phase
    });
    
    if (buttons.length > 0) {
      console.log(`[LeetScare] Attached listeners to ${buttons.length} button(s)`);
    }
  }

  // Setup everything
  function init() {
    if (!settings.enabled) return;
    // apply dark layer when extension active
    try { addDarkLayer(); } catch (e) {}
    
    attachButtonListeners();
    setupKeyboardListener();
    setupErrorObserver();
    
    // Re-check for buttons periodically (LeetCode loads content dynamically)
    const checkInterval = setInterval(() => {
      if (document.readyState === 'complete') {
        attachButtonListeners();
      }
    }, 2000);
    
    // Clear interval after 30 seconds
    setTimeout(() => clearInterval(checkInterval), 30000);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Also re-init on navigation (LeetCode is SPA)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      setTimeout(init, 500);
    }
  }).observe(document, { subtree: true, childList: true });

})();
