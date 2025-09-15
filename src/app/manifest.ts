import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Man One Music',
        short_name: 'Man One Music',
        description:
            'Man One Music is the portfolio website of music producer Matt Rudge',
        start_url: '/',
        display: 'standalone',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
