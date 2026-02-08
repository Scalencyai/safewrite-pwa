# Assets Folder

## Icons benötigt

Für die vollständige Funktionalität benötigst du folgende Icons:

### PWA Icons
- `icon-192.png` (192x192 px)
- `icon-512.png` (512x512 px)

### Android Launcher Icons
- `android/app/src/main/res/mipmap-mdpi/ic_launcher.png` (48x48)
- `android/app/src/main/res/mipmap-hdpi/ic_launcher.png` (72x72)
- `android/app/src/main/res/mipmap-xhdpi/ic_launcher.png` (96x96)
- `android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png` (144x144)
- `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` (192x192)

## Icon Generierung

### Option 1: Online Tool (einfachste Methode)

Besuche **https://realfavicongenerator.net/** oder **https://maskable.app/editor**:

1. Lade `icon.svg` (in diesem Ordner) hoch
2. Konfiguriere Einstellungen
3. Download Package
4. Entpacke und kopiere Icons in die entsprechenden Ordner

### Option 2: ImageMagick (CLI)

```bash
# Von SVG zu PNG
convert icon.svg -resize 192x192 icon-192.png
convert icon.svg -resize 512x512 icon-512.png

# Android Launcher Icons
convert icon.svg -resize 48x48 ../android/app/src/main/res/mipmap-mdpi/ic_launcher.png
convert icon.svg -resize 72x72 ../android/app/src/main/res/mipmap-hdpi/ic_launcher.png
convert icon.svg -resize 96x96 ../android/app/src/main/res/mipmap-xhdpi/ic_launcher.png
convert icon.svg -resize 144x144 ../android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png
convert icon.svg -resize 192x192 ../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
```

### Option 3: Eigenes Design

Erstelle deine eigenen Icons mit einem Grafik-Tool:
- **Figma** (kostenlos, online)
- **Inkscape** (kostenlos, Desktop)
- **Adobe Illustrator** (kostenpflichtig)

**Empfehlung:** Nutze bunte, kinderfreundliche Farben und einfache Formen!

## Temporary Placeholder

Bis du echte Icons hast, verwendet die App ein Text-basiertes Fallback. Die App funktioniert auch ohne Icons, aber sie sehen besser aus mit welchen! 😊
