'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';

// lazy load & disable pre-rendering to avoid hydration errors
// https://nextjs.org/docs/app/guides/lazy-loading
const ReactPlayer = dynamic(() => import('react-player/soundcloud'), {
    ssr: false,
});

import BaseReactPlayer, { BaseReactPlayerProps } from 'react-player/base';
// import ReactPlayer from 'react-player/soundcloud';
import { IconPause, IconPlay } from '@/components/icons';
import { Track } from '@/types';

type PlayerTrackProps = {
    index: number;
    track: Track;
    currentlyPlaying: string | null;
    handlePlay: () => void;
    handlePause: () => void;
};

export default function PlayerTrack({
    index,
    track,
    currentlyPlaying,
    handlePlay,
    handlePause,
}: PlayerTrackProps) {
    const [isClient, setIsClient] = useState(false);
    const [duration, setDuration] = useState(0); // Store duration in seconds
    const [playedSeconds, setPlayedSeconds] = useState(0); // Track played time in seconds
    const [isSeeking, setIsSeeking] = useState(false); // Track whether the user is currently seeking
    const playerRef = useRef<BaseReactPlayer<BaseReactPlayerProps> | null>(
        null
    );

    const isPlaying = currentlyPlaying === track.link;

    const formatDuration = (data: number) => {
        const minutes = Math.floor(data / 60);
        const seconds = Math.floor(data % 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`; // Ensure two-digit seconds
    };

    const handleDuration = (newDuration: number) => {
        setDuration(newDuration);
    };

    const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
        if (!isSeeking) {
            setPlayedSeconds(playedSeconds);
        }
    };

    const handleTrackEnd = () => {
        handlePause();
        setPlayedSeconds(0);
    };

    const onSeekStart = () => {
        setIsSeeking(true);
    };

    const onSeekEnd = (e: React.PointerEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.currentTarget.value);
        setIsSeeking(false);
        playerRef.current?.seekTo(newTime);
        setPlayedSeconds(newTime);
        handlePlay();
    };

    return (
        <div
            className={`relative overflow-clip ${track.trackname.length > 40 ? 'h-32' : 'h-24'}`}
        >
            {/* Custom Player */}
            {index === 0 && (
                <div className='absolute top-0 right-0 left-0 h-px w-full bg-faded'></div>
            )}
            <div
                className={`group pointer-events-none absolute inset-0 z-5 flex w-full flex-nowrap items-center py-4 pr-4 pl-3 transition-colors duration-300 hover:bg-faded-5 ${isPlaying ? 'bg-faded-5' : ''}`}
                aria-label={`${isPlaying ? 'Pause' : 'Play'} ${track.trackname}`}
            >
                {/* Play / Pause icons */}
                <span
                    className={`flex h-full w-10 items-center justify-center opacity-70 hover:opacity-100`}
                >
                    {isPlaying ? <IconPause /> : <IconPlay />}
                </span>

                {/* Progress bar / Duration */}
                <div
                    className={`pointer-events-auto w-full pl-4 group-hover:opacity-100 ${isPlaying ? '' : 'opacity-60'}`}
                >
                    <p className='mb-2 w-full text-left'>{track.trackname}</p>
                    <div className='pointer-events-auto flex min-w-full items-center gap-4'>
                        <span className=''>
                            {formatDuration(playedSeconds)}
                        </span>
                        <input
                            className='pointer-events-auto h-px w-full appearance-none bg-faded-30'
                            type='range'
                            min={0}
                            max={duration}
                            step='any'
                            value={playedSeconds}
                            onPointerDown={onSeekStart}
                            onChange={(e) => {
                                setPlayedSeconds(parseFloat(e.target.value));
                            }}
                            onPointerUp={onSeekEnd}
                        />
                        <span className=''>{formatDuration(duration)}</span>
                    </div>
                </div>
            </div>
            <div className='absolute right-0 bottom-0 left-0 h-px w-full bg-faded'></div>

            {/* Original Player – Hidden */}
            <ReactPlayer
                ref={playerRef}
                playing={isPlaying}
                url={track.link}
                playsinline
                onDuration={handleDuration}
                onProgress={handleProgress}
                onEnded={handleTrackEnd}
                height={120}
                width={'100%'}
                onPlay={handlePlay}
                //  onStart={handlePlay}
                onReady={handlePause}
                onPause={handlePause}
                style={{
                    opacity: 0,
                    paddingTop: 10,
                    width: '100%',
                }}
            />
        </div>
    );
}
