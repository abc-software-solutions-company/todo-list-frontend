import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {MenuItem, Select, SelectChangeEvent, SelectProps} from '@mui/material';
import {FC} from 'react';

import Icon from '@/core-ui/icon';
import {ITaskResponse} from '@/data/api/types/task.type';
import {Priorities, PriorityColors, PriorityIcons} from '@/utils/constant';

interface ITaskPriorityProp extends SelectProps {
  onChange: (event: SelectChangeEvent<unknown>) => void;
  task: ITaskResponse;
}

const TaskPiority: FC<ITaskPriorityProp> = ({onChange, task}) => {
  const {priority} = task;

  const list = Object.values(Priorities).reverse();
  const colors = Object.values(PriorityColors).reverse();
  const icons = Object.values(PriorityIcons).reverse();
  const value = list.includes(priority) ? priority : Priorities.medium;

  return (
    <Select onChange={onChange} value={value} IconComponent={KeyboardArrowDownIcon}>
      {list.map((e, index) => (
        <MenuItem key={index} value={e} sx={{padding: '4px 20px'}}>
          <div className="inner relative mr-2 flex items-center">
            <Icon name={icons[index]} className="mr-1" style={{color: colors[index]}} />
            <span className="priority-name text-h6 font-medium text-slate-700">{e}</span>
          </div>
        </MenuItem>
      ))}
    </Select>
  );
};

export default TaskPiority;
