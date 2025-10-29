// contentScript.js - injected into leetcode pages
// LeetScare extension: Shows spooky jumpscare when Run/Submit is clicked

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
    }
  });

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

  // Show the spooky overlay
  function showOverlay(durationMs) {
    if (overlayActive || document.getElementById('leetscare-overlay')) {
      return;
    }

    overlayActive = true;
    const duration = Math.max(500, Math.min(10000, durationMs)); // Clamp between 0.5-10s

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.id = 'leetscare-overlay';
    overlay.className = `leetscare-theme-${settings.theme || 'spooky'}`;
    
    overlay.innerHTML = `
      <div class="leetscare-container">
        <div class="leetscare-center">
          <div class="leetscare-spiders">
            <img src="${chrome.runtime.getURL('assets/spider.svg')}" class="leetscare-spider spider-1" />
            <img src="${chrome.runtime.getURL('assets/spider.svg')}" class="leetscare-spider spider-2" />
            <img src="${chrome.runtime.getURL('assets/spider.svg')}" class="leetscare-spider spider-3" />
          </div>
          <div class="leetscare-web"></div>
          <h1 class="leetscare-title">👻 BOO!</h1>
          <p class="leetscare-subtitle">Your code has been spooked!</p>
          <button id="leetscare-skip" class="leetscare-skip-btn">Skip</button>
        </div>
      </div>
      <audio id="leetscare-audio" preload="auto" loop>
        <source src="${chrome.runtime.getURL('assets/jumpscare.mp3')}" type="audio/mpeg">
      </audio>
    `;

    document.body.appendChild(overlay);

    // Setup audio - play immediately since triggered by user interaction
    const audio = overlay.querySelector('#leetscare-audio');
    if (audio) {
      audio.volume = Math.max(0, Math.min(1, settings.volume || 0.8));
      
      // Since this is triggered by user click, autoplay should work
      audio.play().catch(err => {
        console.log('[LeetScare] Audio play failed:', err);
        // Try again after a small delay
        setTimeout(() => {
          audio.play().catch(e => console.log('[LeetScare] Audio retry failed:', e));
        }, 100);
      });
    }

    // Dismiss handlers
    const skipBtn = overlay.querySelector('#leetscare-skip');
    if (skipBtn) {
      skipBtn.addEventListener('click', hideOverlay);
    }

    const escHandler = (e) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        hideOverlay();
      }
    };
    window.addEventListener('keydown', escHandler);

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
  function attachButtonListeners() {
    const buttons = findButtons();
    
    buttons.forEach(btn => {
      // Remove existing listener to avoid duplicates
      if (btn._leetscareListener) {
        btn.removeEventListener('click', btn._leetscareListener);
      }
      
      btn._leetscareListener = (ev) => {
        if (!settings.enabled || overlayActive) {
          return;
        }

        // Try to prevent default and show overlay
        try {
          ev.stopPropagation();
        } catch (e) {}
        
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
