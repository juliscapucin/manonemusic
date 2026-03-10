'use client';

import Link from 'next/link';

type SocialsData = { platform: string; link: string };

type SocialLinksProps = {
    data: SocialsData[];
};

export default function SocialLinks({ data }: SocialLinksProps) {
    return (
        data && (
            <div className='mt-8 text-right lg:mt-0 lg:self-end'>
                <h3 className='mb-4'>Listen & Follow</h3>
                {data.map((item) => {
                    return (
                        <div
                            className='relative flex items-start justify-end'
                            key={item.platform}
                        >
                            <Link
                                className='underlined-link block text-title-small uppercase md:text-title-medium lg:text-title-large'
                                href={item.link}
                                target='_blank'
                            >
                                {item.platform}
                            </Link>
                        </div>
                    );
                })}
            </div>
        )
    );
}
