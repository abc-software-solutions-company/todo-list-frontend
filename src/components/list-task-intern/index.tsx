import {FC} from 'react';
import styles from './style.module.scss';
import TaskIntern from '../task-intern';
import ListTaskHead from './list-task-head';
import { ISetTaskType } from './type';
import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import { ITaskResponse } from '@/data/api/types/task.type';

interface IListTasksIntern {
  type: ISetTaskType,
  tasks: ITaskResponse[]
}

const ListTasksIntern: FC<IListTasksIntern> = ({ type, tasks }) => {
  const tasksNum = tasks?.length ? tasks.length : 0;
  return ( 
    <div className={styles['list-tasks']}>
        <ListTaskHead taskNum={tasksNum} type={type} />
        {
          tasks.length ? (
            tasks.map((task) => (
              <TaskIntern key={task.id} task={task} />
            ))
          ) : (
            <span className="empty">Empty</span>
          )
        }
        <Button className='flex w-[155px] py-4 px-3 justify-center items-center gap-2'>
          <Icon  className='rounded-lg text-blue-700' name='ico-plus' />
          <span className=''>Add task</span>
        </Button>
    </div>
  );
};

export default ListTasksIntern;
