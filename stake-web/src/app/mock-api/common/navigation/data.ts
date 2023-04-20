/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

const navigations: FuseNavigationItem[] = [
    // {
    //     id: 'home',
    //     title: 'Home',
    //     type: 'basic',
    //     icon: 'heroicons_outline:home',
    //     link: '/'
    // },
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
        type: 'aside',
        icon: 'heroicons_outline:credit-card',
        children: [
            {
                id: 'wallet',
                title: 'Wallet',
                type: 'basic',
                icon: 'heroicons_outline:credit-card',
                link: '/wallet'
            },
            {
                id: 'deposit',
                title: 'Deposit',
                type: 'basic',
                icon: 'heroicons_outline:currency-dollar',
                link: '/wallet/deposit'
            },
            {
                id: 'withdraw',
                title: 'Withdraw',
                type: 'basic',
                icon: 'heroicons_outline:cash',
                link: '/wallet/withdraw'
            },
        ]
    },
];

export const defaultNavigation: FuseNavigationItem[] = navigations;
export const compactNavigation: FuseNavigationItem[] = navigations;
export const futuristicNavigation: FuseNavigationItem[] = navigations;
export const horizontalNavigation: FuseNavigationItem[] = navigations;
