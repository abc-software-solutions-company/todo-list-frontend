import classNames from 'classnames';
import {FC} from 'react';

import useToast from '@/core-ui/toast';
import api from '@/data/api';
import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';
import {TaskTypeData} from '@/utils/constant';
import {ToastContents} from '@/utils/toast-content';

import Left from './left';
import Right from './right';
import style from './style.module.scss';
import Type from './type';

const TaskToolbar: FC<IBaseProps> = ({className}) => {
  const toast = useToast();
  const {task, update} = useTask();
  const taskSymbol = task?.todolist.taskSymbol;
  const order = task?.order;

  const onSelectType = (type: string) => {
    api.task
      .update({id: task.id, type})
      .then(update)
      .catch(() => toast.show({type: 'danger', title: 'Type', content: ToastContents.ERROR}));
  };

  return (
    <div className={classNames(style.toolbar, className)}>
      <div className="header">
        <Type
          data={TaskTypeData}
          selected={TaskTypeData.find(x => x.text === task.type)}
          onSelect={value => {
            onSelectType(value);
          }}
        />
        {taskSymbol && order && <p>{`${taskSymbol}-${order}:`}</p>}
        <Left className="left" />
        <Right className="right" />
      </div>
    </div>
  );
};
export default TaskToolbar;
