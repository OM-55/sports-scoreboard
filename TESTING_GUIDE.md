# Testing Your Live Sports Scoreboard

## ✅ What I Fixed

1. **Updated Supabase API Key** - Replaced the invalid placeholder with your real JWT token
2. **Added Missing Winner Elements** - All 7 game cards now have `<p class="winner hidden">` elements
3. **Added Comprehensive Logging** - Console now shows detailed debugging information
4. **Improved Error Handling** - Prevents crashes when DOM elements are missing

---

## 🧪 How to Test

### Step 1: Check Browser Console
Your browser should now be open at `http://localhost:8000/index.html`

1. Press **F12** to open Developer Tools
2. Go to the **Console** tab
3. You should see these messages:
   ```
   🔧 Initializing Supabase client...
   📍 URL: https://cbyvvnugycxprzjudff.supabase.co
   ✅ Supabase client created successfully
   🚀 Page loaded, starting score updates...
   🔄 Fetching scores from database...
   📊 Loaded X games from database
   ✏️ Updating game 1: {...}
   ✏️ Updating game 2: {...}
   ... (etc for all games)
   ✅ All cards updated successfully
   ⏰ Auto-refresh enabled (every 3 seconds)
   ```

4. **If you see errors instead:**
   - ❌ `401 Unauthorized` → API key issue (unlikely now)
   - ❌ `Cannot read property...` → DOM structure issue (should be fixed)
   - ❌ `Network error` → Check your internet connection

### Step 2: Verify Data is Loading
Look at the game cards on the page. They should show:
- **Status**: The current game status (e.g., "STATUS: LIVE", "STATUS: ENDED")
- **Scores**: Team names and scores (e.g., "Team A: 150 | Team B: 120")
- **Winner**: Only visible when status is "ENDED" and a winner is set

### Step 3: Test Live Updates
1. Open your **Supabase Dashboard** in another tab
2. Go to **Table Editor** → `scores` table
3. Edit a row (e.g., change a score from 100 to 150)
4. **Wait 3 seconds** (auto-refresh interval)
5. The website should update automatically **without refreshing the page**

### Step 4: Test Winner Display
1. In Supabase, find a game row
2. Set `status` to `"ENDED"`
3. Set `winner` to a team name (e.g., `"Team A"`)
4. Wait 3 seconds
5. The winner should appear on the card
6. Change `status` back to `"LIVE"`
7. Wait 3 seconds - winner should disappear

---

## 🔍 Troubleshooting

### Problem: No data appears on the cards
**Solution:** Check the console for errors. Make sure your `scores` table has data with matching `game_id` values (1-7).

### Problem: Data appears once but doesn't update
**Solution:** Check the Network tab in Developer Tools. You should see requests to Supabase every 3 seconds.

### Problem: Some cards update, others don't
**Solution:** Check that your database has rows with `game_id` values matching the cards (1-7).

### Problem: Console shows "No card found for game_id: X"
**Solution:** Your database has a game with an ID that doesn't match any card in the HTML. This is normal if you have extra games in the database.

---

## 📊 Database Structure Expected

Your `scores` table should have these columns:
- `game_id` (integer) - Values 1-7 for the 7 sports
- `status` (text) - e.g., "LIVE", "ENDED", "UPCOMING"
- `team_a` (text) - Name of team A
- `team_b` (text) - Name of team B
- `score_a` (integer/text) - Score for team A
- `score_b` (integer/text) - Score for team B
- `winner` (text) - Winner name (only shown when status = "ENDED")

### Game ID Mapping:
- 1 = Cricket (Boys)
- 2 = Cricket (Girls)
- 3 = Volleyball (Boys)
- 4 = Throwball (Girls)
- 5 = Relay
- 6 = Tug of War
- 7 = Musical Chairs

---

## 🚀 Next Steps

Once you verify everything works locally:

1. **Commit your changes** to Git:
   ```bash
   git add .
   git commit -m "Fix: Updated Supabase API key and added winner elements"
   git push
   ```

2. **Deploy to GitHub Pages** (if that's where you're hosting)
   - The changes will automatically deploy if you have GitHub Actions set up
   - Or manually enable GitHub Pages in your repo settings

3. **Test the live site** the same way you tested localhost

---

## 💡 Tips

- The page auto-refreshes every **3 seconds** - you don't need to reload
- All updates happen in the background using the Supabase API
- The console logs help you debug issues - keep Developer Tools open while testing
- If you want faster updates, change `3000` to `1000` in supabase.js (line 89)
