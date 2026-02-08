// SafeWrite App - Main JavaScript

class SafeWriteApp {
    constructor() {
        this.currentTextId = null;
        this.PIN = '1234'; // Default PIN (can be changed)
        this.init();
    }

    init() {
        this.loadPIN();
        this.setupElements();
        this.setupEventListeners();
        this.autoSave();
        this.preventNavigation();
        this.registerServiceWorker();
        this.requestKioskMode();
    }

    setupElements() {
        this.textArea = document.getElementById('textArea');
        this.exitBtn = document.getElementById('exitBtn');
        this.saveBtn = document.getElementById('saveBtn');
        this.newBtn = document.getElementById('newBtn');
        this.listBtn = document.getElementById('listBtn');
        this.savedList = document.getElementById('savedList');
        this.listContent = document.getElementById('listContent');
        this.closeListBtn = document.getElementById('closeListBtn');
        this.pinModal = document.getElementById('pinModal');
        this.pinInputs = [
            document.getElementById('pin1'),
            document.getElementById('pin2'),
            document.getElementById('pin3'),
            document.getElementById('pin4')
        ];
        this.cancelPin = document.getElementById('cancelPin');
        this.confirmPin = document.getElementById('confirmPin');
        this.pinError = document.getElementById('pinError');
        this.emojiButtons = document.querySelectorAll('.emoji-btn');
    }

    setupEventListeners() {
        // Emoji buttons
        this.emojiButtons.forEach(btn => {
            btn.addEventListener('click', () => this.insertEmoji(btn.textContent));
        });

        // Action buttons
        this.saveBtn.addEventListener('click', () => this.saveText());
        this.newBtn.addEventListener('click', () => this.newText());
        this.listBtn.addEventListener('click', () => this.showSavedList());
        this.closeListBtn.addEventListener('click', () => this.closeSavedList());

        // Exit button (PIN lock)
        this.exitBtn.addEventListener('click', () => this.showPinModal());

        // PIN modal
        this.cancelPin.addEventListener('click', () => this.hidePinModal());
        this.confirmPin.addEventListener('click', () => this.verifyPin());

        // PIN input auto-focus
        this.pinInputs.forEach((input, index) => {
            input.addEventListener('input', () => {
                if (input.value.length === 1 && index < 3) {
                    this.pinInputs[index + 1].focus();
                }
            });
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && input.value === '' && index > 0) {
                    this.pinInputs[index - 1].focus();
                }
            });
        });

        // Prevent accidental exit
        window.addEventListener('beforeunload', (e) => {
            e.preventDefault();
            e.returnValue = '';
        });
    }

    insertEmoji(emoji) {
        const start = this.textArea.selectionStart;
        const end = this.textArea.selectionEnd;
        const text = this.textArea.value;
        this.textArea.value = text.substring(0, start) + emoji + text.substring(end);
        this.textArea.selectionStart = this.textArea.selectionEnd = start + emoji.length;
        this.textArea.focus();
    }

    saveText() {
        const text = this.textArea.value.trim();
        if (!text) {
            this.showNotification('📝 Schreib erst etwas!');
            return;
        }

        const texts = this.getSavedTexts();
        const textData = {
            id: this.currentTextId || Date.now(),
            text: text,
            date: new Date().toISOString()
        };

        const existingIndex = texts.findIndex(t => t.id === textData.id);
        if (existingIndex >= 0) {
            texts[existingIndex] = textData;
        } else {
            texts.unshift(textData);
        }

        localStorage.setItem('safewrite_texts', JSON.stringify(texts));
        this.currentTextId = textData.id;
        this.showNotification('💾 Gespeichert!');
    }

    newText() {
        if (this.textArea.value.trim() && !confirm('Neuen Text starten? (Aktueller Text wird nicht gespeichert, wenn du ihn nicht gespeichert hast)')) {
            return;
        }
        this.textArea.value = '';
        this.currentTextId = null;
        this.textArea.focus();
    }

    showSavedList() {
        const texts = this.getSavedTexts();
        this.listContent.innerHTML = '';

        if (texts.length === 0) {
            this.listContent.innerHTML = '<div class="empty-state">Noch keine Texte gespeichert! 📝</div>';
        } else {
            texts.forEach(textData => {
                const item = this.createTextItem(textData);
                this.listContent.appendChild(item);
            });
        }

        this.savedList.classList.remove('hidden');
    }

    createTextItem(textData) {
        const item = document.createElement('div');
        item.className = 'text-item';

        const date = new Date(textData.date).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const preview = textData.text.substring(0, 150) + (textData.text.length > 150 ? '...' : '');

        item.innerHTML = `
            <div class="text-item-header">
                <span class="text-date">${date}</span>
            </div>
            <div class="text-preview">${this.escapeHtml(preview)}</div>
            <div class="text-actions">
                <button class="load-btn" data-id="${textData.id}">📖 Öffnen</button>
                <button class="delete-btn" data-id="${textData.id}">🗑️ Löschen</button>
            </div>
        `;

        item.querySelector('.load-btn').addEventListener('click', () => this.loadText(textData.id));
        item.querySelector('.delete-btn').addEventListener('click', () => this.deleteText(textData.id));

        return item;
    }

    loadText(id) {
        const texts = this.getSavedTexts();
        const textData = texts.find(t => t.id === id);
        if (textData) {
            this.textArea.value = textData.text;
            this.currentTextId = id;
            this.closeSavedList();
            this.textArea.focus();
        }
    }

    deleteText(id) {
        if (!confirm('Text wirklich löschen? 🗑️')) return;

        const texts = this.getSavedTexts();
        const filtered = texts.filter(t => t.id !== id);
        localStorage.setItem('safewrite_texts', JSON.stringify(filtered));
        this.showSavedList(); // Refresh list
        this.showNotification('🗑️ Gelöscht!');
    }

    closeSavedList() {
        this.savedList.classList.add('hidden');
    }

    getSavedTexts() {
        const stored = localStorage.getItem('safewrite_texts');
        return stored ? JSON.parse(stored) : [];
    }

    // PIN Lock System
    showPinModal() {
        this.pinModal.classList.remove('hidden');
        this.pinInputs[0].focus();
        this.clearPinInputs();
        this.pinError.classList.add('hidden');
    }

    hidePinModal() {
        this.pinModal.classList.add('hidden');
        this.clearPinInputs();
    }

    clearPinInputs() {
        this.pinInputs.forEach(input => input.value = '');
    }

    verifyPin() {
        const enteredPin = this.pinInputs.map(input => input.value).join('');
        
        if (enteredPin === this.PIN) {
            this.pinError.classList.add('hidden');
            // Successful PIN - allow exit
            alert('✅ PIN korrekt! Du kannst jetzt SafeWrite verlassen.');
            this.hidePinModal();
            // In production, this would trigger screen unpinning
            if (window.Android && window.Android.stopLockTask) {
                window.Android.stopLockTask();
            }
        } else {
            this.pinError.classList.remove('hidden');
            this.clearPinInputs();
            this.pinInputs[0].focus();
        }
    }

    loadPIN() {
        const storedPin = localStorage.getItem('safewrite_pin');
        if (storedPin) {
            this.PIN = storedPin;
        }
    }

    // Auto-save every 30 seconds
    autoSave() {
        setInterval(() => {
            if (this.textArea.value.trim() && this.currentTextId) {
                this.saveText();
            }
        }, 30000);
    }

    // Prevent navigation
    preventNavigation() {
        // Disable back button
        history.pushState(null, null, location.href);
        window.addEventListener('popstate', () => {
            history.pushState(null, null, location.href);
        });

        // Prevent context menu
        document.addEventListener('contextmenu', (e) => {
            if (e.target !== this.textArea) {
                e.preventDefault();
            }
        });
    }

    // Request Kiosk Mode (Android)
    requestKioskMode() {
        // This will be called by Android WebView
        if (window.Android && window.Android.startLockTask) {
            try {
                window.Android.startLockTask();
            } catch (e) {
                console.log('Kiosk mode not available:', e);
            }
        }

        // Request fullscreen
        this.requestFullscreen();
    }

    requestFullscreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(err => console.log('Fullscreen error:', err));
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    }

    // Service Worker Registration
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./service-worker.js')
                .then(reg => console.log('Service Worker registered:', reg))
                .catch(err => console.log('Service Worker registration failed:', err));
        }
    }

    // Utility
    showNotification(message) {
        // Simple toast notification
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            font-size: 1.2rem;
            z-index: 9999;
            animation: fadeInOut 2s;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new SafeWriteApp();
});

// Add fadeInOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; }
        10%, 90% { opacity: 1; }
    }
`;
document.head.appendChild(style);
