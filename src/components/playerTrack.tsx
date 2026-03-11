'use client';

import { useEffect, useState, useRef } from 'react';
import { Track } from '@/types';
import ReactPlayer from 'react-player/soundcloud';
import { IconPause, IconPlay } from '@/components/icons';

type PlayerTrackProps = {
    index: number;
    track: Track;
    isPlaying: boolean;
    buttonAction: () => void;
    sliderAction: () => void;
};

export default function PlayerTrack({
    index,
    track,
    isPlaying,
    buttonAction,
    sliderAction,
}: PlayerTrackProps) {
    const [isClient, setIsClient] = useState(false);
    const [duration, setDuration] = useState(0); // Store duration in seconds
    const [playedSeconds, setPlayedSeconds] = useState(0); // Track played time in seconds
    const [isSeeking, setIsSeeking] = useState(false); // Track whether the user is currently seeking
    const playerRef = useRef<ReactPlayer | null>(null);

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
            // Update progress only if not currently seeking
            setPlayedSeconds(playedSeconds);
        }
    };

    const handleEnd = () => {
        buttonAction();
        setPlayedSeconds(0);
    };

    // Slider change starts
    const onSeekStart = () => {
        setIsSeeking(true);
    };

    // Slider change ends and seek to new time
    const onSeekEnd = (e: React.PointerEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.currentTarget.value);
        setIsSeeking(false);
        playerRef.current?.seekTo(newTime);
        setPlayedSeconds(newTime);
        sliderAction();
    };

    // Workaround to run component only on client side
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {/* Original Player – Hidden */}
            {isClient && (
                <div className='absolute -z-5'>
                    <ReactPlayer
                        ref={playerRef}
                        url={track.link}
                        playing={isPlaying}
                        playsinline
                        onDuration={handleDuration}
                        onProgress={handleProgress}
                        onEnded={handleEnd}
                        width={'100%'}
                        height={100}
                        style={{ opacity: 0, pointerEvents: 'none' }}
                    />
                </div>
            )}
            {/* Custom Player */}
            {index === 0 && <div className='h-px w-full bg-faded-30'></div>}
            <div
                className={`group relative w-full px-4 pt-4 pb-6 transition-colors duration-300 hover:bg-faded-5 ${isPlaying ? 'bg-faded-5' : ''}`}
                aria-label={`${isPlaying ? 'Pause' : 'Play'} ${track.trackname}`}
            >
                <div
                    className={`group-hover:opacity-100 ${isPlaying ? '' : 'opacity-60'}`}
                >
                    <p className='mb-2 w-full text-left'>{track.trackname}</p>
                    <div className='flex h-full w-full items-center gap-4'>
                        {/* Play / Pause icons */}
                        <button onClick={buttonAction}>
                            {isPlaying ? <IconPause /> : <IconPlay />}
                        </button>
                        <span className=''>
                            {formatDuration(playedSeconds)}
                        </span>
                        <input
                            className='h-px w-full appearance-none bg-faded-30'
                            type='range'
                            min={0}
                            max={duration}
                            step='any'
                            value={playedSeconds}
                            onPointerDown={onSeekStart}
                            onChange={(e) =>
                                setPlayedSeconds(parseFloat(e.target.value))
                            }
                            onPointerUp={onSeekEnd}
                        />
                        <span className=''>{formatDuration(duration)}</span>
                    </div>
                </div>
            </div>
            <div className='h-px w-full bg-faded-30'></div>
        </>
    );
}
