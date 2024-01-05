import { FC } from 'react';
import styles from './style.module.scss';
import Activities from './activities/Activities';
import TodayIntern from '../today-intern';
import RecentlyViewedIntern from '../recently-viewed-intern';
import MyProjectItern from '../my-project-itern';

const HomeIntern: FC = () => {

  return (
    <div className={styles['home']}>
        <Activities />
        <TodayIntern />
        <RecentlyViewedIntern />
        <MyProjectItern />
    </div>
  );
};

export default HomeIntern;
