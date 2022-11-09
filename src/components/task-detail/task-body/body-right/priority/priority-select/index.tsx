import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {FC} from 'react';

import Icon from '@/core-ui/icon';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {Priorities, PriorityColors, PriorityIcons} from '@/utils/constant';

interface IProps {
  taskData: ITaskResponse;
  onSuccess?: () => void;
}

const PrioritySelect: FC<IProps> = ({taskData, onSuccess}) => {
  const list = Object.values(Priorities).reverse();
  const colors = Object.values(PriorityColors).reverse();
  const icons = Object.values(PriorityIcons).reverse();
  const toast = useToast();
  const value = list.includes(taskData.priority) ? taskData.priority : Priorities.medium;

  const onChange = (event: SelectChangeEvent<unknown>) => {
    api.task
      .update({id: taskData.id, priority: event.target.value as string})
      .then(onSuccess)
      .catch(() => toast.show({type: 'danger', title: 'Priority', content: 'An Error occurrd, please try again'}));
  };

  return (
    <Select onChange={onChange} value={value} IconComponent={KeyboardArrowDownIcon} sx={{color: '#000000', fontFamily: 'inherit'}}>
      {list.map((priority, index) => (
        <MenuItem key={index} value={priority} sx={{fontFamily: 'inherit', padding: '4px 20px'}}>
          <div className="relative flex items-center">
            <Icon name={icons[index]} className="mr-3" style={{color: colors[index]}} />
            <span className="priority-name rounded text-h6 font-medium">{priority}</span>
          </div>
        </MenuItem>
      ))}
    </Select>
  );
};

export default PrioritySelect;
