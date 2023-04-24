import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {MenuItem, Select, SelectChangeEvent, SelectProps, SxProps, Theme} from '@mui/material';
import {FC} from 'react';

import Icon from '@/core-ui/icon';
import {Priorities, PriorityColors, PriorityIcons} from '@/utils/constant';

import style from './style.module.scss';

interface ITaskPriorityProp extends SelectProps {
  onChange: (event: SelectChangeEvent<unknown>) => void;
  priority: string;
  hideTitle: boolean;
  stylePriorityIcon?: SxProps<Theme> | undefined;
  styleMenuItem?: SxProps<Theme> | undefined;
  defaultItem?: string;
}

const TaskPiority: FC<ITaskPriorityProp> = ({
  onChange,
  priority,
  hideTitle,
  stylePriorityIcon,
  styleMenuItem,
  defaultItem,
  ...rest
}) => {
  const list = Object.values(Priorities).reverse();
  const colors = Object.values(PriorityColors).reverse();
  const icons = Object.values(PriorityIcons).reverse();
  const value = list.includes(priority) ? priority : defaultItem ? defaultItem : Priorities.medium;

  return (
    <Select
      onChange={onChange}
      value={value}
      IconComponent={KeyboardArrowDownIcon}
      className={style['task-priority']}
      sx={stylePriorityIcon}
      {...rest}
    >
      {defaultItem && (
        <MenuItem key={0} value={defaultItem} sx={styleMenuItem}>
          <div className={`${style.inner} ${hideTitle ? '' : 'mr-2'} priority-inner`}>
            <span className={style[`priority-name`]}>{defaultItem}</span>
          </div>
        </MenuItem>
      )}
      {list.map((e, index) => (
        <MenuItem key={index} value={e} sx={styleMenuItem}>
          <div className={`${style.inner} ${hideTitle ? '' : 'mr-2'} priority-inner`}>
            <Icon name={icons[index]} className={`${hideTitle ? '' : 'mr-1'}`} style={{color: colors[index]}} />
            <span className={style[`priority-name`]}>{hideTitle ? '' : e}</span>
          </div>
        </MenuItem>
      ))}
    </Select>
  );
};

export default TaskPiority;
