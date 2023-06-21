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
        id: 'management',
        title: 'Management',
        type: 'aside',
        icon: 'heroicons_outline:cog',
        children: [
            {
                id: 'users',
                title: 'Users',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: '/management/users'
            },
            {
                id: 'depositOrders',
                title: 'Deposit Orders',
                type: 'basic',
                icon: 'heroicons_outline:cash',
                link: '/management/depositOrders'
            },
            {
                id: 'withdrawOrders',
                title: 'Withdraw Orders',
                type: 'basic',
                icon: 'heroicons_outline:receipt-refund',
                link: '/management/withdrawOrders'
            },
            {
                id: 'partners',
                title: 'Partners',
                type: 'basic',
                icon: 'heroicons_outline:user-group',
                link: '/management/partners'
            },
            {
                id: 'monthly-profits',
                title: 'Monthly Profits',
                type: 'basic',
                icon: 'heroicons_outline:chart-bar',
                link: '/management/monthlyProfits'
            },
            {
                id: 'setting',
                title: 'Setting',
                type: 'basic',
                icon: 'heroicons_outline:cog',
                link: '/management/setting'
            },
        ],
    },
    {
        id: 'news',
        title: 'News',
        type: 'basic',
        icon: 'heroicons_outline:newspaper',
        link: '/news'
    },
];

export const defaultNavigation: FuseNavigationItem[] = navigations;
export const compactNavigation: FuseNavigationItem[] = navigations;
export const futuristicNavigation: FuseNavigationItem[] = navigations;
export const horizontalNavigation: FuseNavigationItem[] = navigations;
