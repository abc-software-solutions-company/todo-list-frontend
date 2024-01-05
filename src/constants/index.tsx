import Icon from "@/core-ui/icon";

const sidebarItems = [
    {
        href: '/',
        title: 'Home',
        icon: <Icon name="ico-home" />
    },
    {
        href: '/project',
        title: 'Projects',
        icon: <Icon name="ico-briefcase" />
    },
    {
        href: '/today',
        title: 'Today',
        icon: <Icon name="ico-calendar-check" />
    },
    {
        href: '/upcoming',
        title: 'Upcoming',
        icon: <Icon name="ico-calendar" />
    },
    {
        href: '/notifications',
        title: 'Notifications',
        icon: <Icon name="ico-bell-notification" />
    },
    {
        href: '/setting',
        title: 'Setting',
        icon: <Icon name="ico-settings" />
    },
]

const recentlySearchItems = [
    {
        href: '/project',
        title: 'Projects',
        icon: <Icon name="ico-briefcase" />
    },
    {
        href: '/today',
        title: 'Today',
        icon: <Icon name="ico-calendar-check" />
    },
    {
        href: '/upcoming',
        title: 'Upcoming',
        icon: <Icon name="ico-calendar" />
    }
]

const navigationItems = [
    {
        href: '/home',
        title: 'Go to Home',
        icon: <Icon name="ico-home" />
    },
    {
        href: '/project',
        title: 'Go to Projects',
        icon: <Icon name="ico-briefcase" />
    },
    {
        href: '/today',
        title: 'Go to Today',
        icon: <Icon name="ico-calendar-check" />
    },
    {
        href: '/upcoming',
        title: 'Go to Upcoming',
        icon: <Icon name="ico-calendar" />
    }
]

export {
    sidebarItems,
    recentlySearchItems,
    navigationItems
}