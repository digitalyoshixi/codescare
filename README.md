# 👻 LeetScare

A spooky Chrome extension that injects a jumpscare overlay on LeetCode when you trigger a Run/Submit action that produces an error. The jumpscare appears **before** the error message becomes visible, adding some Halloween fun to your coding sessions!

## Features

- 🎃 **Spooky Jumpscare Overlay**: Full-screen animated overlay with spiders, webs, and spooky visuals
- 🔊 **Audio Effects**: Optional spooky sound effects (mutable)
- ⚙️ **Customizable**: Adjust duration, volume, and theme
- 🎮 **Keyboard Support**: Works with Run/Submit buttons and Ctrl/Cmd+Enter shortcuts
- 🛡️ **Safe & Opt-in**: Fully client-side, no external servers, easy to disable
- 🎨 **Themes**: Choose between Spooky (classic) and Mild (less intense)

Here are the revised installation steps for your Chrome extension’s README, replacing step 2 and streamlining the process for an npm-based build workflow:

***

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

2. **Install dependencies and build the extension**
   - Open the `codescare` directory in your terminal.
   - Run the following commands:
     ```bash
     npm install
     npm run build
     ```
   - This will install required packages and build the extension files.

3. **Load the extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Toggle **Developer mode** (top-right corner)
   - Click **Load unpacked**
   - Select the generated build (or `dist`) directory inside `codescare`

4. **Verify installation**
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


# LeetScare Demo Guide

This guide provides step-by-step instructions to demonstrate and test the LeetScare extension.

## Prerequisites

- Chrome browser with extension loaded (see README.md)
- LeetCode account (logged in)
- `spooky.mp3` file added to `assets/` directory (optional but recommended)
- Icons generated and placed in `assets/icons/` (optional)

## Demo Scenario 1: Basic Jumpscare on Error

### Steps

1. **Open LeetCode**
   - Navigate to: https://leetcode.com/problems/two-sum/
   - Make sure you're logged in

2. **Write Invalid Code**
   - In the code editor, type:
     ```python
     def solve():
         return None
         syntax error
     ```
   - Or intentionally create a syntax error

3. **Trigger Run Button**
   - Click the **"Run"** button
   - **Expected Result**:
     - Screen immediately goes dark
     - Animated spiders appear from edges
     - "👻 BOO!" title appears with shaking animation
     - Spooky web pattern visible
     - Audio plays (if file exists)
     - Skip button appears

4. **Wait for Auto-Dismiss**
   - Overlay should disappear after 2 seconds (default)
   - LeetCode's normal error message then appears
   - Page functionality should be intact

**Success Criteria**: ✅ Overlay appears, plays, dismisses automatically, LeetCode error shows afterward

---

## Demo Scenario 2: Keyboard Shortcut

### Steps

1. **Navigate to LeetCode Problem**
   - Go to any problem with code editor

2. **Type Code in Editor**
   - Write any code (valid or invalid)

3. **Use Keyboard Shortcut**
   - Press `Ctrl+Enter` (Windows/Linux) or `Cmd+Enter` (Mac)
   - **Expected Result**: Jumpscare overlay appears just like button click

**Success Criteria**: ✅ Keyboard shortcut triggers jumpscare

---

## Demo Scenario 3: Manual Dismissal

### Steps

1. **Trigger Jumpscare**
   - Click Run button (or use Ctrl+Enter)
   - Overlay appears

2. **Test Esc Key**
   - Press `Esc` key
   - **Expected Result**: Overlay immediately disappears

3. **Trigger Again**
   - Click Run again
   - Overlay appears

4. **Test Skip Button**
   - Click the "Skip" button
   - **Expected Result**: Overlay immediately disappears

**Success Criteria**: ✅ Both Esc and Skip button dismiss overlay instantly

---

## Demo Scenario 4: Settings Configuration

### Steps

1. **Open Settings**
   - Click LeetScare icon in toolbar
   - Click "⚙️ Open Settings" button
   - Or: Chrome → Extensions → LeetScare → Options

2. **Disable Extension**
   - Toggle "Enable LeetScare" to OFF
   - Return to LeetCode

3. **Test Disabled State**
   - Click Run button
   - **Expected Result**: No overlay appears, LeetCode works normally

4. **Re-enable**
   - Go back to settings
   - Toggle to ON
   - Return to LeetCode

5. **Test Enabled State**
   - Click Run button
   - **Expected Result**: Overlay appears again

6. **Adjust Duration**
   - In settings, change duration to 5 seconds
   - Click Run on LeetCode
   - **Expected Result**: Overlay stays longer (5 seconds)

7. **Adjust Volume**
   - Set volume to 0 (muted)
   - Click Run
   - **Expected Result**: Audio doesn't play (or is muted)
   - Set volume back to 0.8

8. **Change Theme**
   - Select "Mild" theme
   - Click Run
   - **Expected Result**: Less intense colors (orange instead of red)

**Success Criteria**: ✅ All settings persist and affect behavior correctly

---

## Demo Scenario 5: Submission Button

### Steps

1. **Navigate to Problem**
   - Go to any LeetCode problem

2. **Find Submit Button**
   - Scroll to find "Submit" or "Submit Solution" button

3. **Click Submit**
   - **Expected Result**: Jumpscare overlay appears (even if code is correct!)

**Success Criteria**: ✅ Submit button also triggers jumpscare

---

## Demo Scenario 6: Multiple Rapid Clicks

### Steps

1. **Rapid Triggering**
   - Click Run button multiple times quickly
   - **Expected Result**: 
     - Overlay appears each time
     - No crashes or broken state
     - Each overlay can be dismissed independently

**Success Criteria**: ✅ Extension handles rapid triggers gracefully

---

## Demo Scenario 7: Different LeetCode Pages

### Steps

1. **Test on Problem Page**
   - Navigate to any problem: `/problems/[name]/`
   - Test Run/Submit

2. **Test on Contest Page**
   - If available, test on contest problems

3. **Test on Different UI Versions**
   - LeetCode has different layouts
   - Try both old and new UI if accessible

**Success Criteria**: ✅ Extension works across different LeetCode page layouts

---

## Recording a Demo (Optional)

To create a GIF or video:

### Using Screen Recording Software

1. **Windows**:
   - Use built-in Windows Game Bar (Win+G)
   - Or use OBS Studio (free)

2. **Mac**:
   - Use QuickTime Player → New Screen Recording
   - Or use Cmd+Shift+5

3. **Chrome Extensions**:
   - Loom (browser extension)
   - Screencastify

### Recommended Demo Script

1. Show extension loaded in `chrome://extensions/`
2. Navigate to LeetCode
3. Type invalid code
4. Click Run → Show jumpscare
5. Show options page and settings
6. Disable/enable toggle
7. Show different duration
8. Test Esc key dismissal

**Duration**: 2-3 minutes for full demo

---

## Troubleshooting Demo Issues

### Issue: Overlay doesn't appear

**Check**:
- Extension is enabled (check popup)
- On correct domain (`leetcode.com`)
- Browser console for errors (F12)
- Refresh LeetCode page

**Fix**: Reload extension in `chrome://extensions/` and refresh LeetCode

### Issue: Audio doesn't play

**Check**:
- `spooky.mp3` exists in `assets/` directory
- Volume setting is > 0
- Browser autoplay policies (first interaction may be needed)

**Fix**: Click anywhere on LeetCode page first, then test

### Issue: Buttons not detected

**Check**:
- Browser console for `[LeetScare]` messages
- Try different problem pages
- LeetCode may have updated UI

**Fix**: Check button selectors in `contentScript.js`, may need updates for new LeetCode UI

### Issue: Settings don't save

**Check**:
- Chrome sync is enabled
- No storage quota exceeded

**Fix**: Clear and reset settings in options page

---

## Success Checklist

Before considering the demo successful, verify:

- [ ] Extension loads without errors
- [ ] Overlay appears on Run button click
- [ ] Overlay appears on Submit button click
- [ ] Overlay appears on Ctrl/Cmd+Enter
- [ ] Overlay can be dismissed with Esc
- [ ] Overlay can be dismissed with Skip button
- [ ] Settings page loads and saves correctly
- [ ] Popup toggle works
- [ ] Duration adjustment works
- [ ] Volume adjustment works
- [ ] Theme selection works
- [ ] Extension disable/enable works
- [ ] No console errors (check F12)
- [ ] LeetCode functionality remains intact after overlay
- [ ] Works on multiple problem pages

---

## Notes for Presentation

- Start with extension disabled to show it's opt-in
- Emphasize it's safe (client-side only, no external servers)
- Show customization options (duration, volume, theme)
- Demonstrate dismissibility (user control)
- Mention it's for fun and doesn't break LeetCode functionality

**Tip**: Have a backup plan if LeetCode UI has changed - show the code structure and explain how it adapts to different layouts.
