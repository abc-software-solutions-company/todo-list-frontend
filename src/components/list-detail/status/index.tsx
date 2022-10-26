import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {MenuItem, Select, SelectProps} from '@mui/material';
import classNames from 'classnames';
import {FC, forwardRef} from 'react';

import {IStatus} from '@/data/api/types/list.type';

import style from './style.module.scss';

interface IProps extends SelectProps {
  className?: string;
  items: IStatus[];
  status: IStatus;
}

const Status: FC<IProps> = forwardRef(({items, className, status, ...rest}, ref) => {
  return (
    <div className={classNames(style.status, className, 'text-h6')}>
      <Select
        ref={ref}
        {...rest}
        value={status.id}
        IconComponent={KeyboardArrowDownIcon}
        sx={{color: '#FFFFFF', backgroundColor: status.color, fontFamily: 'inherit'}}
      >
        {items.map(({id, name, color}) => {
          return (
            <MenuItem key={id} value={id} sx={{color, justifyContent: 'end', fontFamily: 'inherit', padding: '4px 16px', minWidth: 160}}>
              <div className="relative">
                <span className="status-name vertical-align inline-block h-7 rounded px-2 py-0 text-h6" style={{backgroundColor: color + '32'}}>
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
});
Status.displayName = 'Status';

export default Status;
