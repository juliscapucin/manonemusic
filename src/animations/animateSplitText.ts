import gsap from 'gsap';
import { CustomEase } from 'gsap/dist/CustomEase';
import { SplitText } from 'gsap/dist/SplitText';

import { customEase } from '@/utils/constants';

gsap.registerPlugin(SplitText, CustomEase);

export const animateSplitText = (
    textElement: HTMLHeadingElement,
    xTranslate?: number,
    delay?: number
) => {
    if (!textElement) return;
    const split = new SplitText(textElement, { type: 'chars' });

    const tl = gsap.timeline();

    gsap.set(split.chars, {
        xPercent: (index) => (xTranslate ? xTranslate * (index + 1) : 100),
        opacity: 0,
    });

    return tl.fromTo(
        split.chars,
        {
            xPercent: (index) => (xTranslate ? xTranslate * (index + 1) : 100),
            opacity: 1,
        },
        {
            opacity: 1,
            xPercent: 0,
            duration: 0.8,
            delay: delay || 0,
            stagger: 0.05,
            ease: CustomEase.create('custom', customEase),
        }
    );
};
