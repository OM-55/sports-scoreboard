# 🏆 Live Sports Scoreboard

**by Palak Mallani**

A real-time sports scoreboard system with admin panel for managing scores across multiple sports.

---

## ✨ Features

### **📊 Main Scoreboard (`index.html`)**
- ✅ Real-time score updates (auto-refresh every 3 seconds)
- ✅ Color-coded cards:
  - 🔴 **RED** = LIVE games
  - 🟢 **GREEN** = ENDED games
  - ⚪ **WHITE** = UPCOMING games
- ✅ Cricket: Shows innings + batting/bowling teams
- ✅ Volleyball/Throwball/Handball: Shows current set number
- ✅ Responsive design (mobile + desktop)
- ✅ Click cards to view detailed game pages

### **⚙️ Admin Panel (`admin-final.html`)**
- ✅ Password protected (default: `sports2026`)
- ✅ **Cricket**: Full scoring system with:
  - Regular deliveries (0, 1, 2, 3, 4, 6)
  - Extras (Wide, No Ball, Byes, Leg Byes)
  - Wickets
  - Overthrows
  - Manual innings control
  - Switch innings button
- ✅ **Volleyball/Throwball/Handball**: Point scoring + manual set control
- ✅ **Winner-only sports**: Text input for winner name
- ✅ Inline editing (click scores to edit)
- ✅ Auto-save (no save buttons needed)

### **🎮 Individual Game Pages (`game.html`)**
- ✅ Detailed view of single game
- ✅ Real-time updates
- ✅ Back button to scoreboard

---

## 🎯 Supported Sports

1. **Cricket** (Boys & Girls) - Full scoring
2. **Volleyball** (Boys) - Set-based scoring
3. **Throwball** (Girls) - Set-based scoring
4. **Handball** - Point scoring
5. **Relay** - Winner only
6. **Tug of War** - Winner only
7. **Kadam Taal** (Musical Chairs) - Winner only

---

## 🚀 Quick Start

### **Local Development:**
```bash
# Start server
python -m http.server 8000

# Open in browser
http://localhost:8000/
```

### **URLs:**
- **Scoreboard**: `http://localhost:8000/`
- **Admin Panel**: `http://localhost:8000/admin-final.html`
- **Game Page**: `http://localhost:8000/game.html?id=1`

---

## 🔐 Admin Access

**Default Password:** `sports2026`

**To change password:**
1. Open `admin-final.html`
2. Find line ~30:
   ```javascript
   const ADMIN_PASSWORD = "sports2026";
   ```
3. Change to your password

---

## 📦 Deployment

See `DEPLOYMENT.md` for detailed deployment instructions.

**Quick Deploy (Vercel):**
```bash
npm install -g vercel
vercel
```

---

## 🎨 Color Scheme

- **LIVE**: Light Red (#fee2e2)
- **ENDED**: Light Green (#d1fae5)
- **UPCOMING**: White (#ffffff)
- **Primary**: Green (#00a86b)
- **Accent**: Gold (#ffd700)

---

## 🗄️ Database

**Supabase** (PostgreSQL)

**Table:** `scores`

**Columns:**
- `game_id` - Unique game identifier
- `sport` - Sport name
- `gender` - Boys/Girls
- `team_a`, `team_b` - Team names
- `score_a`, `score_b` - Scores
- `status` - LIVE/ENDED/UPCOMING
- `winner` - Winner name
- `batting_team` - Cricket: team_a or team_b
- `current_set` - Volleyball/Throwball set number
- `show_score` - Boolean

---

## 📱 Browser Support

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel / Netlify / GitHub Pages

---

## 📝 Files

### **Essential:**
- `index.html` - Main scoreboard
- `admin-final.html` - Admin panel
- `game.html` - Individual game page
- `styles.css` - All styling
- `supabase.js` - Database connection

### **Documentation:**
- `README.md` - This file
- `DEPLOYMENT.md` - Deployment guide
- `CRICKET_RULES.md` - Cricket scoring rules
- `TESTING_GUIDE.md` - Testing instructions

### **Optional (can delete):**
- `test-colors.html` - Color test page
- `admin.html` - Old admin panel
- `*.md` files - Documentation

---

## 🎯 Usage

### **For Viewers:**
1. Open main scoreboard
2. View live scores
3. Click cards for details

### **For Admins:**
1. Open admin panel
2. Enter password
3. Select game
4. Update scores
5. Changes auto-save

---

## 🆘 Troubleshooting

### **Colors not showing:**
- Hard refresh: `Ctrl + Shift + R`

### **Supabase errors:**
- Check internet connection
- Verify API keys in `supabase.js`

### **Admin panel not working:**
- Check password
- Clear browser cache

---

## 📊 Performance

- **Auto-refresh**: 3 seconds
- **Load time**: < 2 seconds
- **Mobile optimized**: Yes
- **Offline support**: No (requires internet)

---

## 🎉 Credits

**Created by:** Palak Mallani  
**Version:** 2.0  
**Last Updated:** January 2026

---

## 📄 License

Free to use for educational and sports events.

---

**Enjoy your sports scoreboard!** 🏆
