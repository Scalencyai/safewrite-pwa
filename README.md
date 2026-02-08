# ✨ SafeWrite - Kinder-Schreib-App mit Kiosk-Mode

Eine sichere, kinderfreundliche Schreib-App als Progressive Web App (PWA) mit Android Trusted Web Activity (TWA) Wrapper und Kiosk-Mode.

![SafeWrite](https://img.shields.io/badge/PWA-Enabled-blue)
![Android](https://img.shields.io/badge/Android-API%2023+-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 Features

### 📝 PWA Core
- **Einfache Schreib-Oberfläche** mit großer, kinderfreundlicher Schrift
- **Emoji-Picker** mit den wichtigsten Emojis (12 Stück)
- **Lokaler Speicher** (localStorage) - alle Texte bleiben auf dem Gerät
- **Offline-First** mit Service Worker - funktioniert ohne Internet
- **Bunte, kinderfreundliche UI** in Comic Sans mit Gradient-Hintergrund
- **Auto-Save** alle 30 Sekunden
- **Gespeicherte Texte** verwalten (öffnen, löschen)

### 🔒 Kiosk-Mode
- **PIN-Lock** (4-stellig, Standard: 1234) zum Verlassen der App
- **Screen Pinning** Support für Android
- **Fullscreen-Mode** - keine Browser-UI sichtbar
- **Back-Button blockiert** - keine ungewollte Navigation
- **Keine externe Navigation** möglich

### 📱 Android Wrapper (TWA)
- **Trusted Web Activity** - native Android-App
- **Offline-Support** out of the box
- **Keine Browser-UI** - fühlt sich wie native App an
- **Kiosk-Mode Integration** via Android APIs

## 🚀 Schnellstart

### 1. PWA lokal testen

```bash
cd ~/Development/safewrite-pwa
python3 -m http.server 8080
```

Öffne: `http://localhost:8080`

### 2. Android APK bauen

Siehe ausführliche Anleitung in **[BUILD.md](BUILD.md)**

```bash
cd android
./gradlew assembleDebug
```

APK: `android/app/build/outputs/apk/debug/app-debug.apk`

## 📂 Projektstruktur

```
safewrite-pwa/
├── index.html              # Haupt-HTML
├── styles.css              # Styling (Comic Sans, Gradients)
├── app.js                  # JavaScript-Logik
├── service-worker.js       # Offline-Support
├── manifest.json           # PWA-Manifest
├── assets/                 # Icons & Bilder
│   ├── icon-192.png
│   └── icon-512.png
├── android/                # Android TWA Wrapper
│   ├── app/
│   │   ├── build.gradle
│   │   └── src/
│   │       └── main/
│   │           ├── AndroidManifest.xml
│   │           ├── java/com/safewrite/app/
│   │           │   └── MainActivity.java
│   │           └── res/
│   ├── build.gradle
│   └── settings.gradle
├── BUILD.md                # Ausführliche Build-Anleitung
└── README.md               # Diese Datei
```

## 🎨 UI/UX Features

### Design
- **Gradient Background:** Lila-Pink (#667eea → #764ba2)
- **Große Schrift:** 1.8rem im Textfeld (gut lesbar für Kinder)
- **Comic Sans Font:** Kinderfreundlich und verspielt
- **Bunte Action-Buttons:** Farbige Gradients (Grün, Blau, Pink)
- **Emoji-Grid:** 6 Spalten, große Touch-Targets

### Interaktion
- **Touch-optimiert:** Große Buttons (min. 44x44px)
- **Visuelles Feedback:** Buttons skalieren bei Touch
- **Toast-Notifications:** Kurze Bestätigungen ("Gespeichert!", "Gelöscht!")
- **Modal-Dialoge:** PIN-Eingabe, Textliste

## 🔧 Konfiguration

### PIN ändern

Bearbeite `app.js`, Zeile 4:

```javascript
this.PIN = '1234'; // Ändere auf deinen PIN
```

Oder speichere im Browser:

```javascript
localStorage.setItem('safewrite_pin', '5678');
```

### App-URL anpassen (Android)

**AndroidManifest.xml:**
```xml
<data android:scheme="https" android:host="deine-domain.com" />
```

**MainActivity.java:**
```java
private static final String TWA_URL = "https://deine-domain.com";
```

### Emojis anpassen

Bearbeite `index.html`, Zeile 25-36:

```html
<button class="emoji-btn">😊</button>
<button class="emoji-btn">🎈</button>
<!-- Füge mehr hinzu oder ersetze vorhandene -->
```

## 🛠️ Tech Stack

| Technologie | Version | Zweck |
|------------|---------|-------|
| HTML5 | - | Struktur |
| CSS3 | - | Styling (Gradients, Flexbox, Grid) |
| Vanilla JavaScript | ES6+ | Logik & State Management |
| Service Worker | - | Offline-Support |
| localStorage API | - | Datenpersistenz |
| PWA Manifest | - | Installierbarkeit |
| Android TWA | API 23+ | Native App Wrapper |
| Gradle | 8.1.0 | Build-System |
| AndroidBrowserHelper | 2.5.0 | TWA Library |

## 📱 Browser-Support

### PWA (Web)
- ✅ Chrome/Edge 80+
- ✅ Safari 11.1+ (iOS)
- ✅ Firefox 90+
- ✅ Samsung Internet 5+

### Android TWA
- ✅ Android 6.0+ (API 23)
- ✅ Chrome 72+ (für TWA-Support)

## 🔒 Sicherheit & Datenschutz

- **Keine Server-Kommunikation** - alle Daten bleiben lokal
- **Kein Tracking** - keine Analytics, keine Cookies
- **Kein Internet erforderlich** (nach erstem Laden)
- **PIN-Schutz** zum Verlassen der App
- **localStorage** statt Cloud - Daten verlassen nie das Gerät

## 🧪 Testing

### PWA Features
```bash
# Test Offline-Mode
# 1. Öffne App online
# 2. Chrome DevTools → Network → Offline
# 3. App sollte weiter funktionieren
```

### Android Kiosk-Mode
1. Installiere APK
2. Aktiviere Screen Pinning in Android-Einstellungen
3. Öffne SafeWrite
4. Pin die App über Recents-Button
5. Versuche zu verlassen → PIN-Dialog erscheint

## 📋 Roadmap / Ideen

- [ ] Cloud-Backup (optional, mit Eltern-PIN)
- [ ] Mehr Emojis / Kategorien
- [ ] Textformatierung (Fett, Kursiv)
- [ ] Zeichenfunktion
- [ ] Mehrsprachigkeit (EN, FR, etc.)
- [ ] Tablet-optimiertes Layout
- [ ] Themes (Hell/Dunkel)
- [ ] Diktier-Funktion
- [ ] Export als PDF

## 🐛 Bekannte Issues

- **iOS PWA:** Screen Pinning nicht verfügbar (iOS-Limitierung)
- **Back-Button:** In Browser-PWA schwer zu blockieren (funktioniert in TWA)
- **Emoji-Support:** Ältere Android-Versionen zeigen manche Emojis nicht

## 🤝 Contributing

Pull Requests willkommen!

1. Fork das Projekt
2. Erstelle Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit Changes (`git commit -m 'Add AmazingFeature'`)
4. Push Branch (`git push origin feature/AmazingFeature`)
5. Öffne Pull Request

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE) (noch zu erstellen)

## 👨‍💻 Autor

Entwickelt für sichere, kindgerechte Schreib-Erfahrungen.

## 🙏 Credits

- **androidbrowserhelper** von Google
- **Comic Sans MS** Font
- Emoji-Support via System-Fonts

## 📞 Support

Bei Fragen oder Problemen:
- Siehe **[BUILD.md](BUILD.md)** für ausführliche Anleitungen
- Öffne ein Issue auf GitHub
- Prüfe die Browser-Console für Fehler

---

**Viel Spaß beim Schreiben! ✨📝**
