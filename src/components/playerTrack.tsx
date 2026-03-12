'use client';

import { useEffect, useState, useRef } from 'react';
import { Track } from '@/types';
import ReactPlayer from 'react-player/soundcloud';
import { IconPause, IconPlay } from '@/components/icons';

type PlayerTrackProps = {
    index: number;
    track: Track;
    currentlyPlaying: string | null;
    onTrackClick: () => void;
    sliderAction: () => void;
};

export default function PlayerTrack({
    index,
    track,
    currentlyPlaying,
    onTrackClick,
    sliderAction,
}: PlayerTrackProps) {
    const [isClient, setIsClient] = useState(false);
    const [duration, setDuration] = useState(0); // Store duration in seconds
    const [playedSeconds, setPlayedSeconds] = useState(0); // Track played time in seconds
    const [isSeeking, setIsSeeking] = useState(false); // Track whether the user is currently seeking
    const playerRef = useRef<ReactPlayer | null>(null);

    const isPlaying = currentlyPlaying === track.link;
    const finalTrackLink = `${track.link}&show_artwork=false`;

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
        onTrackClick();
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

    return isClient ? (
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
                <div className='flex h-full w-10 items-center justify-center'>
                    {isPlaying ? <IconPause /> : <IconPlay />}
                    <div className='pointer-events-auto absolute bottom-0 z-5 h-4 w-full'></div>
                </div>

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
                            onChange={(e) =>
                                setPlayedSeconds(parseFloat(e.target.value))
                            }
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
                url={finalTrackLink}
                autoplay={false}
                playsinline
                onDuration={handleDuration}
                onProgress={handleProgress}
                onEnded={handleEnd}
                width={'100%'}
                height={100}
                onPlay={() => {
                    if (isPlaying) return;
                    onTrackClick();
                }}
                onPause={() => {
                    if (isPlaying) onTrackClick();
                }}
                style={{
                    opacity: 0,
                    paddingTop: 10,
                }}
            />
        </div>
    ) : null;
}
