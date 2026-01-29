# Add Batting Team Column to Database

## Step 1: Add Column in Supabase

Go to your Supabase Dashboard → Table Editor → `scores` table

Click "Add Column" and add:
- **Column Name**: `batting_team`
- **Type**: `text`
- **Default Value**: Leave empty
- **Nullable**: Yes (checked)

OR use SQL Editor:

```sql
ALTER TABLE scores 
ADD COLUMN batting_team text;
```

## Step 2: Set Initial Values

For cricket games, set which team is batting first:

```sql
-- Set Team A as batting for cricket boys
UPDATE scores 
SET batting_team = 'team_a' 
WHERE game_id = 1;

-- Set Team A as batting for cricket girls
UPDATE scores 
SET batting_team = 'team_a' 
WHERE game_id = 2;
```

## Done!

After adding this column, the admin panel will show "🏏 Batting" next to the team that's currently batting.
