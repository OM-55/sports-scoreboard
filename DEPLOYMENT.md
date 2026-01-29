# 🚀 DEPLOYMENT GUIDE

## ✅ **Pre-Deployment Checklist:**

- [x] Colors working (RED=LIVE, GREEN=ENDED, WHITE=UPCOMING)
- [x] Manual innings control for cricket
- [x] Manual set control for volleyball/throwball/handball
- [x] Auto-refresh every 3 seconds
- [x] Admin panel password protected
- [x] Responsive design (mobile + desktop)
- [x] All sports supported

---

## 📦 **Files to Deploy:**

### **Essential Files (MUST DEPLOY):**
```
✅ index.html          - Main scoreboard
✅ admin-final.html    - Admin panel
✅ game.html           - Individual game page
✅ styles.css          - All styling
✅ supabase.js         - Database connection
```

### **Optional Files (Can Delete):**
```
❌ test-colors.html    - Test page (delete)
❌ admin.html          - Old admin (delete)
❌ *.md files          - Documentation (optional)
```

---

## 🔧 **Deployment Steps:**

### **Option 1: Vercel (Recommended - FREE)**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd d:\code\ompro\Score-6
   vercel
   ```

3. **Follow prompts:**
   - Project name: `sports-scoreboard`
   - Framework: `Other`
   - Build command: (leave empty)
   - Output directory: `./`

4. **Done!** You'll get a URL like:
   ```
   https://sports-scoreboard.vercel.app
   ```

---

### **Option 2: Netlify (Also FREE)**

1. **Go to:** https://app.netlify.com/drop

2. **Drag & drop these files:**
   - index.html
   - admin-final.html
   - game.html
   - styles.css
   - supabase.js

3. **Done!** Instant deployment

---

### **Option 3: GitHub Pages**

1. **Create GitHub repo:**
   ```bash
   git init
   git add index.html admin-final.html game.html styles.css supabase.js
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/sports-scoreboard.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repo Settings → Pages
   - Source: `main` branch
   - Save

3. **Access at:**
   ```
   https://YOUR_USERNAME.github.io/sports-scoreboard/
   ```

---

## 🔐 **Security Settings:**

### **Change Admin Password:**
1. Open `admin-final.html`
2. Find line ~30:
   ```javascript
   const ADMIN_PASSWORD = "sports2026";
   ```
3. Change to your password:
   ```javascript
   const ADMIN_PASSWORD = "YourSecurePassword123";
   ```

### **Supabase Security:**
1. Go to Supabase Dashboard
2. Settings → API
3. **Enable RLS** (Row Level Security)
4. **Set policies:**
   - SELECT: Public (anyone can read)
   - UPDATE: Authenticated only
   - INSERT: Authenticated only
   - DELETE: Authenticated only

---

## 📱 **URLs After Deployment:**

```
Main Scoreboard:  https://your-domain.com/
Admin Panel:      https://your-domain.com/admin-final.html
Individual Game:  https://your-domain.com/game.html?id=1
```

---

## 🎯 **Post-Deployment:**

### **1. Test Everything:**
- [ ] Open main scoreboard
- [ ] Hard refresh (Ctrl+Shift+R)
- [ ] Check colors (RED/GREEN/WHITE)
- [ ] Open admin panel
- [ ] Enter password
- [ ] Change a game status
- [ ] Verify scoreboard updates

### **2. Share URLs:**
- **Public:** Main scoreboard URL
- **Admins only:** Admin panel URL + password

### **3. Monitor:**
- Check Supabase dashboard for usage
- Free tier: 500MB database, 2GB bandwidth

---

## 🆘 **Troubleshooting:**

### **Colors not showing:**
- Hard refresh: `Ctrl + Shift + R`
- Clear browser cache

### **Supabase errors:**
- Check API keys in `supabase.js`
- Verify RLS policies
- Check internet connection

### **Admin panel not working:**
- Verify password
- Check browser console (F12)
- Clear session storage

---

## 📊 **Performance:**

- ✅ **Auto-refresh:** 3 seconds
- ✅ **Mobile optimized:** Yes
- ✅ **Browser support:** Chrome, Firefox, Safari, Edge
- ✅ **Load time:** < 2 seconds

---

## 🎉 **You're Ready to Deploy!**

**Recommended:** Use Vercel (easiest, fastest, free)

**Command:**
```bash
vercel
```

**That's it!** 🚀
