import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useFestiveMode } from '../../../hooks/useFestiveMode';

/**
 * Procedural Web Audio API Tanpura/Sitar harmonic drone synthesizer.
 * 100% royalty-free, 0KB audio download, stops on tab blur, opt-in only.
 */
export const FestiveAmbience = () => {
  const { canShowAmbience, setPref } = useFestiveMode();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);

  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscillatorsRef = useRef([]);

  const startAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Authentic Indian classical Pa-Sa-Sa-Sa drone frequencies (Root D# ~ 155.56Hz)
      const freqs = [155.56, 233.08, 311.13, 466.16]; // Root, Fifth, Octave, High fifth
      const oscs = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        // Warm sine + subtle triangle warmth
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Soft subtle LFO beating for acoustic resonance
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.1, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.04, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(oscGain.gain);
        lfo.start();

        oscGain.gain.setValueAtTime(0.08 / (idx + 1), ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        oscs.push(osc);
      });

      oscillatorsRef.current = oscs;
      setIsPlaying(true);
    } catch (e) {
      console.warn('Web Audio synthesis could not initialize', e);
    }
  };

  const stopAudio = () => {
    if (audioCtxRef.current) {
      try {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        audioCtxRef.current.close();
      } catch {}
      audioCtxRef.current = null;
      oscillatorsRef.current = [];
    }
    setIsPlaying(false);
  };

  // Mute/stop when tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && audioCtxRef.current) {
        audioCtxRef.current.suspend();
      } else if (!document.hidden && audioCtxRef.current && isPlaying) {
        audioCtxRef.current.resume();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isPlaying]);

  // Clean up when unmounting or when disabled
  useEffect(() => {
    if (!canShowAmbience && isPlaying) {
      stopAudio();
    }
    return () => stopAudio();
  }, [canShowAmbience]);

  // Volume slider update
  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVol, audioCtxRef.current.currentTime);
    }
  };

  if (!canShowAmbience) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 bg-white/95 backdrop-blur-sm border border-sand-border rounded-full p-1.5 shadow-lg flex items-center gap-2 text-xs">
      <button
        type="button"
        onClick={isPlaying ? stopAudio : startAudio}
        className="w-8 h-8 rounded-full bg-espresso text-champagne flex items-center justify-center hover:bg-espresso-light transition-colors"
        title={isPlaying ? 'Pause Festive Ambience' : 'Play Festive Ambience'}
        aria-label="Toggle festive audio drone"
      >
        {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>

      {isPlaying && (
        <div className="flex items-center gap-1.5 pr-2 animate-in fade-in duration-200">
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.02"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 accent-champagne"
            title="Ambience volume"
          />
        </div>
      )}
    </div>
  );
};
