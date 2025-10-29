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
