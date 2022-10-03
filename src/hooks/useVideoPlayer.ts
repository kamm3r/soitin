import { useState, useEffect, RefObject, ChangeEvent } from 'react';

type ElementRef = RefObject<HTMLVideoElement>;
type InputEvent = ChangeEvent<HTMLInputElement>;
type SelectEvent = ChangeEvent<HTMLSelectElement>;

interface PlayerState {
  isPlaying: boolean;
  progress: number;
  // volume: number;
  speed: number;
  isMuted: boolean;
}

interface PlayerProps {
  playerState: PlayerState;
  togglePlay: () => void;
  handleOnTimeUpdate: () => void;
  handleVideoProgress: (e: InputEvent) => void;
  // handleVideoVolume: (e: InputEvent) => void;
  handleVideoSpeed: (e: SelectEvent) => void;
  toggleMute: () => void;
  skipForward: () => void;
  skipBackward: () => void;
}

export const useVideoPlayer = (videoElement: ElementRef): PlayerProps => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    progress: 0,
    // volume: 100,
    speed: 1,
    isMuted: false,
  });

  // const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // const [volume, setVolume] = useState<number>(30);
  const [mute, setMute] = useState<boolean>(false);

  useEffect(() => {
    playerState.isPlaying
      ? videoElement.current!.play()
      : videoElement.current!.pause();
  }, [playerState.isPlaying, videoElement]);

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  const handleOnTimeUpdate = () => {
    const progress =
      (videoElement.current!.currentTime / videoElement.current!.duration) *
      100;
    setPlayerState({
      ...playerState,
      progress,
    });
  };

  const handleVideoProgress = (e: InputEvent) => {
    const manualChange = Number(e.target.value);
    videoElement.current!.currentTime =
      (videoElement.current!.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };

  const handleVideoSpeed = (e: SelectEvent) => {
    const speed = Number(e.target.value);
    videoElement.current!.playbackRate = speed;
    setPlayerState({
      ...playerState,
      speed,
    });
  };

  const skipForward = () => {
    videoElement.current!.currentTime += 10;
  };
  const skipBackward = () => {
    videoElement.current!.currentTime -= 10;
  };

  useEffect(() => {
    playerState.isMuted
      ? (videoElement.current!.muted = true)
      : (videoElement.current!.muted = false);
  }, [playerState.isMuted, videoElement]);

  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });
  };

  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    // handleVideoVolume,
    handleVideoSpeed,
    toggleMute,
    skipForward,
    skipBackward,
  };
};
