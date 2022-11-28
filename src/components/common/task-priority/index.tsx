import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {MenuItem, Select, SelectChangeEvent, SelectProps} from '@mui/material';
import {FC} from 'react';

import Icon from '@/core-ui/icon';
import {ITaskResponse} from '@/data/api/types/task.type';
import {Priorities, PriorityColors, PriorityIcons} from '@/utils/constant';

import style from './style.module.scss';

interface ITaskPriorityProp extends SelectProps {
  onChange: (event: SelectChangeEvent<unknown>) => void;
  task: ITaskResponse;
  hideTitle: boolean;
}

const TaskPiority: FC<ITaskPriorityProp> = ({onChange, task, hideTitle}) => {
  const {priority} = task;

  const list = Object.values(Priorities).reverse();
  const colors = Object.values(PriorityColors).reverse();
  const icons = Object.values(PriorityIcons).reverse();
  const value = list.includes(priority) ? priority : Priorities.medium;

  return (
    <Select onChange={onChange} value={value} IconComponent={KeyboardArrowDownIcon} className={style['task-priority']}>
      {list.map((e, index) => (
        <MenuItem key={index} value={e}>
          <div className={`${style.inner} ${hideTitle ? '' : 'mr-2'}`}>
            <Icon name={icons[index]} className={`${style.icon} ${hideTitle ? '' : 'mr-1'}`} style={{color: colors[index]}} />
            <span className={style[`priority-name`]}>{hideTitle ? '' : e}</span>
          </div>
        </MenuItem>
      ))}
    </Select>
  );
};

export default TaskPiority;
