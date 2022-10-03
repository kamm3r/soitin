import React, { useEffect, useRef, useState } from 'react';
import { useVideoPlayer } from '../hooks/useVideoPlayer';

import {
  BiCaptions,
  BiCog,
  BiExitFullscreen,
  BiFastForward,
  BiFullscreen,
  BiPlay,
  BiSkipNext,
  BiSkipPrevious,
  BiVolume,
  BiVolumeLow,
} from 'react-icons/bi';
import { BiPause } from 'react-icons/bi';
import { BiVolumeFull } from 'react-icons/bi';
import { BiVolumeMute } from 'react-icons/bi';

export const SimplePlayer: React.FC = () => {
  const videoElement = useRef<HTMLVideoElement>(null!);
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    skipForward,
    skipBackward,
  } = useVideoPlayer(videoElement);
  const [selected, setSelected] = useState(playerState.speed + 'x');
  const [volume, setVolume] = useState<number>(30);
  const [elapsed, setElapsed] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes =
        Math.floor(time / 60) < 10
          ? `0${Math.floor(time / 60)}`
          : Math.floor(time / 60);
      const seconds =
        Math.floor(time % 60) < 10
          ? `0${Math.floor(time % 60)}`
          : Math.floor(time % 60);

      return `${minutes}:${seconds}`;
    }
    return '00:00';
  };

  useEffect(() => {
    videoElement.current.volume = volume / 100;

    setInterval(() => {
      const _duration = Math.floor(videoElement.current?.duration);
      const _elapsed = Math.floor(videoElement.current?.currentTime);

      setDuration(_duration);
      setElapsed(_elapsed);
    }, 100);
  }, [videoElement, volume]);

  return (
    <div className='w-full relative flex justify-center overflow-hidden rounded group mt-4'>
      <video
        className='w-full'
        src='/video.mp4'
        poster='/poster.jpg'
        ref={videoElement}
        onTimeUpdate={handleOnTimeUpdate}
        onClick={togglePlay}
      />
      {/* <div className='flex justify-evenly items-center absolute bottom-3 p-3 w-full max-w-2xl flex-wrap bg-stone-900 rounded-xl border border-white/20 translate-y-[150%] group-hover:translate-y-0 transition-all duration-500 ease-in-out'> */}
      <div className='flex justify-evenly items-center absolute bottom-3 p-3 w-full max-w-2xl flex-wrap bg-stone-900/80 rounded-xl border border-white/20 transition-all duration-500 ease-in-out gap-1 translate-y-[150%] group-hover:translate-y-0'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex justify-center items-center gap-3'>
            {/* <button onClick={toggleMute}> */}
            <button>
              {playerState.isMuted ? (
                <BiVolumeMute
                  className='text-white text-xl'
                  onClick={toggleMute}
                />
              ) : volume <= 20 ? (
                <BiVolume className='text-white text-xl' onClick={toggleMute} />
              ) : volume <= 75 ? (
                <BiVolumeLow
                  className='text-white text-xl'
                  onClick={toggleMute}
                />
              ) : (
                <BiVolumeFull
                  className='text-white text-xl'
                  onClick={toggleMute}
                />
              )}
              {/* {!playerState.isMuted ? (
                <BiVolumeFull className='bg-none text-white text-xl' />
              ) : (
                <BiVolumeMute className='bg-none text-white text-xl' />
              )} */}
            </button>
            <input
              type='range'
              className='bg-stone-900 out-range:bg-white bg-white/20 rounded-3xl h-1 w-full max-w-[100px]'
              min={0}
              max={100}
              value={volume}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                setVolume(v);
              }}
            />
          </div>
          <div className='flex justify-center items-center'>
            <button onClick={skipBackward}>
              <BiFastForward className='text-white text-3xl rotate-180' />
              {/* <BiSkipPrevious className='text-white text-3xl' /> */}
            </button>
            <button onClick={togglePlay}>
              {!playerState.isPlaying ? (
                <BiPlay className='text-white text-5xl' />
              ) : (
                <BiPause className='text-white text-5xl' />
              )}
            </button>
            <button onClick={skipForward}>
              <BiFastForward className='text-white text-3xl' />
              {/* <BiSkipNext className='text-white text-3xl' /> */}
            </button>
          </div>
          <div className='flex justify-center items-center gap-3'>
            {/* <select
              className='bg-transparent appearance-none'
              value={playerState.speed}
              onChange={(e) => handleVideoSpeed(e)}
            >
              <option className='bg-stone-900/80' value='0.25'>
                0.25
              </option>
              <option className='bg-stone-900/80' value='0.5'>
                0.5
              </option>
              <option className='bg-stone-900/80' value='0.75'>
                0.75
              </option>
              <option className='bg-stone-900/80' value='1'>
                1
              </option>
              <option className='bg-stone-900/80' value='1.25'>
                1.25
              </option>
              <option className='bg-stone-900/80' value='1.5'>
                1.5
              </option>
              <option className='bg-stone-900/80' value='1.75'>
                1.75
              </option>
              <option className='bg-stone-900/80' value='2'>
                2
              </option>
            </select> */}
            <button>
              <BiCaptions className='text-white text-3xl' />
            </button>
            <button>
              <BiCog className='text-white text-3xl' />
            </button>
            <button onClick={() => videoElement.current.requestFullscreen()}>
              <BiFullscreen className='text-white text-3xl' />
              {/* <BiExitFullscreen className='text-white text-3xl' /> */}
            </button>
          </div>
        </div>
        <div className='flex justify-between items-center w-full'>
          <span>{formatTime(elapsed)}</span>
          <input
            type='range'
            className='bg-white/20 rounded-3xl h-1 w-full mx-5'
            // min='0'
            value={elapsed}
            max={duration}
            // value={playerState.progress}
            // onChange={(e) => handleVideoProgress(e)}
          />
          <span>{formatTime(duration - elapsed)}</span>
        </div>
      </div>
    </div>
  );
};
