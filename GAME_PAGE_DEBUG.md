# 🐛 Debugging Individual Game Pages

## Issue: Scores not showing on individual game page

### ✅ Fixed!

**Changes made to `game.html`:**

1. **Console Logging Added:**
   - Shows game ID being loaded
   - Shows full game data from database
   - Shows individual scores
   - Shows success message

2. **Default Score Changed:**
   - Old: `data.score_a || '—'` (shows dash if null)
   - New: `data.score_a || '0'` (shows 0 if null)

3. **Batting Info Fixed:**
   - Now properly shows/hides based on game status
   - Explicitly removes 'hidden' class when showing

4. **Badge Clearing:**
   - Clears previous badge content before updating
   - Prevents duplicate badges

---

## 🧪 How to Test:

### **Step 1: Check Browser Console**
1. Open `http://localhost:8000/game.html?id=1`
2. Press **F12** to open Developer Tools
3. Click **Console** tab
4. You should see:
   ```
   🔄 Loading game ID: 1
   ✅ Game data loaded: {game_id: 1, sport: "cricket", ...}
   Team A Score: 72/3 (9.4 ov)
   Team B Score: 0/0 (0.0 ov)
   ✅ Page updated successfully
   ```

### **Step 2: Check What's Displayed**
You should see:
- ✅ Game title (e.g., "cricket (boys)")
- ✅ Status badge (LIVE/UPCOMING/ENDED)
- ✅ Batting/bowling info (if cricket + LIVE)
- ✅ Team A name and score
- ✅ Team B name and score
- ✅ Batting/Bowling badges (if cricket)
- ✅ Winner section (if game ended)

### **Step 3: Test Different Games**
- `game.html?id=1` - Cricket (boys)
- `game.html?id=2` - Cricket (girls)
- `game.html?id=3` - Volleyball (boys)
- `game.html?id=4` - Volleyball (girls)

---

## 🔍 If Still Not Working:

### **Check Console for Errors:**
Look for:
- ❌ Red error messages
- ❌ "Error loading game"
- ❌ "No data returned"

### **Common Issues:**

1. **Game ID doesn't exist:**
   - Error: "Game not found!"
   - Fix: Use valid game ID (1-9)

2. **Supabase connection error:**
   - Error: "Error loading game: [error message]"
   - Fix: Check internet connection, verify Supabase URL/key

3. **Scores are null in database:**
   - Shows: "0" instead of actual score
   - Fix: Update scores in admin panel first

---

## 📊 Expected Output:

### **Cricket Game (LIVE):**
```
🏏 cricket (boys)
[LIVE badge]

🏏 MBA 1st Year is BATTING | ⚾ MBA 2nd Year is BOWLING

MBA 1st Year          [🏏 BATTING]
72/3 (9.4 ov)

MBA 2nd Year          [⚾ BOWLING]
0/0 (0.0 ov)
```

### **Volleyball Game (LIVE):**
```
volleyball (boys)
[LIVE badge]

MBA 1st Year
12

MBA 2nd Year
10
```

---

**The page should now show all scores and details correctly!** 🎉
