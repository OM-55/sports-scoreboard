# Database Schema Fix Guide

## Current Issue

Your database is missing some columns that would make the scoreboard work better. Right now you have:

**Current Columns:**
- `game_id` ✅
- `gender` ✅
- `sport` ✅
- `team_a` ✅
- `score_a` ✅

**Missing Columns:**
- `team_b` - Name of the second team
- `score_b` - Score of the second team
- `status` - Game status (LIVE, ENDED, UPCOMING, etc.)
- `winner` - Winner name (when game ends)

---

## Quick Fix (Already Applied)

I've updated the code to work with your current database structure. It will now show:
- **Status**: Shows the sport and gender (e.g., "cricket (boys)")
- **Scores**: Shows only team_a and score_a

**Refresh your browser now to see the data!**

---

## Recommended: Add Missing Columns

To get the full scoreboard experience with live status updates and winner announcements, add these columns to your Supabase table:

### Step 1: Go to Supabase Table Editor
1. Open your Supabase dashboard
2. Go to **Table Editor** → `scores` table
3. Click the **+** button to add a new column

### Step 2: Add `team_b` Column
- **Name**: `team_b`
- **Type**: `text`
- **Default value**: (leave empty)
- **Allow nullable**: ✅ Yes
- Click **Save**

### Step 3: Add `score_b` Column
- **Name**: `score_b`
- **Type**: `text` (or `integer` if you only store numbers)
- **Default value**: (leave empty)
- **Allow nullable**: ✅ Yes
- Click **Save**

### Step 4: Add `status` Column
- **Name**: `status`
- **Type**: `text`
- **Default value**: `UPCOMING`
- **Allow nullable**: ✅ Yes
- Click **Save**

### Step 5: Add `winner` Column
- **Name**: `winner`
- **Type**: `text`
- **Default value**: (leave empty)
- **Allow nullable**: ✅ Yes
- Click **Save**

### Step 6: Update Your Data

Now fill in the new columns for each game:

**Example for Cricket (Boys) - game_id: 1**
```
team_a: "MBA 1st Year"
score_a: "99/3 (92.4 ov)"
team_b: "MBA 2nd Year"
score_b: "85/5 (45 ov)"
status: "LIVE"
winner: (leave empty while game is ongoing)
```

**When a game ends:**
```
status: "ENDED"
winner: "MBA 1st Year"
```

---

## After Adding Columns

Once you've added the columns, I'll update the code to use the full schema. The scoreboard will then show:

✅ **Better Status Display**: "LIVE", "ENDED", "UPCOMING" instead of "cricket (boys)"
✅ **Both Teams**: "MBA 1st Year: 99/3 | MBA 2nd Year: 85/5"
✅ **Winner Announcement**: Big "Winner: MBA 1st Year" when game ends
✅ **Auto-hide Winner**: Winner disappears when status changes back to LIVE

---

## Alternative: Keep Current Schema

If you prefer to keep your current database structure, that's fine! The code now works with what you have. You'll just have a simpler display without:
- Live status updates (LIVE/ENDED)
- Second team scores
- Winner announcements

**Your choice!** Let me know which approach you prefer.
