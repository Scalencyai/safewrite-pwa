# 🚀 SafeWrite - QUICKSTART (2 Minuten)

```
   ___        __     __        ___ __      
  / __/__ _  / /__  / /    __ / _ |\ \  __
 _\ \/ _ `/ / _ \/ -_)  / // / __ | \ \/  /
/___/\_,_/ /_//_/\__/  _\_,_/_/ |_| /_/\_\ 
                      |___/                 
```

## ⚡ Instant Start

```bash
cd ~/Development/safewrite-pwa
./start-dev.sh
```

➡️ Öffne: **http://localhost:8080**

---

## 📱 Was ist SafeWrite?

Sichere **Kinder-Schreib-App** mit:
- ✨ Große Schrift & bunte UI
- 😊 Emoji-Picker (12 Stück)
- 💾 Auto-Save (localStorage)
- 🔒 PIN-Lock (Standard: 1234)
- 📴 Offline-fähig
- 🤖 Android Kiosk-Mode

---

## 🎯 Quick Actions

### 1️⃣ PWA testen (1 Min)
```bash
./start-dev.sh
# → http://localhost:8080
```

### 2️⃣ Features prüfen (2 Min)
```bash
# Im Browser öffnen:
# http://localhost:8080/test-pwa.html
# → Alle 5 Tests sollten ✅ sein
```

### 3️⃣ Android APK bauen (15 Min)
```bash
# Android Studio öffnen
# File → Open → android/
# Terminal:
cd android
./gradlew assembleDebug
# → APK: app/build/outputs/apk/debug/app-debug.apk
```

---

## 📚 Vollständige Docs

| Dokument | Zweck | Zeit |
|----------|-------|------|
| **[INSTALLATION.md](INSTALLATION.md)** | 📲 Schnellstart & Setup | 5 Min |
| **[BUILD.md](BUILD.md)** | 🛠️ Ausführliche Build-Anleitung | 15 Min |
| **[README.md](README.md)** | 📖 Features & Tech-Details | 10 Min |
| **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** | 📋 Vollständiger Überblick | 5 Min |

---

## 🎨 UI Preview

```
┌─────────────────────────────┐
│  ✨ SafeWrite ✨        🔒  │
├─────────────────────────────┤
│                             │
│  [Textfeld - große Schrift] │
│  Schreib hier deine         │
│  Geschichte... 🌈           │
│                             │
├─────────────────────────────┤
│ 😊 ❤️ 🌈 ⭐ 🎉 🌸          │
│ 🦄 🚀 🎨 🌟 🐱 🐶          │
├─────────────────────────────┤
│ [💾 Speichern] [📝 Neu]    │
│ [📚 Meine Texte]            │
└─────────────────────────────┘
```

---

## ✅ Funktionen

### Schreiben
- [x] Textfeld (1.8rem, Comic Sans)
- [x] 12 Emoji-Buttons
- [x] Auto-Save (30s)

### Speichern
- [x] localStorage (lokal)
- [x] Textliste (öffnen/löschen)
- [x] Offline-Support

### Sicherheit
- [x] PIN-Lock (4-stellig)
- [x] Kiosk-Mode (Android)
- [x] Back-Button blockiert
- [x] Keine Navigation raus

---

## 🔧 Quick Configs

### PIN ändern
```javascript
// Browser-Console (F12)
localStorage.setItem('safewrite_pin', '5678');
```

### Emojis anpassen
```javascript
// Bearbeite: index.html, Zeile 25-36
<button class="emoji-btn">🎈</button>
```

### App-URL (Android)
```java
// MainActivity.java, Zeile 15
private static final String TWA_URL = "https://deine-url.com";
```

---

## 📊 Projekt-Stats

- **Code:** 2,198 Zeilen
- **Dateien:** 28
- **Größe:** 148 KB
- **Docs:** 18 KB
- **Features:** 15+
- **Tests:** 5 automatisch

---

## 🆘 Hilfe?

### Problem: PWA lädt nicht
```bash
# Browser-Cache leeren
Ctrl+Shift+R (Chrome/Firefox)
```

### Problem: Android Build Fehler
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

### Problem: Icons fehlen
```bash
# Siehe: assets/README.md
# → https://realfavicongenerator.net/
```

---

## 🎓 Lern-Ressourcen

1. **PWA Basics:** https://web.dev/progressive-web-apps/
2. **TWA Guide:** https://developer.chrome.com/docs/android/trusted-web-activity/
3. **Kiosk Mode:** https://developer.android.com/work/dpc/dedicated-devices/lock-task-mode

---

## 🎉 Next Steps

1. ✅ **Teste lokal** → `./start-dev.sh`
2. ✅ **Generiere Icons** → `assets/README.md`
3. ✅ **Baue Android-APK** → `BUILD.md`
4. ✅ **Hoste PWA** → GitHub Pages / Netlify
5. ✅ **Veröffentliche** → Google Play / Direkt-APK

---

**Viel Erfolg! 🚀**

*Bei Fragen: Siehe README.md, BUILD.md oder INSTALLATION.md*
