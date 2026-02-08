// Text-to-Speech für Emoji-Namen (Deutsch)

const emojiNames = {
    '😊': 'Lächeln',
    '😍': 'Herz Augen',
    '😂': 'Lachen',
    '😉': 'Zwinkern',
    '😎': 'Cool',
    '❤️': 'Herz',
    '💖': 'Funkelndes Herz',
    '💕': 'Zwei Herzen',
    '🌈': 'Regenbogen',
    '☀️': 'Sonne',
    '🌸': 'Blume',
    '🌹': 'Rose',
    '🌳': 'Baum',
    '⭐': 'Stern',
    '🌟': 'Glitzer Stern',
    '✨': 'Funkeln',
    '🎉': 'Party',
    '🎁': 'Geschenk',
    '🎈': 'Ballon',
    '🎂': 'Kuchen',
    '🦄': 'Einhorn',
    '🧚': 'Fee',
    '👑': 'Krone',
    '🐱': 'Katze',
    '🐶': 'Hund',
    '🐼': 'Panda',
    '🐨': 'Koala',
    '🦁': 'Löwe',
    '🐯': 'Tiger',
    '🐻': 'Bär',
    '🐠': 'Fisch',
    '🐬': 'Delfin',
    '🦋': 'Schmetterling',
    '🐝': 'Biene',
    '🐦': 'Vogel',
    '🍕': 'Pizza',
    '🍔': 'Burger',
    '🍦': 'Eis',
    '🍓': 'Erdbeere',
    '🍎': 'Apfel',
    '⚽': 'Ball',
    '🏀': 'Basketball',
    '🚀': 'Rakete',
    '✈️': 'Flugzeug',
    '🚗': 'Auto',
    '🎨': 'Kunst',
    '🎵': 'Musik',
    '📚': 'Buch'
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
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log(`🎯 Clicked: ${name}`);
                speak(name);
            }, true); // Use capture phase
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
