import {FC, useEffect} from 'react';
import styles from './style.module.scss';
import Card from '@/components/card-itern';
import useLists from '@/states/lists/use-lists';

const MyProjectList: FC = () => {
  const {myList, get} = useLists();

  useEffect(() => {
    get();
  }, []);

  return (
    <div className={styles['my-project-list']}>
      {myList?.length && myList.map(list => 
        <Card project={list} key={list.id} />
      )}
    </div>
  );
};

export default MyProjectList;
