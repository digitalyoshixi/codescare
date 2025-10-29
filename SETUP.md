# Quick Setup Guide

## Before First Use

### 1. Generate Icons (Recommended)

The extension needs properly sized icons:

1. Open `generate-icons.html` in your browser
2. Click "Save" buttons for each size (16, 48, 128)
3. Save files as:
   - `assets/icons/16.png`
   - `assets/icons/48.png`
   - `assets/icons/128.png`

**Note**: Placeholder icons have been copied from `icon.png`, but they may not be the correct size. Using the generator ensures proper dimensions.

### 2. Add Audio File (Optional but Recommended)

Replace `assets/spooky.mp3` with an actual MP3 file:

- **Requirements**:
  - Format: MP3
  - Duration: 2-3 seconds (will loop if shorter than overlay duration)
  - Size: <500KB recommended
  - Content: Spooky/creepy sound effect

- **Sources** (check licenses):
  - [freesound.org](https://freesound.org) - search "spooky", "jumpscare", "creepy"
  - [zapsplat.com](https://zapsplat.com) - free with account
  - Create your own with audio software

- **Rename**: Keep filename as `spooky.mp3` in `assets/` directory

### 3. Load Extension

1. Open Chrome → `chrome://extensions/`
2. Enable **Developer mode** (toggle top-right)
3. Click **Load unpacked**
4. Select the `codescare` folder
5. Extension should appear in your extensions list

### 4. Test

1. Go to https://leetcode.com
2. Open any problem
3. Type invalid code (e.g., `def solve(): syntax error`)
4. Click **Run** button
5. You should see the jumpscare overlay!

## Troubleshooting

### Extension won't load

- Make sure you selected the `codescare` folder (not parent folder)
- Check `manifest.json` exists and is valid JSON
- Check browser console for errors

### Icons missing

- Use `generate-icons.html` to create proper icons
- Or manually create 16x16, 48x48, 128x128 PNG files

### Audio doesn't play

- Browser autoplay restrictions may apply
- First click/interaction on page may be required
- Check that `spooky.mp3` is a valid MP3 file
- Check volume setting (should be > 0)

### Overlay doesn't appear

- Check extension is enabled (click icon)
- Ensure you're on `leetcode.com`
- Refresh the LeetCode page
- Check browser console (F12) for errors

## File Checklist

Before loading extension, verify:

- [x] `manifest.json` exists
- [x] `src/contentScript.js` exists
- [x] `src/overlay.css` exists
- [x] `src/service_worker.js` exists
- [x] `src/options.html` and `src/options.js` exist
- [x] `src/popup.html` and `src/popup.js` exist
- [ ] `assets/icons/16.png` (use generator)
- [ ] `assets/icons/48.png` (use generator)
- [ ] `assets/icons/128.png` (use generator)
- [ ] `assets/spooky.mp3` (replace placeholder)
- [x] `assets/spider.svg` exists

Placeholder files will work, but proper icons and audio enhance the experience!
