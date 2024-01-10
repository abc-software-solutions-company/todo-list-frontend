import {FC, useState} from 'react';
import styles from './topbar-hoa.module.scss';
import TopBarRightIntern from './topbar-right-intern';
import {
  isHomeNPage,
  isProjectsPage,
  isTodayPage,
  isUpcomingPage,
  isNotificationPage,
  isSettingPage,
  isProjectsDetailPage
} from '@/utils/check-routes';
import useTopbarIntern from '@/components/topbar-hoa/hook';

const TopBarHoa: FC = () => {
  const {path, id} = useTopbarIntern();

  if (isHomeNPage(path, id as string)) {
    console.log('is home page');
  }

  return (
    <div className={styles['topbar']}>
      <p className="l eading-9 text-[32px] font-bold capitalize text-blue-700">{`
          ${isHomeNPage(path, id as string) ? 'Home' : ''}
          ${isProjectsPage(path, id as string) ? 'Projects' : ''}
          ${isProjectsDetailPage(path, id as string) ? 'Projects Detail' : ''}
          ${isTodayPage(path, id as string) ? 'Today' : ''}
          ${isUpcomingPage(path, id as string) ? 'Upcoming' : ''}
          ${isNotificationPage(path, id as string) ? 'Notification' : ''}
          ${isSettingPage(path, id as string) ? 'Setting' : ''}`}</p>
      <TopBarRightIntern />
    </div>
  );
};

export default TopBarHoa;
