// Text-to-Speech für Emoji-Namen (Deutsch)

const emojiNames = {
    // Gesichter & Emotionen
    '😊': 'Lächeln',
    '😍': 'Herz Augen',
    '😂': 'Lachen',
    '😉': 'Zwinkern',
    '😎': 'Cool',
    '😘': 'Kussmündchen',
    '🤣': 'Tränen lachen',
    '😄': 'Glücklich',
    '😁': 'Strahlen',
    '☺️': 'Zufrieden',
    '🙂': 'Lächeln',
    '🙃': 'Umgedreht',
    '😌': 'Verträumt',
    '🤩': 'Sternaugen',
    '🤔': 'Denken',
    '😢': 'Traurig',
    '😭': 'Weinen',
    '😴': 'Müde',
    '😪': 'Schlafen',
    '😮': 'Erstaunt',
    
    // Herzen & Liebe
    '❤️': 'Rotes Herz',
    '💖': 'Funkelndes Herz',
    '💕': 'Zwei Herzen',
    '💓': 'Schlagendes Herz',
    '💗': 'Wachsendes Herz',
    '🧡': 'Orangenes Herz',
    '💛': 'Gelbes Herz',
    '💚': 'Grünes Herz',
    '💙': 'Blaues Herz',
    '💜': 'Lila Herz',
    '💋': 'Kuss',
    
    // Hände & Gesten
    '👍': 'Daumen hoch',
    '👎': 'Daumen runter',
    '👏': 'Klatschen',
    '👋': 'Winken',
    '👌': 'Okay',
    '✌️': 'Victory',
    '🤞': 'Gekreuzte Finger',
    '🤟': 'Liebe',
    '✊': 'Faust',
    '👊': 'Faust oben',
    '☝️': 'Zeigefinger hoch',
    '👆': 'Nach oben zeigen',
    '🙏': 'Beten',
    '🤝': 'Händeschütteln',
    '✍️': 'Schreiben',
    
    // Tiere
    '🐱': 'Katze',
    '🐶': 'Hund',
    '🐼': 'Panda',
    '🐨': 'Koala',
    '🦁': 'Löwe',
    '🐯': 'Tiger',
    '🐻': 'Bär',
    '🦊': 'Fuchs',
    '🐵': 'Affe',
    '🐸': 'Frosch',
    '🐷': 'Schwein',
    '🐮': 'Kuh',
    '🐴': 'Pferd',
    '🦄': 'Einhorn',
    '🐘': 'Elefant',
    '🦒': 'Giraffe',
    '🐠': 'Fisch',
    '🐬': 'Delfin',
    '🐳': 'Wal',
    '🦋': 'Schmetterling',
    '🐝': 'Biene',
    '🐞': 'Marienkäfer',
    '🐦': 'Vogel',
    '🐧': 'Pinguin',
    '🦉': 'Eule',
    
    // Natur & Wetter
    '🌈': 'Regenbogen',
    '☀️': 'Sonne',
    '🌙': 'Mond',
    '⭐': 'Stern',
    '🌟': 'Glitzer Stern',
    '✨': 'Funkeln',
    '⚡': 'Blitz',
    '🔥': 'Feuer',
    '🌸': 'Blume',
    '🌹': 'Rose',
    '🌻': 'Sonnenblume',
    '🌷': 'Tulpe',
    '🌳': 'Baum',
    '🌴': 'Palme',
    '🌵': 'Kaktus',
    '🍄': 'Pilz',
    '☁️': 'Wolke',
    '🌧️': 'Regen',
    
    // Essen & Trinken
    '🍕': 'Pizza',
    '🍔': 'Burger',
    '🍟': 'Pommes',
    '🌭': 'Hot Dog',
    '🌮': 'Taco',
    '🍣': 'Sushi',
    '🍦': 'Eis',
    '🎂': 'Kuchen',
    '🧁': 'Cupcake',
    '🍩': 'Donut',
    '🍪': 'Keks',
    '🍫': 'Schokolade',
    '🍬': 'Süßigkeiten',
    '🍓': 'Erdbeere',
    '🍎': 'Apfel',
    '🍌': 'Banane',
    '🍉': 'Wassermelone',
    '🍇': 'Trauben',
    '🧃': 'Getränk',
    '☕': 'Kakao',
    
    // Party & Feiern
    '🎉': 'Party',
    '🎁': 'Geschenk',
    '🎈': 'Ballon',
    '🎊': 'Konfetti',
    '👑': 'Krone',
    '🧚': 'Fee',
    '🪄': 'Zauberstab',
    '🔮': 'Kristallkugel',
    '🕯️': 'Kerze',
    '🎆': 'Feuerwerk',
    
    // Sport & Aktivitäten
    '⚽': 'Fußball',
    '🏀': 'Basketball',
    '🎾': 'Tennis',
    '🏐': 'Volleyball',
    '⚾': 'Baseball',
    '🏊': 'Schwimmen',
    '🚴': 'Fahrrad',
    '🛹': 'Skateboard',
    '🏆': 'Trophäe',
    '🏅': 'Medaille',
    
    // Fahrzeuge & Transport
    '🚗': 'Auto',
    '🚓': 'Polizeiauto',
    '🚒': 'Feuerwehr',
    '🚑': 'Krankenwagen',
    '🚌': 'Bus',
    '🚂': 'Zug',
    '✈️': 'Flugzeug',
    '🚀': 'Rakete',
    '🚢': 'Schiff',
    '⛵': 'Boot',
    
    // Kreativ & Bildung
    '🎨': 'Kunst',
    '🎵': 'Musik',
    '🎸': 'Gitarre',
    '🎤': 'Mikrofon',
    '📚': 'Buch',
    '✏️': 'Stift',
    '✂️': 'Schere',
    '📷': 'Kamera',
    '🎬': 'Film',
    '💡': 'Glühbirne'
};

const buttonNames = {
    'saveBtn': 'Gespeichert',
    'newBtn': 'Neuer Text',
    'listBtn': 'Meine Texte',
    'exitBtn': 'Verlassen'
};

function speak(text, fast = false) {
    console.log('🔊 Speaking:', text);
    
    // Try native Android TTS first
    if (window.AndroidAudio && window.AndroidAudio.isAvailable()) {
        console.log('✅ Using native Android TTS');
        window.AndroidAudio.speak(text);
        return;
    }
    
    // Fallback to Web Speech API
    if (!('speechSynthesis' in window)) {
        console.error('Speech Synthesis not supported');
        return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Small delay to ensure cancel completes
    setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        utterance.rate = fast ? 1.2 : 0.9;
        utterance.pitch = 1.3; // Higher for children
        utterance.volume = 1.0;
        
        utterance.onstart = () => console.log('✅ Speech started');
        utterance.onend = () => console.log('✅ Speech ended');
        utterance.onerror = (e) => console.error('❌ Speech error:', e);
        
        window.speechSynthesis.speak(utterance);
    }, fast ? 10 : 50);
}

function speakCharacter(char) {
    // Ignore whitespace and special chars
    if (char === ' ' || char === '\n' || char === '\t') {
        return; // Don't speak whitespace
    }
    
    // Just speak the character itself
    speak(char, true); // Fast mode for typing
}

// Initialize on first user interaction
let ttsInitialized = false;

function initTTS() {
    if (ttsInitialized) return;
    
    console.log('🎤 Initializing TTS...');
    
    // Test if voices are loaded
    const voices = window.speechSynthesis.getVoices();
    console.log('Available voices:', voices.length);
    
    if (voices.length === 0) {
        // Wait for voices to load
        window.speechSynthesis.onvoiceschanged = () => {
            const v = window.speechSynthesis.getVoices();
            console.log('✅ Voices loaded:', v.length);
        };
    }
    
    ttsInitialized = true;
}

// Add to existing app
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 TTS addon loaded');
    
    // Check Android Audio availability
    if (window.AndroidAudio) {
        console.log('✅ AndroidAudio available!');
        console.log('AndroidAudio.isAvailable():', window.AndroidAudio.isAvailable());
    } else {
        console.log('❌ AndroidAudio NOT available - using Web Speech API');
    }
    
    // Initialize on first interaction
    document.body.addEventListener('click', initTTS, { once: true });
    
    // Emoji buttons TTS
    const emojiButtons = document.querySelectorAll('.emoji-btn');
    console.log('Found emoji buttons:', emojiButtons.length);
    
    emojiButtons.forEach((btn, index) => {
        const emoji = btn.textContent.trim();
        const name = emojiNames[emoji];
        
        console.log(`Emoji ${index}: "${emoji}" = "${name}"`);
        
        if (name) {
            // Add TTS AFTER the main click handler (bubble phase)
            btn.addEventListener('click', (e) => {
                console.log(`🎯 Clicked: ${name}`);
                // Small delay so emoji is inserted first
                setTimeout(() => speak(name), 50);
            }, false); // Use bubble phase (runs AFTER app.js handlers)
        }
    });
    
    // Action buttons TTS
    Object.keys(buttonNames).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', (e) => {
                console.log(`🎯 Clicked button: ${buttonNames[btnId]}`);
                speak(buttonNames[btnId]);
            }, true);
        }
    });
    
    console.log('✅ TTS listeners attached');
    
    // Live typing TTS
    const textArea = document.getElementById('textArea');
    if (textArea) {
        let lastLength = 0;
        
        textArea.addEventListener('input', (e) => {
            const currentText = e.target.value;
            const currentLength = currentText.length;
            
            // Only speak when adding characters (not deleting)
            if (currentLength > lastLength) {
                const newChar = currentText[currentLength - 1];
                console.log('⌨️ Typed:', newChar);
                speakCharacter(newChar);
            }
            
            lastLength = currentLength;
        });
        
        console.log('✅ Live typing TTS enabled');
    }
});
