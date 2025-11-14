// Audio Control UI Component
class AudioControlUI {
    constructor(containerSelector = 'body') {
        this.container = document.querySelector(containerSelector);
        this.isOpen = false;
        this.init();
    }
    
    init() {
        this.createAudioButton();
        this.createAudioPanel();
        this.bindEvents();
    }
    
    createAudioButton() {
        // Create floating audio button
        this.audioButton = document.createElement('button');
        this.audioButton.className = 'audio-control-btn';
        this.audioButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        this.audioButton.title = 'Audio Settings';
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .audio-control-btn {
                position: fixed;
                top: 80px;
                right: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, #6a11cb, #2575fc);
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                z-index: 1000;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                transition: all 0.3s ease;
            }
            
            .audio-control-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 25px rgba(106, 17, 203, 0.4);
            }
            
            /* Responsive positioning for different screen sizes */
            @media (max-width: 768px) {
                .audio-control-btn {
                    top: 70px;
                    right: 15px;
                    width: 45px;
                    height: 45px;
                    font-size: 16px;
                }
                .audio-panel {
                    top: 125px;
                    right: 15px;
                    width: 280px;
                }
            }
            
            /* Special positioning for game pages */
            body:not(.home-page) .audio-control-btn {
                top: 90px;
            }
            
            body:not(.home-page) .audio-panel {
                top: 150px;
            }
            
            .audio-panel {
                position: fixed;
                top: 140px;
                right: 20px;
                width: 300px;
                background: linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95));
                border: 1px solid rgba(147, 51, 234, 0.3);
                border-radius: 16px;
                padding: 20px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                backdrop-filter: blur(20px);
                z-index: 999;
                transform: translateX(320px);
                transition: transform 0.3s ease;
                color: #e2e8f0;
            }
            
            .audio-panel.open {
                transform: translateX(0);
            }
            
            .audio-section {
                margin-bottom: 20px;
            }
            
            .audio-section h3 {
                font-size: 14px;
                font-weight: 600;
                margin-bottom: 12px;
                color: #a855f7;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .audio-toggle {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 10px;
            }
            
            .toggle-switch {
                position: relative;
                width: 50px;
                height: 24px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            
            .toggle-switch.active {
                background: linear-gradient(135deg, #6a11cb, #2575fc);
            }
            
            .toggle-slider {
                position: absolute;
                top: 2px;
                left: 2px;
                width: 20px;
                height: 20px;
                background: white;
                border-radius: 50%;
                transition: transform 0.3s ease;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }
            
            .toggle-switch.active .toggle-slider {
                transform: translateX(26px);
            }
            
            .volume-control {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 10px;
            }
            
            .volume-slider {
                flex: 1;
                height: 4px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 2px;
                outline: none;
                cursor: pointer;
                -webkit-appearance: none;
            }
            
            .volume-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 16px;
                height: 16px;
                background: linear-gradient(135deg, #6a11cb, #2575fc);
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            
            .volume-slider::-moz-range-thumb {
                width: 16px;
                height: 16px;
                background: linear-gradient(135deg, #6a11cb, #2575fc);
                border-radius: 50%;
                border: none;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            
            .music-selector {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
                margin-top: 10px;
            }
            
            .music-option {
                padding: 8px 12px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                cursor: pointer;
                text-align: center;
                font-size: 12px;
                transition: all 0.3s ease;
            }
            
            .music-option:hover {
                background: rgba(147, 51, 234, 0.2);
                border-color: rgba(147, 51, 234, 0.5);
            }
            
            .music-option.active {
                background: linear-gradient(135deg, #6a11cb, #2575fc);
                border-color: transparent;
                color: white;
            }
        `;
        
        document.head.appendChild(style);
        this.container.appendChild(this.audioButton);
    }
    
    createAudioPanel() {
        this.audioPanel = document.createElement('div');
        this.audioPanel.className = 'audio-panel';
        
        this.audioPanel.innerHTML = `
            <div class="audio-section">
                <h3><i class="fas fa-volume-up"></i> Volume Controls</h3>
                
                <div class="audio-toggle">
                    <span>Master Audio</span>
                    <div class="toggle-switch" id="masterToggle">
                        <div class="toggle-slider"></div>
                    </div>
                </div>
                
                <div class="volume-control">
                    <i class="fas fa-volume-down"></i>
                    <input type="range" class="volume-slider" id="masterVolume" min="0" max="100" value="70">
                    <i class="fas fa-volume-up"></i>
                </div>
            </div>
            
            <div class="audio-section">
                <h3><i class="fas fa-music"></i> Background Music</h3>
                
                <div class="audio-toggle">
                    <span>Music</span>
                    <div class="toggle-switch" id="musicToggle">
                        <div class="toggle-slider"></div>
                    </div>
                </div>
                
                <div class="volume-control">
                    <i class="fas fa-volume-down"></i>
                    <input type="range" class="volume-slider" id="musicVolume" min="0" max="100" value="50">
                    <i class="fas fa-volume-up"></i>
                </div>
                
                <div class="music-selector">
                    <div class="music-option active" data-track="ambient">Ambient</div>
                    <div class="music-option" data-track="upbeat">Upbeat</div>
                    <div class="music-option" data-track="chill">Chill</div>
                    <div class="music-option" data-track="focus">Focus</div>
                </div>
            </div>
            
            <div class="audio-section">
                <h3><i class="fas fa-bell"></i> Sound Effects</h3>
                
                <div class="audio-toggle">
                    <span>SFX</span>
                    <div class="toggle-switch" id="sfxToggle">
                        <div class="toggle-slider"></div>
                    </div>
                </div>
                
                <div class="volume-control">
                    <i class="fas fa-volume-down"></i>
                    <input type="range" class="volume-slider" id="sfxVolume" min="0" max="100" value="80">
                    <i class="fas fa-volume-up"></i>
                </div>
            </div>
        `;
        
        this.container.appendChild(this.audioPanel);
    }
    
    bindEvents() {
        // Toggle panel
        this.audioButton.addEventListener('click', () => {
            this.togglePanel();
        });
        
        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.audioPanel.contains(e.target) && !this.audioButton.contains(e.target)) {
                this.closePanel();
            }
        });
        
        // Toggle switches
        document.getElementById('masterToggle').addEventListener('click', () => {
            this.toggleMaster();
        });
        
        document.getElementById('musicToggle').addEventListener('click', () => {
            if (window.gameAudio) {
                window.gameAudio.toggle('music');
                this.updateUI();
            }
        });
        
        document.getElementById('sfxToggle').addEventListener('click', () => {
            if (window.gameAudio) {
                window.gameAudio.toggle('sfx');
                this.updateUI();
            }
        });
        
        // Volume sliders
        document.getElementById('masterVolume').addEventListener('input', (e) => {
            if (window.gameAudio) {
                window.gameAudio.setVolume('master', e.target.value / 100);
                this.updateUI();
            }
        });
        
        document.getElementById('musicVolume').addEventListener('input', (e) => {
            if (window.gameAudio) {
                window.gameAudio.setVolume('music', e.target.value / 100);
                this.updateUI();
            }
        });
        
        document.getElementById('sfxVolume').addEventListener('input', (e) => {
            if (window.gameAudio) {
                window.gameAudio.setVolume('sfx', e.target.value / 100);
                this.updateUI();
            }
        });
        
        // Music selection
        this.audioPanel.querySelectorAll('.music-option').forEach(option => {
            option.addEventListener('click', () => {
                const track = option.dataset.track;
                this.selectMusic(track);
                if (window.gameAudio) {
                    window.gameAudio.playMusic(track);
                }
            });
        });
        
        // Initialize UI state
        setTimeout(() => this.updateUI(), 100);
    }
    
    togglePanel() {
        this.isOpen = !this.isOpen;
        this.audioPanel.classList.toggle('open', this.isOpen);
    }
    
    closePanel() {
        this.isOpen = false;
        this.audioPanel.classList.remove('open');
    }
    
    toggleMaster() {
        if (!window.gameAudio) return;
        
        const settings = window.gameAudio.getSettings();
        const newState = !settings.musicEnabled || !settings.sfxEnabled;
        
        window.gameAudio.toggle('music');
        window.gameAudio.toggle('sfx');
        
        // Update both toggles to same state
        setTimeout(() => this.updateUI(), 50);
    }
    
    selectMusic(track) {
        this.audioPanel.querySelectorAll('.music-option').forEach(option => {
            option.classList.remove('active');
        });
        
        this.audioPanel.querySelector(`[data-track="${track}"]`).classList.add('active');
    }
    
    updateUI() {
        if (!window.gameAudio) return;
        
        const settings = window.gameAudio.getSettings();
        
        // Update toggles
        document.getElementById('masterToggle').classList.toggle('active', 
            settings.musicEnabled && settings.sfxEnabled);
        document.getElementById('musicToggle').classList.toggle('active', settings.musicEnabled);
        document.getElementById('sfxToggle').classList.toggle('active', settings.sfxEnabled);
        
        // Update sliders
        document.getElementById('masterVolume').value = settings.masterVolume * 100;
        document.getElementById('musicVolume').value = settings.musicVolume * 100;
        document.getElementById('sfxVolume').value = settings.sfxVolume * 100;
        
        // Update music selection
        this.selectMusic(settings.currentMusic);
        
        // Update main button icon
        const allMuted = !settings.musicEnabled && !settings.sfxEnabled;
        this.audioButton.innerHTML = allMuted ? 
            '<i class="fas fa-volume-mute"></i>' : 
            '<i class="fas fa-volume-up"></i>';
    }
}

// Auto-initialize audio controls when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for gameAudio to be available
    const initializeAudioUI = () => {
        if (window.gameAudio) {
            window.audioUI = new AudioControlUI();
            
            // Start music automatically when user first interacts with the page
            const startMusicOnInteraction = () => {
                if (window.gameAudio) {
                    // Test sound to ensure audio system is working
                    window.gameAudio.playSound('click');
                    
                    // Start the current music track
                    const settings = window.gameAudio.getSettings();
                    if (settings.musicEnabled) {
                        window.gameAudio.playMusic(settings.currentMusic);
                    }
                }
                
                // Remove listeners after first interaction
                document.removeEventListener('click', startMusicOnInteraction);
                document.removeEventListener('keydown', startMusicOnInteraction);
            };
            
            document.addEventListener('click', startMusicOnInteraction);
            document.addEventListener('keydown', startMusicOnInteraction);
        } else {
            // Retry after a short delay if gameAudio is not ready yet
            setTimeout(initializeAudioUI, 100);
        }
    };
    
    initializeAudioUI();
});