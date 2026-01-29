# 🗑️ File Cleanup Guide

## ✅ **Files to KEEP** (Active/In Use)

### **Main Application Files:**
1. **`index.html`** - Main scoreboard (shows all games)
2. **`game.html`** - Individual game page (clickable from scoreboard)
3. **`admin-final.html`** - Admin panel with password protection
4. **`supabase.js`** - JavaScript for scoreboard updates
5. **`styles.css`** - Styles for main scoreboard

### **Documentation Files:**
6. **`TESTING_GUIDE.md`** - How to test the application
7. **`CRICKET_RULES.md`** - Complete cricket scoring rules
8. **`ADMIN_UPDATES.md`** - Admin panel features
9. **`SECURITY_AND_NAVIGATION.md`** - Password & navigation guide
10. **`GAME_PAGE_DEBUG.md`** - Debugging individual game pages
11. **`ADD_BATTING_COLUMN.md`** - Database setup instructions
12. **`DATABASE_SCHEMA_FIX.md`** - Database schema reference

---

## ❌ **Files to DELETE** (Obsolete/Replaced)

### **Old Admin Panels:**
1. **`admin.html`** ❌ - Replaced by `admin-final.html`
2. **`admin2.html`** ❌ - Old version
3. **`manager.html`** ❌ - Old manager version
4. **`cricket-manager.html`** ❌ - Replaced by `admin-final.html`

### **Old Individual Sport Pages:**
5. **`cricket-boys.html`** ❌ - Replaced by `game.html?id=1`
6. **`cricket-girls.html`** ❌ - Replaced by `game.html?id=2`
7. **`volleyball-boys.html`** ❌ - Replaced by `game.html?id=3`
8. **`throwball-girls.html`** ❌ - Replaced by `game.html?id=X`
9. **`musical-chairs.html`** ❌ - Replaced by `game.html?id=X`
10. **`relay.html`** ❌ - Replaced by `game.html?id=X`
11. **`tug-of-war.html`** ❌ - Replaced by `game.html?id=X`

### **Test/Debug Files:**
12. **`simple-test.html`** ❌ - Testing file, no longer needed
13. **`test-connection.html`** ❌ - Connection test, no longer needed
14. **`decode-jwt.html`** ❌ - JWT decoder, no longer needed

---

## 📊 **Summary:**

- **Keep:** 12 files (5 app files + 7 documentation files)
- **Delete:** 14 files (4 old admin + 7 old sport pages + 3 test files)

---

## 🔧 **How to Delete:**

### **Option 1: Delete via File Explorer**
1. Open `d:\code\ompro\Score-6` in File Explorer
2. Select the files listed above
3. Press Delete

### **Option 2: Delete via Command Line**
Run these commands in PowerShell:

```powershell
cd d:\code\ompro\Score-6

# Delete old admin panels
Remove-Item admin.html, admin2.html, manager.html, cricket-manager.html

# Delete old sport pages
Remove-Item cricket-boys.html, cricket-girls.html, volleyball-boys.html, throwball-girls.html, musical-chairs.html, relay.html, tug-of-war.html

# Delete test files
Remove-Item simple-test.html, test-connection.html, decode-jwt.html
```

---

## ✅ **After Cleanup, Your Project Will Have:**

```
Score-6/
├── index.html                      # Main scoreboard
├── game.html                       # Individual game page
├── admin-final.html                # Admin panel
├── supabase.js                     # Scoreboard logic
├── styles.css                      # Styles
├── TESTING_GUIDE.md                # Documentation
├── CRICKET_RULES.md
├── ADMIN_UPDATES.md
├── SECURITY_AND_NAVIGATION.md
├── GAME_PAGE_DEBUG.md
├── ADD_BATTING_COLUMN.md
└── DATABASE_SCHEMA_FIX.md
```

**Total:** 12 clean, organized files! 🎉

---

## 🚨 **Important:**

Before deleting, make sure:
1. ✅ `admin-final.html` works properly (password: `sports2026`)
2. ✅ `game.html` loads individual games correctly
3. ✅ `index.html` shows all games and is clickable

**Once confirmed, you can safely delete the old files!**
