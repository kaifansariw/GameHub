// GameHub Audio System
class GameHubAudio {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.musicGain = null;
        this.sfxGain = null;
        
        // Audio settings (stored in localStorage)
        this.settings = {
            masterVolume: parseFloat(localStorage.getItem('audio_masterVolume')) || 0.9,
            musicVolume: parseFloat(localStorage.getItem('audio_musicVolume')) || 0.7,
            sfxVolume: parseFloat(localStorage.getItem('audio_sfxVolume')) || 0.9,
            musicEnabled: localStorage.getItem('audio_musicEnabled') !== 'false',
            sfxEnabled: localStorage.getItem('audio_sfxEnabled') !== 'false',
            currentMusic: localStorage.getItem('audio_currentMusic') || 'ambient'
        };
        
        // Audio buffers for sound effects
        this.soundBuffers = new Map();
        this.musicTracks = new Map();
        this.currentMusicSource = null;
        
        // Initialize audio context on first user interaction
        this.initialized = false;
        this.initPromise = null;
        
        // Auto-initialize on first user interaction
        this.bindUserInteraction();
    }
    
    // Bind to user interactions to enable audio
    bindUserInteraction() {
        const initOnInteraction = () => {
            this.initializeAudio();
            document.removeEventListener('click', initOnInteraction);
            document.removeEventListener('keydown', initOnInteraction);
            document.removeEventListener('touchstart', initOnInteraction);
        };
        
        document.addEventListener('click', initOnInteraction);
        document.addEventListener('keydown', initOnInteraction);
        document.addEventListener('touchstart', initOnInteraction);
    }
    
    // Initialize Web Audio API context
    async initializeAudio() {
        if (this.initialized) return;
        if (this.initPromise) return this.initPromise;
        
        this.initPromise = (async () => {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
                // Resume audio context if suspended (required by browsers)
                if (this.audioContext.state === 'suspended') {
                    await this.audioContext.resume();
                }
                
                // Create gain nodes for volume control
                this.masterGain = this.audioContext.createGain();
                this.musicGain = this.audioContext.createGain();
                this.sfxGain = this.audioContext.createGain();
                
                // Connect gain nodes
                this.musicGain.connect(this.masterGain);
                this.sfxGain.connect(this.masterGain);
                this.masterGain.connect(this.audioContext.destination);
                
                // Set initial volumes
                this.updateVolumes();
                
                // Load audio assets
                await this.loadAudioAssets();
                
                this.initialized = true;
                console.log('GameHub Audio System initialized');
            } catch (error) {
                console.error('Failed to initialize audio:', error);
            }
        })();
        
        return this.initPromise;
    }
    
    async loadAudioAssets() {
        // Generate sound effects procedurally
        this.soundBuffers.set('click', this.generateClickSound());
        this.soundBuffers.set('place_x', this.generatePlaceXSound());
        this.soundBuffers.set('place_o', this.generatePlaceOSound());
        this.soundBuffers.set('win', this.generateWinSound());
        this.soundBuffers.set('draw', this.generateDrawSound());
        this.soundBuffers.set('button_hover', this.generateButtonHoverSound());
        this.soundBuffers.set('error', this.generateErrorSound());
        this.soundBuffers.set('success', this.generateSuccessSound());
        
        // Generate background music tracks
        this.musicTracks.set('ambient', this.generateAmbientMusic());
        this.musicTracks.set('upbeat', this.generateUpbeatMusic());
        this.musicTracks.set('chill', this.generateChillMusic());
        this.musicTracks.set('focus', this.generateFocusMusic());
    }
    
    // Generate click sound (pleasant UI click)
    generateClickSound() {
        const duration = 0.15;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 25) * (1 - Math.exp(-t * 100));
            const freq = 1200 + Math.sin(t * 20) * 50;
            data[i] = Math.sin(freq * 2 * Math.PI * t) * envelope * 0.2;
        }
        
        return buffer;
    }
    
    // Generate X placement sound (crisp, satisfying)
    generatePlaceXSound() {
        const duration = 0.25;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 8) * (1 - Math.exp(-t * 50));
            // Use pleasant bell-like tones
            const freq1 = 800; // Pleasant click sound
            const freq2 = 1200; // Higher harmonic
            data[i] = (Math.sin(freq1 * 2 * Math.PI * t) * envelope * 0.6) +
                     (Math.sin(freq2 * 2 * Math.PI * t) * envelope * 0.3);
        }
        
        return buffer;
    }
    
    // Generate O placement sound (softer, rounder, warmer)
    generatePlaceOSound() {
        const duration = 0.3;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 6) * (1 - Math.exp(-t * 30));
            // Warmer, lower tones
            const freq1 = 600; // Warmer base tone
            const freq2 = 900; // Gentle harmonic
            const vibrato = Math.sin(t * 8) * 10; // Gentle vibrato
            
            data[i] = (Math.sin((freq1 + vibrato) * 2 * Math.PI * t) * envelope * 0.7) +
                     (Math.sin((freq2 + vibrato) * 2 * Math.PI * t) * envelope * 0.4);
        }
        
        return buffer;
    }
    
    // Generate win sound (triumphant and celebratory)
    generateWinSound() {
        const duration = 1.2;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.max(0, 1 - (t / duration)) * (1 - Math.exp(-t * 10));
            
            // Ascending victory fanfare
            const progress = t / duration;
            const baseFreq = 523 + (progress * 150); // Rising from C to higher notes
            
            const note1 = Math.sin(baseFreq * 2 * Math.PI * t);
            const note2 = Math.sin((baseFreq * 1.25) * 2 * Math.PI * t); // Major third
            const note3 = Math.sin((baseFreq * 1.5) * 2 * Math.PI * t); // Perfect fifth
            
            data[i] = (note1 + note2 + note3) * envelope * 0.15;
        }
        
        return buffer;
    }
    
    // Generate draw sound (neutral)
    generateDrawSound() {
        const duration = 0.5;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 5);
            data[i] = Math.sin(400 * 2 * Math.PI * t) * envelope * 0.2;
        }
        
        return buffer;
    }
    
    // Generate button hover sound
    generateButtonHoverSound() {
        const duration = 0.1;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 40);
            data[i] = Math.sin(1200 * 2 * Math.PI * t) * envelope * 0.1;
        }
        
        return buffer;
    }
    
    // Generate error sound
    generateErrorSound() {
        const duration = 0.3;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 10);
            data[i] = Math.sin(200 * 2 * Math.PI * t) * envelope * 0.4;
        }
        
        return buffer;
    }
    
    // Generate success sound
    generateSuccessSound() {
        const duration = 0.4;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / sampleRate;
            const envelope = Math.exp(-t * 8);
            const freq = 523 + (t * 200); // Ascending frequency
            data[i] = Math.sin(freq * 2 * Math.PI * t) * envelope * 0.3;
        }
        
        return buffer;
    }
    
    // Generate ambient background music
    generateAmbientMusic() {
        const duration = 8;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(2, sampleRate * duration, sampleRate);
        
        const notes = [261.63, 293.66, 329.63, 392.00, 440.00]; // C, D, E, G, A (pentatonic scale)
        
        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
            const data = buffer.getChannelData(channel);
            
            for (let i = 0; i < buffer.length; i++) {
                const t = i / sampleRate;
                const noteIndex = Math.floor((t * 0.5) % notes.length);
                const freq = notes[noteIndex];
                
                const envelope = 0.4 + 0.3 * Math.sin(t * 0.5);
                const wave1 = Math.sin(freq * 2 * Math.PI * t) * envelope * 0.15;
                const wave2 = Math.sin(freq * 1.5 * 2 * Math.PI * t) * envelope * 0.08;
                
                data[i] = (wave1 + wave2) * (channel === 0 ? 1 : 0.8);
            }
        }
        
        return buffer;
    }
    
    generateUpbeatMusic() {
        const duration = 6;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(2, sampleRate * duration, sampleRate);
        
        const notes = [349.23, 392.00, 440.00, 523.25]; // F, G, A, C (major scale)
        
        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
            const data = buffer.getChannelData(channel);
            
            for (let i = 0; i < buffer.length; i++) {
                const t = i / sampleRate;
                const beat = Math.floor(t * 2) % notes.length;
                const freq = notes[beat];
                
                const envelope = 0.5 + 0.4 * Math.sin(t * 4);
                const wave = Math.sin(freq * 2 * Math.PI * t) * envelope * 0.12;
                
                data[i] = wave * (channel === 0 ? 1 : 0.9);
            }
        }
        
        return buffer;
    }
    
    generateChillMusic() {
        const duration = 10;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(2, sampleRate * duration, sampleRate);
        
        const notes = [220.00, 246.94, 293.66, 330.00]; // A3, B3, D4, E4 (chill progression)
        
        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
            const data = buffer.getChannelData(channel);
            
            for (let i = 0; i < buffer.length; i++) {
                const t = i / sampleRate;
                const noteIndex = Math.floor((t * 0.3) % notes.length);
                const freq = notes[noteIndex];
                
                const envelope = 0.6 + 0.3 * Math.sin(t * 0.2);
                const wave = Math.sin(freq * 2 * Math.PI * t) * envelope * 0.08;
                
                data[i] = wave;
            }
        }
        
        return buffer;
    }
    
    generateFocusMusic() {
        const duration = 12;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(2, sampleRate * duration, sampleRate);
        
        // Focus music with gentle flowing notes and nature-like sounds
        const notes = [196.00, 220.00, 246.94, 293.66]; // G3, A3, B3, D4 (calming progression)
        
        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
            const data = buffer.getChannelData(channel);
            
            for (let i = 0; i < buffer.length; i++) {
                const t = i / sampleRate;
                
                // Slow flowing melody
                const noteIndex = Math.floor((t * 0.2) % notes.length);
                const freq = notes[noteIndex];
                
                // Gentle breathing-like envelope
                const breathe = 0.4 + 0.3 * Math.sin(t * 0.1);
                
                // Main tone with gentle harmonics
                const wave1 = Math.sin(freq * 2 * Math.PI * t) * breathe * 0.06;
                const wave2 = Math.sin(freq * 1.5 * 2 * Math.PI * t) * breathe * 0.03;
                
                // Add subtle white noise for texture (like gentle rain)
                const noise = (Math.random() - 0.5) * 0.01 * breathe;
                
                data[i] = (wave1 + wave2 + noise) * (channel === 0 ? 1 : 0.85);
            }
        }
        
        return buffer;
    }
    
    // Play sound effect
    async playSound(soundName, volume = 1.0) {
        if (!this.settings.sfxEnabled) return;
        
        try {
            await this.initializeAudio();
            
            const buffer = this.soundBuffers.get(soundName);
            if (!buffer) {
                console.warn(`Sound '${soundName}' not found`);
                return;
            }
            
            const source = this.audioContext.createBufferSource();
            const gainNode = this.audioContext.createGain();
            
            source.buffer = buffer;
            source.connect(gainNode);
            gainNode.connect(this.sfxGain);
            gainNode.gain.value = volume;
            
            source.start();
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    }
    
    // Play background music
    async playMusic(trackName = null) {
        if (!this.settings.musicEnabled) return;
        
        try {
            await this.initializeAudio();
            
            // Stop current music
            if (this.currentMusicSource) {
                this.currentMusicSource.stop();
                this.currentMusicSource = null;
            }
            
            const track = trackName || this.settings.currentMusic;
            const buffer = this.musicTracks.get(track);
            
            if (!buffer) {
                console.warn(`Music track '${track}' not found`);
                return;
            }
            
            this.currentMusicSource = this.audioContext.createBufferSource();
            this.currentMusicSource.buffer = buffer;
            this.currentMusicSource.connect(this.musicGain);
            this.currentMusicSource.loop = true;
            this.currentMusicSource.start();
            
            // Save current track
            this.settings.currentMusic = track;
            localStorage.setItem('audio_currentMusic', track);
        } catch (error) {
            console.error('Error playing music:', error);
        }
    }
    
    // Stop music
    stopMusic() {
        if (this.currentMusicSource) {
            try {
                this.currentMusicSource.stop();
            } catch (error) {
                console.warn('Error stopping music:', error);
            }
            this.currentMusicSource = null;
        }
    }
    
    // Update volume settings
    updateVolumes() {
        if (!this.masterGain) return;
        
        this.masterGain.gain.value = this.settings.masterVolume;
        this.musicGain.gain.value = this.settings.musicVolume;
        this.sfxGain.gain.value = this.settings.sfxVolume;
    }
    
    // Set volume for specific type
    setVolume(type, value) {
        this.settings[`${type}Volume`] = value;
        localStorage.setItem(`audio_${type}Volume`, value);
        this.updateVolumes();
    }
    
    // Toggle audio type on/off
    toggle(type) {
        const setting = `${type}Enabled`;
        this.settings[setting] = !this.settings[setting];
        localStorage.setItem(`audio_${setting}`, this.settings[setting]);
        
        if (type === 'music' && !this.settings[setting]) {
            this.stopMusic();
        } else if (type === 'music' && this.settings[setting]) {
            this.playMusic();
        }
    }
    
    // Get current settings
    getSettings() {
        return { ...this.settings };
    }
}

// Create and expose global audio instance immediately
window.gameAudio = new GameHubAudio();

// Also expose it as a global variable for better compatibility
if (typeof global !== 'undefined') {
    global.gameAudio = window.gameAudio;
}
