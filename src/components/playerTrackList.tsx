'use client';

import { PlayerTrack } from '@/components';

import { Track } from '@/types';
import { useState } from 'react';

type PlayerTrackListProps = {
    tracks: Track[];
};

export default function PlayerTrackList({ tracks }: PlayerTrackListProps) {
    const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(
        null
    );

    const handlePlay = (clickedTrackLink: string) => {
        setCurrentlyPlaying(clickedTrackLink);
    };

    const handlePause = () => {
        setCurrentlyPlaying(null);
    };

    return (
        <div className='gsap-project-content w-full lg:pr-4'>
            {tracks.map((track, index) => {
                return (
                    <PlayerTrack
                        index={index}
                        key={track.link}
                        track={track}
                        handlePlay={() => handlePlay(track.link)}
                        handlePause={() => handlePause()}
                        currentlyPlaying={currentlyPlaying}
                    />
                );
            })}
            {/* TODO add Soundcloud logo */}
        </div>
    );
}
