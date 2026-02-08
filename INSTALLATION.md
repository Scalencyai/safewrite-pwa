# 📲 SafeWrite - Installations-Anleitung

## Schnellstart (5 Minuten)

### 1️⃣ PWA im Browser testen

```bash
cd ~/Development/safewrite-pwa
./start-dev.sh
```

➡️ Öffne `http://localhost:8080` im Browser

### 2️⃣ Als PWA installieren (Chrome/Edge)

1. Öffne die App im Browser
2. Adressleiste: **Install-Icon** (➕) klicken
3. **"Installieren"** bestätigen
4. App erscheint auf dem Homescreen/Desktop

### 3️⃣ Android APK bauen (15 Minuten)

#### Voraussetzungen installieren

**macOS:**
```bash
brew install --cask android-studio
```

**Windows:**
Download von https://developer.android.com/studio

**Linux (Ubuntu/Debian):**
```bash
sudo snap install android-studio --classic
```

#### Projekt öffnen

1. Starte **Android Studio**
2. **File → Open** → Wähle `~/Development/safewrite-pwa/android`
3. Warte auf Gradle Sync (~2-5 Min)

#### APK bauen

**Terminal in Android Studio:**
```bash
./gradlew assembleDebug
```

**Oder via GUI:**
- **Build → Build Bundle(s) / APK(s) → Build APK(s)**

APK-Ausgabe:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### 4️⃣ APK auf Android-Gerät installieren

#### Methode A: USB (ADB)

1. **USB-Debugging aktivieren** auf Android:
   - Einstellungen → Über das Telefon → 7x auf Build-Nummer tippen
   - Einstellungen → Entwickleroptionen → USB-Debugging aktivieren

2. **Gerät verbinden** und APK installieren:
```bash
cd ~/Development/safewrite-pwa/android/app/build/outputs/apk/debug
adb install app-debug.apk
```

#### Methode B: Datei übertragen

1. APK auf Gerät kopieren (USB, E-Mail, Cloud)
2. **Dateimanager** öffnen
3. APK antippen
4. **Installation aus unbekannten Quellen erlauben** (falls gefragt)
5. Installieren

### 5️⃣ Kiosk-Mode aktivieren

#### Screen Pinning (empfohlen für normale Nutzung)

1. **Android-Einstellungen öffnen**
2. **Sicherheit → Screen Pinning** aktivieren
3. SafeWrite öffnen
4. **Recents-Button** (Übersicht) drücken
5. Auf **SafeWrite-Icon** tippen → **Pin**

**Verlassen:** Back + Recents gleichzeitig drücken, dann PIN in App eingeben (Standard: 1234)

#### Device Owner Mode (nur dedizierte Geräte)

**⚠️ Nur für komplett zurückgesetzte Geräte! Löscht alle Daten!**

1. **Factory Reset** durchführen
2. Bei Setup: **Überspringen** (kein Google-Konto)
3. SafeWrite APK über ADB installieren
4. Device Owner setzen:

```bash
adb shell dpm set-device-owner com.safewrite.app/.DeviceAdminReceiver
```

5. SafeWrite öffnet automatisch in Kiosk-Mode

## 🔧 Anpassungen (Optional)

### PIN ändern

**Im Browser/PWA:**
```javascript
// Browser-Konsole öffnen (F12)
localStorage.setItem('safewrite_pin', '5678');
```

**Im Code:**
- Bearbeite `app.js`, Zeile 4
- Ändere `this.PIN = '1234';` zu deinem PIN

### App-URL konfigurieren (für Production)

**Hoste die PWA:**
1. Lade PWA-Files auf deinen Webserver (HTTPS erforderlich!)
2. Oder nutze GitHub Pages / Netlify (kostenlos)

**URLs in Android-App anpassen:**

`android/app/src/main/AndroidManifest.xml` (Zeile 32):
```xml
<data android:scheme="https" android:host="deine-domain.com" />
```

`android/app/src/main/java/com/safewrite/app/MainActivity.java` (Zeile 15):
```java
private static final String TWA_URL = "https://deine-domain.com";
```

Dann neu bauen:
```bash
./gradlew assembleDebug
```

### Icons generieren

**Benötigt für professionelles Aussehen:**

1. Besuche https://realfavicongenerator.net/
2. Lade `assets/icon.svg` hoch
3. Konfiguriere Einstellungen
4. Download Package
5. Kopiere Icons nach:
   - `assets/icon-192.png`
   - `assets/icon-512.png`
   - `android/app/src/main/res/mipmap-*/ic_launcher.png`

## 🐛 Problemlösung

### PWA lädt nicht

**Problem:** Service Worker nicht registriert

**Lösung:**
- Browser-Cache leeren (Ctrl+Shift+R)
- Prüfe Browser-Console (F12) auf Fehler

### Android Build fehlgeschlagen

**Problem:** Gradle Fehler

**Lösung:**
```bash
cd ~/Development/safewrite-pwa/android
./gradlew clean
./gradlew --refresh-dependencies
./gradlew assembleDebug
```

### APK Installation blockiert

**Problem:** "Installation aus unbekannten Quellen" blockiert

**Lösung:**
- Einstellungen → Sicherheit → Unbekannte Quellen erlauben
- Oder: Einstellungen → Apps → Chrome/Dateimanager → Installation erlauben

### Kiosk-Mode nicht verfügbar

**Problem:** Screen Pinning-Option fehlt

**Lösung:**
- Nur auf Android 5.0+ verfügbar
- Prüfe: Einstellungen → Sicherheit → Advanced
- Alternative: Device Owner Mode (siehe oben)

### Back-Button funktioniert noch

**Problem:** Im Browser-PWA schwer zu blockieren

**Lösung:**
- Verwende die Android TWA-Version
- Oder: Screen Pinning aktivieren

## 📞 Support

Weitere Hilfe:
- 📖 **[BUILD.md](BUILD.md)** - Ausführliche Build-Anleitung
- 📚 **[README.md](README.md)** - Feature-Übersicht & Tech-Details
- 🐛 GitHub Issues (falls Repository vorhanden)

## ✅ Checkliste

Nach Installation:

- [ ] PWA funktioniert offline
- [ ] Texte werden gespeichert
- [ ] Emojis einfügbar
- [ ] PIN-Lock funktioniert (Exit-Button)
- [ ] Screen Pinning aktivierbar
- [ ] Fullscreen-Mode aktiv
- [ ] Back-Button blockiert (in Android-App)

---

**Viel Erfolg! Bei Fragen siehe BUILD.md oder README.md** 🚀
