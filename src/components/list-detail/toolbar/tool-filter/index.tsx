import {MenuItem, Select, SelectChangeEvent, SxProps, Theme} from '@mui/material';
import classNames from 'classnames';
import {FC} from 'react';

import Icon from '@/core-ui/icon';
import useTodolist from '@/states/todolist/useTodolist';
import {IBaseProps} from '@/types';

import style from './style.module.scss';

const ToolFilter: FC<IBaseProps> = ({className}) => {
  const {todolist, statusFilter, setStatusFilter} = useTodolist();

  const onChange = (e: SelectChangeEvent<number>) => {
    setStatusFilter(Number(e.target.value));
  };

  const sxMenuItem: SxProps<Theme> = {justifyContent: 'end', fontFamily: 'inherit', padding: '4px 16px', height: 36, minHeight: 36};

  return (
    <div className={classNames(style['tool-filter'], className)}>
      <div className="filter-icon">
        <Icon name="ico-filter" size={20} />
      </div>
      <Select value={statusFilter} sx={{fontFamily: 'inherit'}} onChange={onChange}>
        <MenuItem key={0} value={0} sx={{color: '#000000', ...sxMenuItem}}>
          <div className="dropdown-item">
            <span className="dropdown-name inline-block h-7 rounded px-2 py-0.5 text-h6 font-medium" style={{backgroundColor: '#F1F5F9'}}>
              All
            </span>
          </div>
        </MenuItem>
        {todolist.status.map(({id, name, color}) => (
          <MenuItem key={id} value={id} sx={{color, ...sxMenuItem}}>
            <div>
              <span className="dropdown-name inline-block h-7 rounded px-2 py-0.5 text-h6" style={{color, backgroundColor: color + '32'}}>
                {name}
              </span>
            </div>
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default ToolFilter;
