// Audio synthesizer for Tetris with Tron Legacy style sounds
class RetroSynthesizer {
    constructor() {
        // Initialize audio context
        this.audioContext = null;
        this.masterGain = null;
        this.compressor = null;
        
        // Initialize on first user interaction
        this.initialized = false;
        
        // Sound effects
        this.isMuted = false;
        
        // Track oscillators for sound effects
        this.activeOscillators = [];
        
        // Background music variables
        this.backgroundMusic = null;
        this.audioElement = null;
        this.isPlaying = false;
        this.currentTrackIndex = 0;
        
        // Music tracks in order - using relative paths from the public directory
        this.musicTracks = [
            './sounds/3 The Son Of Flynn.mp3',          // First song
            './sounds/21 Tron Legacy (End Titles).mp3',  // Second song
            './sounds/15 Solar Sailer.mp3'              // Third song
        ];
        
        // Flag to track if we've had user interaction
        this.hasUserInteraction = false;
    }
    
    // Initialize audio system
    init() {
        if (this.initialized) return;
        
        // Create audio context
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create master gain node
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = 0.3; // 30% volume
        
        // Create compressor
        this.compressor = this.audioContext.createDynamicsCompressor();
        this.compressor.threshold.value = -24;
        this.compressor.knee.value = 30;
        this.compressor.ratio.value = 12;
        this.compressor.attack.value = 0.003;
        this.compressor.release.value = 0.25;
        
        // Connect master gain to compressor
        this.masterGain.connect(this.compressor);
        this.compressor.connect(this.audioContext.destination);
        
        this.initialized = true;
    }
    
    // Test
    // Start the audio context (works without user interaction in modern browsers)
    start() {
        if (!this.initialized) {
            this.init();
        }
        
        // Mark that we've had user interaction (for autoplay)
        this.hasUserInteraction = true;
        
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        // Start background music immediately
        this.startBackgroundMusic();
    }
    
    // Toggle mute state
    toggleMute() {
        if (!this.initialized) return false;
        
        this.isMuted = !this.isMuted;
        
        // Mute/unmute WebAudio context (for sound effects)
        if (this.masterGain) {
            this.masterGain.gain.value = this.isMuted ? 0 : 0.3;
        }
        
        // Mute/unmute background music
        if (this.audioElement) {
            this.audioElement.volume = this.isMuted ? 0 : 0.7;
        }
        
        return this.isMuted;
    }
    
    // Play a more pleasant, quieter line clear sound
    playLineClearSound(lines = 1) {
        if (!this.initialized || this.isMuted) return;
        
        try {
            // Different sounds based on number of lines cleared, but with gentler frequencies
            const baseFreq = lines === 4 ? 440 : 330; // Lower frequencies are less harsh
            const duration = lines === 4 ? 0.4 : 0.25; // Shorter duration
            
            // Create oscillators for the sound
            const osc1 = this.audioContext.createOscillator();
            const osc2 = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            // Create a low-pass filter to soften the sound
            const filter = this.audioContext.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 2000; // Cut high frequencies
            
            // Connect oscillators through filter to gain node
            osc1.connect(filter);
            osc2.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.masterGain);
            
            // Set oscillator types for a softer sound
            osc1.type = 'sine'; // Sine waves are much softer than square
            osc2.type = 'triangle'; // Triangle is gentler than sawtooth
            
            // Set initial frequency
            osc1.frequency.value = baseFreq;
            osc2.frequency.value = baseFreq * 1.25; // Less dissonant overtone
            
            // Gentler frequency sweep
            osc1.frequency.linearRampToValueAtTime(baseFreq * 1.5, this.audioContext.currentTime + duration * 0.8);
            osc2.frequency.linearRampToValueAtTime(baseFreq * 1.75, this.audioContext.currentTime + duration * 0.8);
            
            // Envelope for the sound with MUCH lower volume
            gainNode.gain.value = 0;
            gainNode.gain.linearRampToValueAtTime(0.15, this.audioContext.currentTime + 0.05); // Lower peak volume (was 0.4)
            gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration);
            
            // Start and stop oscillators
            osc1.start();
            osc2.start();
            osc1.stop(this.audioContext.currentTime + duration);
            osc2.stop(this.audioContext.currentTime + duration);
        } catch (e) {
            console.error('Error playing line clear sound:', e);
        }
    }
    
    // Play game over sound
    playGameOverSound() {
        if (!this.initialized || this.isMuted) return;
        
        try {
            // Create oscillators for the sound
            const osc = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            // Connect oscillator to gain node
            osc.connect(gainNode);
            gainNode.connect(this.masterGain);
            
            // Set oscillator type
            osc.type = 'sawtooth';
            
            // Sweep frequency down
            osc.frequency.value = 440;
            osc.frequency.exponentialRampToValueAtTime(110, this.audioContext.currentTime + 1.5);
            
            // Envelope for the sound
            gainNode.gain.value = 0.4;
            gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 1.5);
            
            // Start and stop oscillator
            osc.start();
            osc.stop(this.audioContext.currentTime + 1.5);
        } catch (e) {
            console.error('Error playing game over sound:', e);
        }
    }
    
    // Play level up sound
    playLevelUpSound() {
        if (!this.initialized || this.isMuted) return;
        
        try {
            // Create oscillators for the sound
            const osc1 = this.audioContext.createOscillator();
            const osc2 = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            // Connect oscillators to gain node
            osc1.connect(gainNode);
            osc2.connect(gainNode);
            gainNode.connect(this.masterGain);
            
            // Set oscillator types
            osc1.type = 'triangle';
            osc2.type = 'square';
            
            // Sweep frequency up
            osc1.frequency.value = 220;
            osc2.frequency.value = 440;
            osc1.frequency.exponentialRampToValueAtTime(440, this.audioContext.currentTime + 0.2);
            osc2.frequency.exponentialRampToValueAtTime(880, this.audioContext.currentTime + 0.2);
            
            // Create arpeggio notes
            const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
            const noteLength = 0.1;
            let noteTime = this.audioContext.currentTime + 0.3; // Start after initial sweep
            
            for (let i = 0; i < notes.length; i++) {
                osc1.frequency.setValueAtTime(notes[i], noteTime);
                osc2.frequency.setValueAtTime(notes[i] * 2, noteTime);
                noteTime += noteLength;
            }
            
            // Envelope for the sound
            gainNode.gain.value = 0;
            gainNode.gain.linearRampToValueAtTime(0.4, this.audioContext.currentTime + 0.05);
            gainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime + 0.3);
            gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.3 + (noteLength * notes.length));
            
            // Start and stop oscillators
            osc1.start();
            osc2.start();
            osc1.stop(this.audioContext.currentTime + 0.3 + (noteLength * notes.length));
            osc2.stop(this.audioContext.currentTime + 0.3 + (noteLength * notes.length));
        } catch (e) {
            console.error('Error playing level up sound:', e);
        }
    }
    
    // Start playing background music
    startBackgroundMusic() {
        if (!this.initialized) {
            this.init();
        }
        
        // Set user interaction flag to true to help with autoplay
        this.hasUserInteraction = true;
        
        // Stop any existing music
        this.stopBackgroundMusic();
        
        this.isPlaying = true;
        this.playNextTrack();
    }
    
    // Stop background music
    stopBackgroundMusic() {
        // Clear any pending timeouts
        if (this.backgroundMusic) {
            clearTimeout(this.backgroundMusic);
            this.backgroundMusic = null;
        }
        
        // Stop and clean up audio element
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
            this.audioElement.removeEventListener('ended', this._trackEndedHandler);
        }
        
        // Stop all active oscillators (for sound effects)
        this.stopAllOscillators();
        
        this.isPlaying = false;
    }
    
    // Helper method to stop all active oscillators
    stopAllOscillators() {
        if (!this.activeOscillators) return;
        
        for (const osc of this.activeOscillators) {
            try {
                if (osc.stop) osc.stop();
                if (osc.disconnect) osc.disconnect();
            } catch (e) {
                // Ignore errors if oscillator already stopped
            }
        }
        
        this.activeOscillators = [];
    }
    
    // Track oscillators to clean up later
    trackOscillator(osc) {
        this.activeOscillators.push(osc);
        return osc;
    }
    
    // Play MP3 tracks in sequence
    playNextTrack() {
        if (!this.isPlaying) return;
        
        try {
            // Create audio element if it doesn't exist
            if (!this.audioElement) {
                this.audioElement = new Audio();
                
                // Create a bound event handler that we can remove later
                this._trackEndedHandler = () => {
                    this.handleTrackEnded();
                };
                
                // Add error handling
                this.audioElement.onerror = (e) => {
                    console.error('Audio error:', e);
                    console.error('Error code:', this.audioElement.error ? this.audioElement.error.code : 'unknown');
                    console.error('Current src:', this.audioElement.src);
                };
            }
            
            // Remove any existing event listeners
            this.audioElement.removeEventListener('ended', this._trackEndedHandler);
            
            // Log track information for debugging
            console.log(`Loading track ${this.currentTrackIndex + 1}:`, this.musicTracks[this.currentTrackIndex]);
            
            // Set up the new track - use absolute path with proper URL encoding
            const trackPath = this.musicTracks[this.currentTrackIndex];
            this.audioElement.src = trackPath;
            this.audioElement.load(); // Explicitly load the audio
            this.audioElement.volume = this.isMuted ? 0 : 0.7; // 70% volume
            
            // If this is "Tron Legacy (End Titles)," start it 3 seconds in to skip the slow intro
            if (trackPath.includes('21 Tron Legacy (End Titles)')) {
                // We need to wait for the audio to be loadable before setting currentTime
                this.audioElement.addEventListener('canplay', () => {
                    this.audioElement.currentTime = 3.0; // Start 3 seconds in
                    console.log('Starting End Titles track at 3 seconds in');
                }, { once: true }); // Use once:true so the event listener is automatically removed after firing
            }
            
            // Add ended event listener
            this.audioElement.addEventListener('ended', this._trackEndedHandler);
            
            // Always try to play the audio, treating page load as user interaction
            console.log('Attempting to play audio...');
            const playPromise = this.audioElement.play();
            
            // Handle autoplay restrictions
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Audio playback started successfully');
                    this.hasUserInteraction = true; // Mark that we've successfully played audio
                }).catch(error => {
                    console.error('Autoplay prevented:', error);
                    console.log('User interaction required to start audio');
                    
                    // Setup a one-time event listener for the entire document
                    const playOnInteraction = () => {
                        this.hasUserInteraction = true;
                        this.audioElement.play().catch(e => console.error('Still cannot play:', e));
                        document.removeEventListener('click', playOnInteraction);
                        document.removeEventListener('keydown', playOnInteraction);
                        document.removeEventListener('touchstart', playOnInteraction);
                    };
                    
                    document.addEventListener('click', playOnInteraction);
                    document.addEventListener('keydown', playOnInteraction);
                    document.addEventListener('touchstart', playOnInteraction);
                });
            }
            
            console.log(`Track ready: ${trackPath.split('/').pop()}`);
        } catch (e) {
            console.error('Error setting up track:', e);
        }
    }
    
    // Handle track ended event
    handleTrackEnded() {
        if (!this.isPlaying) return;
        
        // Move to the next track
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.musicTracks.length;
        
        // Play the next track
        this.playNextTrack();
    }
}

// Create global instance
const synth = new RetroSynthesizer();
