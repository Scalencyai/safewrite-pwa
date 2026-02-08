// SafeWrite App - Kinderfreundliche Version

class SafeWriteApp {
    constructor() {
        this.currentTextId = null;
        this.PIN = '1234'; // Default PIN (can be changed)
        this.autoSaveTimer = null;
        this.lastSaved = null;
        this.init();
    }

    init() {
        this.loadPIN();
        this.setupElements();
        this.setupEventListeners();
        this.startAutoSave();
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
        
        // Create save indicator
        this.createSaveIndicator();
    }

    createSaveIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'save-indicator';
        indicator.id = 'saveIndicator';
        indicator.textContent = '💾 Gespeichert!';
        document.querySelector('.writing-area').appendChild(indicator);
        this.saveIndicator = indicator;
    }

    setupEventListeners() {
        // Emoji buttons with smooth animation
        this.emojiButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.insertEmojiSmooth(btn.textContent);
                this.animateButton(btn);
            });
        });

        // Action buttons
        this.saveBtn.addEventListener('click', () => {
            this.saveText(true);
            this.animateButton(this.saveBtn);
        });
        
        this.newBtn.addEventListener('click', () => {
            this.newText();
            this.animateButton(this.newBtn);
        });
        
        this.listBtn.addEventListener('click', () => {
            this.showSavedList();
            this.animateButton(this.listBtn);
        });
        
        this.closeListBtn.addEventListener('click', () => this.closeSavedList());

        // Exit button (PIN lock)
        this.exitBtn.addEventListener('click', () => {
            this.showPinModal();
            this.animateButton(this.exitBtn);
        });

        // PIN modal
        this.cancelPin.addEventListener('click', () => this.hidePinModal());
        this.confirmPin.addEventListener('click', () => this.verifyPin());

        // PIN input auto-focus and navigation
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
                if (e.key === 'Enter') {
                    this.verifyPin();
                }
            });
        });

        // Textarea change detection for auto-save
        this.textArea.addEventListener('input', () => {
            this.onTextChange();
        });

        // Click outside modal to close
        this.savedList.addEventListener('click', (e) => {
            if (e.target === this.savedList) {
                this.closeSavedList();
            }
        });

        // Prevent accidental exit
        window.addEventListener('beforeunload', (e) => {
            if (this.textArea.value.trim() && !this.lastSaved) {
                e.preventDefault();
                e.returnValue = '';
            }
        });
    }

    animateButton(button) {
        button.style.animation = 'none';
        setTimeout(() => {
            button.style.animation = '';
        }, 10);
    }

    insertEmojiSmooth(emoji) {
        const start = this.textArea.selectionStart;
        const end = this.textArea.selectionEnd;
        const text = this.textArea.value;
        
        // Insert emoji with space if needed
        const beforeText = text.substring(0, start);
        const afterText = text.substring(end);
        const needsSpaceBefore = beforeText.length > 0 && !beforeText.endsWith(' ');
        const needsSpaceAfter = afterText.length > 0 && !afterText.startsWith(' ');
        
        const emojiWithSpaces = (needsSpaceBefore ? ' ' : '') + emoji + (needsSpaceAfter ? ' ' : '');
        
        this.textArea.value = beforeText + emojiWithSpaces + afterText;
        
        const newPosition = start + emojiWithSpaces.length;
        this.textArea.selectionStart = this.textArea.selectionEnd = newPosition;
        this.textArea.focus();
        
        // Trigger auto-save
        this.onTextChange();
    }

    onTextChange() {
        // Clear existing timer
        if (this.autoSaveTimer) {
            clearTimeout(this.autoSaveTimer);
        }
        
        // Set new timer for auto-save (3 seconds after last change)
        this.autoSaveTimer = setTimeout(() => {
            if (this.textArea.value.trim()) {
                this.saveText(false);
            }
        }, 3000);
    }

    saveText(showNotification = true) {
        const text = this.textArea.value.trim();
        if (!text) {
            if (showNotification) {
                this.showNotification('📝 Schreib erst etwas!');
            }
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
        this.lastSaved = Date.now();
        
        // Show save indicator
        this.showSaveIndicator();
        
        if (showNotification) {
            this.showNotification('💾 Gespeichert!');
        }
    }

    showSaveIndicator() {
        this.saveIndicator.classList.add('show');
        setTimeout(() => {
            this.saveIndicator.classList.remove('show');
        }, 2000);
    }

    newText() {
        // Check if there's unsaved content
        const currentText = this.textArea.value.trim();
        
        if (currentText) {
            // Create a custom confirmation dialog
            if (confirm('🆕 Neuen Text starten?\n\nDein aktueller Text wird nicht gelöscht, wenn du ihn gespeichert hast!')) {
                this.textArea.value = '';
                this.currentTextId = null;
                this.lastSaved = null;
                this.textArea.focus();
                this.showNotification('📝 Neuer Text!');
            }
        } else {
            // If empty, just clear and focus
            this.textArea.value = '';
            this.currentTextId = null;
            this.lastSaved = null;
            this.textArea.focus();
        }
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

        const preview = textData.text.substring(0, 100) + (textData.text.length > 100 ? '...' : '');

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

        item.querySelector('.load-btn').addEventListener('click', (e) => {
            this.loadText(textData.id);
            this.animateButton(e.target);
        });
        
        item.querySelector('.delete-btn').addEventListener('click', (e) => {
            this.deleteText(textData.id);
            this.animateButton(e.target);
        });

        return item;
    }

    loadText(id) {
        const texts = this.getSavedTexts();
        const textData = texts.find(t => t.id === id);
        if (textData) {
            this.textArea.value = textData.text;
            this.currentTextId = id;
            this.lastSaved = Date.now();
            this.closeSavedList();
            this.textArea.focus();
            this.showNotification('📖 Text geladen!');
        }
    }

    deleteText(id) {
        if (!confirm('🗑️ Text wirklich löschen?\n\nDieser Schritt kann nicht rückgängig gemacht werden!')) {
            return;
        }

        const texts = this.getSavedTexts();
        const filtered = texts.filter(t => t.id !== id);
        localStorage.setItem('safewrite_texts', JSON.stringify(filtered));
        
        // If deleted text is currently open, clear it
        if (this.currentTextId === id) {
            this.textArea.value = '';
            this.currentTextId = null;
            this.lastSaved = null;
        }
        
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
        setTimeout(() => {
            this.pinInputs[0].focus();
        }, 100);
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
        
        if (enteredPin.length !== 4) {
            this.pinError.textContent = '❌ Bitte alle 4 Ziffern eingeben!';
            this.pinError.classList.remove('hidden');
            return;
        }
        
        if (enteredPin === this.PIN) {
            this.pinError.classList.add('hidden');
            this.showNotification('✅ PIN korrekt! Tschüss! 👋');
            this.hidePinModal();
            
            // In production, this would trigger screen unpinning
            if (window.Android && window.Android.stopLockTask) {
                window.Android.stopLockTask();
            }
            
            // Optional: redirect or close
            setTimeout(() => {
                // window.location.href = 'about:blank';
            }, 1500);
        } else {
            this.pinError.textContent = '❌ Falsche PIN! Versuch es nochmal.';
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

    // Auto-save every 30 seconds if there's content
    startAutoSave() {
        setInterval(() => {
            const text = this.textArea.value.trim();
            if (text && this.currentTextId) {
                // Only auto-save if text has changed since last save
                const texts = this.getSavedTexts();
                const currentSaved = texts.find(t => t.id === this.currentTextId);
                if (!currentSaved || currentSaved.text !== text) {
                    this.saveText(false);
                }
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

        // Prevent context menu on non-textarea elements
        document.addEventListener('contextmenu', (e) => {
            if (e.target !== this.textArea) {
                e.preventDefault();
            }
        });
        
        // Prevent text selection on buttons
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('selectstart', (e) => e.preventDefault());
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
            background: linear-gradient(135deg, #FF6B9D 0%, #FF8AA0 100%);
            color: white;
            padding: 1rem 2rem;
            border-radius: 20px;
            font-size: 1.3rem;
            z-index: 9999;
            animation: slideDown 0.3s ease, fadeOut 0.3s ease 2.7s;
            box-shadow: 0 10px 30px rgba(255, 107, 157, 0.3);
            font-weight: bold;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
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
    console.log('SafeWrite geladen! 🎨');
});

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translate(-50%, -10px);
        }
    }
`;
document.head.appendChild(style);
