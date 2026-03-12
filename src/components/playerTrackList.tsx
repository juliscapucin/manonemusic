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

    const handleTrackClick = (clickedTrackLink: string) => {
        if (currentlyPlaying === clickedTrackLink) {
            // If the clicked track is already playing, pause it.
            setCurrentlyPlaying(null);
        } else {
            // Play the clicked track and pause others
            setCurrentlyPlaying(clickedTrackLink);
        }
    };

    const handleTrackSlide = (clickedTrackLink: string) => {
        setCurrentlyPlaying(clickedTrackLink);
    };

    return (
        <div className='gsap-project-content w-full lg:pr-4'>
            {tracks.map((track, index) => {
                return (
                    <PlayerTrack
                        index={index}
                        key={track.link}
                        track={track}
                        onTrackClick={() => handleTrackClick(track.link)}
                        onSlide={() => handleTrackSlide(track.link)}
                        currentlyPlaying={currentlyPlaying}
                    />
                );
            })}
            {/* TODO add Soundcloud logo */}
        </div>
    );
}
