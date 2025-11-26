import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            animation: {
                'fade-in': 'fadeIn 1s linear forwards',
            },
            maxWidth: {
                section: '1600px',
            },
            minHeight: {
                '1/2': '50vh',
            },
            fontFamily: {
                headline: ['var(--font-primary) sans-serif'],
            },
            zIndex: {
                5: '5',
                8: '8',
                15: '15',
                100: '100',
                header: '1000',
                burger: '2000',
                mobile: '2500',
                noise: '3000',
                projectsMenu: '4000',
                cookiesModal: '4500',
                cookiesElements: '4600',
                intro: '5000',
            },
            letterSpacing: { tightest: '-.075em' },
            lineHeight: { tightest: '0.1' },
            scale: {
                '20': '0.2',
            },
            rotate: {
                '270': '270deg',
            },
        },
    },
    plugins: [],
};
export default config;
