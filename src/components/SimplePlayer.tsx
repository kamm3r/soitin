import React, { useRef, useState } from 'react';
import { useVideoPlayer } from '../hooks/useVideoPlayer';

import { BiPlay } from 'react-icons/bi';
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
  } = useVideoPlayer(videoElement);
  const [selected, setSelected] = useState(playerState.speed + 'x');

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
      <div className='flex justify-evenly items-center absolute bottom-3 p-3 w-full max-w-2xl flex-wrap bg-stone-900 rounded-xl border border-white/20 transition-all duration-500 ease-in-out'>
        <div className='flex justify-center items-center'>
          <button onClick={togglePlay}>
            {!playerState.isPlaying ? (
              <BiPlay className='text-white text-3xl' />
            ) : (
              <BiPause className='text-white text-3xl' />
            )}
          </button>
        </div>
        <p>
          <span>{videoElement.current?.currentTime.toFixed(0)}</span> /{' '}
          <span>{videoElement.current?.duration.toFixed(0)}</span>
        </p>
        <input
          type='range'
          className='out-range:bg-white appearance-none bg-white/20 rounded-3xl h-1 w-full max-w-sm'
          min='0'
          max='100'
          value={playerState.progress}
          onChange={(e) => handleVideoProgress(e)}
        />
        <select
          className='appearance-none bg-stone-900 text-white outline-none border-none text-center '
          value={playerState.speed}
          onChange={(e) => handleVideoSpeed(e)}
        >
          <option value='0.50'>0.50x</option>
          <option value='1'>1x</option>
          <option value='1.25'>1.25x</option>
          <option value='2'>2x</option>
        </select>

        <div className='relative'>
          <input
            type='range'
            className='absolute -top-10 bg-stone-900 py-1 px-1 out-range:bg-white  bg-white/20 rounded-3xl h-1 w-[100px] origin-[10%_20%] -rotate-90 hidden transition-all duration-500 ease-in-out group-hover:block'
            min='0'
            max='100'
            // value={volume}
            // onChange={(e) => Volume(e)}
          />
          <button className='group' onClick={toggleMute}>
            {!playerState.isMuted ? (
              <BiVolumeFull className='bg-none text-white text-xl' />
            ) : (
              <BiVolumeMute className='bg-none text-white text-xl' />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
