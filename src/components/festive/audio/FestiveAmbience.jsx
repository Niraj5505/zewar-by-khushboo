import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useFestiveMode } from '../../../hooks/useFestiveMode';

/**
 * Calm Background Music Player with dual mode:
 * 1. Primary: Rich luxury music soundtrack (/audio/calm-music.mp3)
 * 2. Fallback: Procedural Web Audio API ambient acoustic chord & chime generator
 * Starts automatically when user enters website, plays continuously in a loop, pauses on tab blur.
 */
export const FestiveAmbience = () => {
  const { canShowAmbience } = useFestiveMode();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);

  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const proceduralTimerRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const hasUserPausedRef = useRef(false);

  // Procedural Calm Music Synthesizer (Fallback / Real-Time Generator)
  const startProceduralMusic = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(Math.max(0.01, volume * 0.4), ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Soft Stereo Delay / Reverb effect
      const delay = ctx.createDelay();
      delay.delayTime.value = 0.45;
      const feedback = ctx.createGain();
      feedback.gain.value = 0.35;
      const delayFilter = ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.value = 900;

      delay.connect(feedback);
      feedback.connect(delayFilter);
      delayFilter.connect(delay);
      delay.connect(masterGain);

      // Gentle plucked acoustic chimes
      const melodyPitches = [293.66, 369.99, 440.0, 493.88, 554.37, 587.33, 739.99];

      const triggerPluck = () => {
        if (!audioCtxRef.current) return;
        const now = ctx.currentTime;
        const pitch = melodyPitches[Math.floor(Math.random() * melodyPitches.length)];

        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(pitch, now);

        const overtone = ctx.createOscillator();
        const overGain = ctx.createGain();
        overtone.type = 'triangle';
        overtone.frequency.setValueAtTime(pitch * 2, now);

        oscGain.gain.setValueAtTime(0.0001, now);
        oscGain.gain.linearRampToValueAtTime(0.08, now + 0.02);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        overGain.gain.setValueAtTime(0.0001, now);
        overGain.gain.linearRampToValueAtTime(0.025, now + 0.02);
        overGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(oscGain);
        overtone.connect(overGain);

        oscGain.connect(masterGain);
        oscGain.connect(delay);
        overGain.connect(masterGain);

        osc.start(now);
        overtone.start(now);
        osc.stop(now + 3.3);
        overtone.stop(now + 2.0);
      };

      const runCycle = () => {
        triggerPluck();
        if (Math.random() > 0.4) {
          setTimeout(() => triggerPluck(), 800 + Math.random() * 600);
        }
      };

      runCycle();
      proceduralTimerRef.current = setInterval(runCycle, 2800);
      setIsPlaying(true);
    } catch (err) {
      console.warn('Web Audio synthesis failed:', err);
    }
  };

  const stopProceduralMusic = () => {
    if (proceduralTimerRef.current) {
      clearInterval(proceduralTimerRef.current);
      proceduralTimerRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        if (gainNodeRef.current && audioCtxRef.current.state === 'running') {
          gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.3);
          setTimeout(() => {
            try {
              audioCtxRef.current?.close();
            } catch {}
            audioCtxRef.current = null;
          }, 350);
        } else {
          audioCtxRef.current.close();
          audioCtxRef.current = null;
        }
      } catch {}
    }
    oscillatorsRef.current = [];
  };

  const startAudio = () => {
    hasUserPausedRef.current = false;
    if (audioRef.current) {
      audioRef.current.volume = volume;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            startProceduralMusic();
          });
      }
    } else {
      startProceduralMusic();
    }
  };

  const stopAudio = () => {
    hasUserPausedRef.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopProceduralMusic();
    setIsPlaying(false);
  };

  // Autoplay immediately upon entering the website (or on first interaction if blocked by browser policy)
  useEffect(() => {
    if (!canShowAmbience || hasUserPausedRef.current) return;

    let hasStarted = false;

    const attemptAutoplay = () => {
      if (hasStarted || hasUserPausedRef.current) return;
      if (audioRef.current) {
        audioRef.current.volume = volume;
        const promise = audioRef.current.play();
        if (promise !== undefined) {
          promise
            .then(() => {
              hasStarted = true;
              setIsPlaying(true);
              removeListeners();
            })
            .catch(() => {
              // Browser requires user interaction; keep listeners attached
            });
        }
      }
    };

    const handleFirstInteraction = () => {
      if (!hasStarted && !hasUserPausedRef.current) {
        attemptAutoplay();
      }
    };

    const events = ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown', 'scroll'];
    const addListeners = () => {
      events.forEach((evt) => {
        window.addEventListener(evt, handleFirstInteraction, { once: true, passive: true });
      });
    };

    const removeListeners = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleFirstInteraction);
      });
    };

    // 1. Attempt direct unprompted autoplay
    attemptAutoplay();

    // 2. Fallback to start on first interaction (click/touch/scroll)
    addListeners();

    return () => {
      removeListeners();
    };
  }, [canShowAmbience, volume]);

  // Mute/stop when tab is hidden, resume when visible
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        if (audioRef.current && isPlaying) {
          audioRef.current.pause();
        }
        if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
          audioCtxRef.current.suspend();
        }
      } else if (!document.hidden && isPlaying && !hasUserPausedRef.current) {
        if (audioRef.current) {
          audioRef.current.play().catch(() => {});
        }
        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isPlaying]);

  // Clean up when unmounting or when disabled
  useEffect(() => {
    if (!canShowAmbience && isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopProceduralMusic();
      setIsPlaying(false);
    }
  }, [canShowAmbience]);

  // Volume slider update
  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(Math.max(0.001, newVol * 0.4), audioCtxRef.current.currentTime);
    }
  };

  if (!canShowAmbience) return null;

  return (
    <>
      {/* Audio element pointing to user's luxury music track with continuous looping */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onEnded={() => {
          if (audioRef.current && !hasUserPausedRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
          }
        }}
      >
        <source src="/audio/calm-music.mp3" type="audio/mpeg" />
      </audio>

      <div className="fixed bottom-6 right-6 z-40 bg-white/95 backdrop-blur-md border border-sand-border rounded-full py-1.5 px-3 shadow-lg flex items-center gap-2.5 text-xs select-none animate-in fade-in slide-in-from-bottom-2 duration-300">
        <button
          type="button"
          onClick={isPlaying ? stopAudio : startAudio}
          className="w-8 h-8 rounded-full bg-espresso text-champagne flex items-center justify-center hover:bg-espresso-light hover:scale-105 transition-all shadow-sm cursor-pointer"
          title={isPlaying ? 'Pause Music' : 'Play Music'}
          aria-label="Toggle background music"
        >
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Music Status & Animated Equalizer Bars */}
        <div className="flex items-center gap-1.5 text-espresso">
          <Music className={`w-3.5 h-3.5 ${isPlaying ? 'text-champagne-dark animate-pulse' : 'text-espresso/40'}`} />
          <span className="font-serif text-[11px] font-medium tracking-wide">
            {isPlaying ? 'Playing Music' : 'Music Paused'}
          </span>
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-3 ml-0.5">
              <span className="w-0.5 bg-champagne-dark rounded-full animate-bounce" style={{ height: '70%', animationDuration: '600ms' }} />
              <span className="w-0.5 bg-champagne-dark rounded-full animate-bounce" style={{ height: '100%', animationDuration: '800ms', animationDelay: '150ms' }} />
              <span className="w-0.5 bg-champagne-dark rounded-full animate-bounce" style={{ height: '50%', animationDuration: '700ms', animationDelay: '300ms' }} />
            </div>
          )}
        </div>

        {isPlaying && (
          <div className="flex items-center gap-1.5 pl-1 animate-in fade-in duration-200">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 accent-champagne cursor-pointer"
              title="Music volume"
            />
          </div>
        )}
      </div>
    </>
  );
};
