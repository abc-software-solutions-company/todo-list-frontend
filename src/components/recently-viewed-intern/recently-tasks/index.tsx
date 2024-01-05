import {FC} from 'react';
import styles from './style.module.scss';
import Card from '@/components/card-itern';

const RecentlyTasks: FC = () => {
  return (
    <div className={styles['recently-tasks']}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default RecentlyTasks
  