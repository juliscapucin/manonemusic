import {
    AboutPage,
    ContactPage,
    HomePage,
    NavLink,
    PortfolioPage,
} from '@/types';
import { PortfolioItem } from './PortfolioItem';

export type AllData = {
    headerNavLinks: NavLink[];
    contact: ContactPage;
    aboutPage: AboutPage;
    portfolioSections: { [key: string]: PortfolioPage };
    films: PortfolioItem[];
    commercials: PortfolioItem[];
    releases: PortfolioItem[];
    projects: PortfolioItem[];
};
