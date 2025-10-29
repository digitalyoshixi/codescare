# 👻 LeetScare

A spooky Chrome extension that injects a jumpscare overlay on LeetCode when you trigger a Run/Submit action that produces an error. The jumpscare appears **before** the error message becomes visible, adding some Halloween fun to your coding sessions!

## Features

- 🎃 **Spooky Jumpscare Overlay**: Full-screen animated overlay with spiders, webs, and spooky visuals
- 🔊 **Audio Effects**: Optional spooky sound effects (mutable)
- ⚙️ **Customizable**: Adjust duration, volume, and theme
- 🎮 **Keyboard Support**: Works with Run/Submit buttons and Ctrl/Cmd+Enter shortcuts
- 🛡️ **Safe & Opt-in**: Fully client-side, no external servers, easy to disable
- 🎨 **Themes**: Choose between Spooky (classic) and Mild (less intense)

## Installation

### Prerequisites

- Google Chrome or Chromium-based browser
- Chrome Extension Developer Mode enabled

### Steps

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/digitalyoshixi/codescare
   cd codescare
   ```

2. **Prepare assets** (optional, but recommended):
   - **Icons**: Open `generate-icons.html` in your browser and save the generated icons to `assets/icons/` as `16.png`, `48.png`, and `128.png`
   - **Audio**: Replace `assets/spooky.mp3` with an actual MP3 audio file (2-3 seconds, <500KB recommended)
     - You can find free spooky sounds at [freesound.org](https://freesound.org) or [zapsplat.com](https://zapsplat.com)
     - Keep the filename as `spooky.mp3`

3. **Load the extension**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Toggle **Developer mode** (top-right corner)
   - Click **Load unpacked**
   - Select the `codescare` directory

4. **Verify installation**:
   - You should see "LeetScare" in your extensions list
   - The extension icon should appear in your toolbar

## Usage

### Basic Usage

1. Navigate to [LeetCode](https://leetcode.com) and open any coding problem
2. Write some code (or intentionally write code that will cause an error)
3. Click the **Run** or **Submit** button (or press `Ctrl+Enter` / `Cmd+Enter`)
4. Watch the spooky jumpscare overlay appear!
5. After the overlay (or if you dismiss it with `Esc` or the Skip button), LeetCode's normal flow continues

### Configuration

Click the LeetScare icon in your toolbar to:
- Toggle the extension on/off
- Open settings for more options

Or go to **Extensions** → **LeetScare** → **Options** to configure:
- **Enable/Disable**: Turn jumpscare on or off
- **Duration**: How long the overlay appears (0.5 - 10 seconds)
- **Volume**: Audio volume (0 = muted)
- **Theme**: Choose Spooky or Mild theme

## Demo

### Test Steps

1. **Load the extension** (see Installation above)

2. **Navigate to LeetCode**:
   - Go to https://leetcode.com/problems/two-sum/ (or any problem)
   - Make sure you're logged in (necessary to run code)

3. **Trigger the jumpscare**:
   - Type some invalid code that will cause an error:
     ```python
     def solve():
         syntax error here
     ```
   - Click the **Run** button
   - You should see:
     - Immediate spooky overlay with animated spiders
     - Spooky audio (if enabled and audio file is present)
     - "👻 BOO!" message
   - Overlay disappears after configured duration (default: 2 seconds)
   - LeetCode's error message then appears normally

4. **Test dismissal**:
   - Click Run again
   - Press `Esc` key or click "Skip" button
   - Overlay should disappear immediately

5. **Test keyboard shortcut**:
   - Type some code in the editor
   - Press `Ctrl+Enter` (Windows/Linux) or `Cmd+Enter` (Mac)
   - Jumpscare should trigger

6. **Test options**:
   - Click extension icon → "Open Settings"
   - Change duration to 5 seconds
   - Change volume to 0.5
   - Save and test again

### Expected Behavior

- ✅ Overlay appears immediately on Run/Submit click
- ✅ Audio plays (if file exists and volume > 0)
- ✅ Overlay is dismissible with Esc or Skip button
- ✅ LeetCode's normal error flow continues after overlay
- ✅ Works on both desktop and problem page views
- ✅ Settings persist across browser sessions

### Troubleshooting

**Overlay doesn't appear:**
- Check if extension is enabled (click icon)
- Ensure you're on `leetcode.com` domain
- Check browser console for errors (F12 → Console)
- Try refreshing the LeetCode page

**Audio doesn't play:**
- Browser autoplay restrictions may apply (first user interaction required)
- Ensure `spooky.mp3` file exists in `assets/` directory
- Check volume setting (should be > 0)
- Audio may need user interaction first (click anywhere on page)

**Buttons not detected:**
- LeetCode may have updated their UI
- Check console for `[LeetScare]` messages
- Try different problem pages (some layouts differ)

## Project Structure

```
codescare/
├── manifest.json           # Extension manifest (Manifest V3)
├── README.md              # This file
├── DEMO.md                # Detailed demo instructions
├── generate-icons.html    # Tool to generate extension icons
├── src/
│   ├── contentScript.js   # Main script injected into LeetCode
│   ├── overlay.css        # Styles for jumpscare overlay
│   ├── options.html       # Options/settings page
│   ├── options.js         # Options page logic
│   ├── popup.html         # Extension popup UI
│   ├── popup.js           # Popup logic
│   └── service_worker.js  # Background service worker
└── assets/
    ├── spooky.mp3         # Spooky audio file (replace with actual file)
    ├── spider.svg         # Spider graphic
    └── icons/
        ├── 16.png         # Small icon (generate with generate-icons.html)
        ├── 48.png         # Medium icon
        └── 128.png        # Large icon
```

## Technical Details

### Manifest V3

This extension uses Chrome's Manifest V3 API:
- `service_worker.js` for background tasks
- `chrome.storage.sync` for settings persistence
- Content script injection on `leetcode.com` pages
- Web-accessible resources for assets

### How It Works

1. **Content Script** (`contentScript.js`) is injected into all LeetCode pages
2. **Button Detection**: Listens for Run/Submit button clicks or keyboard shortcuts
3. **Overlay Injection**: Creates a full-screen overlay with high z-index
4. **Audio Playback**: Attempts to play spooky audio (subject to browser autoplay policies)
5. **Error Detection**: Uses MutationObserver to detect LeetCode error messages (for future enhancements)
6. **Dismissal**: Overlay can be dismissed with Esc key, Skip button, or auto-hides after duration

### Browser Compatibility

- ✅ Chrome 88+ (Manifest V3 support)
- ✅ Edge 88+ (Chromium-based)
- ✅ Other Chromium-based browsers with Manifest V3 support

## Safety & Privacy

- ✅ **100% Client-Side**: No network requests to external servers
- ✅ **No Data Collection**: Settings stored locally in Chrome storage
- ✅ **Opt-In**: Extension can be disabled via popup or options
- ✅ **Open Source**: Code is visible and auditable

## Development

### Making Changes

1. Edit files in `src/` directory
2. Go to `chrome://extensions/`
3. Click the refresh icon on the LeetCode extension card
4. Reload the LeetCode page to see changes

### Testing

- Use Chrome DevTools (F12) on LeetCode pages to see console logs
- Check `chrome://extensions/` for service worker errors
- Test on multiple LeetCode problem pages (UI can vary)

## License

This project is open source. Audio assets and any third-party resources should be replaced with properly licensed alternatives.

## Contributing

Contributions welcome! Areas for improvement:
- Better button detection for different LeetCode UI versions
- More spooky themes and animations
- Sound pack support
- Options to only trigger on errors vs. all submissions
- Better error detection via MutationObserver

## Acknowledgments

Built for HackOrTreat! 🎃

---

**Note**: This extension is for fun and educational purposes. Always follow LeetCode's Terms of Service.