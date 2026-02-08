# SafeWrite Demo - So testest du es! 🚀

## Quick Start

```bash
cd ~/Development/safewrite-pwa
python3 -m http.server 8082
```

Dann öffne: **http://localhost:8082**

## Demo-Szenarien

### 1. Grundfunktionen testen
1. **Text schreiben**: Tippe etwas in die Textarea
2. **Emoji hinzufügen**: Klicke auf ein Emoji → es wird smooth eingefügt
3. **Speichern**: Klick auf "💾 Speichern" → Toast erscheint
4. **Auto-Save**: Warte 3 Sekunden → grüner Indikator erscheint

### 2. Liste testen
1. Klick auf **"📚 Meine Texte"**
2. Modal öffnet sich mit Blur-Background
3. Klick auf **"📖 Öffnen"** um einen Text zu laden
4. Klick auf **"🗑️ Löschen"** (mit Bestätigung)

### 3. PIN-Modal testen
1. Klick auf **"🔒"** Button oben rechts
2. PIN-Modal erscheint mit schönem Pop-in
3. Gib **1234** ein → Auto-focus springt weiter
4. Oder klick **"Abbrechen"** zum Schließen

### 4. Neu-Button testen
1. Schreib etwas
2. Klick **"📝 Neu"**
3. Bestätigungsdialog erscheint
4. Textarea wird geleert

### 5. Mobile Testing
1. Öffne Chrome DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Wähle iPhone oder Android
4. Teste Touch-Targets (alle >44px!)

## Design-Features zum Anschauen

### Animationen
- **Titel**: Float-Animation (hoch/runter)
- **Buttons**: Hover = translateY + Shadow
- **Emojis**: Hover = scale + rotate
- **PIN-Modal**: Pop-in Animation
- **Fehler**: Shake-Animation bei falscher PIN
- **Toast**: Slide-down + fade-out

### Farbschema
- **Background**: Rosa-Hellblau Gradient
- **Container**: Weißes Frosted Glass
- **Save-Button**: Mint-Grün Gradient
- **New-Button**: Hellblau Gradient
- **List-Button**: Pfirsich Gradient
- **Exit/PIN**: Rosa Gradient

### UX-Details
- **Auto-spacing** bei Emojis
- **Focus-States** mit schönen Schatten
- **Touch-Feedback** bei allen Buttons
- **Smooth Transitions** überall
- **Blur-Background** bei Modals

## Keyboard-Navigation

- **Tab**: Zwischen Buttons navigieren
- **Enter**: In PIN-Eingabe = Bestätigen
- **Backspace**: In PIN = Zurück zum vorherigen Feld
- **Esc**: (könnte hinzugefügt werden für Modal-Close)

## localStorage Test

```javascript
// Öffne Browser Console (F12)
localStorage.getItem('safewrite_texts') // Zeigt alle gespeicherten Texte
localStorage.getItem('safewrite_pin')   // Zeigt PIN (default: 1234)
```

## Performance Check

- Öffne **Lighthouse** in Chrome DevTools
- Run Audit für:
  - ✅ Performance (sollte >90 sein)
  - ✅ Accessibility (sollte >90 sein)
  - ✅ Best Practices (sollte >90 sein)
  - ✅ PWA (sollte Progressive Web App sein)

## Bekannte "Features"

- **PIN**: Standard ist `1234` (kann in localStorage geändert werden)
- **Auto-Save**: Passiert alle 3 Sek nach letzter Änderung
- **Offline**: Funktioniert offline dank Service Worker
- **Back-Button**: Deaktiviert (verhindert versehentliches Verlassen)

## Screenshots machen

Für Dokumentation:
1. Home Screen (mit Text)
2. Emoji Picker (Hover-State)
3. PIN-Modal (geöffnet)
4. Gespeicherte Texte Liste
5. Mobile View

## Bug Testing Checklist

- [ ] Kann Text schreiben
- [ ] Kann speichern
- [ ] Kann laden
- [ ] Kann löschen
- [ ] PIN funktioniert
- [ ] Auto-Save funktioniert
- [ ] Emojis werden eingefügt
- [ ] Responsive auf Mobile
- [ ] Offline funktioniert
- [ ] Keine Console-Errors

---

**Viel Spaß beim Testen! 🎨**

Falls du Bugs findest, öffne ein Issue auf GitHub!
