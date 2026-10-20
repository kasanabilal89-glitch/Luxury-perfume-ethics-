/**
 * Procedural Web Audio API sound generator for ETHICS
 * Zero external mp3/wav dependencies. Generates ethereal luxury ambient soundscapes and gentle mist spritzes.
 */

let audioCtx: AudioContext | null = null;
let ambientOscillators: OscillatorNode[] = [];
let ambientGain: GainNode | null = null;
let isAmbientPlaying = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSpritzSound(): void {
  try {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Pink / white noise burst shaped like a fine luxury perfume atomiser mist
    for (let i = 0; i < bufferSize; i++) {
      const decay = Math.exp(-i / (ctx.sampleRate * 0.08));
      data[i] = (Math.random() * 2 - 1) * decay * 0.35;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Filter to simulate high-pressure fine glass atomizer
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, ctx.currentTime);
    filter.Q.setValueAtTime(1.8, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.4, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch {
    // Graceful fallback if audio is blocked by user
  }
}

export function playCrystalChime(frequency = 880): void {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + 0.8);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.25);
  } catch {
    // Ignore audio permission edge cases
  }
}

export function toggleLuxuryAtmosphere(onStateChange?: (playing: boolean) => void): boolean {
  try {
    const ctx = getAudioContext();

    if (isAmbientPlaying) {
      if (ambientGain) {
        ambientGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
        setTimeout(() => {
          ambientOscillators.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // ignore
            }
          });
          ambientOscillators = [];
          isAmbientPlaying = false;
          onStateChange?.(false);
        }, 1000);
      }
      return false;
    }

    // Start gentle harmonic warm drone (F# minor 9th ethereal shimmer chord: 185Hz, 277Hz, 370Hz, 554Hz)
    const frequencies = [185.0, 277.18, 369.99, 554.37, 739.99];
    ambientOscillators = [];

    ambientGain = ctx.createGain();
    ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
    ambientGain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 2.5);
    ambientGain.connect(ctx.destination);

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Subtle LFO shimmer
      const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      if (panner) {
        panner.pan.setValueAtTime((idx - 2) * 0.3, ctx.currentTime);
        osc.connect(panner);
        panner.connect(ambientGain!);
      } else {
        osc.connect(ambientGain!);
      }

      osc.start();
      ambientOscillators.push(osc);
    });

    isAmbientPlaying = true;
    onStateChange?.(true);
    return true;
  } catch {
    return false;
  }
}
