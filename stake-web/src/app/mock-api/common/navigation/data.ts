/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

const navigations: FuseNavigationItem[] = [
    {
        id: 'trades',
        title: 'Trades',
        type: 'basic',
        icon: 'heroicons_outline:trending-up',
        link: '/trades',
    },
    {
        id: 'games',
        title: 'Games',
        type: 'basic',
        icon: 'gamepad',
        link: '/games'
    },
    {
        id: 'wallet',
        title: 'Wallet',
        type: 'basic',
        icon: 'heroicons_outline:credit-card',
        link: '/wallet',
    },
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-bar',
        link: '/dashboard'
    }
];

export const defaultNavigation: FuseNavigationItem[] = navigations;
export const compactNavigation: FuseNavigationItem[] = navigations;
export const futuristicNavigation: FuseNavigationItem[] = navigations;
export const horizontalNavigation: FuseNavigationItem[] = navigations;
