import { useCallback, useRef, useEffect } from 'react';

const useTextToSpeech = () => {
  const synthRef = useRef(null);
  const currentUtteranceRef = useRef(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speak = useCallback((text, options = {}) => {
    if (!synthRef?.current || !text) return;

    // Cancel any ongoing speech
    synthRef?.current?.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice settings
    utterance.rate = options?.rate || 0.9;
    utterance.pitch = options?.pitch || 1;
    utterance.volume = options?.volume || 0.8;
    
    // Try to use a preferred voice
    const voices = synthRef?.current?.getVoices();
    const preferredVoice = voices?.find(voice => 
      voice?.lang?.startsWith('en') && 
      (voice?.name?.includes('Google') || voice?.name?.includes('Microsoft'))
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Event handlers
    utterance.onstart = () => {
      if (options?.onStart) options?.onStart();
    };

    utterance.onend = () => {
      currentUtteranceRef.current = null;
      if (options?.onEnd) options?.onEnd();
    };

    utterance.onerror = (event) => {
      console.warn('Speech synthesis error:', event?.error);
      currentUtteranceRef.current = null;
      if (options?.onError) options?.onError(event?.error);
    };

    currentUtteranceRef.current = utterance;
    synthRef?.current?.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if (synthRef?.current) {
      synthRef?.current?.cancel();
      currentUtteranceRef.current = null;
    }
  }, []);

  const pause = useCallback(() => {
    if (synthRef?.current && synthRef?.current?.speaking) {
      synthRef?.current?.pause();
    }
  }, []);

  const resume = useCallback(() => {
    if (synthRef?.current && synthRef?.current?.paused) {
      synthRef?.current?.resume();
    }
  }, []);

  const isSupported = useCallback(() => {
    return 'speechSynthesis' in window;
  }, []);

  const isSpeaking = useCallback(() => {
    return synthRef?.current ? synthRef?.current?.speaking : false;
  }, []);

  return {
    speak,
    stop,
    pause,
    resume,
    isSupported,
    isSpeaking
  };
};

// Text-to-Speech Service Component
const TextToSpeechService = ({ children, isEnabled = true }) => {
  const { speak, stop, isSupported } = useTextToSpeech();

  const handleSpeak = useCallback((text, options = {}) => {
    if (!isEnabled || !isSupported()) {
      console.warn('Text-to-speech is disabled or not supported');
      return;
    }

    speak(text, {
      rate: 0.9,
      pitch: 1,
      volume: 0.8,
      ...options
    });
  }, [isEnabled, isSupported, speak]);

  const handleStop = useCallback(() => {
    stop();
  }, [stop]);

  // Provide TTS functions to children
  return children({ 
    speak: handleSpeak, 
    stop: handleStop, 
    isSupported: isSupported() 
  });
};

export default TextToSpeechService;
export { useTextToSpeech };