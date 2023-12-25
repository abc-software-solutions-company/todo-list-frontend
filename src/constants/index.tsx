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

export {
    sidebarItems
}