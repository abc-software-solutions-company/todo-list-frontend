import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {MenuItem, Select, SelectChangeEvent} from '@mui/material';
import classNames from 'classnames';
import {FC} from 'react';

import {IStatus} from '@/data/api/types/todolist.type';
import {IBaseProps} from '@/types';

interface IProps extends IBaseProps {
  id: number;
  list: IStatus[];
  onChange: (event: SelectChangeEvent<number>) => void;
  readonly?: boolean;
}

const StatusSelect: FC<IProps> = ({id: statusId, list, className, onChange, readonly = false}) => {
  const status = list.filter(e => e.id == statusId)[0] || list[0];
  return (
    <div className={classNames(className, 'text-h6')}>
      <Select
        value={status.id}
        onChange={onChange}
        IconComponent={KeyboardArrowDownIcon}
        readOnly={readonly}
        sx={{color: '#FFFFFF', backgroundColor: status.color, fontFamily: 'inherit'}}
      >
        {list.map(({id, name, color}) => {
          return (
            <MenuItem key={id} value={id} sx={{color, justifyContent: 'end', fontFamily: 'inherit', padding: '4px 16px'}}>
              <div className="relative">
                <span className="status-name inline-block rounded px-2 py-0.5 text-h6" style={{backgroundColor: color + '32'}}>
                  {name}
                </span>
                <div className="mobile-icon hidden">
                  <ArrowDropDownIcon />
                </div>
              </div>
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default StatusSelect;
