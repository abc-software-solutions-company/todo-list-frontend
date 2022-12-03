import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {MenuItem, Select, SelectChangeEvent, SelectProps} from '@mui/material';
import {FC} from 'react';

import Icon from '@/core-ui/icon';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import useTask from '@/states/task/use-task';
import {Priorities, PriorityColors, PriorityIcons} from '@/utils/constant';
import {ToastContents} from '@/utils/toast-content';

const PrioritySelect: FC<SelectProps> = props => {
  const {task, update} = useTask();
  const {id, priority} = task;
  const toast = useToast();

  const list = Object.values(Priorities).reverse();
  const colors = Object.values(PriorityColors).reverse();
  const icons = Object.values(PriorityIcons).reverse();
  const value = list.includes(priority) ? priority : Priorities.medium;

  const onChange = (event: SelectChangeEvent<unknown>) => {
    api.task
      .update({id: id, priority: event.target.value as string})
      .then(update)
      .catch(() => toast.show({type: 'danger', title: 'Priority', content: ToastContents.ERROR}));
  };

  return (
    <Select onChange={onChange} value={value} IconComponent={KeyboardArrowDownIcon} {...props}>
      {list.map((e, index) => (
        <MenuItem key={index} value={e} sx={{padding: '4px 20px'}}>
          <div className="relative mr-2 flex items-center">
            <Icon name={icons[index]} className="mr-1" style={{color: colors[index]}} />
            <span className="priority-name text-h6 font-medium text-slate-700">{e}</span>
          </div>
        </MenuItem>
      ))}
    </Select>
  );
};

export default PrioritySelect;
