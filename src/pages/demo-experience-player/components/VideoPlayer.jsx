import React, { useState, useRef, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const VideoPlayer = ({ currentScenario, onTimeUpdate, onDurationChange }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const mockVideoSources = {
    'indoor-navigation': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    'outdoor-mobility': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    'reading-assistance': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
    'face-recognition': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    'object-detection': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4'
  };

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const time = video?.currentTime;
      setCurrentTime(time);
      onTimeUpdate?.(time);
    };

    const handleDurationChange = () => {
      const dur = video?.duration;
      setDuration(dur);
      onDurationChange?.(dur);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video?.addEventListener('timeupdate', handleTimeUpdate);
    video?.addEventListener('durationchange', handleDurationChange);
    video?.addEventListener('ended', handleEnded);

    return () => {
      video?.removeEventListener('timeupdate', handleTimeUpdate);
      video?.removeEventListener('durationchange', handleDurationChange);
      video?.removeEventListener('ended', handleEnded);
    };
  }, [onTimeUpdate, onDurationChange]);

  const togglePlayPause = () => {
    const video = videoRef?.current;
    if (!video) return;

    if (isPlaying) {
      video?.pause();
    } else {
      video?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const video = videoRef?.current;
    if (!video) return;

    const rect = e?.currentTarget?.getBoundingClientRect();
    const clickX = e?.clientX - rect?.left;
    const newTime = (clickX / rect?.width) * duration;
    
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    if (videoRef?.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef?.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const changePlaybackRate = (rate) => {
    const video = videoRef?.current;
    if (!video) return;

    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const toggleFullscreen = () => {
    const video = videoRef?.current;
    if (!video) return;

    if (!isFullscreen) {
      if (video?.requestFullscreen) {
        video?.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="relative bg-card rounded-lg overflow-hidden border border-border">
      {/* Video Element */}
      <div className="relative aspect-video bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={mockVideoSources?.[currentScenario] || mockVideoSources?.['indoor-navigation']}
          poster="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop"
          crossOrigin="anonymous"
        >
          <track
            kind="captions"
            src="/captions/demo-captions.vtt"
            srcLang="en"
            label="English"
            default
          />
        </video>

        {/* AI Detection Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Mock detection boxes */}
          <div className="absolute top-1/4 left-1/3 w-24 h-16 border-2 border-accent rounded animate-pulse">
            <div className="absolute -top-6 left-0 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-mono">
              Door 94%
            </div>
          </div>
          <div className="absolute top-1/2 right-1/4 w-20 h-12 border-2 border-secondary rounded animate-pulse">
            <div className="absolute -top-6 right-0 bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-mono">
              Chair 87%
            </div>
          </div>
          <div className="absolute bottom-1/3 left-1/4 w-32 h-8 border-2 border-warning rounded animate-pulse">
            <div className="absolute -top-6 left-0 bg-warning text-warning-foreground px-2 py-1 rounded text-xs font-mono">
              Text 92%
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {!duration && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="flex items-center space-x-3 text-white">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="font-body">Loading demo...</span>
            </div>
          </div>
        )}
      </div>
      {/* Controls */}
      <div className="p-4 bg-card border-t border-border">
        {/* Progress Bar */}
        <div className="mb-4">
          <div
            className="w-full h-2 bg-muted rounded-full cursor-pointer"
            onClick={handleSeek}
            role="slider"
            aria-label="Video progress"
            aria-valuemin="0"
            aria-valuemax={duration}
            aria-valuenow={currentTime}
          >
            <div
              className="h-full bg-primary rounded-full transition-all duration-200"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Play/Pause */}
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlayPause}
              iconName={isPlaying ? 'Pause' : 'Play'}
              iconSize={20}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            />

            {/* Volume */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                iconName={isMuted ? 'VolumeX' : volume > 0.5 ? 'Volume2' : 'Volume1'}
                iconSize={16}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-muted rounded-lg appearance-none cursor-pointer slider"
                aria-label="Volume control"
              />
            </div>

            {/* Time Display */}
            <div className="text-sm text-muted-foreground font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Playback Speed */}
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-mono"
              >
                {playbackRate}x
              </Button>
              <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-popover border border-border rounded-lg shadow-lg p-2">
                <div className="flex flex-col space-y-1">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2]?.map((rate) => (
                    <button
                      key={rate}
                      onClick={() => changePlaybackRate(rate)}
                      className={`px-3 py-1 text-xs font-mono rounded hover:bg-muted ${
                        playbackRate === rate ? 'bg-primary text-primary-foreground' : ''
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Captions Toggle */}
            <Button
              variant="ghost"
              size="sm"
              iconName="Captions"
              iconSize={16}
              aria-label="Toggle captions"
            />

            {/* Fullscreen */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              iconName={isFullscreen ? 'Minimize' : 'Maximize'}
              iconSize={16}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;