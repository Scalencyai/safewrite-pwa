# SafeWrite - Build-Anleitung

## 🛠️ Voraussetzungen

### PWA Development
- Node.js & npm (optional für lokalen Server)
- Beliebiger Webserver (z.B. `python3 -m http.server`)

### Android Build
- **Android Studio** (neueste Version)
- **JDK 17** oder höher
- **Android SDK** (API Level 34)
- **Gradle** (wird von Android Studio verwaltet)

## 📱 PWA Lokal Testen

### 1. Lokalen Server starten

```bash
cd ~/Development/safewrite-pwa

# Option A: Python
python3 -m http.server 8080

# Option B: Node.js (npx)
npx http-server -p 8080

# Option C: PHP
php -S localhost:8080
```

### 2. Im Browser öffnen

Öffne `http://localhost:8080` in deinem Browser.

### 3. PWA installieren (Chrome/Edge)

1. Öffne die App im Browser
2. Klicke auf das Install-Icon in der Adressleiste
3. Bestätige die Installation

## 🤖 Android APK Bauen

### Schritt 1: Projekt in Android Studio öffnen

1. Öffne **Android Studio**
2. **File → Open** → Wähle den Ordner `~/Development/safewrite-pwa/android`
3. Warte, bis Gradle Sync abgeschlossen ist

### Schritt 2: App-URL konfigurieren

**Wichtig:** Bearbeite folgende Dateien:

#### `android/app/src/main/AndroidManifest.xml`
```xml
<!-- Zeile 32: Ersetze mit deiner Domain -->
<data
    android:scheme="https"
    android:host="your-domain.com" />
```

#### `android/app/src/main/java/com/safewrite/app/MainActivity.java`
```java
// Zeile 15: Ersetze mit deiner URL
private static final String TWA_URL = "https://your-domain.com";
```

### Schritt 3: PWA hosten

Du benötigst eine **gehostete PWA** für TWA:

**Option A: GitHub Pages (kostenlos)**
1. Erstelle ein GitHub Repository
2. Pushe alle PWA-Files (außer `android/` Ordner)
3. Aktiviere GitHub Pages in den Repo-Einstellungen
4. Deine URL: `https://username.github.io/safewrite-pwa/`

**Option B: Netlify/Vercel (kostenlos)**
1. Erstelle Account bei Netlify oder Vercel
2. Verbinde dein Repository oder ziehe Ordner per Drag & Drop
3. Deploy → Du erhältst eine URL

**Option C: Eigene Domain**
- Lade PWA-Files auf deinen Webserver hoch
- Stelle sicher, dass HTTPS aktiviert ist (TWA benötigt HTTPS!)

### Schritt 4: Digital Asset Links (für Production)

Für verifizierte TWA benötigst du eine `assetlinks.json`:

1. Erstelle `/.well-known/assetlinks.json` auf deinem Webserver:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.safewrite.app",
    "sha256_cert_fingerprints": [
      "YOUR_SHA256_FINGERPRINT"
    ]
  }
}]
```

2. SHA256 Fingerprint erstellen:

```bash
# Für Debug-Build (lokal testen)
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

# Für Release-Build
keytool -list -v -keystore path/to/release.keystore -alias your-alias
```

Kopiere den **SHA256** Fingerprint und füge ihn in `assetlinks.json` ein.

### Schritt 5: APK Bauen

#### Debug-Build (zum Testen)

```bash
cd ~/Development/safewrite-pwa/android
./gradlew assembleDebug
```

APK-Ausgabe: `android/app/build/outputs/apk/debug/app-debug.apk`

#### Release-Build (für Production)

1. **Keystore erstellen** (einmalig):

```bash
keytool -genkey -v -keystore safewrite-release.keystore -alias safewrite -keyalg RSA -keysize 2048 -validity 10000
```

2. **Keystore-Konfiguration** in `android/app/build.gradle`:

```gradle
android {
    signingConfigs {
        release {
            storeFile file("../../safewrite-release.keystore")
            storePassword "YOUR_STORE_PASSWORD"
            keyAlias "safewrite"
            keyPassword "YOUR_KEY_PASSWORD"
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            // ... rest bleibt gleich
        }
    }
}
```

3. **Release APK bauen**:

```bash
./gradlew assembleRelease
```

APK-Ausgabe: `android/app/build/outputs/apk/release/app-release.apk`

### Schritt 6: APK auf Gerät installieren

#### Via USB (ADB)

```bash
adb install app-debug.apk
# oder
adb install app-release.apk
```

#### Via Dateiübertragung

1. Kopiere APK auf dein Android-Gerät
2. Öffne die APK mit einem Dateimanager
3. Erlaube Installation aus unbekannten Quellen (falls nötig)
4. Installiere die App

## 🔒 Kiosk-Mode Einrichten

### Methode 1: Screen Pinning (Standard)

1. Öffne SafeWrite App
2. Gehe zu **Android Einstellungen → Sicherheit → Screen Pinning**
3. Aktiviere Screen Pinning
4. Öffne SafeWrite erneut
5. Drücke **Recents-Button** (Übersicht)
6. Tippe auf das SafeWrite-Icon → **Pin**

**Verlassen:** Gleichzeitig Back + Recents drücken → PIN in der App eingeben (Standard: 1234)

### Methode 2: Device Owner (Vollständiger Kiosk)

**Nur für dedizierte Geräte (komplett zurückgesetzt)!**

1. Factory Reset des Geräts
2. Bei Setup: **Ohne Google-Konto einrichten**
3. Via ADB verbinden:

```bash
adb shell dpm set-device-owner com.safewrite.app/.DeviceAdminReceiver
```

4. SafeWrite startet automatisch im Kiosk-Mode

## 🎨 Icons Generieren

Die App benötigt Icons. Verwende einen **PWA Icon Generator**:

1. Besuche: https://realfavicongenerator.net/ oder https://maskable.app/editor
2. Lade ein Logo hoch (512x512 PNG empfohlen)
3. Generiere Icons
4. Speichere:
   - `assets/icon-192.png`
   - `assets/icon-512.png`
   - Android Launcher Icons in `android/app/src/main/res/mipmap-*/`

## 🧪 Testen

### PWA Features Testen

- **Offline-Modus:** Schalte Internet aus, App sollte weiter funktionieren
- **localStorage:** Texte speichern und neu laden
- **PIN-Lock:** Exit-Button testen

### Android Features Testen

- **Fullscreen:** Keine Android-Navigation sichtbar
- **Back-Button:** Sollte blockiert sein
- **Screen Pinning:** Aktivieren und verlassen testen

## 🐛 Troubleshooting

### PWA lädt nicht offline

- Service Worker nicht registriert → Prüfe Browser-Console
- Cache nicht befüllt → Öffne App mindestens einmal online

### TWA zeigt Browser-UI

- Digital Asset Links nicht korrekt konfiguriert
- URL in AndroidManifest falsch
- HTTPS nicht aktiv

### Kiosk-Mode funktioniert nicht

- Screen Pinning nicht aktiviert
- Device Owner nicht gesetzt
- Permissions fehlen

### Gradle Build Fehler

```bash
# Cache löschen
./gradlew clean

# Dependencies aktualisieren
./gradlew --refresh-dependencies
```

## 📦 Deployment Checklist

- [ ] PWA auf HTTPS-Server gehostet
- [ ] `assetlinks.json` konfiguriert
- [ ] URLs in AndroidManifest und MainActivity aktualisiert
- [ ] Icons generiert (PWA + Android)
- [ ] Release Keystore erstellt
- [ ] APK signiert
- [ ] Kiosk-Mode getestet
- [ ] PIN-Lock getestet
- [ ] Offline-Funktionalität getestet

## 🚀 Production Deployment

### Google Play Store (optional)

1. Erstelle Developer-Account ($25 einmalig)
2. Erstelle neue App
3. Lade Release APK hoch (oder AAB Bundle)
4. Füge Screenshots, Beschreibung hinzu
5. Veröffentliche

### Direktverteilung (APK)

- Stelle `app-release.apk` zum Download bereit
- Benutzer müssen "Install from unknown sources" aktivieren
- Einfacher für interne/Family-Nutzung

---

**Fertig!** 🎉 Bei Fragen siehe README.md oder öffne ein Issue.
