import {FC, useEffect} from 'react'
import styles from './style.module.scss'
import ListTasksIntern from '@/components/list-task-intern'
import useTasksIntern from '@/states/tasks-intern/use-tasks-intern';
import LocalStorage from '@/utils/local-storage';
import { ROUTES } from '@/configs/routes.config';



const TodayBody: FC = () => {
  const {
    tasksSeparate: { todoArr, doingArr, completeArr }
    ,getTasksIntern
  } = useTasksIntern()

  useEffect(() => {
    LocalStorage.checkPage.set(ROUTES.HOMEINTERN);
    getTasksIntern();
  }, []);

  return (
    <div className={styles['today-body']}>
      <ListTasksIntern type={'today'} tasks={todoArr} />
      <ListTasksIntern type={'doing'} tasks={doingArr} />
      <ListTasksIntern type={'complete'} tasks={completeArr} />
    </div>
  )
}

export default TodayBody
